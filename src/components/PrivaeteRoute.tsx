import { useSelector } from "react-redux";
import { selectAuth } from "../fetures/authSlice";
import LoadingToRedirect from "./loadingToRedirect";

const PrivaeteRoute = ({ children }: { children: any }) => {
  const { token } = useSelector(selectAuth);
  return token ? children : <LoadingToRedirect />;
};

export default PrivaeteRoute;
