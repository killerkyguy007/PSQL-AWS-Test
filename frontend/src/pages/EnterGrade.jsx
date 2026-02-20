
import { useState } from "react";

function EnterGrade({ onNavigate }) {
  const [studentId, setStudentId] = useState("");
  const [grade, setGrade] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const base = import.meta.env.VITE_API_URL ?? "";
    const apiUrl = base ? `${base.replace(/\/$/, "")}/add-grade` : "/add-grade";

    try {
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, grade }),
      });
    } catch (err) {
      console.error("Failed to submit grade", err);
    }

    if (typeof onNavigate === "function") onNavigate("/grades");
    else window.location.href = "/grades";
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Student ID"
        onChange={(e) => setStudentId(e.target.value)}
        value={studentId}
      />
      <input
        placeholder="Grade"
        type="number"
        onChange={(e) => setGrade(e.target.value)}
        value={grade}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EnterGrade;
