import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Cookies from "js-cookie";

const Favorites = ({
  token,
  favoritesComics,
  setFavoritesComics,
  favoritesCharacters,
  setFavoritesCharacters,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://marvel-back-vg.onrender.com/user/favorites",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [token, favoritesComics, favoritesCharacters]);

  return (
    <main>
      {!token ? (
        <Navigate to="/login" />
      ) : isLoading ? (
        <Loader />
      ) : (
        <div className="favorites">
          <h1>Mes favoris</h1>
          <div>
            {data.favoritesCharacters.length !== 0 ? (
              <h2>Personnages favoris</h2>
            ) : (
              <h2>Aucun personnage</h2>
            )}
            <div className="favorites-list">
              {data.favoritesCharacters.length > 0 &&
                data.favoritesCharacters.map((character) => {
                  return (
                    <div className="favorites-link" key={character.id}>
                      <Link to={`/character/${character.id}`}>
                        <p>{character.name}</p>
                        <img src={character.urlPic} alt={character.id} />
                      </Link>
                      <p
                        className="remove"
                        onClick={async () => {
                          try {
                            const response = await axios.post(
                              "https://marvel-back-vg.onrender.com/user/favoritesCharacter",
                              { id: character.id },
                              {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              }
                            );
                            Cookies.set(
                              "favorites-characters",
                              JSON.stringify(response.data.newFavChar),
                              {
                                expires: 5,
                              }
                            );
                            setFavoritesCharacters(
                              JSON.parse(Cookies.get("favorites-characters"))
                            );
                          } catch (error) {
                            console.log(error.response);
                          }
                        }}
                      >
                        X
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div>
            {data.favoritesComics.length !== 0 ? (
              <h2>Comics favoris</h2>
            ) : (
              <h2>Aucun comics</h2>
            )}
            <div className="favorites-list">
              {data.favoritesComics.length > 0 &&
                data.favoritesComics.map((comics) => {
                  return (
                    <div className="favorites-link-comics" key={comics.id}>
                      <img src={comics.urlPic} alt={comics.id} />
                      <p
                        className="remove"
                        onClick={async () => {
                          try {
                            const response = await axios.post(
                              "https://marvel-back-vg.onrender.com/user/favoritesComics",
                              { id: comics.id },
                              {
                                headers: {
                                  Authorization: "Bearer " + token,
                                },
                              }
                            );
                            Cookies.set(
                              "favorites-comics",
                              JSON.stringify(response.data.newFavCom),
                              {
                                expires: 5,
                              }
                            );
                            setFavoritesComics(
                              JSON.parse(Cookies.get("favorites-comics"))
                            );
                          } catch (error) {
                            console.log(error.response);
                          }
                        }}
                      >
                        X
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Favorites;
