import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../../components/LoginForm';

describe('LoginForm Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'mock-token' }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits login credentials and calls onLogin', async () => {
    const onLogin = jest.fn();

    render(<LoginForm onLogin={onLogin} />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/login/i));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        '/api/auth/login',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'user@example.com', password: 'password123' }),
        })
      )
    );

    expect(onLogin).toHaveBeenCalledWith('mock-token');
  });

  it('shows error on failed login', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    render(<LoginForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'fail@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByRole('alert')).toHaveTextContent('Login failed');
  });
});
