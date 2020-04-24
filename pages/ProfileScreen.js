import React, { useState, useCallback, useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Ionicons } from "@expo/vector-icons";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { ScrollView } from "react-native-gesture-handler";

// Pour importer une photo depuis le tel du user: expo install expo-image-picker expo-permissions

import colors from "../colors";
// import { setDetectionImagesAsync } from "expo/build/AR";
import Axios from "axios";

export default function ProfileScreen({ handleToken, handleId }) {
  //STATES
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(true);

  const { showActionSheetWithOptions } = useActionSheet();

  // const phoneWidth = Dimensions.get("window").width;

  //useCallback permet d'indiquer à React de ne pas recrer une fonction si le composant est refresh

  // ENREGISTRER LA PHOTO
  const handleImagePicked = useCallback(async (pickerResult) => {
    //RECUPERACTION DES "COOKIES"

    const id = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("userToken");

    let uploadResponse, uploadResult;
    try {
      setIsUploading(true);

      if (!pickerResult.cancelled) {
        const uri = pickerResult.uri;
        // séparer le type de fichier après le "."
        const uriParts = uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        //FORMATAGE AVANT ENVOI "PUT" D'UNE IMAGE DANS BDD
        const formData = new FormData();
        formData.append("photo", {
          uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`,
        });

        const options = {
          method: "PUT",
          body: formData,
          headers: {
            Authorization: "Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        };

        // GET la photo dans BDD

        uploadResponse = await fetch(
          `https://express-airbnb-api.herokuapp.com/user/upload_picture/${id}`,
          options
        );
        uploadResult = await uploadResponse.json();
        // here problem in backend cause invalid API-KEY , not my api :(
        if (
          Array.isArray(uploadResult.photo) === true &&
          uploadResult.photo.length > 0
        ) {
          setPhoto(uploadResult.photo[0].url);
          alert("Photo mise à jour !");
        }
      }
    } catch (e) {
      alert("Une erreur s'est produite");
    } finally {
      setIsUploading(false);
    }
  });

  // RECUPERATION DES DONNEES USER

  const handleUserUpdate = async () => {
    try {
      //recupérer les autorisations
      const id = await AsyncStorage.getItem("userId");
      const token = await AsyncStorage.getItem("userToken");

      let data = new FormData();

      data.append("name", name);
      data.append("username", username);
      data.append("email", email);
      data.append("description", description);

      const response = await Axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update/${id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setData(response.data);

      alert("profil mis à jour !");
    } catch (error) {
      console.log("userUpdateError ", error.message);
      alert("Une erreur est survenue");
    }
  };

  //CHOIX COULISSANT POUR PRENDRE UNE PHOTO

  const _onOpenActionSheet = () => {
    const options = ["Take a photo", "From library", "Cancel"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      { options, cancelButtonIndex },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          takePhoto();
        }
        if (buttonIndex === 1) {
          takeLibraryImage();
        }
      }
    );
  };

  //PRENDRE UNE PHOTO

  const takePhoto = async () => {
    const cameraPerm = await Permissions.askAsync(Permissions.CAMERA);
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (
      cameraPerm.status === "granted" &&
      cameraRollPerm.status === "granted"
    ) {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });

      handleImagePicked(pickerResult);
      // setDetectionImagesAsync(pickerResult.uri);
      setPhoto(pickerResult.uri);
    }
  };

  //CHOISIR UNE IMAGE DE SA LIBRAIRIE

  const takeLibraryImage = async () => {
    //demander permission d'accéder à la librairie
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //sélection d'une image
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
      });
      handleImagePicked(pickerResult);
      setPhoto(pickerResult.uri);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const id = await AsyncStorage.getItem("userId");

      try {
        const response = await Axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.id) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  // **********************  RETURN  ***********************************

  return isLoading ? (
    // LOADING

    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator size="large" color={colors.bgColor} />
      <Button
        title="Log Out"
        onPress={() => {
          handleToken(null);
        }}
      />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      {/* IMAGE TO FILL */}
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={_onOpenActionSheet}>
        {photo || data.photo.length > 0 ? (
          <Image
            source={{ uri: photo || data.photo[0] }}
            style={styles.photoView}
          />
        ) : (
          <View style={styles.photoView}>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "800" }}>
              Ajouter
            </Text>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "400" }}>
              une photo
            </Text>
          </View>
        )}
      </TouchableWithoutFeedback>

      {/* ALREADY FILLED FORM */}

      <View style={styles.borderBottom}>
        <TextInput
          placeholderTextColor={colors.fade}
          defaultValue={data.email}
          placeholder="email"
          style={styles.form}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.borderBottom}>
        <TextInput
          placeholder="username"
          defaultValue={data.username}
          style={styles.form}
          placeholderTextColor={colors.fade}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.borderBottom}>
        <TextInput
          placeholder="name"
          defaultValue={data.name}
          style={styles.form}
          placeholderTextColor={colors.fade}
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.frame}>
        <TextInput
          multiline={true}
          numberOfLines={6}
          maxLength={200}
          style={styles.form}
          placeholder="présentez-vous en quelques mots... (max 200 characters)"
          defaultValue={data.description}
          placeholderTextColor={colors.fade}
          onChangeText={(text) => setDescription(text)}
        />
      </View>

      {/* UPDATE PROFILE BUTTON */}

      <TouchableOpacity
        disabled={!name && !username && !email && !description ? true : false}
        style={styles.updateButton}
        onPress={handleUserUpdate}
      >
        <Text style={styles.updateButtonText}>Mettre à jour</Text>
      </TouchableOpacity>

      {/* LOG OUT BUTTON */}

      <TouchableOpacity
        style={styles.logOutButton}
        onPress={() => {
          handleToken(null);
          handleId(null);
        }}
      >
        <Text style={styles.underlinedLink}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  photoView: {
    width: 200,
    height: 200,
    backgroundColor: "#D3D3D3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.bgColor,
  },
  form: {
    color: "#F35960",
    height: 35,
    fontSize: 22,
    padding: 5,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  borderBottom: {
    borderBottomColor: colors.fade,
    borderBottomWidth: 2,
    marginBottom: 20,
    marginHorizontal: 20,
    width: "90%",
  },
  updateButton: {
    borderRadius: 35,
    backgroundColor: "white",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    borderWidth: 1,
    borderColor: "#F35960",
    marginHorizontal: "auto",
    marginTop: 20,
    marginBottom: 15,
  },
  updateButtonText: {
    fontSize: 25,
    color: "#f35960",
  },
  underlinedLink: {
    color: "gray",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "gray",
    fontSize: 16,
    marginHorizontal: "auto",
  },
  frame: {
    borderColor: colors.fade,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    height: 150,
    width: "90%",
  },
});
