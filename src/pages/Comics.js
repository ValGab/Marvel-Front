import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Card from "../components/Card";

const Comics = ({ searchComics, setSearchComics, token }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

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
            <div className="pagination-button"></div>
          )}
          <span>{page / 100 + 1}</span>
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
        {/* Affichage de la liste des comics */}
        {data.results.length > 0 ? (
          data.results.map((element) => {
            return (
              <Card
                path="comics"
                picture={element.thumbnail}
                id={element._id}
                name={element.title}
                description={element.description}
                className="card-comics"
                key={element._id}
                token={token}
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
