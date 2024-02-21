import React, { useEffect, useState } from "react";
import { getSingleStudentData } from "./services/Api";

export const SingleStudentDetails = ({ id, batch, handleSingleStudent }) => {
  const [studentData, setStudentData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSingleStudentData(batch, id);
        if (data) {
          setStudentData(data);
        }
        console.log(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Student Details</h2>
      <button onClick={handleSingleStudent}>back⬅️</button>
      {studentData && studentData.data && studentData.data.length > 0 && (
        <table>
          <tbody>
            {Object.entries(studentData.data[0]).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
