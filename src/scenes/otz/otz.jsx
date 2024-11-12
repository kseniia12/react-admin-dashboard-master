import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Otzeta, Otzetas } from "../../data/mockData";

import { Calendar } from 'primereact/calendar';



import { mockDataTeam, mockData, Mock } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Box, Typography, useTheme } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { addLocale } from 'primereact/api';
addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', ],
  monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  today: 'Hoy',
  clear: 'Claro'
});
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
        // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
  `${visibleCount.toLocaleString()} от ${totalCount.toLocaleString()}`,
    
      MuiTablePagination: {
        labelRowsPerPage: "Размер страницы",
        footerPagination: " из "
      }
};
const Otzet = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showTable, setShowTable] = useState(false);
  const [dataToShow, setDataToShow] = useState(Otzeta);
  const [showChat, setShowChat] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filters, setFilters] = useState({
    name: '',
    ci: '',
    email: '',
    access: '',
  });
  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setShowChat(true);
  };
  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  const handleSearchClick = () => {
    setShowTable(true);
    setDataToShow(Otzeta)
  };
  const filteredData = Otzeta.filter((row) => {
    return (
      row.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    
      row.email.toLowerCase().includes(filters.email.toLowerCase())
      
    );
  });
  const Click = () => {
    if (dataToShow === Otzeta) {
      setDataToShow(Otzetas); // Переключаемся на данные из Lan при первом нажатии
    } else {
      setDataToShow(Otzeta); // Переключаемся обратно на данные из Util при втором нажатии
    }
  };

  const columns = [
    {
        field: "name",
        headerName: "ФИО",
        flex: 1,
      },
      {
        field: "email",
        headerName: "Тема договора",
        flex: 1,
      },
      {
        field: "phone",
        headerName: "Начало действия",
        flex: 1,
      },
      {
        field: "city",
        headerName: "Конец действия",
        flex: 1,
      },
      {
        renderCell: () => (
            <a
            href ={require("../../../src/word/Dogovor_arendy.doc")}
    
            download="Example-PDF-document"
            target="_blank"
            rel="noreferrer"
          >
            <button>Договор</button>
          </a>
              
        ),
    }
  ];
 
  return (
    <Box m="1px">
    
    <div className="card flex flex-wrap gap-3 p-fluid">
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap="60px"
      marginTop="1px"
    >
    <Box
        gridColumn="span 4"
        gridRow="span 2"
        /* p="30px" */
      >
        <Typography
      variant="h5"
      fontWeight="600"
      marginTop="6px"
        > 
                  <div className="flex-auto">
                <label htmlFor="calendar-12h" className="font-bold block mb-2">
                    C 
                </label>
                <Calendar locale="es" dateFormat="dd/mm/yy"/>
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
      marginTop="6px"
        >
                <div className="flex-auto">
                <label htmlFor="calendar-24h" className="font-bold block mb-2">
               По 
                </label>
                <Calendar locale="es" id="calendar-24h" dateFormat="dd/mm/yy"/>
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
      marginTop="6px"
        >
 <button style={{marginTop: "40px"}}onClick={handleSearchClick}>Найти</button>
 <button onClick={Click}>Удалить</button>
        </Typography>
        
      </Box>

    </Box>
    </div>
    
{/*     <Box display="flex">
      <Box m="10px"> */}
      <Box
        marginTop="20px"
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
        {showTable &&(<DataGrid
          checkboxSelection 
          rows={dataToShow}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={localizedTextsMap}
        />)}
      </Box>

      </Box>
      /*  <Box>

        <input
          type="text"
          placeholder="Фильтрация города"
          value={filters.email}
          onChange={(e) => handleFilterChange('email', e.target.value)}
        />
          <input
          type="text"
          placeholder="Фильтр номера места"
          value={filters.name}
          onChange={(e) => handleFilterChange('name', e.target.value)}
        />
      </Box> 
    </Box>
    </Box> */
  );
};

export default Otzet;