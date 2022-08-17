import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = ({ token, setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <main>
      {token ? (
        <Navigate to="/" />
      ) : (
        <div className="login-form">
          <h1>Se connecter</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const fetchData = async () => {
                try {
                  const response = await axios.post(
                    "https://marvel-back-vg.herokuapp.com/user/login",
                    {
                      email,
                      password,
                    }
                  );
                  setUserToken(
                    response.data.token,
                    response.data.account.username
                  );
                  setEmail("");
                  setPassword("");
                  navigate("/");
                } catch (error) {
                  setEmail("");
                  setPassword("");
                  setError(error.response.data.message);
                }
              };

              fetchData();
            }}
          >
            <input
              type="text"
              placeholder="E-mail"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button>Se connecter</button>
            {error === "Unauthorized" && <p>Accès non autorisé</p>}
          </form>
        </div>
      )}
    </main>
  );
};

export default Login;
