import styled from "@emotion/styled";
import { Title, Button } from "@/entities";
import { ValidInput } from "@/entities";
import { useState } from "react";
import { useNavigate, } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #D2FFFF;

`;
const SignUpForm = styled.form`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 20px;
    width: 350px;
    height: 60vh;
    padding: 40px 70px;
    @media (max-width: 768px) {
        width: 220px;
        height: 50vh;
        padding: 40px 50px;
    }

`;
const GenderButton = styled.div<{ gender: boolean }>`
    width: 100px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.gender === false ? '#D9D9D9' : 'white'};
    border: ${(props) => props.gender === false ? '2px solid #D9D9D9' : '2px solid #1F9EF9'};
    border-radius: 10px;
    margin: 10px 20px 10px 0px;
`;
const SignUpInput = styled.input<{ width?: string; }>`
    width: ${(props) => props.width || "100%"};
    height: 30px;
    border: none;
    border-bottom: 1px solid black;
    font-size: 1rem;
    outline: none;
    @media (max-width: 768px) {
        width: ${(props) => props.width || "100%"};
    }
`;
const GenderContainer = styled.div`
    display: flex;
`;
const NextConatiner = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
`;
const BackButton = styled.img`
    width: 25px;
    height: 25px;
    margin-bottom: 20px;
`;
const AgeContainer = styled.div`
    display: flex;
`;
const AgeLabel = styled.div`
    display: flex;
    margin-left: 10px;
`;
const DuplicateButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    width: 100px;
    border-radius: 10px;
    color: white;
    border: none;
    outline: none;
    background-color: white;
    border: 1px solid black;
    color: black;
    font-size: 1rem;
`;
const IdInputContainer = styled.div`
    display: flex;
`;

interface SignUpFormInput {
    name: string;
    age: number;
    gender: string;
    userId: string;
    password: string;
}

const SignUpPage = () => {
    const [progress, setProgress] = useState(0);
    const [gender, setGender] = useState('');
    const navigate = useNavigate();

    const { register, handleSubmit, setError, setValue, formState: { errors }, } = useForm<SignUpFormInput>()
    // const onSubmit: SubmitHandler<SignUpFormInput> = (data) => {
    //     try {
    //     onValid(data)
    //     signin({
    //         userId: data.userId,
    //         password: data.password,
    //     }).then(() => navigate("/home"));
    //     }
    //     catch (error) {
    //     console.error(error)
    //     }
    // }

    const onValid = (data : SignUpFormInput) => {
        if (data.name === '') {
            setError(
                'name',
                { message: '이름이 입력되어 있지 않습니다.' },
                { shouldFocus: true },
            );
        }
        if (data.age === 0) {
            setError(
                'age',
                { message: '나이가 입력되어 있지 않습니다.' },
                { shouldFocus: true },
            );
        }
        if (data.gender === '') {
            setError(
                'gender',
                { message: '성별이 입력되어 있지 않습니다.' },
                { shouldFocus: true },
            );
        }
        if (data.userId === '') {      
            setError(
            'userId',
            { message: '아이디가 입력되어 있지 않습니다.' },
            { shouldFocus: true },
            );
        }
        if (data.password === '') {
            setError(
            'password',
            { message: '비밀번호가 입력되어 있지 않습니다.' },
            { shouldFocus: true },
            );
        }
    }

    const handleGenderSelection = (selectedGender: string) => {
        setGender(selectedGender);
        setValue('gender', selectedGender);
    };

    return (
        <SignUpContainer>
            <Title>Story Tune</Title>
            <SignUpForm>
                {progress === 0 ? (
                <>
                    {/* <BackButton src="./images/back.svg" onClick={() => navigate("/signin")} /> */}
                    <label>이름</label>
                    <SignUpInput type="text"
                    {...register("name", { required: '* 이름을 입력해주세요.', maxLength: 10, minLength: {
                        value: 0,
                        message: '이름를 입력해주세요.',
                      }, })}
                    />
                    <ValidInput>
                        {errors?.name?.message ? errors?.name?.message : '\u00A0'}
                    </ValidInput>
                    <label>나이</label>
                    <AgeContainer>
                        <SignUpInput type="number" width="20%" min={1}
                        {...register("age", { required: '* 나이를 입력해주세요.', maxLength: 3, minLength: {
                            value: 0,
                            message: '나이를 입력해주세요.',
                          }, })}
                        />
                        <AgeLabel>
                            살
                        </AgeLabel>
                    </AgeContainer>
                    <ValidInput>
                        {errors?.age?.message ? errors?.age?.message : '\u00A0'}
                    </ValidInput>
                    <label>성별</label>
                    <GenderContainer
                    {...register("gender", { required: '* 성별을 입력해주세요.', maxLength: 1, minLength: {
                        value: 0,
                        message: '성별을 입력해주세요.',
                      }, }
                    )}
                    >
                        <GenderButton gender={gender == '남' ? true : false} onClick={() => handleGenderSelection("남")}>남</GenderButton>
                        <GenderButton gender={gender == '여' ? true : false} onClick={() => handleGenderSelection('여')}>여</GenderButton>
                    </GenderContainer>
                    <ValidInput>
                        {errors?.gender?.message ? errors?.gender?.message : '\u00A0'}
                    </ValidInput>
                    <NextConatiner>
                        <Button width="400px" height="50px" onClick={handleSubmit(() => setProgress(progress + 1))}>계속하기</Button>
                    </NextConatiner>
                </>
                ) : (
                    <>
                        
                        <BackButton src="./images/back.svg" onClick={() => setProgress(progress - 1)} />
                        <label>아이디</label>
                        <IdInputContainer>
                            <SignUpInput type="text" placeholder="아이디를 입력하세요" />
                            <DuplicateButton>중복 확인</DuplicateButton>
                        </IdInputContainer>
                        <label>비밀번호</label>
                        <SignUpInput type="password" placeholder="비밀번호를 입력하세요" />
                        <label>비밀번호 확인</label>
                        <SignUpInput type="password" placeholder="비밀번호를 다시 입력하세요" />
                        <NextConatiner>
                            <Button width="400px" height="50px">회원가입 하기</Button>
                        </NextConatiner>
                    </>
                )}
            </SignUpForm>
        </SignUpContainer>
    );
};

export default SignUpPage;