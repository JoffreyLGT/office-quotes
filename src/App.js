import React from "react";
import "./App.css";
import "typeface-roboto";
import QuotesView from "./Components/QuotesView";
import { Header, Footer } from "./Components/Common";

function App() {
  return (
    <div className="App">
      <Header />
      <QuotesView />
      <Footer />
    </div>
  );
}

export default App;
