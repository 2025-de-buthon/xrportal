// AdvertisementInfoComponent.jsx
import React, { useEffect } from 'react';
import {
  BackgroundContainer,
  XRPLTitle,
  OverlayBorder,
  XRPLOverlayText,
  InfoRow,
  InfoBlock,
  Label,
  InfoContainer,
  InfoText,
  ClickedContainer,
  ClickedText,
  DeployedContainer,
  DeployedText,
  Divider,
} from './AdvertisementInfoComponent.style';

import axios from 'axios' ;

const AdvertisementInfoComponent = ( { ad_id } ) => {
  useEffect(() => {
    getAdvertisement();
    return () => {};
  }, []);


  const getAdvertisement = async () => {
      const res = await axios.get(`http://localhost:3000/advertisement/${ad_id}/detail`);
      console.log(res);
  }
  

  // JSON 데이터 (예시)
  const advertisementData = {
    title: "XRPL을 활용한 블로그의 미래",
    overlay: {
      first: "🚀 XRPL 기반 광고 | 빠르고 저렴한 fwef",
    },
    startDate: "2025.03.22",
    endDate: "2025.04.22",
    clickCount: "1056",
    status: "Deployed"
  };

  return (
    <BackgroundContainer>
      <XRPLTitle>{advertisementData.title}</XRPLTitle>
      
      <OverlayBorder>
        <XRPLOverlayText>
          <div>
            <span>{advertisementData.overlay.first}</span>
          </div>
        </XRPLOverlayText>
      </OverlayBorder>
      
      <InfoRow>
        <InfoBlock>
          <Label>시작일</Label>
          <InfoContainer>
            <InfoText>{advertisementData.startDate}</InfoText>
          </InfoContainer>
        </InfoBlock>
        <InfoBlock>
          <Label>종료일</Label>
          <InfoContainer>
            <InfoText>{advertisementData.endDate}</InfoText>
          </InfoContainer>
        </InfoBlock>
      </InfoRow>
      
      <Divider />
      
      <InfoRow>
        <InfoBlock>
          <Label>클릭수</Label>
          <ClickedContainer>
            <ClickedText>{advertisementData.clickCount}</ClickedText>
          </ClickedContainer>
        </InfoBlock>
        <InfoBlock>
          <Label>상태</Label>
          <DeployedContainer>
            <DeployedText>{advertisementData.status}</DeployedText>
          </DeployedContainer>
        </InfoBlock>
      </InfoRow>
      
      <Divider />
    </BackgroundContainer>
  );
};

export default AdvertisementInfoComponent;
