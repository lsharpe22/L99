import { Link } from 'react-router-dom';

function Navigation({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
  };

  return (
    /* Added accessibility feature: Semantic navigation with ARIA label */
    <nav role="navigation" aria-label="Main navigation">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/summary">Summary</Link>
      <Link to="/reports">Reports</Link>
      <button onClick={handleLogout} type="button">Logout</button>
    </nav>
  );
}

export default Navigation;