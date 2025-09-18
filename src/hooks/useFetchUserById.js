import { useEffect } from "react";
import { API_URL } from "../util/constants";

const useFetchUserById = (userId, setUser, setUserLoading) => {
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/user/${userId}`);
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user by ID:", err);
      } finally {
        setUserLoading(false);
      }
    };

    fetchUser();
  }, [userId, setUser, setUserLoading]);
};

export default useFetchUserById;
