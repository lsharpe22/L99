import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Summary() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      const token = localStorage.getItem('token');
      console.log('Fetching chart data from frontend...');
      try {
        const response = await fetch('http://localhost:5000/api/chart-data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Received data:', data);
        
        if (data && data.length > 0) {
          const labels = data.map(item => item.innovation_type);
          const counts = data.map(item => item.count);
          console.log('Labels:', labels);
          console.log('Counts:', counts);
          
          setChartData({
            labels,
            datasets: [{
              label: 'Number of Innovations',
              data: counts,
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 205, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)'
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          });
        } else {
          console.log('No data received or empty array');
        }
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };
    
    fetchChartData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AI Innovations by Type (Past 6 Months)'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }
  };

  return (
    <div>
      <h2>Summary</h2>
      <p>Distribution of AI innovations by type in the past 6 months, based on recent developments from major AI companies.</p>
      <p>Reference: <a href="https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/11/generative-ai-digest-major-ai-agent-releases" target="_blank" rel="noopener noreferrer">S&P Global AI Digest</a></p>
      
      {chartData ? (
        <div style={{ width: '600px', height: '400px' }}>
          <Bar data={chartData} options={options} />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}

export default Summary;