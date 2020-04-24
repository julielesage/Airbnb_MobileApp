<p align="center">
	<img
			width="250"
			alt="Airbnb Clone - React Native"
			src="https://static.hitek.fr/img/actualite/tumblr-n8uz1rab0s1tho45lo1-1280.gif"><br>
		*kidding :)
</p>

<h3 align="center">
	Airbnb Clone - React Native
</h3>

## Overview

<div align="center">
<img
		alt="Airbnb Clone - React Native"
		src="preview/airbnb_myapp 1.gif">
</div>

**Quite complete app with API data scrolling, geolocation, user profile and image upload.**
5 screens are availables : Sing In, Sign Up, HomeScreen, Room, Around Me and Profile.
You'll find some components like Card Component to pass props and variant.
No frameworks UI like Bootstrap or Material UI are used.

More features might be added to the project in the future.

This project was done during Le Reacteur bootcamp in Paris.

## Screenshots

<img
		alt="Airbnb Clone - React Native / Home"
		src="preview/home.png" width="200">
		<img
		alt="Airbnb Clone - React Native / Room"
		src="preview/room.png" width="200">
		<img
		alt="Airbnb Clone - React Native / AroundMe"
		src="preview/aroundme.png" width="200">
		<img
		alt="Airbnb Clone - React Native / SignUp"
		src="preview/signup.png" width="200">
		<img
		alt="Airbnb Clone - React Native / LogIn"
		src="preview/login.png" width="200">
		<img
		alt="Airbnb Clone - React Native"
		src="preview/profile.png" width="200">
		
## Packages

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Expo permissions](https://docs.expo.io/versions/v37.0.0/sdk/permissions/)
- [Axios](https://github.com/axios/axios)
- [Expo Location](https://docs.expo.io/versions/latest/sdk/location/)


## Installation and usage

Be sure, you have installed all dependencies and applications to run React Native project on your computer : [Getting Started with React Native](https://facebook.github.io/react-native/docs/getting-started).

This project works fine for iOS and Android. working on UI design progress.

### Running the project

Clone this repository :

```
git clone https://github.com/julielesage/Airbnb_MobileApp.git
cd Airbnb_MobileApp
```

Install packages :

```
npm install
```

When installation is complete, run with version of your choice :

```bash
react-native run-ios
# or
react-native run-android
```

## Props

### User

| Name       | Type   | Required | Description      | Example                |
| ---------- | ------ | -------- | ---------------- | ---------------------- |
| `image`    | string | Yes      | Picture of user. | `image="https://..."`  |
| `name`     | string | Yes      | Name of user.    | `name="John Doe"`      |
| `email`    | string | Yes      | user email.      | 'email="dran@ugh.com"' |
| `password` | string | Yes      | user password.   | `password="true43"'    |
| `id`       | string | Yes      | user id          |
| 'token'    | string | Yes      |

### Room to rent

| Name          | Type   | Required | Description       | Example               |
| ------------- | ------ | -------- | ----------------- | --------------------- |
| `photos`      | array  | Yes      | Pictures of room. | `image="https://..."` |
| `title`       | string | Yes      | Title of room.    | `name="John Doe"`     |
| `description` | string | Yes      | Room description. | `'                    |

## Star, Fork, Clone & Contribute

Feel free to contribute on this repository. If my work helps you, please give me back with a star. This means a lot to me and keeps me going!

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>

  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->
