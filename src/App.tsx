import { useState } from "react";
import { TopNavigation } from "./components/TopNavigation";
import { FormulationPage } from "./components/FormulationPage";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { ResultsPage } from "./components/ResultsPage";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("formulation");

  const renderPage = () => {
    switch (activeMenu) {
      case "formulation":
        return <FormulationPage onNavigateToResults={() => {
          setActiveMenu("results");
          window.scrollTo(0, 0);
        }} />;
      case "results":
        return <ResultsPage 
          onNavigateBack={() => setActiveMenu("formulation")} 
          onNewAnalysis={() => {
            setActiveMenu("formulation");
            window.scrollTo(0, 0);
          }}
        />;
      case "map":
        return <PlaceholderPage title="Map" description="Interactive map visualization will be available here." />;
      case "ask":
        return <PlaceholderPage title="Ask" description="AI-powered question and answer interface coming soon." />;
      case "search":
        return <PlaceholderPage title="Search" description="Advanced search functionality for finding specific data." />;
      case "filter":
        return <PlaceholderPage title="Filter" description="Powerful filtering tools to refine your results." />;
      case "favorites":
        return <PlaceholderPage title="Favorites" description="Manage your saved and favorite configurations." />;
      case "predict":
        return <PlaceholderPage title="Predict" description="Machine learning predictions and analysis tools." />;
      default:
        return <FormulationPage onNavigateToResults={() => {
          setActiveMenu("results");
          window.scrollTo(0, 0);
        }} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <TopNavigation activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      {renderPage()}
    </div>
  );
}