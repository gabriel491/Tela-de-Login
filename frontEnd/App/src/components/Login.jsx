import axios from "axios";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      // caso de certo o login vai exibir no console os dados
      // E setar o usestate para o valor do User
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (error.response.status == 401) {
        setError("Usuário ou senha inválidos");
      }
    }
  };

  // Ao clicar no botão de Logout vai setar o estado de User para Null
  const handleLogout = async (e) => {
    e.preventDefault();
    setUser(null);
    setError('')
  }


  // Caso o User seja igual a Null o form será renderizado
  return (
    <div className="login-form-wrap">
      {user == null ? (
      <div>
        <h2>Xablau</h2>
        <form className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email:"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password:"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn-login"
            onClick={(e) => handleLogin(e)}
          >
            Login
          </button>
        </form>
        <p>{error}</p>
      </div>
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <button 
            className="btn-login"
            onClick={(e) => handleLogout(e)}
          >Logout</button>
        </div>
      )}
    </div>
  );
}

export default Login;
