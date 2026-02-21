/* 
* Kyran Day, 02/2026
* This page is for displaying all grades and the average grade.
* It fetches the data from the backend and renders it in a simple format.
*/
import { useEffect, useState } from "react";

function GradesPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://3.91.202.49:3001/grades")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2>All Grades</h2>
      {data.studentIds.map((id, i) => (
        <p key={i}>
          {id}: {data.grades[i]}
        </p>
      ))}

      <h3>Average: {data.average}</h3>
    </div>
  );
}

export default GradesPage;
