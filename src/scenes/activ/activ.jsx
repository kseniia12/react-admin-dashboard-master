import { DataGrid, GridToolbar/* , LocalizationProvider, AdapterDateFns */} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Activss, ActivssS } from "../../data/mockData";
import Header from "../../components/Header";
import { Calendar } from 'primereact/calendar';
/* import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'; */
/* import ruLocale from 'date-fns/locale/ru'; */
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


const Activ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showTable, setShowTable] = useState(false);
  const [dataToShow, setDataToShow] = useState(ActivssS);
  const [filters, setFilters] = useState({
    name: '',
    ci: '',
    email: '',
    access: '',
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const filteredData = Activss.filter((row) => {
    return (
      row.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    
      row.email.toLowerCase().includes(filters.email.toLowerCase())
      
    );
  });
  const handleSearchClick = () => {
    setShowTable(true);
    setDataToShow(dataToShow === ActivssS ? Activss : ActivssS);
    
  };

  const columns = [
    {
        field: "name",
        headerName: "ФИО",
        flex: 1,
      },
      // {
      //   field: "email",
      //   headerName: "Email",
      //   flex: 1,
      // },
      {
        field: "phone",
        headerName: "Телефон",
        flex: 1,
      },
      {
        field: "access",
        headerName: "Роль",
        flex: 1,
      },
      {
        field: "kol",
        headerName: "Количество занятий/дней",
        flex: 1,
      },
      {
        field: "sum",
        headerName: "Сумма",
        flex: 1,
      }
      
  ];

  return (
    <Box m="1px">
    <div className="card flex flex-wrap gap-3 p-fluid">
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gap="60px"
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
                <Calendar locale="es" /* id="calendar-12h" value={datetime24} onChange={(e) => setDateTime24(e.value)} showTime hourFormat="24"*/ dateFormat="dd/mm/yy" /*timeMax="00:30" timeMin="23:30" hourOptions="30" minuteOptions="0" stepMinute="30" */ />
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
                <Calendar locale="es" id="calendar-24h" /* value={datetime24h} onChange={(e) => setDateTime24h(e.value)} showTime hourFormat="24"*/ dateFormat="dd/mm/yy"/*timeMax="00:30" timeMin="23:30" hourOptions="30" minuteOptions="0" stepMinute="30" *//>
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
          "& .MuiCheckBox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
       {showTable && (
        
       <DataGrid
          rows={dataToShow}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={localizedTextsMap}
        />
       
        )}
      </Box>

      </Box>
/*       <Box>

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

export default Activ;