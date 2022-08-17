import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Home = ({ searchCharacter, setSearchCharacter }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (searchCharacter.length > 2) {
          if (!filters) {
            filters = filters + `?name=${searchCharacter}`;
          } else {
            filters = filters + `&name=${searchCharacter}`;
          }
        }
        console.log(filters);

        const response = await axios.get(
          `https://marvel-back-vg.herokuapp.com/characters${filters}`
        );
        setData(response.data);
        setIsLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [searchCharacter]);

  return isLoading ? (
    <main>
      <Loader />
    </main>
  ) : (
    <main>
      <p>
        Bienvenue sur Univers Marvel, le site regroupant vos personnages et
        comics préférés !
      </p>
      <div className="search">
        <span>Rechercher un personnage :</span>
        <input
          type="text"
          value={searchCharacter}
          onChange={(event) => {
            setSearchCharacter(event.target.value);
          }}
        />
      </div>
      <div className="card-list">
        {data.results.length > 0 ? (
          data.results.map((element) => {
            return (
              <Link
                to={`/character/${element._id}`}
                className="card"
                key={element._id}
              >
                <div className="card-img">
                  {element.thumbnail && (
                    <img
                      src={
                        element.thumbnail.path +
                        "." +
                        element.thumbnail.extension
                      }
                      alt={element.name}
                    />
                  )}
                </div>
                <div className="card-infos">
                  <h2>{element.name}</h2>
                  <p>{element.description}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="no-result">
            <p>Aucun résultat</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
