import { useEffect, useState } from "react";

function getUserData() {
  return JSON.parse(localStorage.getItem('user'));
}

export default function useUserData() {
  const [user, setUser] = useState(getUserData());

  useEffect(() => {
    function handleChangeStorage() {
      setUser(getUserData());
    }

    window.addEventListener('storage', handleChangeStorage);
    return () => window.removeEventListener('storage', handleChangeStorage);
  }, []);

  return user;
}
