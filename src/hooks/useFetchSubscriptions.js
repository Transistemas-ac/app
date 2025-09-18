import { useEffect } from "react";
import { API_URL } from "../util/constants";

const useFetchSubscriptions = (setSubscriptions, setSubscriptionsLoading) => {
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${API_URL}/subscription`);
        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        console.error("Error fetching subscriptions:", err);
      } finally {
        setSubscriptionsLoading(false);
      }
    };

    fetchSubscriptions();
  }, [setSubscriptions, setSubscriptionsLoading]);
};

export default useFetchSubscriptions;
