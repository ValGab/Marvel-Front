import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Card = ({
  id,
  picture,
  name,
  description,
  path,
  className,
  token,
  //   favorites,
}) => {
  const urlPic = picture.path + "." + picture.extension;

  //   const isPresent = () => {
  //     if (path === "character") {
  //       if (favorites.favoritesCharacters) {
  //         let isHere = false;
  //         let index = 0;
  //         for (let i = 0; i < favorites.favoritesCharacters.length; i++) {
  //           if (id === favorites.favoritesCharacters[i].id) {
  //             isHere = true;
  //             index = i;
  //           }
  //         }
  //         if (isHere) {
  //           return (favorites.favoritesCharacters[index].isHere = true);
  //         } else {
  //           return (favorites.favoritesCharacters[index].isHere = false);
  //         }
  //       }
  //     }
  //   };
  //   isPresent();

  return (
    <div className={className}>
      <Link to={`/${path}/${id}`}>
        <div className="card-img">
          {picture && <img src={urlPic} alt={name} />}
        </div>
        <div className="card-infos">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </Link>
      <FontAwesomeIcon
        className="icon"
        icon="heart"
        onClick={async () => {
          if (path === "character") {
            try {
              const response = await axios.post(
                "https://marvel-back-vg.herokuapp.com/user/favoritesCharacter/create",
                { id, urlPic, name },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              );
              console.log(response.data);
            } catch (error) {
              console.log(error.response);
            }
          }
          if (path === "comics") {
            try {
              const response = await axios.post(
                "https://marvel-back-vg.herokuapp.com/user/favoritesComics/create",
                { id, urlPic, title: name, description },
                {
                  headers: {
                    Authorization: "Bearer " + token,
                  },
                }
              );
              console.log(response.data);
            } catch (error) {
              console.log(error.response);
            }
          }
        }}
      />
    </div>
  );
};

export default Card;
