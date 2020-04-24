import React, { useEffect, useState, useReducer } from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const RoomCard = ({
  photos,
  title,
  price,
  user,
  ratingValue,
  reviews,
  _id,
}) => {
  const yellowstars = [];
  const blankstars = 5 - ratingValue;
  const navigation = useNavigation();

  for (let i = 0; i < ratingValue; i++) {
    yellowstars.push("x");
  }
  for (let i = 0; i < blankstars; i++) {
    yellowstars.push("o");
  }

  // Also possible to call a star component that render a star tab :

  // const renderStars = () => {
  //   let tab = [];
  //   for (let i = 1; i <= 5; i++) {
  //     if (i <= rating) {
  //       tab.push(
  //         <Ionicons
  //           key={i}
  //           name="ios-star"
  //           size={25}
  //           color="#F5B000"
  //           style={{ marginRight: 10 }}
  //         />
  //       );
  //     } else {
  //       tab.push(
  //         <Ionicons key={i} name="ios-star" size={25} color="#BBBBBB" />
  //       );
  //     }
  //   }
  //   return tab;
  // };
  // return <View style={styles.stars}>{renderStars()}</View>;

  return (
    <View
      style={{
        borderBottomColor: "#BBBBBB",
        borderBottomWidth: 1,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Room", { itemId: _id });
        }}
      >
        <Image style={styles.picture} source={{ uri: photos[0] }} />
      </TouchableOpacity>
      <Text style={styles.price}>{price} €</Text>

      {/* detail */}
      <View
        style={{
          flexDirection: "row",
          marginVertical: 5,
          justifyContent: "space-between",
        }}
      >
        {/* partie gauche */}
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Room", { itemId: _id });
            }}
          >
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              width: 300,
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <View style={{ width: 170, flexDirection: "row" }}>
              {yellowstars.map((star, i) => {
                return (
                  <View key={i}>
                    {star === "x" ? (
                      <FontAwesome name="star" color="#FFB100" size={30} />
                    ) : (
                      <FontAwesome name="star" color="#BBBBBB" size={30} />
                    )}
                  </View>
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
  );
};

const styles = StyleSheet.create({
  picture: {
    position: "relative",
    width: "100%",
    height: 300,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    lineHeight: 40,
  },
  price: {
    fontSize: 26,
    fontWeight: "200",
    color: "white",
    backgroundColor: "#000000",
    padding: 8,
    position: "absolute",
    bottom: 120,
  },
  round: {
    borderRadius: 35,
    width: 70,
    height: 70,
    marginLeft: 5,
  },
  portrait: {
    width: "100%",
    resizeMode: "contain",
    height: "100%",
    borderRadius: 35,
  },
});

export default RoomCard;
