import { ADD_NEW_PLACE } from "./places-actions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_PLACE:
      return {
        places: [],
      };

    default:
      return state;
  }
};
