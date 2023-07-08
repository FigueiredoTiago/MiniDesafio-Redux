import LoginP from "../pages/LoginP";
import Photos from "./Photos";
import { useSelector } from "react-redux";

const Content = () => {
  const { user, token } = useSelector((state) => state.login);
  if(user.loading || token.loading) return <div>Carregando...</div>
  if (user.data) return <Photos />;
  else return <LoginP />;
};

export default Content;
