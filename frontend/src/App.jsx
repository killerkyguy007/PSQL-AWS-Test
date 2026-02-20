import { useEffect, useState } from "react";
import EnterGrade from "./pages/EnterGrade";
import GradesPage from "./pages/GradesPage";
import "./App.css";

function App() {
  const [route, setRoute] = useState(window.location.pathname || "/");

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (path) => {
    if (path === route) return;
    window.history.pushState({}, "", path);
    setRoute(path);
  };

  let content = null;
  if (route === "/grades") content = <GradesPage />;
  else content = <EnterGrade onNavigate={navigate} />;

  return (
    <div className="App">
      <header style={{ display: "flex", gap: 8, padding: 12 }}>
        <button onClick={() => navigate("/")}>Enter Grade</button>
        <button onClick={() => navigate("/grades")}>All Grades</button>
      </header>
      <main style={{ padding: 12 }}>{content}</main>
    </div>
  );
}

export default App;
