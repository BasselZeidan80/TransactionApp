import React from "react";
import Home from "./Components/Home/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const myClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={myClient}>
        <Home />
      </QueryClientProvider>
    </>
  );
}
