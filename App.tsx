import "@expo/metro-runtime"
import React from "react"
import * as SplashScreen from "expo-splash-screen"
import App from "./src/app"

SplashScreen.preventAutoHideAsync()

function MainApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

export default MainApp
