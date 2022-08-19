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
          "https://marvel-back-vg.herokuapp.com/user/favorites",
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
            <h2>Personnages favoris</h2>
            <div className="favorites-list">
              {data.favoritesCharacters.length > 0 &&
                data.favoritesCharacters.map((element) => {
                  return (
                    <div className="favorites-link" key={element.id}>
                      <Link to={`/character/${element.id}`}>
                        <p>{element.name}</p>
                        <img src={element.urlPic} alt={element.id} />
                      </Link>
                      <p
                        className="remove"
                        onClick={async () => {
                          try {
                            const response = await axios.post(
                              "https://marvel-back-vg.herokuapp.com/user/favoritesCharacter",
                              { id: element.id },
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
                            const newTab = Cookies.get("favorites-characters");
                            setFavoritesCharacters(JSON.parse(newTab));
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
            <h2>Comics favoris</h2>
            <div className="favorites-list">
              {data.favoritesComics.length > 0 &&
                data.favoritesComics.map((element) => {
                  return (
                    <div className="favorites-link-comics" key={element.id}>
                      <img src={element.urlPic} alt={element.id} />
                      <p
                        className="remove"
                        onClick={async () => {
                          try {
                            const response = await axios.post(
                              "https://marvel-back-vg.herokuapp.com/user/favoritesComics",
                              { id: element.id },
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
                            const newTab = Cookies.get("favorites-comics");
                            setFavoritesComics(JSON.parse(newTab));
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
