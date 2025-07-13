import React, { useState } from 'react';

function PostForm({ onSuccess }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('All fields are required');
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, category: '123' }), // dummy category
      });

      if (!res.ok) throw new Error('Failed to create post');

      setTitle('');
      setContent('');
      setError(null);
      onSuccess && onSuccess(); // Optional callback
    } catch (err) {
      setError('Failed to submit post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div role="alert">{error}</div>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Post Title"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        aria-label="Post Content"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostForm;
