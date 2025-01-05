import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles/topic.css';

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState([]);
  const [completedTopics, setCompletedTopics] = useState(user?.completedTopics || []);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await axios.get('/api/topics');
      setTopics(response.data);
    };
    fetchTopics();
    setCompletedTopics(JSON.parse(localStorage.getItem('data')).completedTopics);
  }, []);

  const handleTopicChange = (topicId) => {
    // Toggle the completion of the topic
    const updatedCompletedTopics = completedTopics.includes(topicId)
      ? completedTopics.filter(id => id !== topicId)
      : [...completedTopics, topicId];
    setCompletedTopics(updatedCompletedTopics);

    // Update user data on the backend
    axios.put('/api/auth/update/', { completedTopics: updatedCompletedTopics, userId: JSON.parse(localStorage.getItem('data')).userId })
      .then(response => setUser(response.data))
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="topics-container">
      <h1>DSA Topics</h1>
      {topics.map((topic) => (
        <div key={topic._id} className="topic-card">
          <h2>{topic.name}</h2>
          <br></br>
          <p className="level">Level: <span>{topic.level}</span></p>

          <div>
            <label>
              <input 
                type="checkbox" 
                checked={completedTopics.includes(topic._id)} 
                onChange={() => handleTopicChange(topic._id)} 
              />
              
              Mark Topic as Completed
            </label>
          </div>
          <ul className="problem-list">
            {topic.problems.map((problem, problemIndex) => (
              <li key={problemIndex} className="problem-item">
                <h3>{problem.problemTitle}</h3>
                <p><strong>Description:</strong> {problem.description}</p>

                <div className="links">
                  <a href={problem.youtubeLink} target="_blank" rel="noopener noreferrer">YouTube</a> |
                  <a href={problem.leetcodeLink} target="_blank" rel="noopener noreferrer">Leetcode</a> |
                  <a href={problem.articleLink} target="_blank" rel="noopener noreferrer">Article</a>
                </div>
              </li>
            ))}
          </ul>

          {/* Render Subtopics if available */}
          {topic.subTopics && topic.subTopics.length > 0 && (
            <div className="subtopics">
              <h4>Subtopics:</h4>
              <ul className="subtopic-list">
                {topic.subTopics.map((subTopic, subIndex) => (
                  <li key={subIndex} className="subtopic-item">
                    <strong>{subTopic.level}:</strong> {subTopic.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TopicList;
