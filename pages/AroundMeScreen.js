import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Platform } from "react-native";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

// expo install react-native-maps
import MapView, { PROVIDER_GOOGLE, Callout } from "react-native-maps";
// expo install expo-permissions
import * as Permissions from "expo-permissions";
// expo install expo-location
import * as Location from "expo-location";

// to detect if device or simulator : expo install expo-constants
import Constants from "expo-constants";

const AroundMeScreen = () => {
  //   STATES

  const [location, setLocation] = useState({});
  const [loadingPosition, setLoadingPosition] = useState(true);
  const [loadingRoomsPosition, setLoadingRoomsPosition] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomsAround, setRoomsAround] = useState();

  const navigation = useNavigation();

  // useCallback pour améliorer les performances du composant en déclarant la fonction une seule fois, on peut aussi la metre dans useEffect

  const getLocationAsync = useCallback(async () => {
    // Demander la permission d'accéder aux coordonnées GPS
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      setErrorMessage("Permission refusée");
    } else {
      const location = await Location.getCurrentPositionAsync({});

      // un setLatitude et setLongitude sera trop long : autant mettre la location directement
      // setLatitude(location.coords.latitude);
      // setLongitude(location.coords.longitude);
      setLocation(location);
      setLoadingPosition(false);

      //appel de l'API

      // ***********************************************
      //1//version fetch

      // const response = await fetch(
      //   `https://airbnb-api.herokuapp.com/api/room/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
      // );
      // const json = await response.json();
      // setRoomsAround(json);
      // ***********************************************

      //2//version axios
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
      );

      setRoomsAround(response.data);

      setLoadingRoomsPosition(false);
    }
  });

  // ask geolocation permission and upload locations from API once

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      alert(
        "La geolocalisation ne fonctionne pas sur le simulateur Android, tu peux tester sur ton device"
      );
    } else getLocationAsync();
  }, []);

  // display

  return (
    <>
      {loadingPosition === false && loadingRoomsPosition === false ? (
        <View style={{ flex: 1 }}>
          <MapView
            // si Google, besoin d'utiliser une clef enregistrée avant de mettre l'appli en production
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={{ flex: 1 }}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.1,
              longitudeDelta: 0.1,
            }}
          >
            {roomsAround.map((room, i) => {
              return (
                <MapView.Marker
                  key={room._id}
                  coordinate={{
                    latitude: room.loc[1],
                    longitude: room.loc[0],
                  }}
                  title={room.title}
                  description={room.description}
                >
                  <Callout
                    onPress={() => {
                      navigation.navigate("Room", { itemId: room._id });
                    }}
                  >
                    <Text>{room.title}</Text>
                    {/* <Text>Voir l'annonce</Text> */}
                  </Callout>
                </MapView.Marker>
              );
            })}
          </MapView>
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>We need your position for this application...</Text>
        </View>
      )}
    </>
  );
};

export default AroundMeScreen;
