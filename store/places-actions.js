export const ADD_NEW_PLACE = "ADD_NEW_PLACE";

export const addNewPlace = (title, image) => {
  return { type: ADD_NEW_PLACE, placeData: { title, image } };
};
