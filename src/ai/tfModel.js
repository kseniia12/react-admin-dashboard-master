// src/ai/tfModel.js
import * as tf from '@tensorflow/tfjs';

/**
 * Класс-синглтон для управления моделью прогнозирования загруженности
 * Использует TensorFlow.js и нейронную сеть
 */
class OccupancyPredictorModel {
  constructor() {
    this.model = null;
    this.isTrained = false;
    this.trainingHistory = null;
  }

  /**
   * Создание архитектуры нейронной сети
   * 7 входных параметров -> 3 скрытых слоя -> 1 выход (вероятность 0-1)
   */
  createModel() {
    const model = tf.sequential();
    
    // Входной слой: 7 признаков, 64 нейрона
    model.add(tf.layers.dense({
      units: 64,
      activation: 'relu',
      inputShape: [7],
      kernelInitializer: 'heNormal'
    }));
    
    // Скрытые слои
    model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.2 })); // Регуляризация
    model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
    model.add(tf.layers.dropout({ rate: 0.1 }));
    
    // Выходной слой: вероятность от 0 до 1
    model.add(tf.layers.dense({
      units: 1,
      activation: 'sigmoid'
    }));
    
    // Компиляция модели
    model.compile({
      optimizer: tf.train.adam(0.001), // Оптимизатор Adam
      loss: 'meanSquaredError', // Функция потерь
      metrics: ['accuracy']
    });
    
    this.model = model;
    console.log('✅ Модель ИИ создана. Архитектура:', model.summary());
    return model;
  }

  /**
   * Генерация реалистичных тренировочных данных
   * @param {number} numSamples - Количество примеров
   * @returns {Array} Тренировочные данные
   */
  generateTrainingData(numSamples = 2000) {
    const data = [];
    
    for (let i = 0; i < numSamples; i++) {
      // Генерация случайных, но реалистичных признаков
      const dayOfWeek = Math.floor(Math.random() * 7); // 0-6 (Вс-Сб)
      const hour = Math.floor(Math.random() * 13) + 8; // 8-20 рабочее время
      const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6) ? 1 : 0;
      const spaceType = Math.floor(Math.random() * 3); // 0=рабочее место, 1=переговорка, 2=коворкинг
      const month = Math.floor(Math.random() * 12); // 0-11
      const isHoliday = (Math.random() > 0.95) ? 1 : 0; // 5% праздников
      const prevWeekOccupancy = 0.3 + Math.random() * 0.5; // Базовая загрузка
      
      // Реальные паттерны загруженности (это нейросеть и будет учиться выявлять)
      let occupancyProbability = 0.2; // Базовая вероятность
      
      // Паттерн 1: Рабочие дни vs выходные
      if (dayOfWeek >= 1 && dayOfWeek <= 4) occupancyProbability += 0.35; // Пн-Чт
      if (dayOfWeek === 5) occupancyProbability += 0.25; // Пятница
      
      // Паттерн 2: Часы пик
      if (hour >= 10 && hour <= 12) occupancyProbability += 0.25; // Утро
      if (hour >= 14 && hour <= 16) occupancyProbability += 0.3; // После обеда
      if (hour >= 17 && hour <= 19) occupancyProbability += 0.1; // Вечер
      
      // Паттерн 3: Тип помещения
      if (spaceType === 1) occupancyProbability += 0.15; // Переговорки популярны
      if (spaceType === 2) occupancyProbability -= 0.1; // Коворкинг менее популярен
      
      // Паттерн 4: Сезонность
      if (month >= 4 && month <= 9) occupancyProbability += 0.1; // Лето
      
      // Специальные случаи
      if (isWeekend) occupancyProbability -= 0.4;
      if (isHoliday) occupancyProbability -= 0.6;
      
      // Добавляем реалистичный шум
      const noise = (Math.random() * 0.3) - 0.15;
      occupancyProbability += noise;
      
      // Ограничиваем от 0 до 1
      occupancyProbability = Math.max(0, Math.min(0.98, occupancyProbability));
      
      data.push({
        features: [
          dayOfWeek / 6,          // Нормализованный день недели (0-1)
          hour / 24,              // Нормализованный час (0-1)
          isWeekend,              // Бинарный: выходной
          spaceType / 2,          // Нормализованный тип места (0-1)
          month / 11,             // Нормализованный месяц (0-1)
          isHoliday,              // Бинарный: праздник
          prevWeekOccupancy       // Историческая загрузка (0-1)
        ],
        label: occupancyProbability // Целевая переменная для обучения
      });
    }
    
    console.log(`📊 Сгенерировано ${data.length} примеров для обучения`);
    return data;
  }

  /**
   * Обучение модели на сгенерированных данных
   * @param {number} epochs - Количество эпох обучения
   * @returns {Object} История обучения
   */
  async trainModel(epochs = 80) {
    if (!this.model) this.createModel();
    
    // 1. Генерация данных
    const trainingData = this.generateTrainingData();
    
    // 2. Разделение на обучающую и валидационную выборки
    const splitIdx = Math.floor(trainingData.length * 0.8);
    const trainData = trainingData.slice(0, splitIdx);
    const valData = trainingData.slice(splitIdx);
    
    // 3. Преобразование в тензоры TensorFlow.js
    const trainFeatures = tf.tensor2d(trainData.map(d => d.features));
    const trainLabels = tf.tensor2d(trainData.map(d => [d.label]));
    const valFeatures = tf.tensor2d(valData.map(d => d.features));
    const valLabels = tf.tensor2d(valData.map(d => [d.label]));
    
    console.log('🧠 Начинаю обучение нейронной сети...');
    
    try {
      // 4. Процесс обучения
      const history = await this.model.fit(trainFeatures, trainLabels, {
        epochs: epochs,
        batchSize: 32,
        validationData: [valFeatures, valLabels],
        callbacks: {
        onEpochEnd: (epoch, logs) => {
          // Обновлённый вывод без val_meanAbsoluteError
          if (epoch % 10 === 0 || epoch === epochs - 1) {
            console.log(
              `Эпоха ${epoch + 1}/${epochs}: ` +
              `Loss = ${logs.loss.toFixed(4)}, ` +
              `Val Loss = ${logs.val_loss ? logs.val_loss.toFixed(4) : 'N/A'}, ` +
              `Accuracy = ${logs.acc ? (logs.acc * 100).toFixed(1) : 'N/A'}%`
            );
          }
        }
      }
      });
      
      this.isTrained = true;
      this.trainingHistory = history;
      
      console.log('✅ Обучение завершено успешно!');
      
      // 5. Очистка памяти
      trainFeatures.dispose();
      trainLabels.dispose();
      valFeatures.dispose();
      valLabels.dispose();
      
      return history;
    } catch (error) {
      console.error('❌ Ошибка при обучении:', error);
      throw error;
    }
  }

  /**
   * Прогнозирование загруженности по входным признакам
   * @param {Array} features - Массив из 7 нормализованных признаков
   * @returns {Promise<number>} Вероятность загруженности 0-1
   */
  async predict(features) {
    if (!this.isTrained || !this.model) {
      console.warn('⚠️ Модель не обучена, использую эвристику');
      return this.heuristicPredict(features);
    }
    
    try {
      // Преобразуем в тензор и делаем предсказание
      const input = tf.tensor2d([features]);
      const prediction = this.model.predict(input);
      const result = await prediction.data();
      
      // Очистка памяти
      input.dispose();
      prediction.dispose();
      
      return result[0]; // Возвращаем значение вероятности
    } catch (error) {
      console.error('❌ Ошибка предсказания:', error);
      return this.heuristicPredict(features);
    }
  }

  /**
   * Резервный метод предсказания (если модель не обучена)
   */
  heuristicPredict(features) {
    const [dayOfWeek, hour] = features;
    let prob = 0.3;
    
    // Простые правила
    if (dayOfWeek >= 0.15 && dayOfWeek <= 0.65) prob += 0.35; // Пн-Пт
    if (hour >= 0.4 && hour <= 0.5) prob += 0.25; // 10-12 часов
    if (hour >= 0.55 && hour <= 0.65) prob += 0.3; // 13-16 часов
    
    return Math.min(0.95, prob + (Math.random() * 0.1 - 0.05));
  }

  /**
   * Сохранение модели в локальное хранилище браузера
   */
  async saveModel() {
    if (!this.model) {
      console.warn('Нет модели для сохранения');
      return;
    }
    
    try {
      await this.model.save('localstorage://occupancy-predictor-model');
      console.log('💾 Модель сохранена в LocalStorage');
      return true;
    } catch (error) {
      console.error('Ошибка сохранения модели:', error);
      return false;
    }
  }

  /**
   * Загрузка модели из локального хранилища
   */
  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('localstorage://occupancy-predictor-model');
      this.isTrained = true;
      console.log('📂 Модель загружена из LocalStorage');
      return true;
    } catch (error) {
      console.log('Модель не найдена в LocalStorage, будет создана новая');
      this.createModel();
      return false;
    }
  }

  /**
   * Получение статистики по обучению модели
   */
  getTrainingStats() {
    if (!this.trainingHistory) return null;
    
    const lastEpoch = this.trainingHistory.history.loss.length - 1;
    return {
      finalLoss: this.trainingHistory.history.loss[lastEpoch],
      finalValLoss: this.trainingHistory.history.val_loss[lastEpoch],
      finalAccuracy: this.trainingHistory.history.acc ? this.trainingHistory.history.acc[lastEpoch] : null
    };
  }
}

// Экспортируем единственный экземпляр (синглтон)
export default new OccupancyPredictorModel();