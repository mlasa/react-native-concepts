import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

export default function App() {
  const [projects, setProjects] = useState([]);

  async function handleAddProject() {
    const response = await api.post('/projects', {
      title: `Pro${Math.floor(Math.random() * 50)}`,
      owner: 'Marcella'
    })
    setProjects([...projects,response.data])
  }

  useEffect(() => {
    api.get("/projects").then((response) => {
      console.log(response.data);
      setProjects(response.data);
    });
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#258BDF" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item }) => (
            <Text style={styles.project}>{item.title+' - '+item.owner}</Text>
          )}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddProject}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#258BDF",
  },
  project: {
    color: "#fff",
    fontSize: 20,
  },
  button: {
    backgroundColor: "#fff",
    margin: 20,
    height: 50,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
