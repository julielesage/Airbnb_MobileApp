import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import HomeScreen from "./containers/HomeScreen";
import ProfileScreen from "./containers/ProfileScreen";
import SignInScreen from "./containers/SignInScreen";
import SignUpScreen from "./containers/SignUpScreen";
import OfferScreen from "./containers/OfferScreen";
import colors from "./colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  const setToken = async token => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
    };

    bootstrapAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
        // No token found, user isn't signed in
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignInScreen setToken={setToken} />}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => <SignUpScreen setToken={setToken} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        // User is signed in
        <Stack.Navigator>
          <Stack.Screen
            name="Tab"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <Tab.Navigator
                // navigationBottom style global
                tabBarOptions={{
                  activeTintColor: "#000000",
                  inactiveTintColor: "white",
                  labelStyle: { fontSize: 12 },
                  style: {
                    backgroundColor: colors.bgColor,
                    paddingTop: 10,
                    margin: 0,
                    paddingBottom: 20
                  }
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Home",

                    tabBarIcon: ({ color, size }) => (
                      <AntDesign
                        name="home"
                        size={size}
                        color={color}
                        style={{ marginBottom: 5 }}
                      />
                      // <Ionicons name={"ios-home"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      {/* HOME */}

                      <Stack.Screen
                        name="Home"
                        options={{
                          title: "MonAirbnb",
                          tabBarLabel: "Home",
                          headerStyle: { backgroundColor: colors.bgColor },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      {/* OFFER */}

                      <Stack.Screen
                        name="Offer"
                        options={{
                          title: "Room",
                          headerStyle: { backgroundColor: colors.bgColor },
                          headerTitleStyle: { color: "white" },
                          animationEnabled: true
                        }}
                      >
                        {props => (
                          <OfferScreen setToken={setToken} {...props} />
                        )}
                      </Stack.Screen>

                      {/* PROFILE */}

                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "User Profile",
                          tabBarLabel: "Profile"
                        }}
                      >
                        {() => <ProfileScreen />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Aroundme"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <EvilIcons name={"location"} size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Settings"
                        options={{ title: "Settings", tabBarLabel: "Settings" }}
                      >
                        {() => <SettingsScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Profile"
                  options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                      <Feather name="user" size={size} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Profile"
                        options={{
                          title: "Profile",
                          tabBarLabel: "Profile",
                          headerStyle: { backgroundColor: colors.bgColor },
                          headerTitleStyle: { color: "white" },
                          animationEnabled: true
                        }}
                      >
                        {() => <ProfileScreen setToken={setToken} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
              // fin de la barre de navigation bottom
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
