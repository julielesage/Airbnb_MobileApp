import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
  //ImageBackground
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import colors from "../colors";
import axios from "axios";
//import Swiper from "react-native-swiper"; non ne fonctionne pas sur Android

//pour un slider Android
import ViewPager from "@react-native-community/viewpager";

const Room = ({ route, navigation }) => {
  //   recupération bdd de l'id
  const { itemId } = route.params;

  //on aurait pu faire également :
  // import { useRoute } from "@react-navigation/core";
  // const {params} = useRoute();
  // puis utiliser params.id

  //STATES
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const stars = [];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room/" + itemId
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [itemId]);

  //autre facon de faire les étoiles de ratingValue plus simple que dans RoomCard :

  for (let i = 0; i < 5; i++) {
    if (i < data.ratingValue) {
      stars.push(<FontAwesome key={i} name="star" color="gold" size={30} />);
    } else {
      stars.push(<FontAwesome key={i} name="star" color="grey" size={30} />);
    }
  }

  return (
    // si ImageBackground, pas de style sur la view parent !!!!!
    <>
      {isLoading === true ? (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator
            size="large"
            color={colors.bgColor}
            style={{ marginTop: 20 }}
          />
        </View>
      ) : (
        <ScrollView>
          {/* **************************************** */}
          {/* autre facon de gérer l'absolute/relative : l'image background */}

          {/* <ImageBackground
            style={{ width: "100%", height: 300 }}
            source={{ uri: data.photos[0] }}
          >
            <View style={styles.darkVignet}>
              <Text style={{ fontSize: 26, color: "white" }}>{data.price}</Text>
            </View>
          </ImageBackground> */}
          {/* ************************************** */}

          {/* mais compliqué pour swiper */}
          <View style={{ width: "100%", height: 250 }}>
            {/* <Swiper> only works on iOS => change to ViewPager, or Caroussel */}
            <ViewPager style={{ width: "100%", height: 250 }} initialPage={0}>
              {data.photos.map((uri, i) => {
                return (
                  <Image
                    key={i}
                    source={{ uri: uri }}
                    style={{ height: 250, position: "relative" }}
                  />
                );
              })}
            </ViewPager>
            {/* </Swiper> */}
            <Text style={styles.price}>{data.price} €</Text>
          </View>

          {/* detail */}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginTop: 20,
              height: 90,
              justifyContent: "space-between",
            }}
          >
            {/* left part */}
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={1}>
                {data.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  height: 70,
                  marginBottom: 20,
                }}
              >
                {/* Beaucoup plus court que dans RoomCard : juste le tableau ! */}
                <View style={{ width: 170, flexDirection: "row" }}>
                  {stars}
                </View>

                <Text style={{ color: "#BBBBBB", fontSize: 20 }}>
                  {data.reviews} avis
                </Text>
              </View>
            </View>

            {/* right part round portrait */}
            <View style={styles.round}>
              <Image
                style={styles.portrait}
                source={{ uri: data.user.account.photos[0] }}
              />
            </View>
          </View>

          {/* DESCRIPTION */}

          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            <TouchableWithoutFeedback onPress={() => setViewMore(!viewMore)}>
              <Text
                style={{ fontSize: 20, lineHeight: 30 }}
                //le texte se déroule au toucher:
                numberOfLines={viewMore ? null : 4}
              >
                {data.description}
              </Text>
            </TouchableWithoutFeedback>
          </View>

          {/* LOCATION */}

          <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 5 }}>
            <MapView
              //map fixe:
              scrollEnabled={false}
              provider={PROVIDER_GOOGLE}
              style={{ width: "100%", height: 200 }}
              initialRegion={{
                latitude: 48.856614,
                longitude: 2.3522219,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              }}
            >
              <MapView.Marker
                title={data.title}
                description={data.description}
                coordinate={{ latitude: data.loc[1], longitude: data.loc[0] }}
              />
            </MapView>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  darkVignet: {
    position: "absolute",
    bottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 15,
  },
  title: {
    fontSize: 20,
    lineHeight: 40,
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
  price: {
    fontSize: 26,
    fontWeight: "200",
    color: "white",
    backgroundColor: "#000000",
    padding: 8,
    position: "absolute",
    bottom: 20,
  },
});

export default Room;
