import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigating between pages
import { auth } from '../firebaseConfig'; // Importing Firebase authentication
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase auth functions

const WelcomePage = () => {
  // State to store email and password input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State to toggle between login and sign-up mode
  const [isLogin, setIsLogin] = useState(true);

  // Hook for navigation after successful login/sign-up
  const navigate = useNavigate();

  // Function to handle authentication
  const handleAuth = async () => {
    try {
      let userCredential;
      
      if (isLogin) {
        // Attempt to log in the user
        console.log('Attempting to log in...');
        userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Logged in successfully:', userCredential);
      } else {
        // Attempt to sign up the user
        console.log('Attempting to sign up...');
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Signed up successfully:', userCredential);
      }

      // Navigate to the profile page after successful login/sign-up
      navigate('/profile');

    } catch (error) {
      // Handle errors (e.g., incorrect password, user not found)
      console.error('Error in authentication:', error.message);
      alert('Authentication failed: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Display title based on whether the user is in login or sign-up mode */}
      <h1 className="text-4xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h1>
      
      {/* Email input field */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      
      {/* Password input field */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      
      {/* Button to submit login/sign-up */}
      <button
        onClick={handleAuth}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
      
      {/* Link to toggle between login and sign-up modes */}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 mt-4"
      >
        {isLogin ? 'Create an Account' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default WelcomePage;
