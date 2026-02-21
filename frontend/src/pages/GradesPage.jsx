
import { useEffect, useState } from "react";

function GradesPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://3.91.202.49:3001/grades")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <p>Loading...</p>;
  console.log(data); // TODO: TEMP FOR DEV

  return (
    <div>
      <h2>All Grades</h2>
      {data.grades.map((g) => (
        <p key={g.id}>
          {g.studentId} — {g.grade}
        </p>
      ))}

      <h3>Average: {data.average}</h3>
    </div>
  );
}

export default GradesPage;
