import { useEffect, useState } from "react";
import { UserLoginPage } from "./pages/UserLoginPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { ComplaintFilingPage } from "./pages/ComplaintFilingPage";
import { ComplaintTrackingPage } from "./pages/ComplaintTrackingPage";
import { SchemeAwarenessPage } from "./pages/SchemeAwarenessPage";

type Screen =
  | "user-login"
  | "admin-login"
  | "user-dashboard"
  | "admin-dashboard"
  | "complaint-filing"
  | "complaint-tracking"
  | "scheme-awareness";

type UserRole = "user" | "admin" | null;

function App() {
  const [screen, setScreen] = useState<Screen>("user-login");
  const [userRole, setUserRole] = useState<UserRole>(null);

  // Check session on mount and route based on role
  useEffect(() => {
    const session = localStorage.getItem("gramSahaySession");
    if (session) {
      try {
        const parsed = JSON.parse(session);
        if (parsed?.role) {
          setUserRole(parsed.role);
          // Route to appropriate dashboard based on role
          if (parsed.role === "admin") {
            setScreen("admin-dashboard");
          } else {
            setScreen("user-dashboard");
          }
        }
      } catch {
        // Invalid session, stay on user login
        setScreen("user-login");
      }
    }
  }, []);

  // Route protection: Ensure users can't access admin pages
  const handleScreenChange = (newScreen: Screen) => {
    // If trying to access admin pages, check role
    if (newScreen === "admin-dashboard" || newScreen === "admin-login") {
      const session = localStorage.getItem("gramSahaySession");
      if (session) {
        try {
          const parsed = JSON.parse(session);
          if (parsed?.role === "admin") {
            setScreen(newScreen);
          } else {
            // User trying to access admin page - redirect to user dashboard
            setScreen("user-dashboard");
          }
        } catch {
          setScreen("user-login");
        }
      } else {
        setScreen("admin-login");
      }
    } else {
      setScreen(newScreen);
    }
  };

  const handleUserLogin = () => {
    setUserRole("user");
    setScreen("user-dashboard");
  };

  const handleAdminLogin = () => {
    setUserRole("admin");
    setScreen("admin-dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("gramSahaySession");
    setUserRole(null);
    setScreen("user-login");
  };

  const handleBackToDashboard = () => {
    if (userRole === "admin") {
      setScreen("admin-dashboard");
    } else {
      setScreen("user-dashboard");
    }
  };

  switch (screen) {
    case "user-dashboard":
      return (
        <DashboardPage
          onLogout={handleLogout}
          onNavigateToComplaintFiling={() => setScreen("complaint-filing")}
          onNavigateToComplaintTracking={() => setScreen("complaint-tracking")}
          onNavigateToSchemeAwareness={() => setScreen("scheme-awareness")}
        />
      );
    case "admin-dashboard":
      return <AdminDashboardPage onLogout={handleLogout} />;
    case "complaint-filing":
      // Only users can file complaints
      if (userRole === "admin") {
        handleBackToDashboard();
        return null;
      }
      return <ComplaintFilingPage onBack={handleBackToDashboard} />;
    case "complaint-tracking":
      // Only users can track their complaints
      if (userRole === "admin") {
        handleBackToDashboard();
        return null;
      }
      return <ComplaintTrackingPage onBack={handleBackToDashboard} />;
    case "scheme-awareness":
      // Only users can access scheme awareness
      if (userRole === "admin") {
        handleBackToDashboard();
        return null;
      }
      return <SchemeAwarenessPage onBack={handleBackToDashboard} />;
    case "admin-login":
      return (
        <AdminLoginPage
          onGoToDashboard={handleAdminLogin}
          onSwitchToUser={() => setScreen("user-login")}
        />
      );
    default:
      return (
        <UserLoginPage
          onGoToDashboard={handleUserLogin}
          onSwitchToAdmin={() => setScreen("admin-login")}
        />
      );
  }
}

export default App;

