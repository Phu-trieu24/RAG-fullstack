import React from "react";
import Chat from "./components/Chat";
import "./App.css"; // nếu muốn style cơ bản

function App() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>RAG Chat Demo</h1>
      <Chat />
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  header: {
    textAlign: "center",
    marginBottom: "1rem",
  },
};

export default App;
