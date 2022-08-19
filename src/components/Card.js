import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Card = ({
  id,
  picture,
  name,
  description,
  path,
  className,
  token,
  favoritesCharacters,
  setFavoritesCharacters,
  favoritesComics,
  setFavoritesComics,
}) => {
  const urlPic = picture.path + "." + picture.extension;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (path === "character") {
      if (favoritesCharacters.length > 0) {
        const isHere = (element) => element.id === id;

        const isHereV = favoritesCharacters.findIndex(isHere);

        if (isHereV !== -1) {
          setIsFavorite(true);
        }
      }
    }
    if (path === "comics") {
      if (favoritesComics.length > 0) {
        const isHere = (element) => element.id === id;

        const isHereV = favoritesComics.findIndex(isHere);

        if (isHereV !== -1) {
          setIsFavorite(true);
        }
      }
    }
  }, [favoritesCharacters, favoritesComics, path, id]);

  const navigate = useNavigate();

  return (
    <div className={className}>
      {path === "character" ? (
        <Link to={`/${path}/${id}`}>
          <div className="card-img">
            {picture && <img src={urlPic} alt={name} />}
          </div>
          <div className="card-infos">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </Link>
      ) : (
        <div>
          <div className="card-img">
            {picture && <img src={urlPic} alt={name} />}
          </div>
          <div className="card-infos">
            <h2>{name}</h2>
            <p>{description}</p>
          </div>
        </div>
      )}
      <FontAwesomeIcon
        className={isFavorite ? "red-icon" : "black-icon"}
        icon="heart"
        onClick={async () => {
          if (token) {
            if (path === "character") {
              try {
                const response = await axios.post(
                  "https://marvel-back-vg.herokuapp.com/user/favoritesCharacter",
                  { id, urlPic, name },
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
                setIsFavorite(!isFavorite);
              } catch (error) {
                console.log(error.response);
              }
            }
            if (path === "comics") {
              try {
                const response = await axios.post(
                  "https://marvel-back-vg.herokuapp.com/user/favoritesComics",
                  { id, urlPic, title: name },
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
                setIsFavorite(!isFavorite);
              } catch (error) {
                console.log(error.response);
              }
            }
          } else {
            navigate("/login");
          }
        }}
      />
    </div>
  );
};

export default Card;
