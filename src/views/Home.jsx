import UserList from "../components/UserList";
import CourseList from "../components/CourseList";
import SubscriptionList from "../components/SubscriptionList";
import "../styles/home.scss";

const Home = () => {
  return (
    <div className="home-container">
      <div className="main-content">
        <div className="top-section">
          <div className="section users-section">
            <UserList />
          </div>
          <div className="section courses-section">
            <CourseList />
          </div>
        </div>
        <div className="bottom-section">
          <div className="section subscriptions-section">
            <SubscriptionList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
