import React, { useState, useCallback } from "react";
import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

// Pour importer une photo depuis le tel du user: expo install expo-image-picker expo-permissions

import colors from "../colors";

export default function ProfileScreen({ setUserToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);

  const phoneWidth = Dimensions.get("window").width;

  //useCallback permet d'indiquer à React de ne pas recrer une fonction si le composant est refresh

  const onSelect = useCallback(async () => {
    //demander permission d'accéder à la librairie
    const cameraRollPerm = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    //sélection d'une image
    if (cameraRollPerm.status === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });
      setPhoto(pickerResult.uri);
    }
  }, []);
  // ******************return*********************
  return (
    <View style={{ padding: 20, alignItems: "center" }}>
      {photo === null ? (
        <View
          style={{
            width: 200,
            height: 200,
            backgroundColor: "#d1bef7",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20
          }}
        >
          <TouchableWithoutFeedback onPress={onSelect}>
            <Text style={{ color: "white", fontSize: 30, fontWeight: "400" }}>
              Ajouter
            </Text>
          </TouchableWithoutFeedback>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "400" }}>
            une photo
          </Text>
        </View>
      ) : (
        <>
          <Image
            source={{ uri: photo }}
            style={{ width: 200, height: 200, marginBottom: 20 }}
          />
          <Text onPress={onSelect}>Modifier ma photo</Text>
        </>
      )}

      {/* form */}
      <View style={styles.borderBottom}>
        <TextInput
          placeholderTextColor={colors.fade}
          value={email}
          placeholder="email"
          style={styles.form}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.borderBottom}>
        <TextInput
          placeholder="username"
          value={username}
          style={styles.form}
          placeholderTextColor={colors.fade}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <View style={styles.borderBottom}>
        <TextInput
          placeholder="name"
          value={name}
          style={styles.form}
          placeholderTextColor={colors.fade}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.frame}>
        <TextInput
          style={styles.form}
          placeholder="présentez-vous en quelques mots..."
          value={description}
          placeholderTextColor={colors.fade}
          onChangeText={text => setDescription(text)}
        />
      </View>
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setUserToken(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  home: { justifyContent: "center", alignItems: "center", height: 300 },
  form: {
    color: colors.fade,
    height: 35,
    fontSize: 22,
    padding: 5
  },
  borderBottom: {
    borderBottomColor: colors.fade,
    borderBottomWidth: 2,
    marginBottom: 20
  },
  button: {
    borderRadius: 35,
    backgroundColor: "white",
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginHorizontal: "auto",
    marginTop: 20,
    marginBottom: 15
  },
  underlinedLink: {
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FFFFFF",
    fontSize: 16,
    marginHorizontal: "auto"
  },
  frame: {
    borderColor: colors.fade,
    borderWidth: 2,
    marginTop: 10,
    marginBottom: 10,
    height: 130
  }
});
