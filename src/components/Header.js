import logo from "../img/marvel_logo.png";
import { Link, useLocation } from "react-router-dom";

const Header = ({ setSearchComics, setSearchCharacter }) => {
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
    </header>
  );
};

export default Header;
