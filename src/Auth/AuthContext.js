import React, { useState } from 'react';

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);

  const login = (data) => {
    setIsAuth(data);
  }

  const logout = () =>  {
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuth,
        login: login,
        logout: logout
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
