import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../constants/api-url";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickname: "",
    username: "",
    email: "",
    password: "",
    avatarUrl: "",      
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const newUser = {
        ...formData,
        createdAt: new Date().toISOString(),
      };

      const response = await axios.post(`${API_URL}users`, newUser)

      if (response.status === 201 || response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data))
        alert("Регистрация успешна!")
        navigate("/profile");
      } else {
        setError("Ошибка регистарции")
      }
    } catch (err) {
      console.error("Ошибка регистрации:", err)
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 m-60">
      <h1 className="text-2xl font-bold mb-4">Регистрация</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nickname"
          value={formData.nickname}
          onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <input
          type="text"
          placeholder="Avatar URL "
          value={formData.avatarUrl}
          onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1D9BF0] text-white p-2 rounded "
        >
          {loading ? "Регистрация..." : "Регистрация"}
        </button>
      </form>

      <p className="mt-4 text-center">
        <a href="/login" className="text-[#1D9BF0]">Войти</a>
      </p>
    </div>
  );
}