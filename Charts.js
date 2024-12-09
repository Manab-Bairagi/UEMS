  // Data for the bar chart
  const data = {
    labels: ['Data Structures', 'Discrete Mathematics', 'Operating Systems', 'Software Engineering', 'Digital Logic', 'Computer Networks'],
    datasets: [
        {
            label: 'Internal Marks',
            data: [45, 40, 43, 47, 44, 39],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        },
        {
            label: 'External Marks',
            data: [46, 45, 44, 45, 45, 44],
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        },
        {
            label: 'Total Marks',
            data: [91, 85, 87, 92, 89, 83],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }
    ]
};

// Config for the chart
const config = {
    type: 'bar',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return tooltipItem.dataset.label + ': ' + tooltipItem.raw;
                    }
                }
            }
        },
        animation: {
            duration: 1500, // Animation duration in milliseconds
            easing: 'easeOutBounce', // Animation easing function
        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }
};

// Creating the chart
const ctx = document.getElementById('resultsChart').getContext('2d');
new Chart(ctx, config);

// Attendance Chart (Donut Style)
const attendanceCtx = document.getElementById('attendanceChart').getContext('2d');
new Chart(attendanceCtx, {
  type: 'doughnut',
  data: {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance',
        data: [85, 15],
        backgroundColor: ['#4caf50', '#f44336'], // Green for Present, Red for Absent
        hoverBackgroundColor: ['#45a049', '#e53935'],
        borderWidth: 8, // Thick segments for the donut
        hoverOffset: 6,
      }
    ]
  },
  options: {
    responsive: true,
    cutout: '70%', // Smaller cutout for a reduced radius
    layout: {
      padding: 10, // Add padding around the chart
    },
    plugins: {
      legend: {
        display: true, // Enable the legend
        position: 'bottom', // Position at the bottom
        labels: {
          boxWidth: 20, // Size of the legend box
          font: {
            size: 14, // Font size for legend labels
          },
          padding: 10, // Padding between legend items
        }
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const value = tooltipItem.raw;
            return `${tooltipItem.label}: ${value}%`;
          }
        }
      }
    }
  }
});


