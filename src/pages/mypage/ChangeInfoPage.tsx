import styled from "@emotion/styled";
import { Button, Title, ValidInput } from "@/entities";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API } from "@/shared"; 
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { PAGE_URL } from "@/shared";

const ChangeInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #fff9c4;
`;

const ChangeInfoSubContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChangeInfoForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ChangeInfoInput = styled.input`
    width: 400px;
    height: 23px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
    font-size: 1rem;
    outline: none;
    @media (max-width: 768px) {
        width: 300px;
    }
`;

const SubmitButton = styled(Button)`
    width: 300px;
    height: 50px;
    background-color: #5d4037;
`;

const PasswordContainer = styled.div`
    position: relative;
`;


const ChangeInfoPage = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(true);
    const { register, handleSubmit, setError, formState: { errors }, } = useForm();

    const onSubmit: SubmitHandler<any> = async (data) => {
        try {
            //await API.put('/change-password', { 
            //    currentPassword: data.currentPassword,
            //    newPassword: data.newPassword,
            //});
            alert("비밀번호가 변경되었습니다.");
            navigate("/mypage"); 
        } catch (error) {
            console.error(error);
            setError("currentPassword", { message: "비밀번호를 변경할 수 없습니다." });
        }
    };

    return (
        <ChangeInfoContainer>
            <ChangeInfoSubContainer>
                <Title>내 정보 변경</Title>
                <ChangeInfoForm onSubmit={handleSubmit(onSubmit)}>
                    <ChangeInfoForm onSubmit={handleSubmit(onSubmit)}>
                        <ChangeInfoInput placeholder="닉네임" 
                        {...register("nickname", { required: '* 닉네임을 입력해주세요.' })}
                    />
                    </ChangeInfoForm>
                    <ValidInput>
                        {errors?.nickname?.message ? String(errors?.nickname?.message) : '\u00A0'}
                    </ValidInput>
                    <PasswordContainer>
                        <ChangeInfoInput 
                            type={isPasswordVisible ? "password" : "text"} 
                            placeholder="현재 비밀번호" 
                            {...register("currentPassword", { required: '* 현재 비밀번호를 입력해주세요.' })}
                        />
                    </PasswordContainer>
                    <ValidInput>
                        {errors?.currentPassword?.message ? String(errors?.currentPassword?.message) : '\u00A0'}
                    </ValidInput>
                    <PasswordContainer>
                        <ChangeInfoInput 
                            type={isNewPasswordVisible ? "password" : "text"} 
                            placeholder="새 비밀번호" 
                            {...register("newPassword", { required: '* 새 비밀번호를 입력해주세요.' })}
                        />
                       
                    </PasswordContainer>
                    <ValidInput>
                        {errors?.newPassword?.message ? String(errors?.newPassword?.message) : '\u00A0'}
                    </ValidInput>
                    <SubmitButton type="submit">변경사항 저장하기</SubmitButton>
                </ChangeInfoForm>
            </ChangeInfoSubContainer>
        </ChangeInfoContainer>
    );
};

export default ChangeInfoPage;
