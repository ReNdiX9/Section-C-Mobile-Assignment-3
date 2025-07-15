import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = ({ onNavigate }: { onNavigate: (screen: string) => void }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={SignInSchema}
        onSubmit={(values, { resetForm }) => {
          console.dir(JSON.stringify(values, null, 2));
          alert("Sign in successful!");
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {/* Email */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Password */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <MaterialIcons 
                  name={showPassword ? "visibility" : "visibility-off"} 
                  size={20} 
                  color="gray" 
                />
              </TouchableOpacity>
            </View>
            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

            <View style={{ alignItems: "center", marginTop: 12 }}>
              <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                <Text style={styles.btnText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => onNavigate("signup")}>
                <Text style={styles.link}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: 400,
    padding: 24,
    backgroundColor: "#fff",
    justifyContent: "center",
    maxWidth: 400,
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    position: "relative",
  },
  input: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    borderWidth: 0,
    borderColor: "transparent",
    outlineWidth: 0,
    backgroundColor: "transparent",
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    padding: 5,
  },
  error: {
    color: "red",
    marginBottom: 8,
    marginLeft: 28,
    fontStyle: "italic",
  },
  btn: {
    backgroundColor: "#4287f5",
    width: "50%",
    paddingBlock: 8,
    paddingInline: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  linkText: {
    color: "gray",
    fontSize: 14,
  },
  link: {
    color: "#4287f5",
    fontSize: 14,
    fontWeight: "600",
  },
});
