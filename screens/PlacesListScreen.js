import React from "react";
import { FlatList, Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../components/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { PlaceItem } from "../components/PlaceItem";

export const PlacesListScreen = ({ navigation }) => {
  const places = useSelector((state) => state.places.places);

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={places}
      renderItem={({ item: { id, title } }) => {
        return (
          <PlaceItem
            image={null}
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
