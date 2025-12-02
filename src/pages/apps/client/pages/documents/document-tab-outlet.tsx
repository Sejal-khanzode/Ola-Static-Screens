import{ useMemo } from 'react';
// import DocumentTabsOutlet from 'src/components/core/reusable/common-tab-outlet/document-tabs-outlet';
import IntakeForm from 'src/pages/apps/admin/pages/templates/intake-form';
import ConsentForm from 'src/pages/apps/admin/pages/templates/consent-form';
import DocumentTabsOutlet from 'src/components/core/reusable/common-tab-outlet/document-outlet';

const DocumentTabOutlet = () => {
  const DOCUMENT_TABS_CONFIG = useMemo(
    () => [
      {
        id: 'Intake Form',
        label: 'Intake Form',
        component: IntakeForm,
        route: 'intake-form',
        props: {
          isEdit: true,
          patientProfile: true,
        },
      },
      {
        id: 'Consent Form',
        label: 'Consent Form',
        component: ConsentForm,
        route: 'consent-form',
        props: {
          isEdit: true,
          patientProfile: true,
        },
      },
    ],
    []
  );

  return <DocumentTabsOutlet tabsConfig={DOCUMENT_TABS_CONFIG} />;
};

export default DocumentTabOutlet;
