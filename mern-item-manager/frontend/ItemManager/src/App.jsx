import { useEffect, useState } from 'react';
import { getItems } from './api';
import ItemForm from './ItemFrom';
import ItemList from './ItemList';

function App() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError('');

      const res = await getItems();
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setItems([]);
      setError(
        err.response?.data?.message ||
          'Could not load items. Make sure the backend is running on http://localhost:5000.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div
      style={{
        maxWidth: '700px',
        margin: '2rem auto',
        fontFamily: 'sans-serif',
      }}
    >
      <h1>Item Manager</h1>
      {error && <p style={{ color: 'crimson', marginBottom: '1rem' }}>{error}</p>}
      {loading && <p>Loading items...</p>}
      <ItemForm onItemAdded={fetchItems} />
      <ItemList items={items} onRefresh={fetchItems} />
    </div>
  );
}

export default App;
