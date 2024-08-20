import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, limit } from 'firebase/firestore'; // Added `limit` here
import { db, auth } from '../firebaseConfig';

const FeedPage = () => {
  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const fetchFeedItems = async () => {
      try {
        const user = auth.currentUser;

        // Fetching write-ups from followed writers
        const followedWritersQuery = query(
          collection(db, 'writeUps'),
          where('authorId', 'in', user.following) // Assuming user.following is an array of followed writer IDs
        );

        const querySnapshot = await getDocs(followedWritersQuery);
        const followedWritersItems = querySnapshot.docs.map(doc => doc.data());

        // Fetching write-ups based on genre (assuming genres are stored in user preferences)
        const genreQuery = query(
          collection(db, 'writeUps'),
          where('genre', 'in', user.favoriteGenres) // Assuming user.favoriteGenres is an array of preferred genres
        );

        const genreSnapshot = await getDocs(genreQuery);
        const genreItems = genreSnapshot.docs.map(doc => doc.data());

        // Fetching random write-ups for discovery (limiting to 5 for example)
        const randomQuery = query(collection(db, 'writeUps'), limit(5));
        const randomSnapshot = await getDocs(randomQuery);
        const randomItems = randomSnapshot.docs.map(doc => doc.data());

        // Combine all fetched items into one feed
        setFeedItems([...followedWritersItems, ...genreItems, ...randomItems]);

      } catch (error) {
        console.error('Error fetching feed items:', error);
      }
    };

    fetchFeedItems();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
      {feedItems.length > 0 ? (
        <ul>
          {feedItems.map((item, index) => (
            <li key={index} className="border-b p-2">
              <h2 className="text-xl font-bold">{item.title}</h2>
              <p>{item.content}</p>
              <p className="text-sm text-gray-500">By: {item.authorName}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No feed items available.</p>
      )}
    </div>
  );
};

export default FeedPage;
