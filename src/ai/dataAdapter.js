// src/ai/dataAdapter.js

/**
 * Утилиты для преобразования данных бронирований в формат для ИИ
 */

/**
 * Извлекает исторические данные загруженности из массива бронирований
 * @param {Array} bookingsData - Массив объектов бронирований
 * @param {string} spaceId - ID конкретного места (опционально)
 * @param {string} spaceType - Тип места (опционально)
 * @returns {Object} Агрегированные данные по часам и дням
 */
export const extractHistoricalOccupancy = (bookingsData, spaceId = null, spaceType = null) => {
  // Фильтрация данных по заданным критериям
  let filteredData = bookingsData;
  
  if (spaceId) {
    filteredData = filteredData.filter(booking => booking.spaceId === spaceId);
  }
  
  if (spaceType) {
    filteredData = filteredData.filter(booking => booking.type === spaceType);
  }
  
  // Группировка по дате и часу
  const occupancyByHour = {};
  
  filteredData.forEach(booking => {
    const dateKey = booking.date; // например, "2026-01-10"
    const hourKey = `${dateKey}_${booking.startHour}`;
    
    if (!occupancyByHour[hourKey]) {
      occupancyByHour[hourKey] = {
        date: booking.date,
        hour: booking.startHour,
        totalBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0
      };
    }
    
    occupancyByHour[hourKey].totalBookings += 1;
    
    if (booking.status === 'completed' || booking.status === 'active') {
      occupancyByHour[hourKey].completedBookings += 1;
    } else if (booking.status === 'cancelled') {
      occupancyByHour[hourKey].cancelledBookings += 1;
    }
  });
  
  // Преобразуем объект в массив и вычисляем загруженность
  const result = Object.values(occupancyByHour).map(item => ({
    ...item,
    occupancyRate: item.totalBookings > 0 ? item.completedBookings / item.totalBookings : 0
  }));
  
  return result;
};

/**
 * Преобразует данные конкретного бронирования/запроса в признаки для модели ИИ
 * @param {Object} bookingParams - Параметры бронирования
 * @param {Array} historicalData - Исторические данные (для вычисления трендов)
 * @returns {Array} Массив из 7 нормализованных признаков
 */
export const convertToModelFeatures = (bookingParams, historicalData = []) => {
  const {
    date,           // Дата в формате "2026-01-10"
    startHour,      // Час начала (8-20)
    spaceType = 'workplace', // Тип места
    officeId        // ID офиса
  } = bookingParams;
  
  const dateObj = new Date(date);
  
  // 1. День недели (0=Воскресенье, 6=Суббота) -> нормализуем до 0-1
  const dayOfWeek = dateObj.getDay(); // 0-6
  const normalizedDayOfWeek = dayOfWeek / 6;
  
  // 2. Час дня (8-20) -> нормализуем до 0-1
  const normalizedHour = startHour / 24;
  
  // 3. Выходной день? (бинарный: 0 или 1)
  const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6) ? 1 : 0;
  
  // 4. Тип места (рабочее=0, переговорка=1, коворкинг=2) -> нормализуем до 0-1
  const spaceTypeMap = {
    'workplace': 0,
    'meeting_room': 1,
    'coworking_zone': 2
  };
  const spaceTypeNum = spaceTypeMap[spaceType] || 0;
  const normalizedSpaceType = spaceTypeNum / 2;
  
  // 5. Месяц (0-11) -> нормализуем до 0-1
  const month = dateObj.getMonth();
  const normalizedMonth = month / 11;
  
  // 6. Праздничный день? (пока заглушка - можно подключить API)
  // Здесь можно добавить проверку через API календаря праздников
  const isHoliday = 0; // По умолчанию не праздник
  
  // 7. Историческая загруженность в тот же день недели и час
  let historicalOccupancy = 0.5; // Значение по умолчанию
  
  if (historicalData.length > 0) {
    // Ищем исторические данные для того же дня недели и часа
    const similarHistory = historicalData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate.getDay() === dayOfWeek && 
             Math.abs(item.hour - startHour) <= 1;
    });
    
    if (similarHistory.length > 0) {
      // Средняя загруженность по похожим историческим записям
      historicalOccupancy = similarHistory.reduce((sum, item) => 
        sum + item.occupancyRate, 0) / similarHistory.length;
    }
  }
  
  // Возвращаем массив из 7 признаков
  return [
    normalizedDayOfWeek,   // [0] День недели (0-1)
    normalizedHour,        // [1] Час (0-1)
    isWeekend,             // [2] Выходной (0/1)
    normalizedSpaceType,   // [3] Тип места (0-1)
    normalizedMonth,       // [4] Месяц (0-1)
    isHoliday,             // [5] Праздник (0/1)
    historicalOccupancy    // [6] Историческая загруженность (0-1)
  ];
};

