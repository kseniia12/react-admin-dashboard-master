// src/scenes/predictions/RecommendationCard.jsx
import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip
} from "@mui/material";
import {
  AccessTime,
  Warning,
  EmojiEvents
} from "@mui/icons-material";
import { predictionService } from '../../ai';

const RecommendationCard = ({ historicalBookings }) => {
  const [recommendations, setRecommendations] = useState([]);
  
  useEffect(() => {
    loadRecommendations();
  }, []);
  
  const loadRecommendations = async () => {
    try {
      const now = new Date();
      const options = [
        { date: now.toISOString().split('T')[0], startHour: now.getHours(), label: 'Сейчас' },
        { date: now.toISOString().split('T')[0], startHour: now.getHours() + 2, label: 'Через 2 часа' },
      ];
      
      const result = await predictionService.compareBookingOptions(
        options,
        historicalBookings || []
      );
      
      const recs = [];
      if (result.bestOption) {
        recs.push({
          icon: <EmojiEvents />,
          title: 'Лучшее время',
          message: `${result.bestOption.option.startHour}:00 - ${result.bestOption.prediction.percentage}%`
        });
      }
      
      if (result.worstOption?.prediction?.percentage > 80) {
        recs.push({
          icon: <Warning />,
          title: 'Избегайте',
          message: `${result.worstOption.option.startHour}:00 - очень занято`
        });
      }
      
      setRecommendations(recs);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        💡 Рекомендации ИИ
      </Typography>
      
      {recommendations.length > 0 ? (
        <List>
          {recommendations.map((rec, index) => (
            <ListItem key={index}>
              <ListItemIcon>{rec.icon}</ListItemIcon>
              <ListItemText
                primary={rec.title}
                secondary={rec.message}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography color="text.secondary">Загрузка рекомендаций...</Typography>
      )}
      
      <Button
        variant="outlined"
        size="small"
        startIcon={<AccessTime />}
        onClick={loadRecommendations}
        sx={{ mt: 2 }}
        fullWidth
      >
        Обновить рекомендации
      </Button>
    </Paper>
  );
};

export default RecommendationCard;

