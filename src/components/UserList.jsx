import { useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";

function UserList() {
  const [usersLoading, setUsersLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useFetchUsers(setUsers, setUsersLoading);

  if (usersLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner pink"></div>
        <span>Cargando usuaries...</span>
      </div>
    );
  }

  const getCredentialColor = (credentials) => {
    return credentials === "teacher" ? "purple" : "blue";
  };

  const getInitials = (firstName, lastName, username) => {
    if (firstName && lastName) {
      return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
    }
    return username.substring(0, 2).toUpperCase();
  };

  const getDisplayName = (user) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.username;
  };

  return (
    <div className="list-container">
      <div className="list-header pink-header">
        <div className="header-content">
          <h2>🐱 Usuaries</h2>
          <span className="count-badge pink">{users.length}</span>
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
            <button className="add-btn pink">Agregar primer usuarie</button>
          </div>
        ) : (
          <ul className="item-list">
            {users.map((user) => (
              <li key={user.id} className="list-item user-item">
                <div
                  className={`item-avatar ${getCredentialColor(
                    user.credentials
                  )}`}
                >
                  {user.photo_url ? (
                    <img src={user.photo_url} alt={getDisplayName(user)} />
                  ) : (
                    getInitials(user.first_name, user.last_name, user.username)
                  )}
                </div>
                <div className="item-info">
                  <div className="item-header">
                    <span className="item-name">{getDisplayName(user)}</span>
                    <span
                      className={`credential-badge ${getCredentialColor(
                        user.credentials
                      )}`}
                    >
                      {user.credentials === "teacher" ? "🎓" : "📚"}{" "}
                      {user.credentials === "teacher" ? "Profe" : "Estudiante"}
                    </span>
                  </div>
                  <span className="item-detail">@{user.username}</span>
                  {user.email && <span className="item-detail">{user.id}</span>}
                  {user.team && (
                    <span className="item-detail">🏢 {user.team}</span>
                  )}
                  {user.pronouns && (
                    <span className="item-detail">({user.pronouns})</span>
                  )}
                </div>
                <div className="item-actions">
                  <button className="action-btn pink">Ver Perfil</button>
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
