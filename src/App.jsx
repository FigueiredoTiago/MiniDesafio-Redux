/* eslint-disable no-unused-vars */
import "./App.css";

import { useEffect } from "react";
import { autoLogin } from "./Store/reducers/login";
import { useDispatch, useSelector } from "react-redux";
import Content from "./components/Content";
import { userLogout } from "./Store/reducers/login";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  const { user, token } = useSelector((state) => state.login);
  const loading = user.loading || token.loading;

  return (
    <>
      <header style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h1>MINI DOGS</h1>

        <button
          onClick={() => dispatch(userLogout())}
          className={`${loading ? "loading" : " "} ${
            user.data ? "loaded" : " "
          }`}
        >
          LOGOUT
        </button>
      </header>

      <Content />
    </>
  );
}

export default App;
