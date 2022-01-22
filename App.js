import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/places-reducers";
import ReduxThunk from "redux-thunk";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("DB initialization success");
  })
  .catch((err) => {
    console.log("DB initialization failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
