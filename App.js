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
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import colors from "./colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userId, setUserId] = useState(null);

  //handleId et handleToken for LogIn (if)/LogOut(else), these functions are operated in SignUp, SignIn and Profile Screens.

  const handleToken = async (token) => {
    if (token) {
      AsyncStorage.setItem("userToken", token);
    } else {
      AsyncStorage.removeItem("userToken");
    }

    setUserToken(token);
  };

  const handleId = async (id) => {
    if (id) {
      AsyncStorage.setItem("userId", id);
    } else {
      AsyncStorage.removeItem("userId");
    }
    setUserId(id);
  };

  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    //Bootstrapp = amorcer in (FR)
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

  // ActionSheetProvider pour encadrer l'ecran dans App.js, useActionSheet dans le screen a propos, installer -> yarn add @expo/react-native-action-sheet

  return (
    <ActionSheetProvider>
      <NavigationContainer>
        {isLoading ? null : userToken === null ? ( // We haven't finished checking for the token yet
          // No token found, user isn't signed in
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              options={{ header: () => null, animationEnabled: false }}
            >
              {() => (
                <SignInScreen handleToken={handleToken} handleId={handleId} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="SignUp"
              options={{ header: () => null, animationEnabled: false }}
            >
              {() => (
                <SignUpScreen handleToken={handleToken} handleId={handleId} />
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
                      paddingTop: 10,
                      // margin: 0,
                      // paddingBottom: 20
                    },
                  }}
                >
                  <Tab.Screen
                    name="Home"
                    options={{
                      tabBarLabel: "Home",

                      tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                        // <Ionicons name={"ios-home"} size={size} color={color} />
                      ),
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
                              backgroundColor: colors.bgColor,
                            },
                            headerTitleStyle: { color: "white" },
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
                            animationEnabled: true,
                          }}
                        >
                          {(props) => (
                            <RoomScreen
                              setUserToken={setUserToken}
                              {...props}
                            />
                          )}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  {/* AROUND ME  */}

                  <Tab.Screen
                    name="Aroundme"
                    options={{
                      tabBarLabel: "Around me",
                      tabBarIcon: ({ color, size }) => (
                        <EvilIcons name={"location"} size={30} color={color} />
                      ),
                    }}
                  >
                    {() => (
                      <Stack.Navigator>
                        <Stack.Screen
                          name="Around me"
                          options={{
                            title: "Around me",
                            tabBarLabel: "Around me",
                            headerStyle: { backgroundColor: colors.bgColor },
                            headerTitleStyle: { color: "white" },
                          }}
                        >
                          {() => <AroundMeScreen setUserToken={setUserToken} />}
                        </Stack.Screen>
                      </Stack.Navigator>
                    )}
                  </Tab.Screen>

                  {/* PROFILE  */}

                  <Tab.Screen
                    name="Profile"
                    options={{
                      tabBarLabel: "Profile",
                      tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={size} color={color} />
                      ),
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
                            animationEnabled: true,
                          }}
                        >
                          {() => (
                            <ProfileScreen
                              handleToken={handleToken}
                              handleId={handleId}
                            />
                          )}
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
    </ActionSheetProvider>
  );
}
