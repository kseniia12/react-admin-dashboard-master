// src/ai/index.js
// Баррель-экспорт для удобного импорта всех модулей ИИ

import aiModel from './tfModel';
import predictionService from './predictionService';
import * as dataAdapter from './dataAdapter';

export {
  aiModel,
  predictionService,
  dataAdapter
};

// Или можно импортировать так:
// import { predictionService, dataAdapter } from 'src/ai';