import { createContext, useContext, useState, useEffect } from 'react';
import * as authService from "../../Register/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getToken = () => localStorage.getItem("token");

  const register = async (userData) => {
    return await authService.register(userData);
  };

  const login = async (credentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem("token", token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const valid = await authService.verifyToken();
        if (valid) {
          // Opcional: traer perfil actualizado
          const profileData = await authService.profile();
          setUser(profileData);
        } else {
          logout();
        }
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
