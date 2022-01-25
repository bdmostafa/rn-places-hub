import React, { useEffect } from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../components/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { PlaceItem } from "../components/PlaceItem";
import Colors from "../constants/Colors";
import * as placeActions from "../store/places-actions";

export const PlacesListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    dispatch(placeActions.getPlaces());
  }, [dispatch]);
console.log(places)

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={places}
      renderItem={({ item: { id, title, imageUri } }) => {
        return (
          <PlaceItem
            image={imageUri}
            title={title}
            address={null}
            onSelect={() => {
              navigation.navigate("PlaceDetail", {
                placeTitle: title,
                placeId: id,
              });
            }}
          />
        );
      }}
    />
  );
};

PlacesListScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: "All Places List",
    headerRight: () => {
      return (
        // <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        //   <Item
        //     title="Add New Place"
        //     iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
        //     onPress={() => {
        //       navigation.navigate("NewPlace");
        //     }}
        //   />
        // </HeaderButtons>
        <Ionicons
          name={Platform.OS === "android" ? "md-add" : "ios-add"}
          size={23}
          color={Platform.OS === "android" ? "white" : Colors.primary}
          onPress={() => {
            navigation.navigate("NewPlace");
          }}
        />
      );
    },
  };
};
