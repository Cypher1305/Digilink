// hooks/useAuth.js

import { useState } from 'react';

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = (email) => {
    // Logique pour l'authentification
    setLoggedIn(true);
  };

  const logout = () => {
    // Logique pour la déconnexion
    setLoggedIn(false);
  };

  return {
    loggedIn,
    login,
    logout,
  };
}
