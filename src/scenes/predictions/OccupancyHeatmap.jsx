import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from "@mui/material";
import { predictionService } from '../../ai';

const OccupancyHeatmap = ({ historicalBookings }) => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  
  const [spaceType, setSpaceType] = useState('workplace');
  const [heatmapData, setHeatmapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Загружаем прогнозы
  const loadPredictions = async () => {
    setIsLoading(true);
    try {
      const result = await predictionService.predictDailyOccupancy(
        selectedDate, 
        spaceType, 
        historicalBookings || []
      );
      setHeatmapData(result);
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadPredictions();
  }, [selectedDate, spaceType]);
  
  // Цвет ячейки
  const getCellColor = (percentage) => {
    if (percentage < 30) return theme.palette.success.light;
    if (percentage < 60) return theme.palette.warning.light;
    if (percentage < 85) return theme.palette.warning.main;
    return theme.palette.error.main;
  };
  
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          🗓️ Тепловая карта загруженности
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Дата</InputLabel>
            <Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
              <MenuItem value={new Date().toISOString().split('T')[0]}>Сегодня</MenuItem>
              <MenuItem value={(() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                return tomorrow.toISOString().split('T')[0];
              })()}>Завтра</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Тип места</InputLabel>
            <Select value={spaceType} onChange={(e) => setSpaceType(e.target.value)}>
              <MenuItem value="workplace">Рабочие места</MenuItem>
              <MenuItem value="meeting_room">Переговорные</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
      
   
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.success.light, borderRadius: 1 }} />
          <Typography variant="body2">Свободно</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.warning.light, borderRadius: 1 }} />
          <Typography variant="body2">Умеренно</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.warning.main, borderRadius: 1 }} />
          <Typography variant="body2">Занято</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: theme.palette.error.main, borderRadius: 1 }} />
          <Typography variant="body2">Очень занято</Typography>
        </Box>
      </Box>
      
      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography>ИИ строит прогноз...</Typography>
        </Box>
      ) : heatmapData ? (
        <>
   
          <Grid container spacing={1}>
            {heatmapData.predictions.slice(0, 12).map((slot) => ( // Показываем только 8:00-19:00
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={slot.hour}>
                <Paper sx={{
                  p: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: getCellColor(slot.percentage),
                  color: slot.percentage > 60 ? '#fff' : '#000',
                  height: '100%'
                }}>
                  <Typography variant="h6">{slot.hourLabel}</Typography>
                  <Typography variant="h4" fontWeight="bold" sx={{ my: 1 }}>
                    {slot.percentage}%
                  </Typography>
                  <Typography variant="caption">
                    {slot.percentage < 30 ? 'Свободно' :
                     slot.percentage < 60 ? 'Умеренно' :
                     slot.percentage < 85 ? 'Занято' : 'Очень занято'}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
          
      
          <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(0,0,0,0.02)', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>📊 Анализ дня</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">Пиковое время</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {heatmapData.analysis.peakHour.hour}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="body2">Лучшее время</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {heatmapData.analysis.bestHour.hour}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography>Загрузка данных...</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default OccupancyHeatmap;
