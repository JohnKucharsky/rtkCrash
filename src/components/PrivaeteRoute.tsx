import { useSelector } from "react-redux";
import { selectAuth } from "../fetures/authSlice";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivaeteRoute = ({ children }: { children: any }) => {
  const { token } = useSelector(selectAuth);
  return token ? children : <LoadingToRedirect />;
};

export default PrivaeteRoute;
