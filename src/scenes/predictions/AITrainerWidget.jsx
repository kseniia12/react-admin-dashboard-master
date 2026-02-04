// src/scenes/predictions/AITrainerWidget.jsx
import React, { useState } from 'react';
import {
  Paper,
  Typography,
  Box,
  Button,
  LinearProgress,
  Alert
} from "@mui/material";
import { predictionService } from '../../ai';

const AITrainerWidget = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  
  const handleTrain = async () => {
    setIsTraining(true);
    setProgress(0);
    setResult(null);
    
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 300);
    
    try {
      const trainingResult = await predictionService.trainAIModel(50);
      clearInterval(interval);
      setProgress(100);
      setResult(trainingResult);
      
      setTimeout(() => setProgress(0), 3000);
    } catch (error) {
      clearInterval(interval);
      setResult({ success: false, message: error.message });
    } finally {
      setIsTraining(false);
    }
  };
  
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🧠 Обучение модели
      </Typography>
      
      <Button
        variant="contained"
        onClick={handleTrain}
        disabled={isTraining}
        fullWidth
        sx={{ mb: 2, py: 1.5 }}
      >
        {isTraining ? 'Обучение...' : 'Обучить модель ИИ'}
      </Button>
      
      {isTraining && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2">Прогресс: {progress}%</Typography>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      )}
      
      {result && (
        <Alert severity={result.success ? "success" : "error"}>
          {result.message}
        </Alert>
      )}
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        • Нейросеть с 3 слоями
        • 7 параметров анализа
        • Обучение в браузере
      </Typography>
    </Paper>
  );
};

export default AITrainerWidget;