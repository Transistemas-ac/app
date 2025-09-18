import { useState } from "react";
import useFetchCourses from "../hooks/useFetchCourses";

function CourseList() {
  const [coursesLoading, setcoursesLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  useFetchCourses(setCourses, setcoursesLoading);

  if (coursesLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner blue"></div>
        <span>Cargando cursos...</span>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCourseStatus = (startDate, endDate) => {
    if (!startDate) return "draft";

    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (now < start) return "inscripciones abiertas";
    if (end && now > end) return "completado";
    return "activo";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "activo":
        return "blue";
      case "inscripciones abiertas":
        return "yellow";
      case "completado":
        return "purple";
      default:
        return "pink";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "activo":
        return "▶️";
      case "inscripciones abiertas":
        return "⏰";
      case "completado":
        return "✅";
      default:
        return "📝";
    }
  };

  return (
    <div className="list-container">
      <div className="list-header blue-header">
        <div className="header-content">
          <h2>📚 Cursos</h2>
          <span className="count-badge blue">{(courses || []).length}</span>
        </div>
      </div>
      <div className="list-content">
        {(courses || []).length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📖</div>
            <p>No se encontraron cursos</p>
            <button className="add-btn blue">Crear Curso</button>
          </div>
        ) : (
          <ul className="item-list">
            {(courses || []).map((course) => {
              const status = getCourseStatus(
                course.start_date,
                course.end_date
              );
              const statusColor = getStatusColor(status);
              const statusIcon = getStatusIcon(status);

              return (
                <li key={course.id} className="list-item course-item">
                  <div className="item-avatar course-icon blue">📚</div>
                  <div className="item-info">
                    <div className="item-header">
                      <span className="item-name">{course.title}</span>
                      <span className={`status-badge ${statusColor}`}>
                        {statusIcon} {status}
                      </span>
                    </div>
                    {course.description && (
                      <p className="course-description">{course.description}</p>
                    )}
                    <div className="course-dates">
                      {course.start_date && (
                        <span className="date-info">
                          📅 Inicio: {formatDate(course.start_date)}
                        </span>
                      )}
                      {course.end_date && (
                        <span className="date-info">
                          🏁 Fin: {formatDate(course.end_date)}
                        </span>
                      )}
                    </div>
                    <div className="course-links">
                      {course.syllabus_url && (
                        <a
                          href={course.syllabus_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="course-link"
                        >
                          📋 Temario
                        </a>
                      )}
                      {course.subscription_url && (
                        <a
                          href={course.subscription_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="course-link"
                        >
                          🔗 Inscribirse
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="action-btn blue">Ver Detalles</button>
                    <button className="action-btn outline">Editar</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CourseList;
