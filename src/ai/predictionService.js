// src/ai/predictionService.js
import aiModel from './tfModel';
import { 
  convertToModelFeatures, 
  extractHistoricalOccupancy,
  getOccupancyLevel,
  generateRecommendations,
  normalizeBookingRequest 
} from './dataAdapter';

/**
 * Основной сервис для работы с ИИ-прогнозами
 * Предоставляет высокоуровневый API для компонентов React
 */

class PredictionService {
  constructor() {
    this.isInitialized = false;
  }

  /**
   * Инициализация сервиса (загрузка модели)
   */
  async initialize() {
    if (this.isInitialized) return true;
    
    try {
      await aiModel.loadModel();
      this.isInitialized = true;
      console.log('✅ PredictionService инициализирован');
      return true;
    } catch (error) {
      console.error('❌ Ошибка инициализации PredictionService:', error);
      return false;
    }
  }

  /**
   * Обучение модели ИИ (вызов из интерфейса администратора)
   */
  async trainAIModel(epochs = 80) {
    try {
      console.log('🚀 Запуск обучения модели ИИ...');
      const history = await aiModel.trainModel(epochs);
      await aiModel.saveModel();
      
      return {
        success: true,
        message: 'Модель успешно обучена и сохранена',
        stats: aiModel.getTrainingStats(),
        history: history
      };
    } catch (error) {
      return {
        success: false,
        message: `Ошибка обучения: ${error.message}`,
        error: error
      };
    }
  }

  /**
   * Прогноз загруженности для конкретного запроса
   * @param {Object} bookingRequest - Данные запроса на бронирование
   * @param {Array} historicalBookings - Исторические данные бронирований
   */
  async predictOccupancy(bookingRequest, historicalBookings = []) {
    // Нормализуем запрос
    const normalizedRequest = normalizeBookingRequest(bookingRequest);
    
    // Извлекаем исторические данные для контекста
    const historicalData = extractHistoricalOccupancy(
      historicalBookings,
      normalizedRequest.spaceId,
      normalizedRequest.spaceType
    );
    
    // Преобразуем в признаки для ИИ
    const features = convertToModelFeatures(normalizedRequest, historicalData);
    
    // Получаем прогноз от модели
    const predictedProbability = await aiModel.predict(features);
    
    // Дополнительная информация
    const occupancyInfo = getOccupancyLevel(predictedProbability);
    const recommendations = generateRecommendations(predictedProbability, normalizedRequest);
    
    return {
      request: normalizedRequest,
      prediction: {
        probability: predictedProbability,
        percentage: Math.round(predictedProbability * 100),
        ...occupancyInfo
      },
      features: features,
      recommendations: recommendations,
      timestamp: new Date().toISOString(),
      modelVersion: '1.0'
    };
  }

  /**
   * Пакетный прогноз на целый день (для тепловой карты)
   * @param {string} date - Дата в формате "2026-01-10"
   * @param {string} spaceType - Тип места
   * @param {Array} historicalBookings - Исторические данные
   */
  async predictDailyOccupancy(date, spaceType = 'workplace', historicalBookings = []) {
    const predictions = [];
    
    // Прогноз для каждого часа рабочего дня
    for (let hour = 8; hour <= 20; hour++) {
      const request = {
        date: date,
        startHour: hour,
        spaceType: spaceType
      };
      
      try {
        const prediction = await this.predictOccupancy(request, historicalBookings);
        predictions.push({
          hour: hour,
          hourLabel: `${hour}:00`,
          ...prediction.prediction,
          features: prediction.features
        });
      } catch (error) {
        console.warn(`Ошибка прогноза для часа ${hour}:`, error);
        predictions.push({
          hour: hour,
          hourLabel: `${hour}:00`,
          probability: 0.5,
          percentage: 50,
          ...getOccupancyLevel(0.5),
          error: true
        });
      }
    }
    
    // Анализ дня
    const peakHour = predictions.reduce((prev, current) => 
      (current.percentage > prev.percentage) ? current : prev
    );
    
    const bestHour = predictions.reduce((prev, current) => 
      (current.percentage < prev.percentage) ? current : prev
    );
    
    const averageOccupancy = predictions.reduce((sum, item) => 
      sum + item.percentage, 0) / predictions.length;
    
    return {
      date: date,
      spaceType: spaceType,
      predictions: predictions,
      analysis: {
        peakHour: {
          hour: peakHour.hourLabel,
          occupancy: peakHour.percentage,
          level: peakHour.level
        },
        bestHour: {
          hour: bestHour.hourLabel,
          occupancy: bestHour.percentage,
          level: bestHour.level
        },
        averageOccupancy: Math.round(averageOccupancy),
        totalHours: predictions.length,
        busyHours: predictions.filter(p => p.percentage > 70).length,
        quietHours: predictions.filter(p => p.percentage < 30).length
      }
    };
  }

