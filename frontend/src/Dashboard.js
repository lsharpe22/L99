import { useState, useEffect } from 'react';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/api/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        setMessage('Failed to load dashboard');
      }
    };
    
    fetchDashboard();
  }, []);



  return (
    <div>
      <h2>Dashboard</h2>
      <p>{message}</p>
      
      <h3>Generative AI Recent Developments</h3>
      <p>
        Recent developments in generative AI show rapid advances both in technology and business impact. 
        Major tools are being released or upgraded including OpenAI which launched GPT-4.5, which improves 
        emotional intelligence for more natural and context-aware conversations. Amazon is preparing a more 
        capable Alexa powered by generative AI to manage complex voice interactions. Meanwhile, DeepSeek has 
        introduced powerful open-source models, V3 and Janus Pro 7B, that compete with other large models. 
        Google's Gemini 2.0 can reason across text, images, and audio, and its new Veo model is focused on 
        high-quality video generation. On the business side, generative AI is boosting productivity and 
        innovation, but also raising concerns. Studies suggest heavy reliance on AI might reduce employee 
        motivation and diminish problem-solving skills. Organizations are shifting from pilot projects to 
        value-driven AI investments, and hiring trends now favor candidates with strong generative AI skills, 
        even if they have less experience.
      </p>
      <p>
        Reference: <a href="https://www.simplilearn.com/generative-ai-news-article" target="_blank" rel="noopener noreferrer">
          https://www.simplilearn.com/generative-ai-news-article
        </a>
      </p>
      
      <h3>Technical Project Overview</h3>
      <p>
        This project is built using a modern full-stack architecture with Node.js and Express.js powering 
        the backend API, React.js handling the frontend user interface, and MySQL serving as the database 
        hosted on a Digital Ocean droplet. Authentication is implemented using JSON Web Tokens (JWT) for 
        secure user sessions.The infrastructure includes CORS configuration for cross-origin requests and 
        environment variables for secure configuration management. 
      </p>

    </div>
  );
}

export default Dashboard;