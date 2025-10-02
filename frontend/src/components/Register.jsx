import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL}/accounts/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Registration successful!");
        setFormData({ first_name: "", last_name: "", email: "", password: "" });
      } else {
        const data = await res.json();
        setMessage(JSON.stringify(data));
      }
    } catch (err) {
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required className="border p-2 mb-2 w-full" />
        <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required className="border p-2 mb-2 w-full" />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2 mb-2 w-full" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="border p-2 mb-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">Register</button>
      </form>
    </div>
  );
}

export default Register;
