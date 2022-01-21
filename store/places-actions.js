export const ADD_NEW_PLACE = "ADD_NEW_PLACE";
import * as FileSystem from "expo-file-system";

export const addNewPlace = (title, image) => {
  return async (dispatch) => {
    const fileName = image.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
    } catch (err) {
      console.error(err);
      throw new Error(err.message);
    }

    dispatch({ type: ADD_NEW_PLACE, placeData: { title, image: newPath } });
  };
};
