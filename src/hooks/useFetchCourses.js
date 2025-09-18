import { useEffect } from "react";
import { API_URL } from "../util/constants";

const useFetchCourses = (setCourses, setCoursesLoading) => {
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/course`);
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, [setCourses, setCoursesLoading]);
};

export default useFetchCourses;
