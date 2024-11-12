import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Bar = () => {
  return (
    <Box m="20px">
      <h2>Гистограмма городов и их офисов</h2>
      {/* <Header title="Гистограмма городов и их офисов" subtitle="Simple Bar Chart" /> */}
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Bar;
