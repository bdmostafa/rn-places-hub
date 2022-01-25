export const ADD_NEW_PLACE = "ADD_NEW_PLACE";
export const GET_PLACES = "GET_PLACES";

import * as FileSystem from "expo-file-system";
import ENV from "../env";
import { fetchPlaces, insertPlace } from "../helpers/db";

export const getPlaces = () => {
  return async (dispatch) => {
    try {
      const dbFetchResult = await fetchPlaces();
      //   console.log(dbFetchResult);

      dispatch({ type: GET_PLACES, places: dbFetchResult.rows._array });
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  };
};

export const addNewPlace = (title, image, location) => {
  return async (dispatch) => {
    const { lat, lng } = location;
    const apiKey = ENV().googleApiKey;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const resData = await response.json();
    if (!resData.results) {
      throw new Error("Something went wrong!");
    }

    let address;
    address = resData?.results[0]?.formatted_address
      ? resData.results[0].formatted_address
      : "ABC-123, Dendabor, Ashulia, Savar, Dhaka, Bangladesh";

    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });

      const dbInsertionResult = await insertPlace(
        title,
        newPath,
        address,
        lat,
        lng
      );

      dispatch({
        type: ADD_NEW_PLACE,
        placeData: {
          id: dbInsertionResult.insertId,
          image: newPath,
          title,
          address,
          coords: { lat, lng },
        },
      });
    } catch (err) {
      console.error(err);

      throw new Error(err.message);
    }
  };
};
