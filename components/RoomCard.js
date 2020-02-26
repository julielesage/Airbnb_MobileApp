import React, { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Image,
  Text,
  TouchableHighlight,
  View
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RoomCard = ({ photos, title, price, user, ratingValue, reviews }) => {
  const yellowstars = [];
  const blankstars = 5 - ratingValue;

  for (let i = 0; i < ratingValue; i++) {
    yellowstars.push("x");
  }
  for (let i = 0; i < blankstars; i++) {
    yellowstars.push("o");
  }

  return (
    // <TouchableHighlight
    //   onPress={() => {
    //     navigation.navigate("room/-id");
    //   }}
    // >
    <View
      style={{
        borderBottomColor: "#BBBBBB",
        borderBottomWidth: 1,
        marginBottom: 20
      }}
    >
      <Image style={styles.picture} source={{ uri: photos[0] }} />
      <Text style={styles.price}>{price} €</Text>

      {/* detail */}
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          justifyContent: "space-between"
        }}
      >
        {/* partie gauche */}
        <View style={{ width: 300 }}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: 300,
              alignItems: "center",
              marginBottom: 20
            }}
          >
            <View style={{ width: 170, flexDirection: "row" }}>
              {yellowstars.map((star, i) => {
                return (
                  <>
                    {star === "x" ? (
                      <FontAwesome name="star" color="#FFB100" size={30} />
                    ) : (
                      <FontAwesome name="star" color="#BBBBBB" size={30} />
                    )}
                  </>
                );
              })}
            </View>

            <Text style={{ color: "#BBBBBB", fontSize: 20 }}>
              {reviews} avis
            </Text>
          </View>
        </View>

        {/* partie droite rond rouge */}
        <View style={styles.round}>
          <Image
            style={styles.portrait}
            source={{ uri: user.account.photos[0] }}
          />
        </View>
      </View>
    </View>
    // </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  picture: {
    position: "relative",
    width: "100%",
    height: 300
  },
  title: {
    fontSize: 20,
    lineHeight: 40
  },
  price: {
    fontSize: 26,
    fontWeight: "200",
    color: "white",
    backgroundColor: "#000000",
    padding: 8,
    position: "absolute",
    bottom: 120
  },
  round: {
    borderRadius: 35,
    backgroundColor: "red",
    width: 70,
    height: 70,
    marginLeft: 5
  },
  portrait: {
    width: "100%",
    resizeMode: "contain",
    height: "100%",
    borderRadius: 35
  }
});

export default RoomCard;