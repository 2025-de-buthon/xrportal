// pages/login/login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../components/input/input';
import MainLayout from "../../layouts/main";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 서버 요청 부분은 생략하고, 로그인 성공 시 dummy token 저장
    localStorage.setItem('token', 'dummy-token');
    alert('로그인 성공');
    navigate('/'); // 로그인 후 메인 페이지로 이동
  };

  return (
    <MainLayout>
      <InputComponent
        inputTitle="로그인 하기"
        inputs={[
          {
            inputLabel: "이메일",
            placeholder: "이메일 입력",
            inputId: "email",
            value: email,
            onChange: (e) => setEmail(e.target.value),
          },
          {
            inputLabel: "비밀번호",
            placeholder: "비밀번호 입력",
            inputId: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
          }
        ]}
        buttonLabel="로그인 하기"
        onSubmit={handleLogin}  // InputComponent 내에서 버튼 클릭 시 onSubmit 호출한다고 가정
      />
    </MainLayout>
  );
};

export default LoginPage;
