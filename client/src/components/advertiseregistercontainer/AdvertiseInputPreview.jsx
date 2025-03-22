import React from 'react';
import { 
  Title, 
  InputBox, 
  InputPlaceholder, 
  TextareaBox, 
  TextareaPlaceholder, 
  ButtonWrapper, 
  ButtonText,
  PreviewBox,
  PreviewText
} from './advertiseRegisterScreen.style';

const AdvertiseInputPreview = ({ step, onRegister, adTitle, adContent, setAdTitle, setAdContent }) => {
  if (step === 'input') {
    return (
      <>
        <Title>광고 등록</Title>
        <InputBox>
          <InputPlaceholder 
            placeholder="광고 제목"
            value={adTitle}
            onChange={(e) => setAdTitle(e.target.value)}
          />
        </InputBox>
        <TextareaBox>
          <TextareaPlaceholder 
            placeholder="광고 내용을 입력하세요"
            value={adContent}
            onChange={(e) => setAdContent(e.target.value)}
          />
        </TextareaBox>
        <ButtonWrapper onClick={onRegister}>
          <ButtonText>광고 등록</ButtonText>
        </ButtonWrapper>
      </>
    );
  } else if (step === 'fee') {
    return (
      <>
        <Title>광고 등록</Title>
        <PreviewBox>
          <PreviewText>
            <h2>{adTitle}</h2>
            <br/>
            <span>{adContent}</span>
          </PreviewText>
        </PreviewBox>
      </>
    );
  }
  return null;
};

export default AdvertiseInputPreview;