  /**
   * Сравнение нескольких вариантов бронирования
   */
  async compareBookingOptions(options, historicalBookings) {
    const comparisons = [];
    
    for (const option of options) {
      const prediction = await this.predictOccupancy(option, historicalBookings);
      comparisons.push({
        option: option,
        prediction: prediction.prediction,
        score: this.calculateOptionScore(prediction)
      });
    }
    
    // Сортируем по лучшему варианту (меньше загруженность = лучше)
    comparisons.sort((a, b) => a.score - b.score);
    
    return {
      comparisons: comparisons,
      bestOption: comparisons[0],
      worstOption: comparisons[comparisons.length - 1],
      decision: this.generateDecision(comparisons)
    };
  }

  /**
   * Вспомогательный метод: расчет "очков" для варианта
   */
  calculateOptionScore(prediction) {
    // Меньше загруженность = лучше (ниже балл)
    let score = prediction.prediction.percentage;
    
    // Штраф за высокую загруженность
    if (prediction.prediction.percentage > 80) score += 20;
    if (prediction.prediction.percentage > 90) score += 30;
    
    // Бонус за низкую загруженность
    if (prediction.prediction.percentage < 30) score -= 15;
    
    // Учитываем рекомендации
    if (prediction.recommendations.some(r => r.priority === 'high')) {
      score += 10; // Штраф за высокоприоритетные рекомендации
    }
    
    return score;
  }

  /**
   * Генерация итогового решения на основе сравнения
   */
  generateDecision(comparisons) {
    const best = comparisons[0];
    const worst = comparisons[comparisons.length - 1];
    
    if (best.prediction.percentage < 40) {
      return {
        verdict: 'strong_recommendation',
        message: `Сильно рекомендуем "${best.option.startHour}:00" (загруженность ${best.prediction.percentage}%)`,
        confidence: 'high'
      };
    } else if (best.prediction.percentage < 60) {
      return {
        verdict: 'good_option',
        message: `Хороший вариант "${best.option.startHour}:00" (загруженность ${best.prediction.percentage}%)`,
        confidence: 'medium'
      };
    } else {
      return {
        verdict: 'all_busy',
        message: `Все варианты загружены. Лучший: "${best.option.startHour}:00" (${best.prediction.percentage}%)`,
        confidence: 'low'
      };
    }
  }

  /**
   * Проверка статуса модели
   */
  getModelStatus() {
    return {
      isTrained: aiModel.isTrained,
      isInitialized: this.isInitialized,
      canPredict: aiModel.isTrained && this.isInitialized,
      lastTraining: aiModel.trainingHistory ? 
        new Date().toISOString() : null,
      stats: aiModel.getTrainingStats()
    };
  }

  /**
   * Сброс модели (для тестирования)
   */
  async resetModel() {
    aiModel.model = null;
    aiModel.isTrained = false;
    aiModel.trainingHistory = null;
    this.isInitialized = false;
    
    // Очищаем LocalStorage
    try {
      localStorage.removeItem('tensorflowjs_models/occupancy-predictor-model/info');
      localStorage.removeItem('tensorflowjs_models/occupancy-predictor-model/model_topology');
      localStorage.removeItem('tensorflowjs_models/occupancy-predictor-model/weight_data');
      console.log('🧹 Модель сброшена');
      return true;
    } catch (error) {
      console.error('Ошибка сброса:', error);
      return false;
    }
  }
}

// Экспортируем единственный экземпляр сервиса
export default new PredictionService();