/**
 * Преобразует сырые данные из формы бронирования в структурированный формат
 * @param {Object} formData - Данные из формы бронирования
 * @returns {Object} Стандартизированные параметры для ИИ
 */
export const normalizeBookingRequest = (formData) => {
  return {
    date: formData.selectedDate || new Date().toISOString().split('T')[0],
    startHour: parseInt(formData.startTime?.split(':')[0]) || 10,
    endHour: parseInt(formData.endTime?.split(':')[0]) || 12,
    spaceType: formData.spaceType || 'workplace',
    spaceId: formData.spaceId,
    officeId: formData.officeId,
    userId: formData.userId
  };
};

/**
 * Определяет уровень загруженности по вероятности
 * @param {number} probability - Вероятность от 0 до 1
 * @returns {Object} Описание и цвет для отображения
 */
export const getOccupancyLevel = (probability) => {
  const percentage = Math.round(probability * 100);
  
  if (percentage < 30) {
    return {
      level: 'low',
      label: 'Низкая',
      color: '#4CAF50', // Зеленый
      emoji: '🟢',
      description: 'Много свободных мест'
    };
  } else if (percentage < 60) {
    return {
      level: 'medium',
      label: 'Средняя',
      color: '#FFC107', // Желтый
      emoji: '🟡',
      description: 'Есть свободные места'
    };
  } else if (percentage < 85) {
    return {
      level: 'high',
      label: 'Высокая',
      color: '#FF9800', // Оранжевый
      emoji: '🟠',
      description: 'Мало свободных мест'
    };
  } else {
    return {
      level: 'very-high',
      label: 'Очень высокая',
      color: '#F44336', // Красный
      emoji: '🔴',
      description: 'Почти нет мест, рекомендуем другое время'
    };
  }
};

/**
 * Генерирует рекомендации на основе прогноза ИИ
 * @param {number} predictedOccupancy - Предсказанная загруженность (0-1)
 * @param {Object} originalRequest - Исходные параметры запроса
 * @returns {Array} Массив рекомендаций
 */
export const generateRecommendations = (predictedOccupancy, originalRequest) => {
  const recommendations = [];
  const percentage = Math.round(predictedOccupancy * 100);
  
  // Рекомендация 1: Если высокая загруженность
  if (percentage > 75) {
    recommendations.push({
      type: 'alternative_time',
      priority: 'high',
      title: 'Выберите другое время',
      message: `В ${originalRequest.startHour}:00 загруженность ${percentage}%. Попробуйте:`,
      alternatives: [
        { time: `${originalRequest.startHour - 2}:00`, reason: 'На 2 часа раньше обычно свободнее' },
        { time: `${originalRequest.startHour + 2}:00`, reason: 'На 2 часа позже загрузка снижается' }
      ]
    });
    
    // Предложить другой тип места
    if (originalRequest.spaceType === 'workplace') {
      recommendations.push({
        type: 'alternative_space',
        priority: 'medium',
        title: 'Рассмотрите переговорку',
        message: 'Переговорные комнаты могут быть менее загружены в это время'
      });
    }
  }
  
  // Рекомендация 2: Общие советы
  if (percentage < 40) {
    recommendations.push({
      type: 'info',
      priority: 'low',
      title: 'Идеальное время',
      message: 'Отличный выбор! В это время обычно много свободных мест.'
    });
  }
  
  // Рекомендация 3: По дням недели
  const dayOfWeek = new Date(originalRequest.date).getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    recommendations.push({
      type: 'warning',
      priority: 'medium',
      title: 'Выходной день',
      message: 'По выходным некоторые услуги могут быть ограничены. Уточните у администратора.'
    });
  }
  
  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};