import React, { useState } from "react";
import {
  // ScrollView,
  // StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import colors from "../colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useNavigation } from "@react-navigation/native";

export default function SignUpScreen({ handleToken, handleId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [passwordbis, setPasswordbis] = useState("");

  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar barStyle="light-content" /> */}
      <KeyboardAwareScrollView
        extraScrollHeight={110}
        bounces={false}
        enableOnAndroid
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.bgColor,
          padding: 20,
        }}
      >
        <View>
          <View
            style={{ alignItems: "center", marginBottom: 40, marginTop: 30 }}
          >
            <Text style={{ fontSize: 35, color: "white" }}>
              Rejoignez-nous !
            </Text>
          </View>
          <View style={{ justifyContent: "flex-end" }}>
            {/* form */}
            <View style={styles.borderBottom}>
              <TextInput
                placeholderTextColor={colors.fade}
                value={email}
                placeholder="email"
                style={styles.form}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.borderBottom}>
              <TextInput
                placeholder="username"
                value={username}
                style={styles.form}
                placeholderTextColor={colors.fade}
                onChangeText={(text) => setUsername(text)}
              />
            </View>
            <View style={styles.borderBottom}>
              <TextInput
                placeholder="name"
                value={name}
                style={styles.form}
                placeholderTextColor={colors.fade}
                onChangeText={(text) => setName(text)}
              />
            </View>
            <View style={styles.frame}>
              <TextInput
                style={styles.form}
                placeholder="présentez-vous en quelques mots..."
                value={description}
                placeholderTextColor={colors.fade}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.borderBottom}>
              <TextInput
                placeholder="mot de passe"
                value={password}
                placeholderTextColor={colors.fade}
                style={styles.form}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.borderBottom}>
              <TextInput
                placeholder="confirmez le mot de passe"
                value={passwordbis}
                placeholderTextColor={colors.fade}
                style={styles.form}
                secureTextEntry={true}
                onChangeText={(text) => setPasswordbis(text)}
                autoCapitalize="none"
              />
            </View>

            {/* button */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress={async () => {
                  if (
                    email === "" ||
                    name === "" ||
                    username === "" ||
                    description === "" ||
                    password === "" ||
                    passwordbis === ""
                  )
                    alert("Merci de remplir tous les champs");
                  else if (password !== passwordbis)
                    alert("merci de reconfirmer votre mot de passe");
                  else {
                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/sign_up",
                      {
                        email,
                        username,
                        name,
                        password,
                        description,
                      }
                    );

                    if (response.data.token) {
                      handleToken(response.data.token);
                      handleId(response.data.id);
                      //redirige vers home automatiquement avec handle qui setUserToken ensuite
                    }
                  }
                }}
              >
                <Text style={{ color: colors.bgColor, fontSize: 30 }}>
                  S'inscrire
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              >
                <Text style={styles.underlinedLink}>
                  Déjà un compte ? Se connecter
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  home: { justifyContent: "center", alignItems: "center", height: 300 },
  form: {
    color: colors.fade,
    height: 35,
    fontSize: 22,
    padding: 5,
  },
  borderBottom: {
    borderBottomColor: colors.fade,
    borderBottomWidth: 2,
    marginBottom: 20,
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
    marginBottom: 15,
  },
  underlinedLink: {
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FFFFFF",
    fontSize: 16,
    marginBottom: 30,
  },
  frame: {
    borderColor: colors.fade,
    borderWidth: 2,
    marginTop: 15,
    marginBottom: 10,
    height: 130,
  },
});
