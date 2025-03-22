import React, { useEffect, useState } from "react";
import MainLayout from "../../../layouts/main";
import {
  HeaderContent,
  HeaderWrapper,
  ListContainer,
  Wrapper,
} from "./advertisement.style";
import ArticleItemComponent from "../../../components/article-item/article-item";
import AdvertisementItemComponent from "../../../components/advertisement-item/advertisement-item";
import { Link } from 'react-router-dom';

const ADVERTISEMENT_LIST = [
  {
    id: 1,
    title: "광고 게시글 1",
    content: "광고 게시글 1",
    startDate: "2025-03-22",
    endDate: "2025-04-30",
    clickCount: 20,
    status: "ACTIVE",
  },
  {
    id: 2,
    title: "광고 게시글 2",
    content: "광고 게시글 2",
    startDate: "2025-03-22",
    endDate: "2025-04-30",
    clickCount: 20,
    status: "DEACTIVE",
  },
  {
    id: 3,
    title: "광고 게시글 3",
    content: "광고 게시글 3",
    startDate: "2025-03-22",
    endDate: "2025-04-30",
    clickCount: 20,
    status: "ACTIVE",
  },
  {
    id: 4,
    title: "광고 게시글 3",
    content: "광고 게시글 3",
    startDate: "2025-03-22",
    endDate: "2025-04-30",
    clickCount: 20,
    status: "DEACTIVE",
  },
  {
    id: 5,
    title: "광고 게시글 5",
    content: "광고 게시글 5",
    startDate: "2025-03-22",
    endDate: "2025-04-30",
    clickCount: 20,
    status: "ACTIVE",
  },
];

const ADVERTISEMENT_TYPE = ["ALL", "ACTIVE", "DEACTIVE"];

const MyAdvertisementPage = () => {
  // ACTIVE, DEACTIVE, ALL
  const [advertisementType, setAdvertisementType] = useState("ALL");
  const [advertisementList, setAdvertisementList] =
    useState(ADVERTISEMENT_LIST);

  useEffect(() => {
    setAdvertisementList(
      ADVERTISEMENT_LIST.filter((v) =>
        advertisementType === "ALL" ? true : v.status === advertisementType
      )
    );
  }, [advertisementType]);

  return (
    <MainLayout isSidebar={true} width={1024}>
      <Wrapper>
        <HeaderWrapper>
          {ADVERTISEMENT_TYPE.map((v, i) => (
            <HeaderContent
              onClick={() => setAdvertisementType(v)}
              isFocus={advertisementType === v}
            >
              {v}
            </HeaderContent>
          ))}
        </HeaderWrapper>
        <ListContainer>
          {advertisementList.map((advertisement) => (
            <Link to={`/advertise/${advertisement.id}`}>
              <AdvertisementItemComponent
                key={advertisement.id}
                advertisement={advertisement}
              />
            </Link>
          ))}
        </ListContainer>
      </Wrapper>
    </MainLayout>
  );
};

export default MyAdvertisementPage;
