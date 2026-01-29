import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid,  GridToolbar} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam, mockData, Mock } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import React, { useState } from "react";
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
        // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
  `${visibleCount.toLocaleString()} от ${totalCount.toLocaleString()}`,
    
      MuiTablePagination: {
        labelRowsPerPage: "Размер страницы",
        footerPagination: " из "
      }
};


const Team = () => {
  const [showForm, setShowForm] = useState(false);
  const [firstName, setFirstName] = useState('Орлов Максим Иванович');
  const [lastName, setLastName] = useState('orlov@bk.ru');
  const [fon, setFon] = useState('89896192623');
  const [ot, setLastot] = useState('08.12.1978');
  const [rol, setRol] = useState('Клиент');
  const [cod, setCose] = useState('Клиент')
  const [dataToShow, setDataToShow] = useState(mockDataTeam);
  const [dataShow, setDataShow] = useState(mockData);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "ФИО",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Дата рождения",
      flex: 1,
    },
    {
      field: "age",
      headerName: "Email",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "fon",
      headerName: "Телефон",
      flex: 1,
    },
    {
      field: "code",
      headerName: "Роль",
      flex: 1,
    },
    /* {
      field: "phone",
      headerName: "Телефон",
      flex: 1,
    }, */
   
  /*   {
      field: "accessLevel",
      headerName: "Роль",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {access === "manager" && <SecurityOutlinedIcon />}
            {access === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    }, */
  ];
  const handleButtonClick = () => {
    setShowForm(true);
  }

  const handleCloseForm = () => {
    setShowForm(false);
  }


  const handleSearchClick = () => {
    if (dataToShow === mockDataTeam) {
      setDataToShow(mockData); // Переключаемся на данные из Lan при первом нажатии
    } else {
      setDataToShow(mockDataTeam); // Переключаемся обратно на данные из Util при втором нажатии
    }
  };
  
  const Click = () => {
    if (dataToShow === mockData) {
      setDataToShow(Mock); // Переключаемся на данные из Lan при первом нажатии
    } else {
      setDataToShow(mockData); // Переключаемся обратно на данные из Util при втором нажатии
    }
  };


  return (
    <Box m="20px">
      <h2>Управление пользователями</h2>
      <button onClick={handleButtonClick}>Редактировать</button>
      <button onClick={Click}>Удалить</button>
      <Box
        m="1px 0 0 0"
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
        }}
      >
               <DataGrid checkboxSelection
          rows={dataToShow}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={localizedTextsMap}
          
        />
        {showForm && (
        <div style={{width: '600px', height: '350px', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'black', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
          <button onClick={handleCloseForm} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer', backgroundColor: 'white', border: 'none' }}>X</button>
          <form style = {{marginLeft: "40px", marginTop: "40px"}}>
      <label htmlFor="first-name">ФИО:</label>
      <input style={{marginLeft: "218px", width:"200px"}}
        id="first-name"
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <br />
      <br />
            <label htmlFor="first-ot" >Дата рождения:</label>
      <input style={{marginLeft: "155px",  width:"200px"}}
        id="first-name"
        type="text"
        value={ot}
        onChange={(e) => setLastot(e.target.value)}
      />
       <br />
      <br />
      <label htmlFor="last-name" style={{marginTop: "20px"}}>Email:</label>
      <input style={{marginLeft: "216px",  width:"200px"}}
        id="last-name"
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <br />
      <br />
{/*       <label htmlFor="profile-image">Телефон</label>
      <input style={{marginLeft: "195px",  width:"200px"}}
        id="on"
        type="text"
        value={on}
        onChange={(e) => setLastNameL(e.target.value)}
      /> */}
    {/*   <br />
      <br /> */}

      <label htmlFor="profile-image">Номер телефона: </label>
      <input style={{marginLeft: "250px",  width:"200px"}}
        id="fon"
        type="text"
        value={fon}
        onChange={(e) => setFon(e.target.value)}
      />
          <br />
          <br />
      <label htmlFor="last-name" style={{marginTop: "20px"}}>Роль:</label>
      <input style={{marginLeft: "218px",  width:"200px"}}
        id="code"
        type="text"
        value={cod}
        onChange={(e) => setCose(e.target.value)}
      />
  
      <br />
      <br />
      <br />
   
      
      <button style={{marginLeft: "200px"}} onClick={handleSearchClick} type="button">Сохранить</button>
    </form>
        </div>
      )}
      </Box>
    </Box>
  );
};

export default Team;
