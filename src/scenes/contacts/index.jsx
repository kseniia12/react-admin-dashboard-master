
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts, Chat } from "../../data/mockData";
import Header from "../../components/Header";


import { Box, Typography, useTheme } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
const localizedTextsMap = {
  columnMenuUnsort: "Отсортировать",
  columnMenuSortAsc: "Отсортировать по возрастанию",
  columnMenuSortDesc: "Отсортировать по убыванию",
  columnMenuFilter: "Фильтр",
  columnMenuHideColumn: "Скрыть столбцы",
  columnMenuShowColumns: "Показать столбцы",
    // Кнопки сверху
    toolbarExport: 'Экспорт',
    toolbarExportLabel: 'Экспорт',
    toolbarExportCSV: 'Загрузка в формате CSV',
    toolbarExportPrint: 'Печать',
    toolbarExportExcel: 'Загрузка в формате Excel',
    // Density selector toolbar button text
    toolbarDensity: 'Плотность',
    toolbarDensityLabel: 'Плотно',
    toolbarDensityCompact: 'Компактно',
    toolbarDensityStandard: 'Стандартно',
    toolbarDensityComfortable: 'Удобно',
     // Filters toolbar button text
  toolbarFilters: 'Фильтры',
  toolbarFiltersLabel: 'Показывать фильтры',
  toolbarFiltersTooltipHide: 'Скрывать фильтры',
  toolbarFiltersTooltipShow: 'Показывать фильтры',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,
      // Columns panel text
  columnsPanelTextFieldLabel: '"Найти столбец',
  columnsPanelTextFieldPlaceholder: 'Заголовок столбца',
  columnsPanelDragIconLabel: 'Изменить порядок столбца',
  columnsPanelShowAllButton: 'Показать все',
  columnsPanelHideAllButton: 'Скрыть все',
  toolbarColumns: 'Столбцы',
  toolbarColumnsLabel: 'Выберите столбцы',
  // Filter operators text
  filterOperatorContains: 'Cодержит',
  filterOperatorEquals: 'Равно',
  filterOperatorStartsWith: 'Начинается с',
  filterOperatorEndsWith: 'Заканчивается на',
  filterOperatorIs: 'Есть',
  filterOperatorNot: 'Нет',
  filterOperatorAfter: 'Находится после',
  filterOperatorOnOrAfter: 'Включен или после',
  filterOperatorBefore: 'Находится перед',
  filterOperatorOnOrBefore: 'Находится после',
  filterOperatorIsEmpty: 'Пуст',
  filterOperatorIsNotEmpty: 'Не пуст',
  filterOperatorIsAnyOf: 'Является любым из',
    // Filter panel text
    filterPanelAddFilter: 'Добавить фильтр',
    filterPanelDeleteIconLabel: 'Удалить',
    filterPanelLinkOperator: 'Логический оператор',
    filterPanelOperators: 'Оператор', // TODO v6: rename to filterPanelOperator
    filterPanelOperatorAnd: 'И',
    filterPanelOperatorOr: 'Или',
    filterPanelColumns: 'Столбцы',
    filterPanelInputLabel: 'Значение',
    filterPanelInputPlaceholder: 'Значение фильтра',
      // Root
      noRowsLabel: 'Нет строк',
      noResultsOverlayLabel: 'Результаты не найдены',
      errorOverlayDefaultLabel: 'Произошла ошибка',
      footerRowSelected: (count) =>
      count !== 1
        ? `${count.toLocaleString()} Выбранные строки`
        : `${count.toLocaleString()} Выбранная строка`,
        // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
  `${visibleCount.toLocaleString()} от ${totalCount.toLocaleString()}`,
    
      MuiTablePagination: {
        labelRowsPerPage: "Размер страницы",
        footerPagination: " из "
      }
};
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showChat, setShowChat] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowChat(true);
  };
  

  const handleCloseChat = () => {
    setShowChat(false);
  };
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessages([...messages, message]);
    setMessage("");
  };
  const columns = [
    {
      field: "name",
      headerName: "ФИО",
      flex: 1,
      cellClassName: "name-column--cell",
    },

/*     {
      field: "phone",
      headerName: "Номер телефона",
      flex: 1,
    }, */
/*     {
      field: "email",
      headerName: "Email",
      flex: 1,
    }, */
    {
      field: "city",
      headerName: "Город",
      flex: 1,
    },
    {
      field: "office",
      headerName: "Адрес",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Место",
      flex: 1,
    },
   /*  {
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {params.value}
          <button variant="contained" color="primary"  onClick={() => handleContactClick(params.row)}>Чат</button>
         </Box>
      ),
    }, */
  ];

  return (
    <Box m="1px">
    
      <Box
        height="90vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
            
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckBox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={Chat}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={localizedTextsMap}
        />
      </Box>
    </Box>

   
  );
};

export default Contacts;

{/*  {showChat && selectedContact && (
  <Box mt="40px" height="200px">
{selectedContact && (
  <Box width="400px" border="3px solid #f0f0f0">
  <Box display="flex" alignItems="center">
    <img style={{ width: "70px", height: "70px" }} src="../../assets/user.png" alt="" />
    <h4 style={{ marginLeft: "15px", flexGrow: 1 }}>{selectedContact.name}</h4>
  </Box>
  <Box display="flex" flexDirection="column" >
   
   <div style={{ display: "flex", margin: "5px", color: "black" }}>
     <div style={{ background: "#f0f0f0", padding: "10px", borderRadius: "10px" }}>
       <Typography>Здравствуйте, Вы сегодня будете в офисе?</Typography>
     </div>
   </div>

</Box>
  <Box display="flex" flexDirection="column" style={{ minHeight: "350px", maxHeight: "350px", overflowY: "auto" }}>
    {messages.map((msg, index) => (
      <div key={index} style={{ display: "flex", justifyContent: "flex-end", margin: "5px", color: "black" }}>
        <div style={{ background: "#f0f0f0", padding: "10px", borderRadius: "10px" }}>
          <Typography>{msg}</Typography>
        </div>
      </div>
    ))}
  </Box>
  <Box mt="auto">
    <form onSubmit={handleSubmit}>
      <Box display="flex">
        <TextField
          label="Введите сообщение"
          variant="outlined"
          value={message}
          onChange={handleMessageChange}
          fullWidth
        />
        <button type="submit" variant="contained" color="primary">
          Отправить
        </button>
        <button onClick={handleCloseChat} style={{ position: 'absolute', top: '110px', right: '7px', cursor: 'pointer', backgroundColor: 'white', border: 'none' }}>X</button>
      </Box>
    </form>
  </Box>
</Box>
)}
</Box>
)} */}

/* import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts; */
