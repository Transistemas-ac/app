import { useState } from "react";
import { useFetchCourses } from "../hooks/useFetchCourses";

function CourseList() {
  const [coursesLoading, setcoursesLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useFetchCourses(setCourses, setcoursesLoading);

  if (coursesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default CourseList;
