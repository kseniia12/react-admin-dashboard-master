import {Box, Typography} from "@mui/material";
import React, { useState } from "react";
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-cyan/theme.css";
export default function BasicDemo() {
  const [datetime24, setDateTime24] = useState(null);
  const [datetime24h, setDateTime24h] = useState(null);
  
    return (



         <Box  marginLeft="50px" >
<Typography
      variant="h5"
      fontWeight="400"
    > 
             <Box style={{display: 'flex', alignItems: 'center', marginLeft: '98px' }}>
              <p style={{ marginRight: '10px' }}>Тип места — </p>
             <select name="employees">
						<option value="employees">Рабочее место</option>
						<option value="trainee">Переговорная комната</option>
						<option value="colleague">Конференц зал</option>
					</select>
          </Box> 
   </Typography> 
<Typography
      variant="h5"
      fontWeight="600"
    > 
             <Box style={{display: 'flex', alignItems: 'center', marginLeft: '98px' }}>
              <p style={{ marginRight: '10px' }}>Номер места — </p>
              <input/>
              </Box> 
   </Typography> 
   <Typography
      variant="h5"
      fontWeight="600"
    > 
             <Box style={{marginLeft: '98px' }}>
              <p>Оборудование: </p> 
              <div>
                <input type="checkbox" id="scales" name="scales"/>
                <label for="scales">Принтер</label>
              </div>
              <div>
                <input type="checkbox" id="horns" name="horns" />
                <label for="horns">Телефон</label>
              </div>
              <div>
                <input type="checkbox" id="scales" name="scales"/>
                <label for="scales">Компьютер</label>
              </div>
              <div>
                <input type="checkbox" id="scales" name="scales"/>
                <label for="scales">Док-станция для ноутбука</label>
              </div>
              <div>
                <input type="checkbox" id="scales" name="scales"/>
                <label for="scales">Два монитора</label>
              </div>
  </Box> 
   </Typography> 
   <Box style={{display: 'flex', alignItems: 'center', marginLeft: '98px' }}>
              <p style={{ marginRight: '10px' }}>Цена за час — </p>
              <input/>
              </Box> 


<div className="card flex flex-wrap gap-3 p-fluid">
<Box
  display="grid"
  gridTemplateColumns="repeat(12, 1fr)"
  gridAutoRows="140px"
  gap="60px"
/*   marginTop="0px" */
>




  <Box
    gridColumn="span 4"
    gridRow="span 2"
    /* p="30px" */
  >

 
    <Typography
      variant="h5"
      fontWeight="600"
      marginTop="20px"
    > 
              <div className="flex-auto">
            <label htmlFor="calendar-12h" className="font-bold block mb-2">
                Дата и время начала 
            </label>
            <Calendar id="calendar-12h" value={datetime24} onChange={(e) => setDateTime24(e.value)} showTime hourFormat="24" dateFormat="dd/mm/yy" timeMax="00:30" timeMin="23:30" hourOptions="30" minuteOptions="0" stepMinute="30" />
        </div>
   </Typography> 

  </Box>


  <Box
    gridColumn="span 4"
    gridRow="span 2"
   /*  p="30px" */
  >
    <Typography
      variant="h5"
      fontWeight="600"
      marginTop="20px"
    >
            <div className="flex-auto">
            <label htmlFor="calendar-24h" className="font-bold block mb-2">
            Дата и время окончания 
            </label>
            <Calendar id="calendar-24h" value={datetime24h} onChange={(e) => setDateTime24h(e.value)} showTime hourFormat="24" dateFormat="dd/mm/yy" timeMax="00:30" timeMin="23:30" hourOptions="30" minuteOptions="0" stepMinute="30"/>
        </div>
    </Typography>
    
  </Box>


</Box>
</div>
</Box> 


    )
    
}