// AdvertiseRegisterContainer.jsx
import React, { useState } from 'react';
import { Wrapper } from './advertiseRegisterScreen.style';
import AdvertiseInputPreview from './AdvertiseInputPreview';
import AdvertiseFee from './AdvertiseFee';

const AdvertiseRegisterContainer = () => {
  const [step, setStep] = useState('input'); // 'input' 또는 'fee'
  const [adTitle, setAdTitle] = useState('');
  const [adContent, setAdContent] = useState('');

  // 날짜 관련 상태
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [estimatedTokens, setEstimatedTokens] = useState(0);

  // 날짜 차이를 계산하여 토큰 수(1일 당 100토큰)를 반환하는 함수
  const calculateTokens = (start, end) => {
    if (start && end) {
      const startDt = new Date(start);
      const endDt = new Date(end);
      const diffTime = endDt.getTime() - startDt.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays * 100 : 0;
    }
    return 0;
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    setEstimatedTokens(calculateTokens(value, endDate));
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    setEstimatedTokens(calculateTokens(startDate, value));
  };

  const handleRegister = () => {
    // 광고 등록 버튼 클릭 시 미리보기 단계로 전환
    setStep('fee');
  };

  return (
    <Wrapper>
      <AdvertiseInputPreview
        step={step}
        onRegister={handleRegister}
        adTitle={adTitle}
        adContent={adContent}
        setAdTitle={setAdTitle}
        setAdContent={setAdContent}
      />
      {step === 'fee' && (
        <AdvertiseFee
          startDate={startDate}
          endDate={endDate}
          estimatedTokens={estimatedTokens}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
        />
      )}
    </Wrapper>
  );
};

export default AdvertiseRegisterContainer;
