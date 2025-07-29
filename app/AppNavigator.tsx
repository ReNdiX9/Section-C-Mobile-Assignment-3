import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebaseConfig";
import EmployeeInformation from "./EmployeeInformation";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AppNavigator() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [authScreen, setAuthScreen] = useState<"signin" | "signup" | "home">("home");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setAuthScreen("home");
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4287f5" />
      </View>
    );
  }

  //  If logged in -  Employee Info
  if (user) {
    return <EmployeeInformation onLogout={handleLogout} />;
  }

  //  If on home screen
  if (authScreen === "home") {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Welcome to the App</Text>
        <TouchableOpacity style={styles.startBtn} onPress={() => setAuthScreen("signin")}>
          <Text style={styles.btnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //  Show SignIn / SignUp
  return authScreen === "signin" ? (
    <SignIn onNavigate={(screen) => setAuthScreen(screen as any)} />
  ) : (
    <SignUp onNavigate={(screen) => setAuthScreen(screen as any)} />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  startBtn: {
    backgroundColor: "#4287f5",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
