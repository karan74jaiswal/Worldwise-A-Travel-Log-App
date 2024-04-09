import { createContext, useContext, useState } from "react";
const AuthContext = createContext();
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
function AuthProvider({ children }) {
  const [userObject, setUserObject] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  function login(email, pass) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password) {
      setUserObject(FAKE_USER);
      setIsUserAuthenticated(true);
    }
  }

  function logout() {
    setUserObject(null);
    setIsUserAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        userObject,
        isUserAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("AuthContext was used outside the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
