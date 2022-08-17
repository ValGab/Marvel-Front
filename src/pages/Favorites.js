import { Navigate } from "react-router-dom";

const Favorites = ({ token }) => {
  return <main>{!token ? <Navigate to="/login" /> : <div></div>}</main>;
};

export default Favorites;
