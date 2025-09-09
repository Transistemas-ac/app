import Navbar from "../../components/Navbar";
import "../../styles/auth.scss";

const Home = ({ user }) => {
  return (
    <div className="Home">
      <Navbar />
      <div>
        <h1>Welcome, {user.email}!</h1>
      </div>
    </div>
  );
};

export default Home;
