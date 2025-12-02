import { LogLevel } from './services/common/logger/logger.service';
import { ENVIRONMENTS } from './constants/environments';

export const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
export const SSE_URL = import.meta.env.VITE_SSE_URL;
export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;
export const TOKEN_KEY = 'token';
export const REFRESH_TOKEN_KEY = 'refreshToken';
export const EXPIRY_KEY = 'expiry';
export const ROLES_KEY = 'roles';
export const ENV = import.meta.env.VITE_ENV;
export const LOG_LEVEL: LogLevel = ENV === ENVIRONMENTS.PRODUCTION ? 'warn' : 'log';
