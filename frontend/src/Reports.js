import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchTrendsData = async () => {
      const token = localStorage.getItem('token');
      console.log('Fetching trends data from frontend...');
      try {
        const response = await fetch('http://localhost:5000/api/trends-data', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log('Trends response status:', response.status);
        const data = await response.json();
        console.log('Received trends data:', data);
        
        if (data && data.length > 0) {
          const labels = data.map(item => item.month_year);
          const totalReleases = data.map(item => item.total_releases);
          const majorUpdates = data.map(item => item.major_updates);
          const newModels = data.map(item => item.new_models);
          
          setChartData({
            labels,
            datasets: [
              {
                label: 'Total Releases',
                data: totalReleases,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1
              },
              {
                label: 'Major Updates',
                data: majorUpdates,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1
              },
              {
                label: 'New Models',
                data: newModels,
                borderColor: 'rgb(54, 162, 235)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                tension: 0.1
              }
            ]
          });
        } else {
          console.log('No trends data received or empty array');
        }
      } catch (error) {
        console.error('Failed to fetch trends data:', error);
      }
    };
    
    fetchTrendsData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'AI Development Trends Over Time'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2
        }
      }
    }
  };

  return (
    <div>
      <h2>Reports</h2>
      <p>Monthly AI development trends showing total releases, major updates, and new model launches based on industry reports.</p>
      <p>Reference: <a href="https://sdtimes.com/ai/september-2025-ai-updates-from-the-past-month/" target="_blank" rel="noopener noreferrer">SD Times AI Updates</a></p>
      
      {chartData ? (
        <div style={{ width: '800px', height: '400px' }}>
          <Line data={chartData} options={options} />
        </div>
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
}

export default Reports;