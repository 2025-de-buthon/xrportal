// AdvertisementDetailPage.jsx
import React from 'react';
import MainLayout from '../../layouts/main';
import { PageWrapper } from './AdvertisementDetailPage.style';
import AdvertisementInfoComponent from '../../components/AdvertisementInfoComponent/AdvertisementInfoComponent';
import { useParams } from 'react-router-dom';

const AdvertisementDetailPage = () => {
    const {id} = useParams();
    console.log(id);
  return (
    <MainLayout isSidebar={false}>
      <PageWrapper>
        <AdvertisementInfoComponent />
      </PageWrapper>
    </MainLayout>
  );
};

export default AdvertisementDetailPage;

