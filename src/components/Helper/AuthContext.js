import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

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


  const logout = async () => {
    try {
      const res = await fetch('/api/v1/sh/accounts/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!res.ok) {
        console.error('Logout failed on server');
      }

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setToken(null);
    }
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

export const sendOtpToEmail = async (email) => {
  const response = await fetch('/api/v1/p/auth/reset-password/send-otp/email', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email })
  });

  const result = await response.json();

  if (!response.ok) {
    const errorMessage = result.data || result.message || "Không thể gửi mã OTP.";
    throw new Error(errorMessage);
  }

  return result;
};
export const verifyOtp = async (email, otp) => {
  const response = fetch('/api/v1/p/auth/reset-password/verify-otp/email', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  });
  const result = await response.json();

  if (!response.ok || result.statusCode !== 200) {
    const errorMessage = result.message || "Xác minh OTP thất bại.";
    throw new Error(errorMessage);
  }

  return result.data;
}

export const resetPassword = async (email, otp, newPass) => {
  const res = await fetch('/api/v1/p/auth/reset-password', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp, newPass })
  });
  const result = await res.json();

  if (!res.ok) {
    const errorMessage = result.data || result.message || "Không thể đặt lại mật khẩu.";
    throw new Error(errorMessage);
  }

  return result;
}

export const changePassword = async (username, oldPassword, newPassword) => {
  const res = await fetch('/api/v1/sh/accounts/change-password', {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ username, oldPassword, newPassword })
  });

  const result = await res.json();

  if (!res.ok) {
    const errorMessage = result.data || result.message || "Không thể đổi mật khẩu.";
    throw new Error(errorMessage);
  }

  return result;
};
