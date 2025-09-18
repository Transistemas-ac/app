import { useState } from "react";
import useFetchSubscriptions from "../hooks/useFetchSubscriptions";

function SubscriptionList() {
  const [subscriptionsLoading, setSubscriptionsLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState([]);

  useFetchSubscriptions(setSubscriptions, setSubscriptionsLoading);

  if (subscriptionsLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner yellow"></div>
        <span>Cargando inscripciones...</span>
      </div>
    );
  }

  const getCredentialColor = (credentials) => {
    return credentials === "teacher" ? "purple" : "blue";
  };

  const getCredentialIcon = (credentials) => {
    return credentials === "teacher" ? "🎓" : "📚";
  };

  const getInitials = (user) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name.charAt(0)}${user.last_name.charAt(
        0
      )}`.toUpperCase();
    }
    return user.username.substring(0, 2).toUpperCase();
  };

  const getDisplayName = (user) => {
    if (user.first_name && user.last_name) {
      return `${user.first_name} ${user.last_name}`;
    }
    return user.username;
  };

  const groupedSubscriptions = subscriptions.reduce((groups, subscription) => {
    const courseTitle = subscription.course?.title || "Unknown Course";
    if (!groups[courseTitle]) {
      groups[courseTitle] = [];
    }
    groups[courseTitle].push(subscription);
    return groups;
  }, {});

  return (
    <div className="list-container subscription-list">
      <div className="list-header yellow-header">
        <div className="header-content">
          <h2>⭐ Inscripciones</h2>
          <span className="count-badge yellow">{subscriptions.length}</span>
        </div>
        <div className="header-stats">
          <span className="stat-item">
            Profes:{" "}
            {subscriptions.filter((s) => s.credentials === "teacher").length}
          </span>
          <span className="stat-item">
            Estudiantes:{" "}
            {subscriptions.filter((s) => s.credentials === "student").length}
          </span>
          <span className="stat-item">
            Courses: {Object.keys(groupedSubscriptions).length}
          </span>
        </div>
      </div>
      <div className="list-content scrollable">
        {subscriptions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <p>No se encontraron inscripciones</p>
            <button className="add-btn yellow">Crear Inscripción</button>
          </div>
        ) : (
          <div className="subscription-groups">
            {Object.entries(groupedSubscriptions).map(
              ([courseTitle, courseSubscriptions]) => (
                <div key={courseTitle} className="subscription-group">
                  <div className="group-header">
                    <h3>📚 {courseTitle}</h3>
                    <span className="group-count">
                      {courseSubscriptions.length} inscrites
                    </span>
                  </div>
                  <ul className="item-list">
                    {courseSubscriptions.map((subscription) => (
                      <li
                        key={`${subscription.user_id}-${subscription.course_id}`}
                        className="list-item subscription-item"
                      >
                        <div
                          className={`item-avatar ${getCredentialColor(
                            subscription.credentials
                          )}`}
                        >
                          {subscription.user?.photo_url ? (
                            <img
                              src={subscription.user.photo_url}
                              alt={getDisplayName(subscription.user)}
                            />
                          ) : (
                            getInitials(subscription.user)
                          )}
                        </div>
                        <div className="item-info">
                          <div className="item-header">
                            <span className="item-name">
                              {getDisplayName(subscription.user)}
                            </span>
                            <span
                              className={`credential-badge ${getCredentialColor(
                                subscription.credentials
                              )}`}
                            >
                              {getCredentialIcon(subscription.credentials)}{" "}
                              {subscription.credentials}
                            </span>
                          </div>
                          <span className="item-detail">
                            @{subscription.user?.username}
                          </span>
                          {subscription.user?.email && (
                            <span className="item-detail">
                              📧 {subscription.user.email}
                            </span>
                          )}
                          {subscription.user?.team && (
                            <span className="item-detail">
                              🏢 {subscription.user.team}
                            </span>
                          )}
                        </div>
                        <div className="subscription-actions">
                          <div className="enrollment-info">
                            <span className="enrollment-id">
                              ID: {subscription.user_id}-
                              {subscription.course_id}
                            </span>
                          </div>
                          <div className="item-actions">
                            <button className="action-btn yellow">
                              Editar
                            </button>
                            <button className="action-btn outline danger">
                              Borrar
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SubscriptionList;
