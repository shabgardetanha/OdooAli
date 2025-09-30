import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser, logout } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const { status, error, token } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-5">OdooAli Auth</h1>

      {token ? (
        <>
          <p className="mb-3">Logged in! JWT token: {token}</p>
          <button onClick={() => dispatch(logout())} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
        </>
      ) : (
        <>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-2 w-full" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-2 w-full" />
          <div className="flex gap-2">
            <button onClick={() => dispatch(registerUser({ username, password }))} className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
            <button onClick={() => dispatch(loginUser({ username, password }))} className="bg-green-500 text-white px-4 py-2 rounded">Login</button>
          </div>
          {status === "loading" && <p>Loading...</p>}
          {status === "failed" && <p className="text-red-500">{JSON.stringify(error)}</p>}
        </>
      )}
    </div>
  );
}

export default App;
