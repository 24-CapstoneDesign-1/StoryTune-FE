import { InfoHeader } from "@/widgets";
import {  API, getAccess } from "@/shared";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { MainContainer } from "@/entities";
import { FaUser } from "react-icons/fa";
import { Loading } from "@/entities";

const PageContainer = styled.div`
 background-color: #fff9c4;
 min-height: 100vh;
 padding: 2rem;
 display: flex;
 justify-content: center;
`;

const ProfileContainer = styled.div`
 width: 100%;
 max-width: 600px;
`;

const ProfileHeader = styled.div`
 text-align: center;
 margin-bottom: 2rem;
`;

const ProfileUser = styled.div`
 width: 100px;
 height: 100px;
 background-color: #ffeb3b;
 border-radius: 50%;
 margin: 0 auto 1rem;
 display: flex;
 align-items: center;
 justify-content: center;
 box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
 
 svg {
   font-size: 50px;
   color: #5d4037;
 }
`;

const InfoCard = styled.div`
 background-color: white;
 border-radius: 15px;
 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
 padding: 25px;
 margin: 15px 0;
 width: 500px;
 height: 200px;
`;

const InfoItem = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 15px 0;
 border-bottom: 1px solid #eee;
 transition: background-color 0.2s ease;

 &:last-child {
   border-bottom: none;
 }

 &:hover {
   background-color: #fafafa;
 }

 span:first-of-type {
   font-weight: bold;
   color: #5d4037;
 }

 span:last-of-type {
   color: #666;
 }
`;

const ErrorMessage = styled.div`
 text-align: center;
 color: #d32f2f;
 padding: 20px;
 background-color: #ffebee;
 border-radius: 10px;
 margin: 20px 0;
`;

const MyInfo = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<{
      username: string;
      name: string;
      age: number;
      gender: string;
    } | null>(null);
  
    useEffect(() => {
      const fetchUserInfo = async () => {
        try {
          setIsLoading(true);
          const { data } = await API.get("/api/user", {
            headers: {
              "Authorization": `Bearer ${getAccess()}`
            }
          });
  
          if (data?.result) {
            // API 응답에 맞게 userInfo 구조화
            setUserInfo({
              username: String(data.result.userId), // userId를 username으로 사용
              name: data.result.name,
              age: 0,  // API에서 제공하지 않는 정보
              gender: '' // API에서 제공하지 않는 정보
            });
          }
          setError(null);
        } catch (err) {
          setError("사용자 정보를 불러오는 데 실패했습니다.");
          console.error("사용자 정보를 불러오는 데 실패했습니다.", err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserInfo();
    }, []);
  
    if (isLoading) {
      return <Loading />;
    }
  
    if (error) {
      return (
        <MainContainer>
          <InfoHeader type="내 정보" />
          <ErrorMessage>{error}</ErrorMessage>
        </MainContainer>
      );
    }
  
    if (!userInfo) {
      return (
        <MainContainer>
          <InfoHeader type="내 정보" />
          <ErrorMessage>사용자 정보가 없습니다.</ErrorMessage>
        </MainContainer>
      );
    }
  
    return (
      <MainContainer>
        <InfoHeader type="내 정보" />
        <PageContainer>
          <ProfileContainer>
            <ProfileHeader>
              <ProfileUser>
                <FaUser />
              </ProfileUser>
            </ProfileHeader>
            <InfoCard>
              <InfoItem>
                <span>아이디</span>
                <span>{userInfo.username}</span>
              </InfoItem>
              <InfoItem>
                <span>이름</span>
                <span>{userInfo.name}</span>
              </InfoItem>
              <InfoItem>
                <span>나이</span>
                <span>{userInfo.age ? `${userInfo.age}세` : '-'}</span>
              </InfoItem>
              <InfoItem>
                <span>성별</span>
                <span>{userInfo.gender || '-'}</span>
              </InfoItem>
            </InfoCard>
          </ProfileContainer>
        </PageContainer>
      </MainContainer>
    );
  };
  
  export default MyInfo;