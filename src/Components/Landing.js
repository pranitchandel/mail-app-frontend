import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Loading from "./Loading";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      navigate(`/user/${decoded.id}`);
    } else {
      navigate("/login");
    }
  });
  return (
    <div>
      <Loading />
    </div>
  );
};

export default Landing;
