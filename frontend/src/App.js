import React, { useState } from 'react';
import Login from './components/Login';
import TopicList from './components/TopicList';
import { AuthContext } from './context/AuthContext';
import AuthProvider from './context/AuthContext';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <div className="App">
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <TopicList />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
