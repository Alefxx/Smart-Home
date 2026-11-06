import { useState } from "react";
import { registerUser } from "../services/api";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      onSuccess(); // Chama a função para mudar de tela se der certo
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  
  const handleLogin = (email, password, onSuccess) => {

    onSuccess(); 
  };

  return {
    handleRegister,
    handleLogin,
    loading,
    error,
  };
}
