import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const Home = ({ searchCharacter, setSearchCharacter }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

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

        if (page) {
          if (!filters) {
            filters = filters + `?skip=${page}`;
          } else {
            filters = filters + `&skip=${page}`;
          }
        }
        const response = await axios.get(
          `https://marvel-back-vg.herokuapp.com/characters${filters}`
        );
        setData(response.data);
        setIsLoading(false);
        if (response.data.count < 100) {
          setPage(0);
        }
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [searchCharacter, page]);

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
          placeholder="ex : Spider-Man"
          value={searchCharacter}
          onChange={(event) => {
            setSearchCharacter(event.target.value);
          }}
        />
      </div>
      {data.count > 100 && (
        <div className="pagination">
          {page >= 100 ? (
            <button
              className="pagination-button"
              onClick={() => {
                setPage((prevState) => prevState - 100);
              }}
            >
              ◄ Page précédente
            </button>
          ) : (
            <div className="pagination-button"></div>
          )}
          <span>{page / 100}</span>
          {data.count > 100 && page < data.count - 100 ? (
            <button
              className="pagination-button"
              onClick={() => {
                setPage((prevState) => prevState + 100);
              }}
            >
              Page suivante ►
            </button>
          ) : (
            <div className="pagination-button"></div>
          )}
        </div>
      )}
      <div className="card-list">
        {/* Affichage de la liste des personnages */}
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