import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [writeUps, setWriteUps] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setUser(user);
        // Fetch user's write-ups
        const q = query(collection(db, 'writeUps'), where('authorId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        setWriteUps(querySnapshot.docs.map(doc => doc.data()));

        // Fetch user's followers and following stats (dummy data for now)
        setFollowers(10); // Replace with actual data fetching
        setFollowing(15); // Replace with actual data fetching
      } else {
        navigate('/');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Followers: {followers}</p>
          <p>Following: {following}</p>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white p-2 rounded mt-4"
          >
            Sign Out
          </button>

          <h2 className="text-xl font-bold mt-6">Your Write-ups</h2>
          {writeUps.length > 0 ? (
            <ul>
              {writeUps.map((writeUp, index) => (
                <li key={index} className="border-b p-2">
                  {writeUp.title}
                </li>
              ))}
            </ul>
          ) : (
            <p>You haven't written anything yet.</p>
          )}

          <button
            onClick={() => navigate('/create-writeup')}
            className="bg-blue-500 text-white p-2 rounded mt-4"
          >
            Create New Write-up
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
