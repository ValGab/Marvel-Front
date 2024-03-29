import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";

const Signup = ({ setUserToken, token }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://marvel-backend-valgab.vercel.app/user/signup",
          {
            username,
            email,
            password,
          }
        );
        setUserToken(response.data.token, response.data.account.username);
        setError("");
        setUsername("");
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (error) {
        setError(error.response.data.message);
        setPassword("");
      }
    };
    fetchData();
  };

  return (
    <main>
      {token ? (
        <Navigate to={"/"} />
      ) : (
        <div className="register-form">
          <h1>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="mail"
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
            <button>S'inscrire</button>
            {error === "Missing parameters" && <p>Champs incomplets</p>}
            {error === "User already exist" && <p>Cet e-mail existe déjà !</p>}
            <p>
              Tu as déjà un compte ? <Link to="/login">Connecte-toi !</Link>
            </p>
          </form>
        </div>
      )}
    </main>
  );
};

export default Signup;
