import type { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { ROUTES } from './routesConstants';
import { Navigate, Outlet } from 'react-router-dom';
import AuthLayout from '../layouts/auth-layout';
import MainLayout from '../layouts/main-layout';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotAuthorized from '../components/core/error/not-authorized';
import EnterOtp from '../components/core/auth/otp-validate';

// Lazy load pages
const NotFound = lazy(() => import('../components/notFound'));
const Login = lazy(() => import('../components/core/auth/login'));
const ForgotPassword = lazy(() => import('../components/core/auth/forgot-password'));
const SetPassword = lazy(() => import('../components/core/auth/set-password'));
// Admin
const AdminDashboard = lazy(() => import('../pages/apps/admin/pages/clinics/dashboard'));
const ClinicDetails = lazy(() => import('../pages/apps/admin/pages/clinics/clinic/clinic-details'));
const ClinicLocations = lazy(
  () => import('../pages/apps/admin/pages/clinics/clinic/clinic-locations')
);
const AdminUsers = lazy(() => import('../pages/apps/admin/pages/settings/admin-users/admin-users'));
// const RolesAndResponsibity = lazy(
//   () => import('../pages/apps/admin/pages/settings/roles-and-responsibilities/roles-and-responsibilities')
// );
import { AdminPortalClinic } from '../pages/apps/admin/components/adminPortalClinic';
import DataImportSetting from '../components/core/reusable/settings/master/data-import';
import ICDCodeSetting from '../components/core/reusable/settings/master/icd-code';
import CPTCodeSetting from '../components/core/reusable/settings/master/cpt-code';
import ProviderDataSetting from '../components/core/reusable/settings/master/provider-data';
import MasterSettings from '../pages/apps/admin/components/clinic/masterPortalTabs';
import Services from '../pages/apps/provider/pages/settings/billings/services';
import ProviderAccount from '../pages/apps/provider/components/provider-account/providerAccountTabs';
import ProviderProfile from '../pages/apps/provider/pages/settings/provider-account/provider-profile/profile';
import PatientFlag from '../pages/apps/provider/pages/settings/provider-account/patient-flag/patient-flag';
import Settings from '../components/settings';
import AvailabilityTabs from '../pages/apps/provider/components/availability/availabilityTabs';
import Availbility from '../pages/apps/provider/pages/settings/availability/availbility';
import AppointmentTypes from '../pages/apps/provider/pages/settings/availability/appointment-types';
import ColorConfiguration from '../pages/apps/provider/pages/settings/availability/color-config';
import PracticeTabs from '../pages/apps/provider/components/practice/practiceTabs';
import PrintConfig from '../pages/apps/provider/pages/settings/practice/print-config';
import PracticeUser from '../pages/apps/provider/pages/settings/practice/user';
import TemplateTabs from '../pages/apps/admin/components/templates/templateTabs';
import VisitNotesSetting from '../pages/apps/admin/pages/templates/visit-notes';
import PhysicalExamSetting from '../pages/apps/admin/pages/templates/physical-exam';
import ReviewOfSystemSetting from '../pages/apps/admin/pages/templates/review-of-systems';
import MacrosSetting from '../pages/apps/admin/pages/templates/macros';
import ROSComponent from 'src/pages/apps/admin/pages/templates/ros-pe-details/RosPeComponent';
import AdminProfile from 'src/pages/apps/admin/pages/settings/profile/admin-profile';
import AddVisitNotes from 'src/pages/apps/admin/pages/templates/visit-notes/AddVisitNotes';
import DocumentTypes from 'src/pages/apps/admin/pages/settings/document-types/document-types';
import Patients from '../pages/apps/provider/pages/patients/patients';
import AddPatient from 'src/pages/apps/provider/pages/patients/add-patient';
import PatientProfile from '../pages/apps/provider/pages/patients/patient-profile/patient-profile';
import ProfileSubTabsOutlet from '../pages/apps/provider/pages/patients/patient-profile/profile-sub-tabs-outlet';
import ClientProfile from 'src/pages/apps/client/pages/profile/client-profile';
import ProviderScheduling from 'src/pages/apps/provider/components/scheduling/provider-scheduling';

// Client
const ClientAppointments = lazy(
  () => import('../pages/apps/client/pages/appointments/client-appointment')
);
const ClientDocuments = lazy(
  () => import('src/pages/apps/client/pages/documents/document-tab-outlet')
);
import DocumentsSubTabsOutlet from 'src/pages/apps/provider/pages/patients/patient-profile/documents-sub-tabs-outlet';
import DashboardSubTabsOutlet from 'src/pages/apps/provider/pages/patients/patient-profile/dashboard-sub-tabs-outlet';
import IntakeForm from 'src/pages/apps/admin/pages/templates/intake-form';
import ConsentForm from 'src/pages/apps/admin/pages/templates/consent-form';
import CustomTemplates from 'src/pages/apps/admin/pages/templates/custom-template';
import ClientInsurance from 'src/pages/apps/client/pages/insurance/client-insurance';
import TodoTask from 'src/components/dashboard/todoTask';
import AppointmentSubTabsOutlet from 'src/pages/apps/provider/pages/patients/patient-profile/appointment-sub-tabs-outlet';
import RequestedAppointments from 'src/pages/apps/client/pages/requested-appointments/requested-appointments';
import InsuranceSubTabsOutlet from 'src/pages/apps/provider/pages/patients/patient-profile/insurance-sub-tabs-outlet';
import AppointmentNote from 'src/pages/apps/provider/components/scheduling/appointment-note/appointment-note';
import BillingTabs from 'src/pages/apps/provider/components/billing/billingTabs';
import Billing from 'src/pages/apps/provider/pages/billing/ready-for-billing/billing';
import SuperBill from 'src/pages/apps/provider/pages/billing/superBill/super-bill';
import CreateSuperbill from 'src/pages/apps/provider/pages/billing/superBill/create-super-bill';
import Remits from 'src/pages/apps/provider/pages/billing/remits/remits';
import Claims from 'src/pages/apps/provider/pages/billing/claims/claims';
import Invoice from 'src/pages/apps/provider/pages/billing/invoice/invoice';

export const routes: RouteObject[] = [
  { path: '/', element: <Navigate to={'/auth/login'} /> },
  {
    path: '/auth',
    element: (
      <PublicRoute>
        <AuthLayout>
          <Outlet />
        </AuthLayout>
      </PublicRoute>
    ),
    children: [
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPassword /> },
      { path: ROUTES.VERIFY_OTP, element: <EnterOtp /> },
      { path: ROUTES.SET_PASSWORD, element: <SetPassword /> },
    ],
  },
  {
    path: '/admin',
    element: (
      <PrivateRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: ROUTES.CLINICS,
        element: <Outlet />,
        children: [
          { path: '', element: <AdminDashboard /> },
          { path: ROUTES.DASHBOARD, element: <AdminDashboard /> },
          {
            path: '',
            element: <AdminPortalClinic />,
            children: [
              { path: 'profile/:uuid', element: <ClinicDetails /> },
              { path: 'locations/:uuid', element: <ClinicLocations /> },
            ],
          },
        ],
      },
      {
        path: ROUTES.CODES,
        element: <MasterSettings />,
        children: [
          { path: '', element: <DataImportSetting /> },
          { path: 'data-import', element: <DataImportSetting /> },
          { path: 'provider-data', element: <ProviderDataSetting /> },
          { path: 'icd-10-code', element: <ICDCodeSetting /> },
          { path: 'procedure-code', element: <CPTCodeSetting /> },
        ],
      },
      {
        path: ROUTES.USERS,
        element: <AdminUsers />,
      },
      {
        path: ROUTES.TEMPLATES,
        element: <TemplateTabs />,
        children: [
          {
            path: '',
            element: <VisitNotesSetting />,
          },
          {
            path: 'visit-notes',
            element: <VisitNotesSetting />,
          },
          {
            path: 'ros',
            element: <ReviewOfSystemSetting />,
          },
          {
            path: 'physical-exam',
            element: <PhysicalExamSetting />,
          },
          {
            path: 'macros',
            element: <MacrosSetting />,
          },
          {
            path: 'custom-templates',
            element: <CustomTemplates />,
          },
        ],
      },
      {
        path: 'templates/visit-notes/add-visit-notes',
        element: <AddVisitNotes />,
      },
      {
        path: 'templates/visit-notes/edit-visit-notes/:uuid',
        element: <AddVisitNotes />,
      },
      {
        path: 'templates/create-ros',
        element: <ROSComponent />,
      },
      {
        path: 'templates/edit-ros',
        element: <ROSComponent />,
      },
      {
        path: 'templates/create-physical-exam',
        element: <ROSComponent />,
      },
      {
        path: 'templates/edit-physical-exam',
        element: <ROSComponent />,
      },
      {
        path: 'templates/custom-template/intake-form',
        element: <IntakeForm />,
      },
      {
        path: 'templates/custom-template/consent-form',
        element: <ConsentForm />,
      },
      {
        path: ROUTES.SETTINGS,
        element: <Outlet />,
        children: [
          { path: '', element: <Availbility /> },
          { path: 'availability', element: <Availbility /> },
          { path: 'appt-type', element: <AppointmentTypes /> },
          { path: 'fee-schedule', element: <Services /> },
          { path: 'patient-flag', element: <PatientFlag /> },
          { path: 'document-types', element: <DocumentTypes /> },
          { path: 'profile', element: <AdminProfile /> },
        ],
      },
    ],
  },
  {
    path: '/provider',
    element: (
      <PrivateRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <TodoTask />,
      },
      {
        path: 'patients',
        element: <Outlet />,
        children: [
          {
            path: '',
            element: <Patients />,
          },
          {
            path: 'patient-profile',
            element: <PatientProfile />,
            children: [
              {
                path: '',
                element: <Navigate to="dashboard" replace />,
              },
              {
                path: 'dashboard',
                element: <DashboardSubTabsOutlet />,
              },
              {
                path: 'appointments',
                element: <AppointmentSubTabsOutlet />,
              },
              {
                path: 'documents',
                element: <DocumentsSubTabsOutlet />,
              },
              {
                path: 'profile-details',
                element: <ProfileSubTabsOutlet />,
              },
              {
                path: 'insurance',
                element: <InsuranceSubTabsOutlet />,
              },
            ],
          },
          {
            path: 'patient-profile/profile-details/edit-profile/:uuid',
            element: <AddPatient />,
          },
        ],
      },
      {
        path: 'patients/add-patient',
        element: <AddPatient />,
      },
      {
        path: 'patients/edit-patient/:uuid',
        element: <AddPatient />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'settings/provider-account',
        element: <ProviderAccount />,
        children: [
          {
            path: 'profile',
            element: <ProviderProfile />,
          },
          {
            path: 'clinic',
            element: <ClinicDetails />,
          },
          {
            path: 'patient-flag',
            element: <PatientFlag />,
          },
        ],
      },
      {
        path: 'settings/appointment',
        element: <AvailabilityTabs />,
        children: [
          {
            path: 'availability',
            element: <Availbility />,
          },
          {
            path: 'appointment-types',
            element: <AppointmentTypes />,
          },
          {
            path: 'color-config',
            element: <ColorConfiguration />,
          },
        ],
      },
      {
        path: 'settings/billing',
        element: <Services />,
        children: [
          {
            path: 'services',
            element: <Services />,
          },
        ],
      },

      {
        path: 'settings/practice',
        element: <PracticeTabs />,
        children: [
          {
            path: 'profile',
            element: <ClinicDetails />,
          },
          {
            path: 'location',
            element: <ClinicLocations />,
          },
          {
            path: 'users',
            element: <PracticeUser />,
          },
          {
            path: 'print-config',
            element: <PrintConfig />,
          },
        ],
      },
      { path: 'scheduling', element: <ProviderScheduling /> },
      {
        path: 'scheduling/appointment-note',
        element: <AppointmentNote />,
      },

      {
        path: 'billing',
        element: <BillingTabs />,
        children: [
          {
            path: '',
            element: <Billing />,
          },
          {
            path: 'ready-for-billing',
            element: <Billing />,
          },
          {
            path: 'superbill',
            element: <SuperBill />,
          },
           {
            path: 'invoice',
            element: <Invoice />,
          },
          {
            path: 'claims',
            element: <Claims />,
          },
          {
            path: 'remits',
            element: <Remits />,
          },
        ],
      },
       {
        path: 'billing/superbill/create-superbill',
        element: <CreateSuperbill />,
       
      },
    ],
  },
  {
    path: '/client',
    element: (
      <PrivateRoute>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: 'appointments',
        element: <ClientAppointments />,
      },
      {
        path: 'documents',
        element: <ClientDocuments />,
        children: [
          { path: '', element: <ClientDocuments /> },
          { path: 'intake-form', element: <ClientDocuments /> },
          { path: 'consent-form', element: <ClientDocuments /> },
        ],
      },
      {
        path: 'requested-appointments',
        element: <RequestedAppointments />,
      },
      {
        path: 'settings',
        element: <ClientProfile />,
      },
      {
        path: 'settings/profile',
        element: <ClientProfile />,
      },
      {
        path: 'settings/insurance',
        element: <ClientInsurance />,
      },
    ],
  },

  {
    path: '/not-authorized',
    element: <NotAuthorized />,
  },

  {
    path: ROUTES.NOT_FOUND,
    element: <NotFound />,
  },
];
