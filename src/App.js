import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import Cookies from "js-cookie";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Character from "./pages/Character";
import Comics from "./pages/Comics";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart);

function App() {
  const [searchCharacter, setSearchCharacter] = useState("");
  const [searchComics, setSearchComics] = useState("");
  const [username, setUsername] = useState(Cookies.get("username") || "");
  const [token, setToken] = useState(Cookies.get("token") || null);
  const setUserToken = (possibleToken, possibleUsername) => {
    if (possibleToken === null) {
      Cookies.remove("token");
      Cookies.remove("username");
      setToken(null);
      setUsername(null);
    } else {
      Cookies.set("token", possibleToken, { expires: 5 });
      Cookies.set("username", possibleUsername, {
        expires: 5,
      });
      setToken(possibleToken);
      setUsername(possibleUsername);
    }
  };

  return (
    <>
      <Router>
        <div className="app">
          <div className="container">
            <Header
              setSearchCharacter={setSearchCharacter}
              setSearchComics={setSearchComics}
              token={token}
              username={username}
              setUserToken={setUserToken}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    searchCharacter={searchCharacter}
                    setSearchCharacter={setSearchCharacter}
                    token={token}
                  />
                }
              />

              <Route
                path="/login"
                element={<Login setUserToken={setUserToken} token={token} />}
              />
              <Route
                path="/signup"
                element={<Signup setUserToken={setUserToken} token={token} />}
              />
              <Route
                path="/comics"
                element={
                  <Comics
                    searchComics={searchComics}
                    setSearchComics={setSearchComics}
                    token={token}
                  />
                }
              />
              <Route path="/favorites" element={<Favorites token={token} />} />
              <Route path="/character/:characterId" element={<Character />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
