import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
// import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";

const verifyPermissions = async () => {
  // const result = await Permissions.askAsync(
  //   Permissions.CAMERA,
  //   Permissions.CAMERA_ROLL
  // );
  const { granted } = await Camera.requestCameraPermissionsAsync();

  if (!granted) {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant camera permissions to use this app.",
      [{ text: "Okay" }]
    );
    return false;
  }

  return true;
};

export const ImgPicker = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState(null);

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    setPickedImage(image.uri);
    onImageTaken(image.uri);
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text onPress={takeImageHandler}> No image picked yet. </Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <Button
        title="Take Image"
        color={Colors.primary}
        onPress={takeImageHandler}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: "center",
    marginBottom: 10,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
