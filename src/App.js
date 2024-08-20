import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import ProfilePage from './components/ProfilePage';
import CreateWriteUp from './components/CreateWriteUp';
import CompetitionsPage from './components/CompetitionsPage';
import FeedPage from './components/FeedPage';
import NavBar from './components/NavBar'; // Import NavBar

function App() {
  return (
    <Router>
      <NavBar /> {/* Add NavBar here to appear on all pages */}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-writeup" element={<CreateWriteUp />} />
        <Route path="/competitions" element={<CompetitionsPage />} />
        <Route path="/feed" element={<FeedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
