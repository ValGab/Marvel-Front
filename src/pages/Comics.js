import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Card from "../components/Card";

const Comics = ({
  searchComics,
  setSearchComics,
  token,
  favoritesCharacters,
  setFavoritesCharacters,
  favoritesComics,
  setFavoritesComics,
}) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let filters = "";
        if (searchComics.length > 2) {
          if (!filters) {
            filters = filters + `?title=${searchComics}`;
          } else {
            filters = filters + `&title=${searchComics}`;
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
          `https://marvel-back-vg.herokuapp.com/comics${filters}`
        );
        setData(response.data);
        setCount(response.data.count);
        if (response.data.count < 100) {
          setPage(0);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [searchComics, page]);

  let numberPages = 0;
  if (count) {
    numberPages = Math.ceil(count / 100);
  }

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
        <span>Rechercher un comics :</span>
        <input
          type="text"
          placeholder="ex : Avengers"
          value={searchComics}
          onChange={(event) => {
            setSearchComics(event.target.value);
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
            <button className="pagination-button-disabled">
              ◄ Page précédente
            </button>
          )}
          <div className="number-pages">
            <span>{page / 100 + 1}</span>
            <span>{numberPages && ` / ${numberPages}`}</span>
          </div>
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
            <button className="pagination-button-disabled">
              Page suivante ►
            </button>
          )}
        </div>
      )}
      <div className="card-list">
        {/* Affichage de la liste des comics */}
        {data.results.length > 0 ? (
          data.results.map((comics) => {
            return (
              <Card
                path="comics"
                picture={comics.thumbnail}
                id={comics._id}
                name={comics.title}
                description={comics.description}
                className="card-comics"
                key={comics._id}
                token={token}
                favoritesCharacters={favoritesCharacters}
                setFavoritesCharacters={setFavoritesCharacters}
                favoritesComics={favoritesComics}
                setFavoritesComics={setFavoritesComics}
              />
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

export default Comics;
