import React from 'react';
import HomePage from './home';
import { useTranslation } from 'next-i18next';



export default function Page() {
  const { t } = useTranslation(['common/en']);
  console.log("translte::",t('greet'));
  return (
    <>
    <h1 className='ms-[800px]'>{t('greet')}</h1>
     <HomePage />
    </>
  );
};

