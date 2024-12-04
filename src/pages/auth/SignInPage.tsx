import styled from "@emotion/styled";
import { Button, Title, ValidInput } from "@/entities";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AuthService, PAGE_URL } from "@/shared";
import { useState } from "react";

const SignInContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #D2FFFF;
`;

const SignInSubContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const SignInForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const SignInInput = styled.input`
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
const SignUpButton = styled.div`
    font-size: 1rem;
    color: grey;
    margin: 20px 5px 0px 0px;
    &:hover {
        cursor: pointer;
    }
    @media (max-width: 768px) {
        font-size: 0.8rem;
    }
`;
const SignUpContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const LoginButton = styled(Button)`
    width: 300px;
    height: 50px;
`;

const EyeSlash = styled(FaEyeSlash)`
    font-size: 1rem;
    position: absolute;
    right: 15px;
    top: 15px;
`;
const Eye = styled(FaEye)`
    font-size: 1rem;
    position: absolute;
    right: 15px;
    top: 15px;
`;

const PasswordContainer = styled.div`
    position: relative;
`;

interface SignInFormInput {
    userId: string;
    password: string;
}

const SignInPage = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const { register, handleSubmit, formState: { errors }, } = useForm<SignInFormInput>()
    const signin = AuthService().signin;

    const onSubmit: SubmitHandler<SignInFormInput> = (data) => {
        signin({
            username: data.userId,
            password: data.password,
        }).then(() => navigate(PAGE_URL.Home));
    }

    return (
        <SignInContainer>
            <SignInSubContainer>
                <Title>Story Tune</Title>
                <SignInForm onSubmit={handleSubmit(onSubmit)}>
                    <SignInInput type="text" placeholder="아이디" 
                    {...register("userId", { required: '* 아이디를 입력해주세요.', maxLength: 20, minLength: {
                        value: 0,
                        message: '아이디를 입력해주세요.',
                      }, })}
                    />
                    <ValidInput>
                        {errors?.userId?.message ? errors?.userId?.message : '\u00A0'}
                    </ValidInput>
                    <PasswordContainer>
                        <SignInInput type={isPasswordVisible ? "password" : "text"} placeholder="비밀번호" 
                        {...register("password", { required: '* 비밀번호를 입력해주세요.', maxLength: 20, minLength: {
                            value: 0,
                            message: '비밀번호를 입력해주세요.',
                        }, })}
                        />
                        {isPasswordVisible ? (
                            <EyeSlash onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                        ) : (
                            <Eye onClick={() => setIsPasswordVisible(!isPasswordVisible)} />
                        )}
                    </PasswordContainer>
                    <ValidInput>
                        {errors?.password?.message ? errors?.password?.message : '\u00A0'}
                    </ValidInput>
                    <br />
                    <LoginButton type="submit" width="300px" height="50px">로그인 하기</LoginButton>
                </SignInForm>
                <SignUpContainer>
                    <SignUpButton onClick={() => navigate(PAGE_URL.SignUp)}>회원가입</SignUpButton>
                    <SignUpButton>|</SignUpButton>
                    <SignUpButton>아이디 찾기</SignUpButton>
                </SignUpContainer>
            </SignInSubContainer>
        </SignInContainer>
    );
};

export default SignInPage;