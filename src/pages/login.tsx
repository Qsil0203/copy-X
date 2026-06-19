import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants/api-url";
import axios from "axios";

export default function LoginPage() {
    const navigate = useNavigate()
    const [email , setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.get(`${API_URL}users?email=${email}&password=${password}`)

            if (response.data.length > 0) {
                const user = response.data[0]
                localStorage.setItem("user", JSON.stringify(user))
                navigate("/profile")
            }else{
                setError("Неверный пароль или почта")
            }
        }catch(e){
            setError("Ошибки авторизации")
            console.error(e)
        }
    }


    return (
        <div className="max-w-md mx-auto p-4 ">
            <h1 className="text-2xl font-bold mb-4">Вход</h1>
            
            <p className="text-red-500 mb-4">{error}</p>
            
            <form onSubmit={handleSubmit}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
                />
                
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
                required
                />
                
                <button type="submit" className="w-full bg-[#1D9BF0] text-white p-2 rounded">
                Войти
                </button>
            </form>
            
            <p className="mt-4 text-center">
                <a href="/register" className="text-[#1D9BF0]">Регистрация</a>
            </p>
        </div>
  )

}