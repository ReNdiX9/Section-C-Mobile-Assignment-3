import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";

const EmployeeInfoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  employeeId: Yup.string().required("Id is required"),
  birthdate: Yup.string()
    .required("Birthdate is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in format YYYY-MM-DD")
    .test("is-valid-date", "Birthdate is not a valid date", (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime()) && value === date.toISOString().slice(0, 10);
    })
    .test("is-18", "You must be at least 18 years", (value) => {
      if (!value) return false;
      const now = new Date();
      const min = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
      return new Date(value) <= min;
    }),
  email: Yup.string()
    .email("Invalid email")
    .matches(/^(?!.*@[^,]*,)/)
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
});

const EmployeeInformation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Employee Information</Text>
      <Formik
        initialValues={{
          name: "",
          employeeId: "",
          birthdate: "",
          email: "",
          phone: "",
        }}
        validationSchema={EmployeeInfoSchema}
        onSubmit={(values, { resetForm }) => {
          console.dir(JSON.stringify(values, null, 2));
          alert("Submitted");
          resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {/* Name */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
            </View>
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            {/* Employee ID */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="badge" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Employee ID"
                onChangeText={handleChange("employeeId")}
                onBlur={handleBlur("employeeId")}
                value={values.employeeId}
              />
            </View>
            {touched.employeeId && errors.employeeId && <Text style={styles.error}>{errors.employeeId}</Text>}

            {/* Birth Date */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="calendar-today" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                onChangeText={handleChange("birthdate")}
                onBlur={handleBlur("birthdate")}
                value={values.birthdate}
                keyboardType="numeric"
              />
            </View>
            {touched.birthdate && errors.birthdate && <Text style={styles.error}>{errors.birthdate}</Text>}

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
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Phone */}
            <View style={styles.inputContainer}>
              <MaterialIcons name="phone" size={20} color="gray" />
              <TextInput
                style={styles.input}
                placeholder="Phone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
                keyboardType="phone-pad"
              />
            </View>
            {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
            <View style={{ alignItems: "center", marginTop: 12 }}>
              <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
                Submit
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default EmployeeInformation;

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
    color: "white",
    fontWeight: 600,
    fontSize: 16,
    textAlign: "center",
  },
});
