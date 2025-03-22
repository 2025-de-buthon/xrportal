import React from 'react';
import InputComponent from '../../components/input/input';
import MainLayout from "../../layouts/main";

const SingUpPage = () => {
  return (
    <MainLayout>
        <InputComponent
        inputTitle="회원가입 하기"
        inputs={[
          {
            inputLabel: "이름",
            placeholder: "이름 입력",
            inputId: "name"
            },
          {
            inputLabel: "이메일",
            placeholder: "이메일 입력",
            inputId: "email"
          },
          {
            inputLabel: "비밀번호",
            placeholder: "비밀번호 입력",
            inputId: "password"
          },
          {
            inputLabel: "비밀번호 확인",
            placeholder: "비밀번호 입력",
            inputId: "password"
          }
        ]}
        buttonLabel="Sign up"
        />
    </MainLayout>
  );
};

export default SingUpPage;
