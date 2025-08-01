import { MaterialIcons } from "@expo/vector-icons";
import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
import { auth, db } from "../firebaseConfig";

type Employee = {
  id: string;
  name: string;
  employeeId: string;
  birthdate: string;
  email: string;
  phone: string;
};

const EmployeeInfoSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  employeeId: Yup.string().required("Id is required"),
  birthdate: Yup.string()
    .required("Birthdate is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Birthdate must be in format YYYY-MM-DD"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),
});

const EmployeeInformation = ({ onLogout }: { onLogout: () => void }) => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showData, setShowData] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [userSignedIn, setUserSignedIn] = useState(!!auth.currentUser);

  const fetchEmployee = async () => {
    if (!auth.currentUser) return;
    const q = query(collection(db, "employees"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docData = querySnapshot.docs[0];
      setEmployee({ id: docData.id, ...(docData.data() as Omit<Employee, "id">) });
      setShowForm(false);
    } else {
      setEmployee(null);
      setShowForm(true);
    }
  };

  useEffect(() => {
    setUserSignedIn(!!auth.currentUser);
    if (auth.currentUser) {
      fetchEmployee();
    }
  }, []);

  const handleSubmitData = async (values: any, resetForm: () => void) => {
    if (!auth.currentUser) {
      alert("You must be signed in");
      return;
    }

    try {
      if (employee) {
        await setDoc(doc(db, "employees", employee.id), {
          uid: auth.currentUser.uid,
          ...values,
          updatedAt: serverTimestamp(),
        });
        alert("Employee info updated!");
      } else {
        await addDoc(collection(db, "employees"), {
          uid: auth.currentUser.uid,
          ...values,
          createdAt: serverTimestamp(),
        });
        alert("Employee info saved!");
      }
      resetForm();
      setEditMode(false);
      fetchEmployee();
    } catch (error) {
      console.error("Error saving employee info: ", error);
    }
  };

  if (!userSignedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Please Sign In to view Employee Info</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Employee Information</Text>

        {!showForm && employee && !editMode && (
          <>
            <TouchableOpacity onPress={() => setShowData(!showData)}>
              <Text style={styles.showButton}>{showData ? "Hide Data" : "Show Data"}</Text>
            </TouchableOpacity>

            {showData && (
              <View style={{ marginTop: 10 }}>
                <Text>Name: {employee.name}</Text>
                <Text>Employee ID: {employee.employeeId}</Text>
                <Text>Email: {employee.email}</Text>
                <Text>Phone: {employee.phone}</Text>
                <Text>Birthdate: {employee.birthdate}</Text>
              </View>
            )}

            <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={styles.btn} onPress={() => setEditMode(true)}>
                <Text style={{ color: "white", fontWeight: "600" }}>Update Data</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {/*  Logout button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        {(showForm || editMode) && (
          <Formik
            initialValues={{
              name: employee?.name || "",
              employeeId: employee?.employeeId || "",
              birthdate: employee?.birthdate || "",
              email: employee?.email || "",
              phone: employee?.phone || "",
            }}
            validationSchema={EmployeeInfoSchema}
            onSubmit={(values, { resetForm }) => handleSubmitData(values, resetForm)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <>
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

                <View style={styles.inputContainer}>
                  <MaterialIcons name="calendar-today" size={20} color="gray" />
                  <TextInput
                    style={styles.input}
                    placeholder="YYYY-MM-DD"
                    onChangeText={handleChange("birthdate")}
                    onBlur={handleBlur("birthdate")}
                    value={values.birthdate}
                  />
                </View>
                {touched.birthdate && errors.birthdate && <Text style={styles.error}>{errors.birthdate}</Text>}

                <View style={styles.inputContainer}>
                  <MaterialIcons name="email" size={20} color="gray" />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

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
                    <Text style={{ color: "white", fontWeight: "600" }}>{employee ? "Update" : "Submit"}</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        )}
      </View>
    </ScrollView>
  );
};

export default EmployeeInformation;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
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
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },
  showButton: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
  },
  logoutBtn: {
    marginTop: 10,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 6,
  },
});
