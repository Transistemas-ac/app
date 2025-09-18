import { useEffect } from "react";
import { API_URL } from "../util/constants";

const useFetchUsers = (setUsers, setUsersLoading) => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/user`);
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setUsersLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers, setUsersLoading]);
};

export default useFetchUsers;
