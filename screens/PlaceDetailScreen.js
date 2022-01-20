import React from "react";
import { Text, View } from "react-native";

export const PlaceDetailScreen = () => {
  return (
    <View>
      <Text>Place Detail ......</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: navigation.getParam("placeTitle"),
  };
};
