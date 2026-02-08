
import React, { useState, useEffect } from 'react';
import { ref, set, get } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';

interface AdminDashboardProps {
  onClose: () => void;
}

interface ImageLinks {
  coupleImage: string;
  giftBoxImageUrl: string;
  roseBouquetUrl: string;
  letterImageUrl: string;
  heartStickerUrl: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [imageLinks, setImageLinks] = useState<ImageLinks | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchImageLinks = async () => {
      setLoading(true);
      setError('');
      try {
        const snapshot = await get(ref(db, 'images'));
        if (snapshot.exists()) {
          setImageLinks(snapshot.val());
        } else {
          setError('No image configuration found in the database.');
        }
      } catch (err) {
        setError('Failed to load image links. Check database permissions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImageLinks();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setImageLinks(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSave = async () => {
    if (!imageLinks) return;
    setStatus('Saving...');
    try {
      await set(ref(db, 'images'), imageLinks);
      setStatus('Saved successfully!');
    } catch (error) {
      console.error("Error saving image links:", error);
      setStatus('Error saving links.');
    } finally {
      setTimeout(() => setStatus(''), 3000);
    }
  };
  
  const handleLogout = () => {
    signOut(auth);
    onClose();
  };

  if (loading) return <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 text-white font-sans">Loading Admin Panel...</div>;
  if (error) return <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 text-red-400 font-sans p-4 text-center">{error}</div>;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 font-sans">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard: Image Links</h2>
        <div className="space-y-4">
          {imageLinks && Object.entries(imageLinks).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                name={key}
                value={value as string}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500"
              />
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
           <div className="flex items-center gap-2">
            <button onClick={onClose} className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Close
            </button>
            <button onClick={handleLogout} className="py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Logout
            </button>
          </div>
          <div className="flex items-center gap-4">
            {status && <p className="text-sm text-gray-600">{status}</p>}
            <button onClick={handleSave} className="py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;