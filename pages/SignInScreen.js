import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import colors from "../colors.js";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setLightEstimationEnabled } from "expo/build/AR";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ setUserToken, setUserId }) {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    //pas besoin de SafeAreaView si Navigation
    <View style={{ backgroundColor: colors.bgColor, flex: 1 }}>
      <StatusBar barStyle="light-content" />

      {/* home logo */}
      <View style={styles.home}>
        <FontAwesome name="home" size={150} color="white" />
      </View>

      {/* form */}
      <KeyboardAwareScrollView>
        <View style={styles.borderBottom}>
          <TextInput
            placeholder="email"
            value={email}
            placeholderTextColor={colors.fade}
            autoCapitalize="none"
            style={styles.form}
            // possibilité de faire un style pour la ligne du dessous ici :
            // style={{marginTop: 20,
            // borderBottomColor: "white",
            // borderBottomWidth: 1}}
            onChangeText={text => {
              setEmail(text);
            }}
          />
        </View>
        <View style={styles.borderBottom}>
          <TextInput
            placeholder="password"
            value={password}
            placeholderTextColor={colors.fade}
            style={styles.form}
            secureTextEntry={true}
            onChangeText={text => {
              setPassword(text);
            }}
          />
        </View>

        {/* button */}
        <View style={{ alignItems: "center" }}>
          {isLoading === true ? (
            // GIF de chargement
            <ActivityIndicator
              size="large"
              color="white"
              style={{ marginTop: 20 }}
            />
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                setIsLoading(true);
                try {
                  const response = await axios.post(
                    "https://express-airbnb-api.herokuapp.com/user/log_in",
                    {
                      email: email,
                      password: password
                    }
                  );

                  setIsLoading(false);

                  if (response.data.token) {
                    const userToken = response.data.token;
                    setUserToken(userToken);
                    //enregistrement de l'id pour le screen profile
                    setUserId(response.data.id);
                  }

                  //ceci est fait dans App.js qui se rafraichit avec le token et setId
                  // await AsyncStorage.setItem("userToken", userToken);

                  // pas besoin puisque ca rafraichit applicationCache.js qui a maintenant un token et gere la navigation
                  // navigation.navigate("Home", { userToken: userToken });
                } catch (e) {
                  alert("an error accured");
                }
              }}
            >
              <Text style={{ color: colors.bgColor, fontSize: 30 }}>
                Se connecter
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* pas de compte ? */}
        <View>
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.underlinedLink}>Pas de compte ? S'incrire</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  home: { justifyContent: "center", alignItems: "center", flex: 1 },
  form: {
    color: "white",
    height: 44,
    fontSize: 30
  },
  borderBottom: {
    borderBottomColor: colors.fade,
    borderBottomWidth: 2,
    marginBottom: 50,
    marginHorizontal: 20
  },
  button: {
    borderRadius: 35,
    backgroundColor: "white",
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    marginHorizontal: "auto",
    marginTop: 50,
    marginBottom: 20
  },
  underlinedLink: {
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FFFFFF",
    fontSize: 16,
    marginHorizontal: "auto"
  }
});
