import React, { useState } from "react";
import MainLayout from "../../layouts/main";
import {
  BackBtn,
  CreateArticlePageContainer,
  Header,
  MintingDescription,
  MintingInputContainer,
  TextInput,
  WriteBtn,
} from "./create-article.style";
import MDEditor from "@uiw/react-md-editor";
import MarkdownPreview from "../../components/markdown-preview/markdown-preview";

const CreateArticlePage = () => {
  // WRITE, MINTING
  const [step, setStep] = useState("WRITE");
  const [content, setContent] = useState("");

  return (
    <MainLayout isSidebar={false} width={800}>
      {step === "WRITE" && (
        <CreateArticlePageContainer>
          <div>
            <Header>Give it a title...</Header>
            <TextInput
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline={true}
              placeholder="What's on your mind? (Markdown supported)"
            ></TextInput>
            <MarkdownPreview markdown={content} />
            <WriteBtn onClick={() => setStep("MINTING")}>Write</WriteBtn>
          </div>
        </CreateArticlePageContainer>
      )}
      {step === "MINTING" && (
        <CreateArticlePageContainer>
          <div>
            <Header>Give it a title...</Header>
            <MintingDescription>
              XRPL을 활용한 블로그는 빠른 트랜잭션과 낮은 비용으로 운영될 수
              있습니다.
              <br /> 또한, 콘텐츠 제작자에게 직접 보상을 지급하는 것이
              가능합니다.
            </MintingDescription>
            <MintingInputContainer>
              <h2>컨텐츠 민팅하기</h2>
              <input placeholder="Price (XRP)" />
            </MintingInputContainer>
            <div>
              <BackBtn
                onClick={() => {
                  setStep("WRITE");
                }}
              >
                Back
              </BackBtn>
              <WriteBtn>Minting</WriteBtn>
            </div>
          </div>
        </CreateArticlePageContainer>
      )}
    </MainLayout>
  );
};

export default CreateArticlePage;
