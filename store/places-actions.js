export const ADD_NEW_PLACE = "ADD_NEW_PLACE";
export const GET_PLACES = "GET_PLACES";

import * as FileSystem from "expo-file-system";
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

export const addNewPlace = (title, image) => {
  return async (dispatch) => {
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
        "dummy address",
        10.1,
        13.9
      );

      dispatch({
        type: ADD_NEW_PLACE,
        placeData: {
          id: dbInsertionResult.insertId,
          title: title,
          image: newPath,
        },
      });
    } catch (err) {
      console.error(err);

      throw new Error(err.message);
    }
  };
};
