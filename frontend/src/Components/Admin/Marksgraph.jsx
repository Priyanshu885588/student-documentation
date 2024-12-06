import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { getanalyzeddata } from "./services/Api";
import { VerticalNavbar } from "./Navbar/VerticalNavbar";

const MarksGraph = () => {
  const [chartData, setChartData] = useState(null);
  const [data, setOriginaldata] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getanalyzeddata();
        console.log(data.data);
        setOriginaldata(data.data);
      } catch (error) {}
    };
    fetch();
  }, []);

  const processData = () => {
    console.log(data);
    const subjects = [];
    const internalMarks = [];
    const externalMarks = [];
    const totalMarks = [];

    // Iterate over each user's data and combine the marks
    data.forEach((user) => {
      const analysedInfo = JSON.parse(user.analysedinfo);

      for (const [subject, marks] of Object.entries(analysedInfo)) {
        if (!subjects.includes(subject)) {
          subjects.push(subject);
          internalMarks.push(marks["Internal Marks"]);
          externalMarks.push(marks["External Marks"]);
          totalMarks.push(marks["Total Marks"]);
        } else {
          // Aggregate the marks for each subject across users
          const subjectIndex = subjects.indexOf(subject);
          internalMarks[subjectIndex] += marks["Internal Marks"];
          externalMarks[subjectIndex] += marks["External Marks"];
          totalMarks[subjectIndex] += marks["Total Marks"];
        }
      }
    });

    // Find the maximum values for each category
    const maxInternal = Math.max(...internalMarks);
    const maxExternal = Math.max(...externalMarks);
    const maxTotal = Math.max(...totalMarks);

    // Normalize the data based on the maximum values to scale them to 0-100 range
    const normalizedInternalMarks = internalMarks.map(
      (mark) => (mark / maxInternal) * 100
    );
    const normalizedExternalMarks = externalMarks.map(
      (mark) => (mark / maxExternal) * 100
    );
    const normalizedTotalMarks = totalMarks.map(
      (mark) => (mark / maxTotal) * 100
    );

    // Set the chart data with normalized values
    setChartData({
      lineData: {
        labels: subjects,
        datasets: [
          {
            label: "Internal Marks",
            data: normalizedInternalMarks,
            fill: false,
            borderColor: "#4CAF50",
            tension: 0.1,
            borderWidth: 2,
          },
          {
            label: "External Marks",
            data: normalizedExternalMarks,
            fill: false,
            borderColor: "#2196F3",
            tension: 0.1,
            borderWidth: 2,
          },
          {
            label: "Total Marks",
            data: normalizedTotalMarks,
            fill: false,
            borderColor: "#FF9800",
            tension: 0.1,
            borderWidth: 2,
          },
        ],
      },
    });
  };

  useEffect(() => {
    processData();
  }, [data]);

  if (!chartData) return null;

  return (
    <>
      <VerticalNavbar />
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Marks Trends
        </h2>

        <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
          <h4 className="text-sm text-center mb-4">
            Marks Trend Across Subjects
          </h4>
          <div
            style={{ width: "100%", overflowX: "auto", marginBottom: "20px" }}
            className="h-[90vh]"
          >
            <Line
              data={chartData.lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Subjects",
                    },
                    ticks: {
                      font: {
                        size: 8, // Make the font size smaller
                      },
                      maxRotation: 45, // Rotate the labels to make them more readable
                      minRotation: 30, // Minimum rotation angle
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Marks",
                    },
                    ticks: {
                      beginAtZero: true,
                      max: 100, // Limit the max value to 100
                      stepSize: 10, // Adjust step size for tick marks (optional)
                      callback: function (value) {
                        return value <= 100 ? value : null; // Only show ticks up to 100
                      },
                    },
                  },
                },
                plugins: {
                  legend: {
                    position: "top",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MarksGraph;
