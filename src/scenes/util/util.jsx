import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { Util, Til } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import BasicDemo from "../calendar/calendar";
import {Box, Typography} from "@mui/material";
import React, { useState } from "react";
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
const Contaacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [showTable, setShowTable] = useState(false);
  const [datetime24, setDateTime24] = useState(null);
  const [datetime24h, setDateTime24h] = useState(null);
  const [dataToShow, setDataToShow] = useState(Til);
  const columns = [

    {
      field: "name",
      headerName: "Город",
      flex: 1,
      cellClassName: "name-column--cell",
    },


    {
      field: "email",
      headerName: "Место",
      flex: 1,
    },
        {
      field: "phone",
      headerName: "Утилизация, %",
      flex: 1,
    },


  ];
  const handleSearchClick = () => {
    setShowTable(true);
    setDataToShow(dataToShow === Til ? Util : Til);
  };

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
            <Calendar locale="es" dateFormat="dd/mm/yy" />
        </div>
   </Typography> 

  </Box>


  <Box
    gridColumn="span 4"
    gridRow="span 2"

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
            <Calendar locale="es" id="calendar-24h"  dateFormat="dd/mm/yy"/>
        </div>
    </Typography>
    
  </Box>
  <Box
    gridColumn="span 4"
    gridRow="span 2"

  >
    <Typography
      variant="h5"
      fontWeight="600"
      marginTop="6px"
    >
        <button style={{marginTop: "20px"}}onClick={handleSearchClick}>Найти</button>
    </Typography>
    
  </Box>

</Box>
</div>

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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {showTable && (<DataGrid
          rows={dataToShow}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          localeText={localizedTextsMap}
        />
        )}
      </Box>
    </Box>
  );
};

export default Contaacts;

/*     {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    }, */