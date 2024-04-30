import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getUserData, onAuthChange } from "../utils/firebase";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [userObject, setUserObject] = useState(null);
  const [userData, setUserData] = useState(null);

  const value = useMemo(() => {
    return { userObject, userData };
  }, [userData, userObject]);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (user) => {
      if (user) {
        setUserObject(user);
        const data = await getUserData(user);
        setUserData(data);
      } else {
        setUserObject(null);
        setUserData(null);
      }
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
