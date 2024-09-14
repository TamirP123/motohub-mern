import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NavbarComponent from "./components/NavbarComponent";
import Footer from "./components/Footer";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <NavbarComponent />
        <div className="main-content">
          <Outlet />
        </div>
        <Footer />
        <ScrollRestoration />
      </div>
    </ApolloProvider>
  );
}

export default App;
