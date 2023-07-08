/* eslint-disable no-unused-vars */
import "../../src/App.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Store/reducers/login";
import { useState } from "react";

function LoginP() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(loginUser({ username, password }));
  };

  return (
    <>
      <p>NOME: {username}</p>
      <p>SENHA: {password}</p>

      <div>
        <input
          type="text"
          placeholder="Usuario"
          id="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <br />
        <br />

        <button onClick={handleSubmit}>Login</button>
      </div>
    </>
  );
}

export default LoginP;
