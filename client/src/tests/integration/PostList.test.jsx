import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PostList from '../../components/PostList';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { _id: '1', title: 'First Post' },
        { _id: '2', title: 'Second Post' },
      ]),
  })
);

describe('PostList Integration', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('fetches and displays posts from API', async () => {
    render(<PostList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledWith('/api/posts');
  });

  it('displays "No posts found" if API returns empty array', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(<PostList />);

    await waitFor(() => {
      expect(screen.getByText(/no posts found/i)).toBeInTheDocument();
    });
  });
});
