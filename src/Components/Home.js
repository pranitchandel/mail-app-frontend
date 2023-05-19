import { Outlet } from "react-router";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Home = (props) => {
  return (
    <>
      <SearchBar />
      <NavBar />
      <Outlet />
    </>
  );
};

export default Home;
