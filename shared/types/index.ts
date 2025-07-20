// Common types shared between frontend and backend

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  CREATOR = 'CREATOR',
  VIEWER = 'VIEWER',
}

export interface Survey {
  id: string;
  title: string;
  description?: string;
  status: SurveyStatus;
  settings: SurveySettings;
  questions: Question[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
  closedAt?: Date;
}

export enum SurveyStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export interface SurveySettings {
  isPublic: boolean;
  allowAnonymous: boolean;
  requireLogin: boolean;
  allowMultipleResponses: boolean;
  showProgressBar: boolean;
  randomizeQuestions: boolean;
  theme: SurveyTheme;
  customCss?: string;
  redirectUrl?: string;
  thankYouMessage?: string;
}

export interface SurveyTheme {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: number;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  required: boolean;
  order: number;
  options?: QuestionOption[];
  validation?: QuestionValidation;
  logic?: QuestionLogic[];
  metadata?: Record<string, any>;
}

export enum QuestionType {
  // Text inputs
  SHORT_TEXT = 'SHORT_TEXT',
  LONG_TEXT = 'LONG_TEXT',
  EMAIL = 'EMAIL',
  NUMBER = 'NUMBER',
  URL = 'URL',
  
  // Choice questions
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  DROPDOWN = 'DROPDOWN',
  
  // Rating and scales
  RATING = 'RATING',
  NPS = 'NPS',
  LIKERT_SCALE = 'LIKERT_SCALE',
  SLIDER = 'SLIDER',
  
  // Date and time
  DATE = 'DATE',
  TIME = 'TIME',
  DATETIME = 'DATETIME',
  
  // Advanced
  MATRIX = 'MATRIX',
  RANKING = 'RANKING',
  FILE_UPLOAD = 'FILE_UPLOAD',
  SIGNATURE = 'SIGNATURE',
  
  // Display
  SECTION_BREAK = 'SECTION_BREAK',
  PAGE_BREAK = 'PAGE_BREAK',
}

export interface QuestionOption {
  id: string;
  label: string;
  value: string;
  order: number;
  isOther?: boolean;
}

export interface QuestionValidation {
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customMessage?: string;
}

export interface QuestionLogic {
  id: string;
  condition: LogicCondition;
  action: LogicAction;
  targetQuestionId?: string;
  value?: any;
}

export interface LogicCondition {
  operator: LogicOperator;
  value: any;
}

export enum LogicOperator {
  EQUALS = 'EQUALS',
  NOT_EQUALS = 'NOT_EQUALS',
  CONTAINS = 'CONTAINS',
  NOT_CONTAINS = 'NOT_CONTAINS',
  GREATER_THAN = 'GREATER_THAN',
  LESS_THAN = 'LESS_THAN',
  IS_EMPTY = 'IS_EMPTY',
  IS_NOT_EMPTY = 'IS_NOT_EMPTY',
}

export enum LogicAction {
  SHOW_QUESTION = 'SHOW_QUESTION',
  HIDE_QUESTION = 'HIDE_QUESTION',
  JUMP_TO_QUESTION = 'JUMP_TO_QUESTION',
  END_SURVEY = 'END_SURVEY',
}

export interface Response {
  id: string;
  surveyId: string;
  respondentId?: string;
  answers: Answer[];
  isComplete: boolean;
  startedAt: Date;
  completedAt?: Date;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
}

export interface Answer {
  id: string;
  questionId: string;
  value: any;
  textValue?: string;
  numberValue?: number;
  dateValue?: Date;
  fileValue?: FileUpload;
  metadata?: Record<string, any>;
}

export interface FileUpload {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Analytics types
export interface SurveyAnalytics {
  surveyId: string;
  totalResponses: number;
  completionRate: number;
  averageTime: number;
  responsesByDate: ResponsesByDate[];
  questionAnalytics: QuestionAnalytics[];
}

export interface ResponsesByDate {
  date: string;
  count: number;
}

export interface QuestionAnalytics {
  questionId: string;
  questionTitle: string;
  questionType: QuestionType;
  totalResponses: number;
  skipRate: number;
  averageTime?: number;
  statistics?: QuestionStatistics;
}

export interface QuestionStatistics {
  // For choice questions
  optionCounts?: Record<string, number>;
  
  // For numeric questions
  mean?: number;
  median?: number;
  mode?: number;
  standardDeviation?: number;
  
  // For text questions
  wordCloud?: WordCloudData[];
  averageLength?: number;
}

export interface WordCloudData {
  text: string;
  count: number;
  weight: number;
}
