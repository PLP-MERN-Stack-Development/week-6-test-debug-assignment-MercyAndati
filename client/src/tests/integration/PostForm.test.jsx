import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostForm from '../../components/PostForm';

describe('PostForm Integration', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve({}) })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('validates required fields before submitting', async () => {
    render(<PostForm />);
    fireEvent.click(screen.getByText(/submit/i));
    expect(await screen.findByRole('alert')).toHaveTextContent('All fields are required');
    expect(fetch).not.toHaveBeenCalled();
  });

  it('submits form data successfully', async () => {
    const onSuccess = jest.fn();
    render(<PostForm onSuccess={onSuccess} />);

    fireEvent.change(screen.getByLabelText(/post title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/post content/i), { target: { value: 'Test Content' } });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => expect(fetch).toHaveBeenCalledWith(
      '/api/posts',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Test Title', content: 'Test Content', category: '123' }),
      })
    ));

    expect(onSuccess).toHaveBeenCalled();
  });

  it('shows error if API fails', async () => {
    fetch.mockImplementationOnce(() => Promise.resolve({ ok: false }));

    render(<PostForm />);
    fireEvent.change(screen.getByLabelText(/post title/i), { target: { value: 'Fail' } });
    fireEvent.change(screen.getByLabelText(/post content/i), { target: { value: 'Fail content' } });
    fireEvent.click(screen.getByText(/submit/i));

    expect(await screen.findByRole('alert')).toHaveTextContent('Failed to submit post');
  });
});
