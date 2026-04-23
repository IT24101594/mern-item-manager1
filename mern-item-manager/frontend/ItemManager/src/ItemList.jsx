import { useState } from 'react';
import { deleteItem } from './api';

export default function ItemList({ items, onRefresh }) {
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState('');

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      setError('');
      await deleteItem(id);
      onRefresh();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Could not delete item. Check that the backend and MongoDB are running.',
      );
    } finally {
      setDeletingId('');
    }
  };

  return (
    <div>
      <h2>Items</h2>
      {items.length === 0 && <p>No items found.</p>}
      {error && <p style={{ color: 'crimson', marginBottom: '1rem' }}>{error}</p>}
      {items.map((item) => (
        <div
          key={item._id}
          style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
        >
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.price}</p>
          <button onClick={() => handleDelete(item._id)} disabled={deletingId === item._id}>
            {deletingId === item._id ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ))}
    </div>
  );
}
