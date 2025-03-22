import React, { useState } from "react";
import MainLayout from "../../layouts/main";
import {
  HeaderContent,
  HeaderWrapper,
  MainContainer,
  ArticleListContainer,
} from "./main.style";
import ArticleItemComponent from '../../components/article-item/article-item';
import { $api } from '../../utils/axios';

const ARTICLE_TYPE = ["Recent", "Like", "Hot"];

const ARTICLE_LIST = [
  {
    id: 1,
    userName: "traveler",
    title: "봄 여행지 추천",
    content: "이번 봄에 가기 좋은 여행지를 소개합니다!",
    createdAt: "2025-03-22",
    viewCount: 350,
    likeCount: 24,
    amount: 1500,
  },
  {
    id: 2,
    userName: "fitnessGuru",
    title: "효과적인 운동법",
    content: "집에서도 쉽게 할 수 있는 운동 방법입니다.",
    createdAt: "2025-03-21",
    viewCount: 500,
    likeCount: 40,
    amount: 2000,
  },
  {
    id: 3,
    userName: "chefMin",
    title: "맛있는 파스타 레시피",
    content: "간단하고 맛있는 파스타 만드는 법을 알아봅시다.",
    createdAt: "2025-03-20",
    viewCount: 420,
    likeCount: 35,
    amount: 1800,
  },
  {
    id: 4,
    userName: "movieLover",
    title: "최신 영화 리뷰",
    content: "최근 개봉한 영화들의 솔직한 리뷰를 확인하세요.",
    createdAt: "2025-03-19",
    viewCount: 600,
    likeCount: 50,
    amount: 2200,
  },
  {
    id: 5,
    userName: "stressRelief",
    title: "스트레스 해소법",
    content: "일상 속 스트레스를 줄이는 다양한 방법들을 공유합니다.",
    createdAt: "2025-03-18",
    viewCount: 290,
    likeCount: 18,
    amount: 1200,
  },
  {
    id: 6,
    userName: "moneyCoach",
    title: "재테크 초보 가이드",
    content: "재테크를 시작하는 분들을 위한 기초 지식을 정리했습니다.",
    createdAt: "2025-03-17",
    viewCount: 480,
    likeCount: 32,
    amount: 1700,
  },
  {
    id: 7,
    userName: "homeBarista",
    title: "집에서 하는 홈카페 메뉴",
    content: "카페처럼 멋진 음료를 집에서 만들어 보세요.",
    createdAt: "2025-03-16",
    viewCount: 310,
    likeCount: 22,
    amount: 1300,
  },
  {
    id: 8,
    userName: "planner",
    title: "효율적인 시간 관리법",
    content: "하루를 알차게 보내는 시간 관리 팁입니다.",
    createdAt: "2025-03-15",
    viewCount: 450,
    likeCount: 29,
    amount: 1600,
  },
  {
    id: 9,
    userName: "bookworm",
    title: "베스트셀러 도서 소개",
    content: "현재 인기를 끌고 있는 베스트셀러 책들을 소개합니다.",
    createdAt: "2025-03-14",
    viewCount: 330,
    likeCount: 25,
    amount: 1400,
  },
  {
    id: 10,
    userName: "petLover",
    title: "반려동물과의 여행",
    content: "반려동물과 함께 여행할 때의 주의점과 준비물을 알아봅니다.",
    createdAt: "2025-03-13",
    viewCount: 260,
    likeCount: 15,
    amount: 1100,
  },
  {
    id: 11,
    userName: "interiorExpert",
    title: "셀프 인테리어 팁",
    content: "쉽고 간단한 셀프 인테리어 방법을 공유합니다.",
    createdAt: "2025-03-12",
    viewCount: 370,
    likeCount: 28,
    amount: 1500,
  },
  {
    id: 12,
    userName: "hiker",
    title: "초보자를 위한 등산 팁",
    content: "등산 초보자들이 꼭 알아야 할 기본적인 사항들입니다.",
    createdAt: "2025-03-11",
    viewCount: 290,
    likeCount: 20,
    amount: 1250,
  },
  {
    id: 13,
    userName: "foodie",
    title: "간단 도시락 레시피",
    content: "출근길에 간편히 준비할 수 있는 도시락 레시피입니다.",
    createdAt: "2025-03-10",
    viewCount: 430,
    likeCount: 31,
    amount: 1550,
  },
  {
    id: 14,
    userName: "seriesFan",
    title: "넷플릭스 인기 시리즈 추천",
    content: "최근 인기 있는 넷플릭스 시리즈를 정리해 봤습니다.",
    createdAt: "2025-03-09",
    viewCount: 520,
    likeCount: 45,
    amount: 2100,
  },
  {
    id: 15,
    userName: "photoTips",
    title: "스마트폰 사진 촬영 팁",
    content: "스마트폰으로 멋진 사진 찍는 법을 소개합니다.",
    createdAt: "2025-03-08",
    viewCount: 310,
    likeCount: 23,
    amount: 1350,
  },
  {
    id: 16,
    userName: "englishTutor",
    title: "효과적인 영어 공부법",
    content: "영어 실력을 빠르게 늘리는 방법을 알아봅니다.",
    createdAt: "2025-03-07",
    viewCount: 410,
    likeCount: 34,
    amount: 1650,
  },
  {
    id: 17,
    userName: "nutritionist",
    title: "건강한 아침 식단",
    content: "건강하고 맛있는 아침 식단을 제안합니다.",
    createdAt: "2025-03-06",
    viewCount: 280,
    likeCount: 19,
    amount: 1150,
  },
  {
    id: 18,
    userName: "shoppingPro",
    title: "온라인 쇼핑 꿀팁",
    content: "온라인 쇼핑을 더 현명하게 하는 방법입니다.",
    createdAt: "2025-03-05",
    viewCount: 340,
    likeCount: 26,
    amount: 1450,
  },
  {
    id: 19,
    userName: "hobbyist",
    title: "집에서 즐기는 취미 생활",
    content: "집에서도 충분히 즐길 수 있는 다양한 취미들을 소개합니다.",
    createdAt: "2025-03-04",
    viewCount: 360,
    likeCount: 27,
    amount: 1500,
  },
  {
    id: 20,
    userName: "trainer",
    title: "나만의 홈 트레이닝 루틴",
    content: "매일 꾸준히 할 수 있는 홈 트레이닝 루틴입니다.",
    createdAt: "2025-03-03",
    viewCount: 470,
    likeCount: 38,
    amount: 1750,
  },
];

const MainPage = () => {
  const [articleType, setArticlType] = useState("Recent");
  const [articleList, setArticleList] = useState(ARTICLE_LIST);
  useEffect(() => {
    fetchrticleList();
  }, [articleType]);

  const fetchrticleList = async() => {
    try {
      const response = await $api.get(`/posts`);
      if (response.data) {
        setArticleList(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <MainLayout isSidebar={true}>
        <MainContainer>
          <HeaderWrapper>
            {ARTICLE_TYPE.map((v, i) => (
              <HeaderContent
                isFocus={v === articleType}
                key={i}
                onClick={() => setArticlType(v)}
              >
                {v}
              </HeaderContent>
            ))}
          </HeaderWrapper>
          <ArticleListContainer>
            {ARTICLE_LIST.map((article) => (
              <ArticleItemComponent key={article.id} article={article} />
            ))}
          </ArticleListContainer>
        </MainContainer>
      </MainLayout>
    </>
  );
};

export default MainPage;
