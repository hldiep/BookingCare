import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Hàm parse token
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const user = token ? parseJwt(token) : null;

  const login = async (username, password) => {
    const res = await fetch('/api/v1/p/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();

    const newToken = data.data.token;
    const user = data.data.user;

    if (!newToken || !user) throw new Error('Token hoặc thông tin người dùng không hợp lệ');

    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(user));

    setToken(newToken);
  };


  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const isAuthenticated = !!token;

  const roles = user?.role?.map(r => r.authority.replace('ROLE_', '')) || [];

  return (
    <AuthContext.Provider value={{ isAuthenticated, roles, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
