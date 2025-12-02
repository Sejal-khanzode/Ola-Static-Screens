export const ROUTES = {
  LOGIN: 'login',
  FORGOT_PASSWORD: 'forgot-password',
  VERIFY_OTP:'verify-otp/:username',
  SET_PASSWORD:'set-password/:otp?/:reset?/:username?',
  CLINICS:'clinics',
  DASHBOARD: 'dashboard',
  SETTINGS: 'settings',
  PROFILE:'profile',
  LOCATIONS: 'locations',
  USERS: 'users',
  TEMPLATES: 'templates',
  BILLING: 'billing',
  PROVIDER_ACCOUNT: 'provider-account',
  CODES: 'codes',
  // PROFILE: '/profile',
  PATIENTS: '/patients',
 
  APPOINTMENTS: '/appointments',
  MEDICAL_RECORDS: '/medical-records',
  PRESCRIPTIONS: '/prescriptions',
  LAB_REPORTS: '/lab-reports',
 
  NOTIFICATIONS: '/notifications',
  NOT_FOUND: '*',
  LOGIN_LANDING: '/auth/landing-page',
  LOGOUT_LANDING: '/auth/logout-landing',
  SCHEDULING: '/scheduling',
  COMMUNICATION: '/communication',
  REFERRAL: '/referral',
  REPORTS: '/reports',
  SETTING: '/settings',
  INTAKE_FORM :'/dashboard/patient-intake',
  RENEWAL_REQUEST : '/dashboard/e-precription',
  LAB_RESULTS :'/dashboard/lab-results',
  CLAIM_RECEIVED :'/dashboard/claim-received',
  NEW_PATIENT : '/patients/new-patient',

  // admin routes
  ADMIN_DASHBOARD:'/admin/dashboard',
  ADMIN_PROFILE:'/admin/profile',
  // ADMIN_USERS:'users',
  ROLES_AND_RESPONSIBILITY:'/admin/roles-and-responsibility',
  
  
}

export const publicRoutes = [
  ROUTES.LOGIN,
  // ROUTES.SIGNUP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.SET_PASSWORD,
];
