import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onLogin();
        navigate('/dashboard');
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Login failed');
    }
  };

  return (
    <div>
      {/* Added accessibility feature: Proper heading hierarchy */}
      <h1>AI Analytics Dashboard Login</h1>
      {/* Added accessibility feature: Form with proper labels and ARIA attributes */}
      <form onSubmit={handleSubmit} aria-labelledby="login-heading">
        <h2 id="login-heading">Sign In</h2>
        
        {/* Added accessibility feature: Proper label association and required field indication */}
        <div>
          <label htmlFor="username-input">Username *</label>
          <input
            id="username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-required="true"
            aria-describedby={error ? "error-message" : "login-instructions"}
            autoComplete="username"
          />
        </div>
        
        {/* Added accessibility feature: Proper label association and required field indication */}
        <div>
          <label htmlFor="password-input">Password *</label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
            aria-describedby={error ? "error-message" : "login-instructions"}
            autoComplete="current-password"
          />
        </div>
        
        <button type="submit" aria-describedby="login-instructions">Login</button>
      </form>
      
      {/* Added accessibility feature: ARIA live region for error announcements */}
      {error && (
        <div id="error-message" role="alert" aria-live="assertive">
          <p>{error}</p>
        </div>
      )}
      
      
    </div>
  );
}

export default Login;