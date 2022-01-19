import Place from "../models/place";
import { ADD_NEW_PLACE } from "./places-actions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PLACE:
      const newPlace = new Place(new Date().toString(), action.placeData.title);

      return {
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};
