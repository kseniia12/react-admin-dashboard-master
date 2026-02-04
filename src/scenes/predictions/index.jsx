// src/scenes/predictions/index.jsx
import React from 'react';
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import OccupancyHeatmap from "./OccupancyHeatmap";
import AITrainerWidget from "./AITrainerWidget";
import RecommendationCard from "./RecommendationCard";
import { mockBookingHistory } from "../../data/mockBookingData";

const PredictionsPage = () => {
  return (
    <Box m="20px">
      {/* Заголовок */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header 
          title="🧠 ИИ Прогнозы загруженности" 
          subtitle="Интеллектуальное прогнозирование и рекомендации" 
        />
      </Box>
      
      {/* Основная сетка */}
      <Grid container spacing={3}>
        {/* Левая колонка: Тепловая карта (большая) */}
        <Grid item xs={12} lg={8}>
          <OccupancyHeatmap historicalBookings={mockBookingHistory} />
        </Grid>
        
        {/* Правая колонка: Виджеты */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3} direction="column">
            {/* Виджет обучения ИИ */}
            <Grid item xs={12}>
              <AITrainerWidget />
            </Grid>
            
            {/* Виджет рекомендаций */}
            <Grid item xs={12}>
              <RecommendationCard historicalBookings={mockBookingHistory} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PredictionsPage;