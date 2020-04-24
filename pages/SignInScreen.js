import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import colors from "../colors.js";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { setLightEstimationEnabled } from "expo/build/AR";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignInScreen({ handleToken, handleId }) {
  const navigation = useNavigation();

  //STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //SUBMIT
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "https://express-airbnb-api.herokuapp.com/user/log_in",
        {
          email: email,
          password: password,
        }
      );

      if (response.data.token) {
        handleToken(response.data.token);
        //id registering for profile screen
        handleId(response.data.id);
      } else {
        alert("Une erreur est survenue, veuillez réessayer");
      }

      //ceci est fait dans App.js qui se rafraichit avec le token et setId : la redirection et l'asyncStorage
    } catch (e) {
      alert("Une erreur est survenue");
    }
  };

  return (
    //pas besoin de SafeAreaView si Navigation
    <KeyboardAwareScrollView
      extraScrollHeight={140}
      contentContainerStyle={styles.container}
    >
      {/* pour des icones de statut blancs (batterie, wifi, etc) */}
      <StatusBar barStyle="light-content" />

      {/* home logo */}
      <View style={styles.home}>
        <FontAwesome name="home" size={150} color="white" />
      </View>

      {/* form */}

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
          onChangeText={(text) => {
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
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
      </View>

      {/* button */}
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={{ color: colors.bgColor, fontSize: 30 }}>
            Se connecter
          </Text>
        </TouchableOpacity>
      </View>

      {/* pas de compte ? */}
      <View>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.underlinedLink}>Pas de compte ? S'incrire</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgColor,
  },
  home: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 30,
  },
  form: {
    color: "white",
    height: 44,
    fontSize: 30,
  },
  borderBottom: {
    borderBottomColor: colors.fade,
    borderBottomWidth: 2,
    marginBottom: 30,
    marginHorizontal: 20,
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
    marginBottom: 20,
  },
  underlinedLink: {
    color: "white",
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#FFFFFF",
    fontSize: 16,
    marginBottom: 40,
  },
});
