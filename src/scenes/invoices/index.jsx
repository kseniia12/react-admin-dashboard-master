import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import Header from "../../components/Header";
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
const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
   /*  { field: "id", headerName: "ID" }, */
    {
      field: "name",
      headerName: "Город",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "office",
      headerName: "Адреса",
      flex: 1,
      cellClassName: "name-column--cell",
    },
 

/*     {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    }, */
    {
      field: "email",
      headerName: "Номер места",
      flex: 1,
    },
    {
      field: "type",
      headerName: "Тип",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    /* {
      field: "cost",
      headerName: "Cost",
      flex: 1,
     renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ), 
    },  */
    {
      field: "date",
      headerName: "Менеджер",
      flex: 1,
    }, 
  ];

  return (
    <Box m="20px">
      <h2>Управление пространством</h2>
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
          "& .MuiCheckBox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`, 
          },
        }}
      >
        <DataGrid /* checkboxSelection */ localeText={localizedTextsMap} rows={mockDataInvoices} columns={columns}  components={{ Toolbar: GridToolbar }}/>
      </Box>
    </Box>
  );
};

export default Invoices;
