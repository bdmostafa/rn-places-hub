import Place from "../models/place";
import { ADD_NEW_PLACE, GET_PLACES } from "./places-actions";

const initialState = {
  places: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACES:
      return {
        places: action.places.map(
          (place) =>
            new Place(
              place.id.toString(),
              place.title,
              place.imageUri,
              place.address,
              place.lat,
              place.lng
            )
        ),
      };
    case ADD_NEW_PLACE:
      const {
        id,
        title,
        image,
        address,
        coords: { lat, lng },
      } = action.placeData;

      const newPlace = new Place(
        id.toString(),
        title,
        image,
        address,
        lat,
        lng
      );

      return {
        places: state.places.concat(newPlace),
      };

    default:
      return state;
  }
};
