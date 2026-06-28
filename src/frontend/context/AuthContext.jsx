import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const setAuthData = (data) => {
    setUser({ uid: data.uid, email: data.email });
    setProfile(data);
  };

  useEffect(() => {
    const s = localStorage.getItem('safetrip_user');
    if (s) setAuthData(JSON.parse(s));
    setLoading(false);
  }, []);

  const signup = async (email, password, profileData) => {
    const u = { uid: `user-${Date.now()}`, email, ...profileData, createdAt: new Date().toISOString(), digitalId: `ST-${Date.now().toString(36).toUpperCase()}` };
    setAuthData(u);
    localStorage.setItem('safetrip_user', JSON.stringify(u));
    return { uid: u.uid, email };
  };

  const login = async (email, password) => {
    const s = localStorage.getItem('safetrip_user');
    if (s) {
      const u = JSON.parse(s);
      if (u.email === email) {
        setAuthData(u);
        return { uid: u.uid, email };
      }
    }
    throw new Error('Invalid credentials. Please sign up first.');
  };

  const logout = async () => {
    setUser(null); setProfile(null);
    localStorage.removeItem('safetrip_user');
  };

  const updateProfile = async (d) => {
    const u = { ...profile, ...d };
    setProfile(u);
    localStorage.setItem('safetrip_user', JSON.stringify(u));
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signup, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}
