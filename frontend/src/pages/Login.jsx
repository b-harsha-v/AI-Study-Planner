import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const API = "http://localhost:5000/api/auth";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
        return;
      }

      login(data.user, data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Something went wrong");
    }
  };

  // ⭐ FULL GOOGLE LOGIN HANDLER
  const handleGoogleLogin = () => {
    setError("");

    /* 
      1. Initialize Google OAuth
      2. Open popup
      3. Receive Google ID Token
      4. Send to backend -> verify -> return JWT + user
      5. Log user in
    */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: async (response) => {
        const idToken = response.credential;

        try {
          const res = await fetch("http://localhost:5000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: idToken }),
          });

          const data = await res.json();

          if (!res.ok) {
            setError(data.message || "Google login failed");
            return;
          }

          login(data.user, data.token);
          window.location.href = "/dashboard";

        } catch (err) {
          setError("Google login error");
        }
      },
    });

    // Open Google popup
    google.accounts.id.prompt();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-[350px]"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border mb-3 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-4 rounded"
          onChange={handleChange}
        />

        {/* LOGIN BUTTON */}
        <button className="w-full bg-blue-600 text-white p-2 mb-3 rounded hover:bg-blue-700">
          Login
        </button>

        {/* GOOGLE LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 mt-2
                     border border-gray-300 rounded-md py-2 hover:bg-gray-100"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google logo"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <a href="/register" className="text-blue-600 block text-center mt-4">
          Create an account
        </a>
      </form>
    </div>
  );
}
