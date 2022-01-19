import React from "react";
import { Platform, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../components/CustomHeaderButton";
import { Ionicons } from "@expo/vector-icons";

export const PlacesListScreen = ({ navigation }) => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
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
