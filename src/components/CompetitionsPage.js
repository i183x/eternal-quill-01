import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const CompetitionsPage = () => {
  const [currentCompetition, setCurrentCompetition] = useState(null);
  const [archivedCompetitions, setArchivedCompetitions] = useState([]);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        // Fetch current competition (assuming it's stored in a separate document)
        const currentCompRef = collection(db, 'competitions');
        const querySnapshot = await getDocs(currentCompRef);
        const competitions = querySnapshot.docs.map(doc => doc.data());

        // Assuming the first document is the current competition
        setCurrentCompetition(competitions[0]);

        // The rest are archived competitions
        setArchivedCompetitions(competitions.slice(1));

      } catch (error) {
        console.error('Error fetching competitions:', error);
      }
    };

    fetchCompetitions();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Competitions</h1>
      
      {/* Display the current competition */}
      {currentCompetition ? (
        <div className="mb-6">
          <h2 className="text-xl font-bold">Current Competition</h2>
          <p><strong>Topic:</strong> {currentCompetition.topic}</p>
          <p><strong>Details:</strong> {currentCompetition.details}</p>
          <p><strong>End Date:</strong> {new Date(currentCompetition.endDate).toDateString()}</p>
        </div>
      ) : (
        <p>No current competition available.</p>
      )}

      {/* Display archived competitions */}
      <h2 className="text-xl font-bold mt-6">Archived Competitions</h2>
      {archivedCompetitions.length > 0 ? (
        <ul>
          {archivedCompetitions.map((comp, index) => (
            <li key={index} className="border-b p-2">
              <strong>Topic:</strong> {comp.topic} <br />
              <strong>Winner:</strong> {comp.winner}
            </li>
          ))}
        </ul>
      ) : (
        <p>No archived competitions available.</p>
      )}
    </div>
  );
};

export default CompetitionsPage;
