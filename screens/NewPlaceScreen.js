import React, { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import * as placeActions from "../store/places-actions";
import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { ImgPicker } from "../components/ImgPicker";
import { LocationPicker } from "../components/LocationPicker";

export const NewPlaceScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = (text) => {
    // you could add validation
    setTitle(text);
  };

  const imageTakenHandler = (imageUri) => {
    setImage(imageUri);
  };

  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    dispatch(placeActions.addNewPlace(title, image));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={title}
        />
        <ImgPicker onImageTaken={imageTakenHandler} />
        <LocationPicker
          navigation={navigation}
          onLocationPicked={locationPickedHandler}
        />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: "Add New Place",
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 0,
    paddingHorizontal: 2,
  },
});
