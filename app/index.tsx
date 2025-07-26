import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EmployeeInformation from "./EmployeeInformation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function Index() {
  const [currentScreen, setCurrentScreen] = useState("home");

  const renderContent = () => {
    switch (currentScreen) {
      case "employee":
        return <EmployeeInformation />;
      case "signup":
        return <SignUp onNavigate={setCurrentScreen} />;
      case "signin":
        return <SignIn onNavigate={setCurrentScreen} />;
      default:
        return (
          <View style={styles.homeContainer}>
            <Text style={styles.homeTitle}>Welcome to the App</Text>
            <Text style={styles.homeSubtitle}>Choose an option below</Text>

            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen("employee")}>
              <MaterialIcons name="person" size={24} color="white" />
              <Text style={styles.navButtonText}>Employee Information</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen("signup")}>
              <MaterialIcons name="person-add" size={24} color="white" />
              <Text style={styles.navButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navButton} onPress={() => setCurrentScreen("signin")}>
              <MaterialIcons name="login" size={24} color="white" />
              <Text style={styles.navButtonText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };
  //test if key works correct
  /*console.log(
    "API Key from ENV:" + process.env.EXPO_PUBLIC_API_KEY,
    "\nAUTH_DOMAIN:" + process.env.EXPO_PUBLIC_AUTH_DOMAIN
  );*/
  return (
    <View style={styles.container}>
      {currentScreen !== "home" && (
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen("home")}>
            <MaterialIcons name="arrow-back" size={24} color="#4287f5" />
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.content}>{renderContent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#4287f5",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeContainer: {
    alignItems: "center",
    padding: 20,
  },
  homeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  homeSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4287f5",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 15,
    width: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
});
