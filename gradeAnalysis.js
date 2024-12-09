// JavaScript file for grades.html to add dynamic charts and animations.

const ctx3 = document.getElementById("subjectTrendsChart").getContext("2d");
new Chart(ctx3, {
  type: "radar",
  data: {
    labels: [
      "Data Structures",
      "Discrete Mathematics",
      "Operating Systems",
      "Software Engineering",
      "Digital Logic",
      "Computer Networks",
    ],
    datasets: [
      {
        label: "Your Performance",
        data: [91, 85, 87, 92, 89, 83],
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "#4caf50",
      },
      {
        label: "Class Average",
        data: [87, 80, 86, 88, 84, 82],
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: "#2196f3",
      },
    ],
  },
  options: {
    responsive: true,
  },
});

const cgpaTimelineCtx = document.getElementById("cgpaTimelineChart").getContext("2d");

// Define data for semesters and CGPA
const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];
const cgpa = [8.5, 8.7, 8.9, 9.0]; // CGPA per semester

new Chart(cgpaTimelineCtx,{
  type: "line",
  data: {
    labels: semesters,
    datasets: [
      {
        label: "Overall CGPA",
        data: cgpa,
        borderColor: "#2196f3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderWidth: 2,
        tension: 0.3,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        suggestedMin: 8.0,
        suggestedMax: 10.0,
        ticks: {
          stepSize: 0.2, // Improved readability for CGPA scale
        },
      },
    },
  }
});


// Function to generate and download the updated marksheet as a PDF
function downloadMarksheet() {
    const { jsPDF } = window.jspdf; // Access jsPDF from the global window object
    const doc = new jsPDF(); // Create a new PDF instance
  
    // Title
    doc.setFontSize(16);
    doc.text("Student Marksheet", 14, 20);
  
    // Table Headers & Data
    const columns = [
      "Subject",
      "Internal Marks",
      "External Marks",
      "Total Marks",
      "Credits",
      "Grade",
    ];
    const rows = [
      ["Data Structures", 45, 46, 91, 4, "A-"],
      ["Discrete Mathematics", 40, 45, 85, 3, "B"],
      ["Operating Systems", 43, 44, 87, 3.5, "B+"],
      ["Software Engineering", 47, 45, 92, 5, "A"],
      ["Digital Logic", 44, 45, 89, 4, "A-"],
      ["Computer Networks", 39, 44, 83, 3, "B"],
    ];
  
    const totalMarks = rows.map(row => row[3]); // Extract total marks for CGPA computation
  
    // Compute CGPA dynamically
    const overallCGPA = computeCGPA(totalMarks);
  
    // Display CGPA in the PDF
    doc.setFontSize(12);
    const cgpaText = `Overall CGPA: ${overallCGPA}`;
    doc.text(cgpaText, 14, 30);
  
    // Table rendering using autoTable
    doc.autoTable({
      head: [columns], // Add the updated table headers
      body: rows, // Add the updated table data
      startY: 40,
    });
  
    // Save the PDF
    doc.save("marksheet.pdf");
  }
  
  // Function to compute CGPA based on total marks (out of 100) for each subject
  function computeCGPA(totalMarks) {
    let totalPoints = 0;
  
    // Map total marks to CGPA on a 0-10 scale
    const getGPA = (marks) => {
      if (marks >= 90) return 10;
      if (marks >= 80) return 9;
      if (marks >= 70) return 8;
      if (marks >= 60) return 7;
      if (marks >= 50) return 6;
      return 5; // Below 50 marks maps to 5
    };
  
    // Compute total GPA points
    totalMarks.forEach((marks) => {
      totalPoints += getGPA(marks);
    });
  
    const cgpa = totalPoints / totalMarks.length; // Average the GPA points
    return cgpa.toFixed(2); // Return CGPA with 2 decimal precision
  }
  
  
// Initialize all charts and window once the DOM content is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    initializePieChart();
    initializeBarChart();
    showCGPAWindow();
});
