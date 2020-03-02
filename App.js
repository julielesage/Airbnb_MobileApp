import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign, EvilIcons, Feather } from "@expo/vector-icons";
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SignInScreen from "./pages/SignInScreen";
import SignUpScreen from "./pages/SignUpScreen";
import RoomScreen from "./pages/RoomScreen";
import AroundMeScreen from "./pages/AroundMeScreen";
import colors from "./colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleToken = async userToken => {
    if (userToken) {
      AsyncStorage.setItem("userToken", userToken);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(userToken);
  };

  const handleId = async userId => {
    if (userId) {
      AsyncStorage.setItem("userId", userId);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(userId);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      // We should also handle error for production apps
      const userToken = await AsyncStorage.getItem("userToken");
      const userId = await AsyncStorage.getItem("userId");

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      setIsLoading(false);
      setUserToken(userToken);
      setUserId(userId);
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
            {() => (
              <SignInScreen setUserToken={setUserToken} setUserId={setUserId} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="SignUp"
            options={{ header: () => null, animationEnabled: false }}
          >
            {() => (
              <SignUpScreen setUserToken={setUserToken} setUserId={setUserId} />
            )}
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
                    paddingTop: 10
                    // margin: 0,
                    // paddingBottom: 20
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
                          headerStyle: {
                            backgroundColor: colors.bgColor
                          },
                          headerTitleStyle: { color: "white" }
                        }}
                      >
                        {() => <HomeScreen />}
                      </Stack.Screen>

                      {/* OFFER */}

                      <Stack.Screen
                        name="Room"
                        options={{
                          title: "Room",
                          headerStyle: { backgroundColor: colors.bgColor },
                          headerTitleStyle: { color: "white" },
                          // pour changer le backbutton de couleur :
                          headerTintColor: "black",
                          animationEnabled: true
                        }}
                      >
                        {props => (
                          <RoomScreen setUserToken={setUserToken} {...props} />
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
                        {() => (
                          <ProfileScreen
                            userToken={userToken}
                            userid={useriId}
                            setUserToken={setUserToken}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Aroundme"
                  options={{
                    tabBarLabel: "Around me",
                    tabBarIcon: ({ color, size }) => (
                      <EvilIcons name={"location"} size={30} color={color} />
                    )
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Around me"
                        options={{
                          title: "Around me",
                          tabBarLabel: "Around me"
                        }}
                      >
                        {() => <AroundMeScreen setUserToken={setUserToken} />}
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
                        {() => <ProfileScreen setUserToken={setUserToken} />}
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
