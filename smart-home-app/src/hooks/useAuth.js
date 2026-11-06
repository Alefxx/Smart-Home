import { useState } from "react";
import { registerUser, loginUser } from "../services/api";
import { useAuthContext } from "../contexts/AuthContext";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { loginState, user } = useAuthContext();

  const validateRegister = (name, email, password, lockCode) => {
    if (!name || name.trim() === "") return "O nome é obrigatório.";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Digite um e-mail válido.";
    
    if (!password || password.length < 8) return "A senha deve ter pelo menos 8 dígitos.";
    
    if (!lockCode || lockCode.length !== 8) return "O código da tranca deve ter exatamente 8 dígitos.";
    
    return null; 
  };

  const handleRegister = async (name, email, password, lockCode, onSuccess) => {
    setError(null);
    const validationError = validateRegister(name, email, password, lockCode);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await registerUser({ name, email, password, lockCode });
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password, onSuccess) => {
    setError(null);

    if (!email || !email.trim()) {
      setError("Digite o seu e-mail.");
      return;
    }

    if (!password) {
      setError("Digite a sua senha.");
      return;
    }

    try {
      setLoading(true);
      const res = await loginUser({ email, password });
      
      // Salva os dados do usuário no Contexto global
      if (res.user) {
        loginState(res.user);
      } else {
        // Fallback para dev local se backend ainda não devolver res.user
        loginState({ name: email.split("@")[0], email });
      }

      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    handleRegister,
    handleLogin,
    loading,
    error,
  };
}
