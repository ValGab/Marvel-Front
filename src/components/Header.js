import logo from "../img/marvel_logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = ({
  setSearchComics,
  setSearchCharacter,
  setUserToken,
  token,
  username,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <header>
      <div className="desktop-header">
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
          <Link to="/" className={location.pathname === "/" ? "red" : ""}>
            Personnages
          </Link>
          <Link
            to="/comics"
            className={location.pathname === "/comics" ? "red" : ""}
          >
            Comics
          </Link>
          <Link
            to="/favorites"
            className={location.pathname === "/favorites" ? "red" : ""}
          >
            Favoris
          </Link>
        </nav>
        {!token ? (
          <div className="register">
            <Link
              to="/login"
              className={location.pathname === "/login" ? "red" : ""}
            >
              Se connecter
            </Link>

            <Link
              to="/signup"
              className={location.pathname === "/signup" ? "red" : ""}
            >
              S'inscrire
            </Link>
          </div>
        ) : (
          <div className="register">
            <p>Bienvenue {username} !</p>
            <Link
              to="/"
              onClick={() => {
                setUserToken(null);
                navigate(0);
              }}
            >
              Se déconnecter
            </Link>
          </div>
        )}
      </div>
      <div className="mobile-header">
        <div className="mobile-header-top">
          <Link
            to="/"
            onClick={() => {
              setSearchCharacter("");
              setSearchComics("");
              setMobileMenu(false);
            }}
          >
            <img src={logo} alt="logo-marvel" />
          </Link>
          {!mobileMenu ? (
            <FontAwesomeIcon
              icon="bars"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            />
          ) : (
            <FontAwesomeIcon
              icon="xmark"
              onClick={() => {
                setMobileMenu(!mobileMenu);
              }}
            />
          )}
        </div>
        {mobileMenu && (
          <div className="mobile-menu">
            <nav className="nav-mobile">
              <Link
                to="/"
                className={location.pathname === "/" ? "red" : ""}
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                Personnages
              </Link>

              <Link
                to="/comics"
                className={location.pathname === "/comics" ? "red" : ""}
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                Comics
              </Link>
              <Link
                to="/favorites"
                className={location.pathname === "/favorites" ? "red" : ""}
                onClick={() => {
                  setMobileMenu(false);
                }}
              >
                Favoris
              </Link>
            </nav>
            {!token ? (
              <div className="register-mobile">
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "red" : ""}
                  onClick={() => {
                    setMobileMenu(false);
                  }}
                >
                  Se connecter
                </Link>

                <Link
                  to="/signup"
                  className={location.pathname === "/signup" ? "red" : ""}
                  onClick={() => {
                    setMobileMenu(false);
                  }}
                >
                  S'inscrire
                </Link>
              </div>
            ) : (
              <div className="register-mobile">
                <p>Bienvenue {username} !</p>
                <Link
                  to="/"
                  onClick={() => {
                    setUserToken(null);
                    setMobileMenu(false);
                    navigate(0);
                  }}
                >
                  Se déconnecter
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
