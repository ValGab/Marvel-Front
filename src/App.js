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
import { faHeart, faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import ScrollToTop from "./components/ScrollToTop";
library.add(faHeart, faBars, faXmark);

function App() {
  // Variable avec Cookies.get pour pouvoir JSON.parse
  const favoritesChar = Cookies.get("favorites-characters");
  const favoritesCom = Cookies.get("favorites-comics");
  const [searchCharacter, setSearchCharacter] = useState("");
  const [searchComics, setSearchComics] = useState("");
  const [username, setUsername] = useState(Cookies.get("username") || "");
  const [favoritesCharacters, setFavoritesCharacters] = useState(
    Cookies.get("favorites-characters") ? JSON.parse(favoritesChar) : []
  );
  const [favoritesComics, setFavoritesComics] = useState(
    Cookies.get("favorites-comics")
      ? favoritesCom !== undefined && JSON.parse(favoritesCom)
      : []
  );
  const [token, setToken] = useState(Cookies.get("token") || null);

  const setUserToken = (
    possibleToken,
    possibleUsername,
    possibleFavChar,
    possibleFavCom
  ) => {
    if (possibleToken === null) {
      Cookies.remove("token");
      Cookies.remove("username");
      Cookies.remove("favorites-characters");
      Cookies.remove("favorites-comics");
      setFavoritesCharacters([]);
      setFavoritesComics([]);
      setToken(null);
      setUsername(null);
    } else {
      Cookies.set("token", possibleToken, { expires: 5 });
      Cookies.set("username", possibleUsername, {
        expires: 5,
      });
      if (possibleFavChar) {
        Cookies.set(
          "favorites-characters",
          possibleFavChar.length > 0 ? JSON.stringify(possibleFavChar) : [],
          {
            expires: 5,
          }
        );
      } // Passage du tableau en chaîne de caractères avec stringify
      if (possibleFavCom) {
        Cookies.set(
          "favorites-comics",
          possibleFavCom.length > 0 ? JSON.stringify(possibleFavCom) : [],
          {
            expires: 5,
          }
        );
      }
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
            <ScrollToTop>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      searchCharacter={searchCharacter}
                      setSearchCharacter={setSearchCharacter}
                      token={token}
                      favoritesCharacters={favoritesCharacters}
                      setFavoritesCharacters={setFavoritesCharacters}
                      favoritesComics={favoritesComics}
                      setFavoritesComics={setFavoritesComics}
                    />
                  }
                />

                <Route
                  path="/login"
                  element={<Login setUserToken={setUserToken} token={token} />}
                />
                <Route
                  path="/signup"
                  element={
                    <Signup
                      setUserToken={setUserToken}
                      token={token}
                      setFavoritesCharacters={setFavoritesCharacters}
                      setFavoritesComics={setFavoritesComics}
                    />
                  }
                />
                <Route
                  path="/comics"
                  element={
                    <Comics
                      searchComics={searchComics}
                      setSearchComics={setSearchComics}
                      token={token}
                      favoritesCharacters={favoritesCharacters}
                      setFavoritesCharacters={setFavoritesCharacters}
                      favoritesComics={favoritesComics}
                      setFavoritesComics={setFavoritesComics}
                    />
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <Favorites
                      token={token}
                      favoritesCharacters={favoritesCharacters}
                      setFavoritesCharacters={setFavoritesCharacters}
                      favoritesComics={favoritesComics}
                      setFavoritesComics={setFavoritesComics}
                    />
                  }
                />
                <Route path="/character/:characterId" element={<Character />} />
              </Routes>
            </ScrollToTop>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
