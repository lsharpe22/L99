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
    /* Added accessibility feature: Chart accessibility options */
    accessibility: {
      enabled: true,
      description: 'Bar chart showing the distribution of AI innovations by type over the past 6 months'
    },
    plugins: {
      legend: {
        position: 'top',
        /* Added accessibility feature: Legend accessibility */
        labels: {
          usePointStyle: true,
          generateLabels: function(chart) {
            const original = ChartJS.defaults.plugins.legend.labels.generateLabels;
            const labels = original.call(this, chart);
            labels.forEach(label => {
              label.text = `${label.text} (${chart.data.datasets[0].data[labels.indexOf(label)]} innovations)`;
            });
            return labels;
          }
        }
      },
      title: {
        display: true,
        text: 'AI Innovations by Type (Past 6 Months)'
      },
      /* Added accessibility feature: Tooltip accessibility */
      tooltip: {
        callbacks: {
          title: function(context) {
            return `Innovation Type: ${context[0].label}`;
          },
          label: function(context) {
            return `Number of innovations: ${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        /* Added accessibility feature: Axis title for screen readers */
        title: {
          display: true,
          text: 'Number of Innovations'
        }
      },
      x: {
        /* Added accessibility feature: Axis title for screen readers */
        title: {
          display: true,
          text: 'Innovation Type'
        }
      }
    }
  };

  return (
    /* Added accessibility feature: Semantic article structure */
    <article>
      {/* Added accessibility feature: Proper heading hierarchy */}
      <h1>AI Innovations Summary</h1>
      
      {/* Added accessibility feature: Semantic section for description */}
      <section aria-labelledby="summary-description">
        <h2 id="summary-description" className="visually-hidden">Chart Description</h2>
        <p>Distribution of AI innovations by type in the past 6 months, based on recent developments from major AI companies.</p>
        {/* Added accessibility feature: Descriptive link text */}
        <p>Reference: <a 
          href="https://www.spglobal.com/market-intelligence/en/news-insights/research/2025/11/generative-ai-digest-major-ai-agent-releases" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Read S&P Global AI Digest report (opens in new tab)"
        >
          S&P Global AI Digest
        </a></p>
      </section>
      
      {/* Added accessibility feature: Semantic section for chart */}
      <section aria-labelledby="chart-section">
        <h2 id="chart-section">Innovation Distribution Chart</h2>
        
        {chartData ? (
          <div>
            {/* Added accessibility feature: Chart container with proper ARIA labels */}
            <div 
              style={{ width: '600px', height: '400px' }}
              role="img"
              aria-labelledby="chart-title"
              aria-describedby="chart-description"
            >
              <Bar data={chartData} options={options} />
            </div>
            
            {/* Added accessibility feature: Text alternative for chart data */}
            <div id="chart-description" className="visually-hidden">
              <h3>Chart Data Summary:</h3>
              {chartData.labels.map((label, index) => (
                <p key={label}>
                  {label}: {chartData.datasets[0].data[index]} innovations
                </p>
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

export default Summary;