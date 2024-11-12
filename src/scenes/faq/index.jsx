import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import React, { useState } from "react";


const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Хранит текущее значение строки ввода
  const [selectedFile, setSelectedFile] = useState("null"); // Хранит выбранный файл

  const handleButtonClick = () => {
    setShowForm(true);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  }
  const handleSave = () => {
  
    setTimeout(() => {
      setInputValue("");
      setSelectedFile("");
      setShowForm(false);
    }, 500);
  };
  const initialRequests = [
    {
      id: 1,
      title: 'От резидента Волошина Ивана',
      description: 'Соболев Андрей Викторович',
      /* author: 'От резидента Волошина Ивана', */
    },
/*     {
      id: 2,
      title: 'Поломка компьютера',
      description: 'На рабочем месте №13 не запускается компьютер',
      author: 'От резидента Волошина Ивана'
    } */
  ];


  const initialR = [
    {
      id: 1,
      title: 'Уборка помещения',
      description: 'Волошин Иван Александрович',
      /* author: 'От резидента Волошина Ивана' */
    }
    
  ];





  const [requests, setRequests] = useState(initialRequests);
  const [reque, setReque] = useState(initialR);




  const handleRequestDone = (id) => {
    const updatedRequests = requests.filter(request => request.id !== id);
    setRequests(updatedRequests);
  };

  const handleRequeDone = (id) => {
    const updatedReq = reque.filter(reque => reque.id !== id);
    setReque(updatedReq);
  };


  return (
    <Box m="20px">
      <Header title="Список заявок"/>
      <h3>СДАЧА ПОМЕЩЕНИЙ В АРЕНДУ</h3>
      {requests.map(request => (

        <Accordion key={request.id} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              {request.description}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
         {/*    <Typography>
              {request.description}
            </Typography> */}
            <Typography>
              {request.author}
            </Typography>
            <Typography>
            <a href ={require("../../../src/word/Dogovor_arendy.doc")}
              download="Example-PDF-document"
              target="_blank"
              rel="noreferrer">Договор</a>
            </Typography>
            <br/>
             
            <button onClick={handleButtonClick}>Ответить</button>
            <button onClick={() => handleRequestDone(request.id)}>Принять</button>
            <button onClick={() => handleRequestDone(request.id)}>Отклонить</button>
            {showForm && (
             <Box
             sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               bgcolor: "background.paper",
               boxShadow: 24,
               p: 4,
               borderRadius: 2
             }}
           >
             <Typography variant="h3" textAlign="center">
               Оформление заявки
             </Typography>
             <h3>Комментарий</h3>
             <input
               style={{ width: "500px", fontSize: "20px" }}
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
             />
             <br />
             <form action="/action_page.php" style={{ marginTop: "20px" }}>
               <h3 htmlFor="myfile">При необходимости прикрепите файл:</h3>
               <input
                 type="file"
                 id="myfile"
                 name="myfile"
                 onChange={(e) => setSelectedFile(e.target.files[0])}
                
               />
               <br />
             </form>
             <Box textAlign="center" marginTop="20px">
               <button onClick={handleSave}>Отправить</button>
             </Box>
           </Box>

      )}
          </AccordionDetails>
        </Accordion>
      ))}
<h3>БРОНИРОВАНИЯ</h3>
{reque.map(request => (

<Accordion key={request.id} defaultExpanded>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    <Typography color={colors.greenAccent[500]} variant="h5">
      {request.description}
    </Typography>
  </AccordionSummary>
  <AccordionDetails>

    <Typography>
      {request.author}
    </Typography>
    <Typography>
            <a href ={require("../../../src/word/Dogovor_arendy.doc")}
              download="Example-PDF-document"
              target="_blank"
              rel="noreferrer">Договор</a>
            </Typography>
    <br/>
    <button onClick={handleButtonClick}>Ответить</button>
    <button onClick={() => handleRequeDone(request.id)}>Принять</button>
    <button onClick={() => handleRequeDone(request.id)}>Отклонить</button>
  </AccordionDetails>
</Accordion>
))}
    </Box>
  );
};

export default FAQ;


/* const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState(""); // Хранит текущее значение строки ввода
  const [selectedFile, setSelectedFile] = useState("null"); // Хранит выбранный файл

  const handleButtonClick = () => {
    setShowForm(true);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  }
  const handleSave = () => {
  
    setTimeout(() => {
      setInputValue("");
      setSelectedFile("");
      setShowForm(false);
    }, 500);
  };
  return (
    <Box m="20px">
     <h2>Заявки</h2>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Сдача помещения в аренду
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <a href ={require("../../../src/word/Dogovor_arendy.doc")}
              download="Example-PDF-document"
              target="_blank"
              rel="noreferrer">Условия</a>
          <h4>От Орлова Максима Ивановича</h4>
          <button onClick={handleButtonClick}>Ответить на заявку</button>
          <button onClick={handleButtonClick}>Одобрить</button>
          {showForm && (
             <Box
             sx={{
               position: "absolute",
               top: "50%",
               left: "50%",
               transform: "translate(-50%, -50%)",
               bgcolor: "background.paper",
               boxShadow: 24,
               p: 4,
               borderRadius: 2
             }}
           >
             <Typography variant="h3" textAlign="center">
               Оформление заявки
             </Typography>
             <h3>Комментарий</h3>
             <input
               style={{ width: "500px", fontSize: "20px" }}
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
             />
             <br />
             <form action="/action_page.php" style={{ marginTop: "20px" }}>
               <h3 htmlFor="myfile">При необходимости прикрепите файл:</h3>
               <input
                 type="file"
                 id="myfile"
                 name="myfile"
                 onChange={(e) => setSelectedFile(e.target.files[0])}
                
               />
               <br />
             </form>
             <Box textAlign="center" marginTop="20px">
               <button onClick={handleSave}>Сохранить</button>
             </Box>
           </Box>

      )}
        </AccordionDetails>
       
      </Accordion>
   
    </Box>
  );
};

export default FAQ; */
 {/*   <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Another Important Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Your Favorite Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Some Random Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            The Final Question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}