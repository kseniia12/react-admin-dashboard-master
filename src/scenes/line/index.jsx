import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import React, { useState } from "react";
const Line = () => {
  const [showTable, setShowTable] = useState(false);
  const handleSearchClick = () => {
    setShowTable(true);
  };
  return (
    <Box m="20px">
      <h2>Рейтинг мест</h2>
     {/*  <Header title="Рейтинг мест" subtitle="Simple Line Chart" /> */}
{/*       <Box style={{display: 'flex'}}>
      <Box style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
              <p style={{ marginRight: '10px' }}>Город — </p>
             <select name="employees">
             <option value="trainee">Ростов-на-Дону</option>
						<option value="employees">Москва</option>
						<option value="colleague">Таганрог</option>
					</select>
          </Box>       
          <Box style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
              <p style={{ marginRight: '10px' }}>Город — </p>
             <select name="employees">
             <option value="trainee">Ленинградский проспект, д. 36, стр. 11у</option>
						<option value="employees">3-й Нижнелихоборский проезд, 1Ас6</option>
						<option value="colleague">ул. 1-я Машиностроения 10</option>
					</select>
          </Box> 
          <Box style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
             <button onClick={handleSearchClick}>Найти</button>
          </Box> 
      </Box> */}

      <Box height="75vh">
     <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
