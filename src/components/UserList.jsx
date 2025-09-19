import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchUsers from "../hooks/useFetchUsers";

function UserList() {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null);
  const navigate = useNavigate();

  useFetchUsers(setUsers, setUsersLoading);

  if (usersLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner pink"></div>
        <span>Cargando usuaries...</span>
      </div>
    );
  }

  const getInitials = (firstName, lastName, username) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return username.substring(0, 2).toUpperCase();
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este usuarie?")) {
      setIsDeleting(userId);
      try {
        const response = await fetch(`/user/${userId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          setUsers(users.filter((user) => user.id !== userId));
          console.log("✅ User deleted successfully");
        } else {
          console.error("❌ Error deleting user");
        }
      } catch (error) {
        console.error("❌ Error deleting user:", error);
      } finally {
        setIsDeleting(null);
      }
    }
  };

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const sortedUsers = loggedUser
    ? [...users].sort((a, b) => {
        if (a.id === loggedUser.id) return -1;
        if (b.id === loggedUser.id) return 1;
        return 0;
      })
    : users;

  return (
    <div className="list-container">
      <div className="list-header pink-header">
        <div className="header-content">
          <div className="header-title-section">
            <h2>🐱 Usuaries</h2>
            <span className="count-badge pink">{users.length}</span>
          </div>
          <button
            className="add-btn-header pink"
            onClick={() => navigate("/user/new")}
          >
            +
          </button>
        </div>
        <div className="header-stats">
          <span className="stat-item">
            Profes: {users.filter((u) => u.credentials === "teacher").length}
          </span>
          <span className="stat-item">
            Estudiantes:{" "}
            {users.filter((u) => u.credentials === "student").length}
          </span>
        </div>
      </div>

      <div className="list-content">
        {users.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👤</div>
            <p>No se encontraron usuaries</p>
            <button
              className="add-btn pink"
              onClick={() => navigate("/user/new")}
            >
              Agregar usuarie
            </button>
          </div>
        ) : (
          <ul className="item-list">
            {sortedUsers.map((user) => (
              <li
                key={user.id}
                className="list-item user-item"
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <div
                  className={`item-avatar ${
                    user.credentials === "teacher" ? "purple" : "blue"
                  }`}
                >
                  {user.photo_url ? (
                    <img src={user.photo_url} alt={user.username} />
                  ) : (
                    getInitials(user.first_name, user.last_name, user.username)
                  )}
                </div>
                <div className="item-info">
                  <div className="item-header">
                    <span className="item-name">{user.username}</span>
                    <span
                      className={`credential-badge ${
                        user.credentials === "teacher" ? "purple" : "blue"
                      }`}
                    >
                      {user.credentials === "teacher" ? "🎓" : "📚"}{" "}
                      {user.credentials === "teacher" ? "Profe" : "Estudiante"}
                    </span>
                  </div>
                  <span className="item-detail">ID: {user.id}</span>
                  <span className="item-detail">{user.email}</span>
                  {user.team && (
                    <span className="item-detail">🏢 {user.team}</span>
                  )}
                  {user.pronouns && (
                    <span className="item-detail">({user.pronouns})</span>
                  )}
                </div>
                <div className="item-actions">
                  <button
                    className="action-btn yellow"
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="action-btn red"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={isDeleting === user.id}
                  >
                    Borrar
                  </button>
                  {user.link && (
                    <a
                      href={user.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-btn outline"
                    >
                      🔗 Link
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserList;
