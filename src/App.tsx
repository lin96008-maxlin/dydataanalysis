import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Workbench from "@/pages/Workbench";
import TicketQualityInspection from "@/pages/TicketQualityInspection";
import TagOperation from "@/pages/TagOperation";
import TagManagement from "@/pages/TagManagement";
import RelationshipGraph from "@/pages/RelationshipGraph";
import ThemeMonitoring from "@/pages/ThemeMonitoring";
import SamplingTest from "@/pages/SamplingTest";
import MultiDimensionAnalysis from "@/pages/MultiDimensionAnalysis";
import PublicOpinion from "@/pages/PublicOpinion";
import { useState } from "react";
import { AuthContext } from '@/contexts/authContext';
import { Layout } from "@/components/Layout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/workbench" element={<Layout><Workbench /></Layout>} />
        <Route path="/ticket-quality-inspection" element={<Layout><TicketQualityInspection /></Layout>} />
        <Route path="/tag-operation" element={<Layout><TagOperation /></Layout>} />
        <Route path="/tag-management" element={<Layout><TagManagement /></Layout>} />
        <Route path="/relationship-graph" element={<Layout><RelationshipGraph /></Layout>} />
        <Route path="/theme-monitoring" element={<Layout><ThemeMonitoring /></Layout>} />
        <Route path="/sampling-test" element={<Layout><SamplingTest /></Layout>} />
        <Route path="/multi-dimension-analysis" element={<Layout><MultiDimensionAnalysis /></Layout>} />
        <Route path="/public-opinion" element={<Layout><PublicOpinion /></Layout>} />
      </Routes>
    </AuthContext.Provider>
  );
}
