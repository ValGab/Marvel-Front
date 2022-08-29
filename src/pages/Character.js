import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Character = () => {
  const { characterId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [comics, setComics] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://marvel-back-vg.herokuapp.com/character/${characterId}`
        );
        setData(response.data);
        try {
          const response = await axios.get(
            `https://marvel-back-vg.herokuapp.com/comics/${characterId}`
          );
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
            {comics.comics.length > 0 && <h3>Apparition dans :</h3>}
            <div className="character-comics-list">
              {comics.comics.map((comics) => {
                return (
                  <div className="character-comics-card" key={comics._id}>
                    <img
                      src={
                        comics.thumbnail.path + "." + comics.thumbnail.extension
                      }
                      alt={comics.title}
                    />
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

export default Character;
