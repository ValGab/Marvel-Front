import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Character = () => {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [comics, setComics] = useState(null);

  console.log(comics);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-vg.herokuapp.com/character/${characterId}`
        );
        console.log(response.data);
        setData(response.data);
        try {
          const response = await axios.get(
            `https://marvel-back-vg.herokuapp.com/comics/${characterId}`
          );
          console.log(response.data);
          setComics(response.data);
        } catch (error) {
          console.log(error.response);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [characterId]);

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="character-page">
          <div className="character-page-img">
            <img
              src={data.thumbnail.path + "." + data.thumbnail.extension}
              alt={data.name}
            />
          </div>
          <div className="character-infos">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <div className="character-comics-list">
              {comics.comics.map((element) => {
                return (
                  <Link
                    to={`/comics/${element._id}`}
                    className="comic-card"
                    key={element._id}
                  >
                    <img
                      src={
                        element.thumbnail.path +
                        "." +
                        element.thumbnail.extension
                      }
                      alt={element.title}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Character;
