import { useEffect } from "react";
import { API_URL } from "../util/constants";

const refreshUserData = async (userId, setUser) => {
  try {
    const response = await fetch(`${API_URL}/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error refreshing user data:", data.error);
      return;
    }

    const userData = {
      id: data.id,
      username: data.username,
      email: data.email,
      credentials: data.credentials,
      pronouns: data.pronouns,
      first_name: data.first_name,
      last_name: data.last_name,
      description: data.description,
      photo_url: data.photo_url,
      link: data.link,
      team: data.team,
      subscriptions: data.subscriptions,
      loggedIn: true,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  } catch (error) {
    console.error("Error refreshing user data:", error);
  }
};

export function useAuth(user, setUser, setAuthLoading) {
  useEffect(() => {
    const refresh = async () => {
      setAuthLoading(true); // 🕒 auth in progress

      try {
        if (user?.id) {
          await refreshUserData(user.id, setUser);
        } else {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            const userData = JSON.parse(storedUser);
            await refreshUserData(userData.id, setUser);
          }
        }
      } finally {
        setAuthLoading(false); // ✅ done
      }
    };

    refresh();
  }, [user?.id, setUser, setAuthLoading]);
}
