import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard= () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>I'm Dashboard</h2>
      <p>{t('welcome')}</p>
    </div>
  );
};

export default Dashboard;
