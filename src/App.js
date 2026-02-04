import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Contaacts from "./scenes/util/util";
import BasicDemo from "./scenes/call/call";
import Reting from "./scenes/reting/reting";
import Activ from "./scenes/activ/activ";
import Otzet from "./scenes/otz/otz";
import ProgressCircle from "./components/ProgressCircle";
import Ret from "./components/Reting";
import Linia from "./scenes/linia/linia";
import TestAIPage from './scenes/TestAIPage';
import PredictionsPage from './scenes/predictions';
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/util" element={<Contaacts />} />
              <Route path="/call" element={<BasicDemo />} />
              <Route path="/reting" element={<Reting />} />
              <Route path="/activ" element={<Activ />} />
              <Route path="/otzet" element={<Otzet />} />
              <Route path="/prog" element={<ProgressCircle />} />
              <Route path="/ret" element={<Ret />} />
              <Route path="/linia" element={<Linia />} />
              <Route path="/test-ai" element={<TestAIPage />} />
              <Route path="/predictions" element={<PredictionsPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
