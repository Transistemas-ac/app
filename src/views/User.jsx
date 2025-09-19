import UserForm from "../components/UserForm";

function User({ user }) {
  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <div className="section">
      <UserForm user={user} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

export default User;
