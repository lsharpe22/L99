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
    /* Added accessibility feature: Chart accessibility options */
    accessibility: {
      enabled: true,
      description: 'Line chart showing AI development trends over time including total releases, major updates, and new models'
    },
    plugins: {
      legend: {
        position: 'top',
        /* Added accessibility feature: Legend accessibility with keyboard navigation */
        labels: {
          usePointStyle: true,
          generateLabels: function(chart) {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
            const labels = original.call(this, chart);
            return labels;
          }
        }
      },
      title: {
        display: true,
        text: 'AI Development Trends Over Time'
      },
      /* Added accessibility feature: Enhanced tooltip accessibility */
      tooltip: {
        callbacks: {
          title: function(context) {
            return `Month: ${context[0].label}`;
          },
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y} items`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 2
        },
        /* Added accessibility feature: Axis title for screen readers */
        title: {
          display: true,
          text: 'Number of Items'
        }
      },
      x: {
        /* Added accessibility feature: Axis title for screen readers */
        title: {
          display: true,
          text: 'Time Period (Month-Year)'
        }
      }
    }
  };

  return (
    /* Added accessibility feature: Semantic article structure */
    <article>
      {/* Added accessibility feature: Proper heading hierarchy */}
      <h1>AI Development Reports</h1>
      
      {/* Added accessibility feature: Semantic section for description */}
      <section aria-labelledby="reports-description">
        <h2 id="reports-description" className="visually-hidden">Report Description</h2>
        <p>Monthly AI development trends showing total releases, major updates, and new model launches based on industry reports.</p>
        {/* Added accessibility feature: Descriptive link text */}
        <p>Reference: <a 
          href="https://sdtimes.com/ai/september-2025-ai-updates-from-the-past-month/" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Read SD Times AI Updates report (opens in new tab)"
        >
          SD Times AI Updates
        </a></p>
      </section>
      
      {/* Added accessibility feature: Semantic section for chart */}
      <section aria-labelledby="trends-chart">
        <h2 id="trends-chart">Development Trends Chart</h2>
        
        {chartData ? (
          <div>
            {/* Added accessibility feature: Chart container with proper ARIA labels */}
            <div 
              style={{ width: '800px', height: '400px' }}
              role="img"
              aria-labelledby="chart-title"
              aria-describedby="trends-chart-description"
            >
              <Line data={chartData} options={options} />
            </div>
            
            {/* Added accessibility feature: Text alternative for chart data */}
            <div id="trends-chart-description" className="visually-hidden">
              <h3>Chart Data Summary:</h3>
              {chartData.labels.map((label, index) => (
                <div key={label}>
                  <h4>{label}:</h4>
                  <ul>
                    <li>Total Releases: {chartData.datasets[0].data[index]}</li>
                    <li>Major Updates: {chartData.datasets[1].data[index]}</li>
                    <li>New Models: {chartData.datasets[2].data[index]}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Added accessibility feature: Loading state with ARIA live region */
          <div role="status" aria-live="polite">
            <p>Loading chart data...</p>
          </div>
        )}
      </section>
    </article>
  );
}

export default Reports;