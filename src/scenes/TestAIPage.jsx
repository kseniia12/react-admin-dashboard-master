// src/scenes/TestAIPage.jsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Typography, LinearProgress, Alert, Stack } from "@mui/material";
import { predictionService } from '../ai'; // Импортируем наш сервис
import { mockBookingHistory } from '../data/mockBookingData'; // Импортируем ваши данные

const TestAIPage = () => {
  const [status, setStatus] = useState('idle'); // idle, training, predicting, done
  const [progress, setProgress] = useState(0);
  const [predictions, setPredictions] = useState([]);
  const [modelInfo, setModelInfo] = useState(null);

  // При загрузке компонента проверяем статус модели
  useEffect(() => {
    const init = async () => {
      await predictionService.initialize();
      const info = predictionService.getModelStatus();
      setModelInfo(info);
    };
    init();
  }, []);

  // Тестируем обучение модели
  const handleTrainModel = async () => {
    setStatus('training');
    setProgress(0);
    
    // Имитация прогресса
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 90));
    }, 300);
    
    try {
      const result = await predictionService.trainAIModel(50);
      clearInterval(interval);
      setProgress(100);
      setStatus('done');
      
      // Обновляем информацию о модели
      const info = predictionService.getModelStatus();
      setModelInfo(info);
      
      console.log('Результат обучения:', result);
    } catch (error) {
      clearInterval(interval);
      setStatus('error');
      console.log('Ошибка обучения:', error);
    }
  };

  // Тестируем прогнозирование
  const handleTestPrediction = async () => {
    if (!modelInfo?.canPredict) {
      alert('Сначала обучите модель!');
      return;
    }
    
    setStatus('predicting');
    
    try {
      // Тестовые запросы
      const testRequests = [
        { date: '2026-01-15', startHour: 10, spaceType: 'workplace' },
        { date: '2026-01-15', startHour: 14, spaceType: 'workplace' },
        { date: '2026-01-15', startHour: 18, spaceType: 'meeting_room' },
      ];
      
      const results = [];
      for (const request of testRequests) {
        const result = await predictionService.predictOccupancy(request, mockBookingHistory);
        results.push(result);
      }
      
      setPredictions(results);
      setStatus('done');
    } catch (error) {
      setStatus('error');
      console.error('Ошибка прогнозирования:', error);
    }
  };

  // Сброс модели
  const handleResetModel = async () => {
    await predictionService.resetModel();
    const info = predictionService.getModelStatus();
    setModelInfo(info);
    setPredictions([]);
    setStatus('idle');
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom>
        🧪 Тестирование ИИ-модуля
      </Typography>
      
      {/* Информация о статусе модели */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Статус модели:
        </Typography>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              width: 12, 
              height: 12, 
              borderRadius: '50%',
              bgcolor: modelInfo?.isTrained ? 'success.main' : 'warning.main'
            }} 
          />
          <Typography>
            {modelInfo?.isTrained ? 'Модель обучена' : 'Модель не обучена'}
          </Typography>
        </Stack>
        
        {modelInfo?.stats && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Метрики обучения:
            </Typography>
            <Typography variant="body2">
              Loss: {modelInfo.stats.finalLoss?.toFixed(4) || 'N/A'} 
            </Typography>
          </Box>
        )}
      </Paper>
      
      {/* Кнопки управления */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <Button 
            variant="contained" 
            onClick={handleTrainModel}
            disabled={status === 'training'}
          >
            {status === 'training' ? 'Обучение...' : '1. Обучить модель'}
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={handleTestPrediction}
            disabled={!modelInfo?.canPredict || status === 'predicting'}
          >
            2. Тест прогнозирования
          </Button>
          
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleResetModel}
          >
            Сбросить модель
          </Button>
        </Stack>
        
        {status === 'training' && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Прогресс обучения: {progress}%
            </Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        )}
        
        {status === 'error' && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Произошла ошибка. Проверьте консоль браузера.
          </Alert>
        )}
        
        {status === 'done' && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Операция успешно завершена!
          </Alert>
        )}
      </Paper>
      
      {/* Результаты прогнозирования */}
      {predictions.length > 0 && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            📊 Результаты тестирования:
          </Typography>
          
          <Stack spacing={2}>
            {predictions.map((pred, idx) => (
              <Paper key={idx} sx={{ p: 2, bgcolor: 'grey.50' }}>
                <Typography variant="subtitle1" gutterBottom>
                  Запрос {idx + 1}: {pred.request.date} {pred.request.startHour}:00 ({pred.request.spaceType})
                </Typography>
                
                <Stack direction="row" spacing={4} alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Прогноз загруженности:
                    </Typography>
                    <Typography variant="h5" color={
                      pred.prediction.percentage > 80 ? 'error.main' :
                      pred.prediction.percentage > 60 ? 'warning.main' :
                      'success.main'
                    }>
                      {pred.prediction.percentage}%
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Статус:
                    </Typography>
                    <Typography>
                      {pred.prediction.description}
                    </Typography>
                  </Box>
                </Stack>
                
                {pred.recommendations.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Рекомендации:
                    </Typography>
                    <Typography variant="body2">
                      {pred.recommendations[0].message}
                    </Typography>
                  </Box>
                )}
              </Paper>
            ))}
          </Stack>
        </Paper>
      )}
      
      {/* Инструкция */}
      <Paper sx={{ p: 3, mt: 3, bgcolor: 'info.light' }}>
        <Typography variant="body2">
          <strong>Что тестируем:</strong>
          <br/>1. Нажмите "Обучить модель" - запустится нейросеть (50 эпох)
          <br/>2. После обучения нажмите "Тест прогнозирования"
          <br/>3. Убедитесь, что прогнозы отображаются корректно
          <br/>4. Проверьте консоль браузера (F12) для логов TensorFlow.js
        </Typography>
      </Paper>
    </Box>
  );
};

export default TestAIPage;