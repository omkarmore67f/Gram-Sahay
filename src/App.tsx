import { useEffect, useState } from "react";
import { LoginPage } from "./pages/LoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { ComplaintFilingPage } from "./pages/ComplaintFilingPage";
import { ComplaintTrackingPage } from "./pages/ComplaintTrackingPage";
import { SchemeAwarenessPage } from "./pages/SchemeAwarenessPage";

type Screen = "login" | "dashboard" | "complaint-filing" | "complaint-tracking" | "scheme-awareness";

function App() {
  const [screen, setScreen] = useState<Screen>("login");

  useEffect(() => {
    const session = localStorage.getItem("gramSahaySession");
    if (session) {
      setScreen("dashboard");
    }
  }, []);

  const handleGoToDashboard = () => {
    setScreen("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("gramSahaySession");
    setScreen("login");
  };

  const handleBackToDashboard = () => {
    setScreen("dashboard");
  };

  switch (screen) {
    case "dashboard":
      return (
        <DashboardPage
          onLogout={handleLogout}
          onNavigateToComplaintFiling={() => setScreen("complaint-filing")}
          onNavigateToComplaintTracking={() => setScreen("complaint-tracking")}
          onNavigateToSchemeAwareness={() => setScreen("scheme-awareness")}
        />
      );
    case "complaint-filing":
      return <ComplaintFilingPage onBack={handleBackToDashboard} />;
    case "complaint-tracking":
      return <ComplaintTrackingPage onBack={handleBackToDashboard} />;
    case "scheme-awareness":
      return <SchemeAwarenessPage onBack={handleBackToDashboard} />;
    default:
      return <LoginPage onGoToDashboard={handleGoToDashboard} />;
  }
}

export default App;

