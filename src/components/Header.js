import logo from "../img/marvel_logo.png";
import { Link, useLocation } from "react-router-dom";

const Header = ({
  setSearchComics,
  setSearchCharacter,
  setUserToken,
  token,
  username,
}) => {
  const location = useLocation();
  return (
    <header>
      <Link
        to="/"
        onClick={() => {
          setSearchCharacter("");
          setSearchComics("");
        }}
      >
        <img src={logo} alt="logo-marvel" />
      </Link>
      <nav>
        {location.pathname === "/" ? (
          <Link to="/" className="red">
            Personnages
          </Link>
        ) : (
          <Link to="/">Personnages</Link>
        )}
        {location.pathname === "/comics" ? (
          <Link to="/comics" className="red">
            Comics
          </Link>
        ) : (
          <Link to="/comics">Comics</Link>
        )}
        {location.pathname === "/favorites" ? (
          <Link to="/favorites" className="red">
            Favoris
          </Link>
        ) : (
          <Link to="/favorites">Favoris</Link>
        )}
      </nav>
      {!token ? (
        <div className="register">
          {location.pathname === "/login" ? (
            <Link to="/login" className="red">
              Se connecter
            </Link>
          ) : (
            <Link to="/login">Se connecter</Link>
          )}
          {location.pathname === "/signup" ? (
            <Link to="/signup" className="red">
              S'inscrire
            </Link>
          ) : (
            <Link to="/signup">S'inscrire</Link>
          )}
        </div>
      ) : (
        <div className="register">
          <p>Bienvenue {username} !</p>
          <Link
            to="/"
            onClick={() => {
              setUserToken(null, null);
            }}
          >
            Se déconnecter
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
