import { useSelector } from "react-redux";
import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoutes";

const RouteComponent = () => {
  const { token } = useSelector((state) => state.login);
  return <>{token ? <AppRoutes /> : <AuthRoutes />}</>;
};

export default RouteComponent;
