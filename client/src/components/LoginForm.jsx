import React, { useState } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error('Invalid credentials');

      const data = await res.json();
      onLogin?.(data.token);
    } catch (err) {
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div role="alert">{error}</div>}
      <input
        type="email"
        placeholder="Email"
        aria-label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        aria-label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
