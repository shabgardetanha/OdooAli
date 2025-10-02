import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-3xl mb-4">Welcome to OdooAli</h1>
      <p className="mb-4">Please <Link to="/login" className="text-blue-500">Login</Link> or <Link to="/register" className="text-blue-500">Register</Link></p>
    </div>
  );
};

export default Home;
