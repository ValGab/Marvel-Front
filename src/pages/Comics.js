import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Comics = ({ searchComics, setSearchComics }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        console.log(filters);

        const response = await axios.get(
          `https://marvel-back-vg.herokuapp.com/comics${filters}`
        );
        setData(response.data);
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [searchComics]);

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
          value={searchComics}
          onChange={(event) => {
            setSearchComics(event.target.value);
          }}
        />
      </div>
      <div className="card-list">
        {data.results.length > 0 ? (
          data.results.map((element) => {
            return (
              <Link
                to={`/comics/${element._id}`}
                className="card-comics"
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
                      alt={element.title}
                    />
                  )}
                </div>
                <div className="card-infos">
                  <h2>{element.title}</h2>
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

export default Comics;
