import { InfoHeader } from "@/widgets";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "@/shared";
import { useLocation } from 'react-router-dom';
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

const MyInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #D2FFFF;
    border-radius: 10px;
`;

const InfoTitle = styled.h2`
    margin-bottom: 20px;
`;

const InfoItem = styled.div`
    margin: 10px 0;
`;

const dummyData = {
    name: "김철수",
    userId: "kim123",
    age: 7,
    gender: "남",
};

const MyInfo = () => {
    const [userInfo, setUserInfo] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try { 
                setUserInfo(dummyData);
            } catch (err) {
                console.error(err);
                setError("사용자 정보를 불러오는 데 실패했습니다.");
            }
        };

        fetchUserInfo();
    }, [navigate]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <MyInfoContainer>
            <InfoTitle>내 정보</InfoTitle>
            <InfoItem>이름: {userInfo.name}</InfoItem>
            <InfoItem>아이디: {userInfo.userId}</InfoItem>
            <InfoItem>나이: {userInfo.age}</InfoItem>
            <InfoItem>성별: {userInfo.gender}</InfoItem>
        </MyInfoContainer>
    );
};

export default MyInfo;