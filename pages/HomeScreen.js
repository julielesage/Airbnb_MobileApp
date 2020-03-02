import React, { useEffect, useState } from "react";
import { useNavigation, StackActions } from "@react-navigation/core";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import colors from "../colors";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";

import RoomCard from "../components/RoomCard";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setTab(response.data.rooms);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        width: "100%"
      }}
    >
      {isLoading === true ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 20, color: colors.bgColor }}
        />
      ) : (
        <View
          style={{
            backgroundColor: "white",
            flex: 1,
            width: "100%",
            paddingHorizontal: 20
          }}
          contentContainerStyle={{
            flex: 1,
            backgroundColor: "white"
          }}
        >
          <View style={{ flex: 1, width: "100%" }}>
            <FlatList
              data={tab}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Offer", { itemId: item._id });
                    }}
                  >
                    <RoomCard {...item} key={item._id} />
                  </TouchableOpacity>
                );
              }}
              // pas besoin de key si keyExtractor
              keyExtractor={item => {
                return String(item._id);
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}
