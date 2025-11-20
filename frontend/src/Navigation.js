import { Link } from 'react-router-dom';

function Navigation({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/summary">Summary</Link>
      <Link to="/reports">Reports</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navigation;