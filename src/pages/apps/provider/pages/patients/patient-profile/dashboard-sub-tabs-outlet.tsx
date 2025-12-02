import CommonTabsOutlet from 'src/components/core/reusable/common-tab-outlet/common-tabs-outlet';
import FaceSheet from './dashboard/face-sheet';
import IntakeForm from 'src/pages/apps/admin/pages/templates/intake-form';
import ConsentForm from 'src/pages/apps/admin/pages/templates/consent-form';

const DashboardSubTabsOutlet = () => {
  const DASHBOARD_TABS_CONFIG = [
    { id: 'Face Sheet', label: 'Face Sheet', component: FaceSheet },
    {
      id: 'Intake Form',
      label: 'Intake Form',
      component: IntakeForm,
      disabled: false,
      props: {
        isEdit: true,
        patientProfile: true,
      },
    },
    {
      id: 'Consent Form',
      label: 'Consent Form',
      component: ConsentForm,
      disabled: false,
      props: {
        isEdit: true,
        patientProfile: true,
      },
    },
  ];

  return <CommonTabsOutlet tabsConfig={DASHBOARD_TABS_CONFIG} />;
};

export default DashboardSubTabsOutlet;
