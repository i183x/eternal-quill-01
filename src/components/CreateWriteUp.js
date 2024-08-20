import React, { useState } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateWriteUp = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreateWriteUp = async () => {
    try {
      const user = auth.currentUser; // Ensure the user is authenticated
      if (user) {
        // Add a new document to the "writeUps" collection
        await addDoc(collection(db, 'writeUps'), {
          title, // Title of the write-up
          content, // Content of the write-up
          authorId: user.uid, // User ID of the author
          createdAt: new Date(), // Timestamp for when the write-up was created
        });
        navigate('/profile'); // Navigate to the profile page after successful post creation
      } else {
        alert('You must be logged in to create a post.');
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('Failed to create write-up: ' + error.message);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Write-up</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your content here..."
        className="mb-4 p-2 border border-gray-300 rounded w-full h-40"
      />
      <button
        onClick={handleCreateWriteUp}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Publish
      </button>
    </div>
  );
};

export default CreateWriteUp;
