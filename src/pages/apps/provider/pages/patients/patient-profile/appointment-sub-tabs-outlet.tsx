import CommonTabsOutlet from 'src/components/core/reusable/common-tab-outlet/common-tabs-outlet';
import Upcomming from './appointments/upcomming';
import Past from './appointments/past';
import {patientDashboardConstants} from 'src/constants/patients-constants'

const AppointmentSubTabsOutlet = () => {
  const APPOINTMENT_TABS_CONFIG = [
    {
      id: patientDashboardConstants.UPCOMMING_APPOINTMENTS,
      label: patientDashboardConstants.UPCOMMING_APPOINTMENTS,
      component: Upcomming,
    },
    {
      id: patientDashboardConstants.PAST_APPOINTMENTS,
      label: patientDashboardConstants.PAST_APPOINTMENTS,
      component: Past,
    },
  ];

  return <CommonTabsOutlet tabsConfig={APPOINTMENT_TABS_CONFIG} />;
};

export default AppointmentSubTabsOutlet;
