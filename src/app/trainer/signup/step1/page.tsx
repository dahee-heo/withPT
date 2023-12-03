"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import beforePage from "../../../../../public/icons/beforePage.png";
import { Button } from "@/styles/TrainerButton";
import { Input2 } from "@/styles/TrainerInput";
import { useDispatch } from "react-redux";
import { signupActions } from "@/redux/reducers/trainerSignupSlice";
import { useAppSelector } from "@/redux/hooks";

interface Trbirth {
  year: string;
  month: string;
  date: string;
}

interface TrInfo {
  name: string;
  birth: Trbirth | string;
  sex: string;
}

interface TrGenderLabelProps {
  selected: boolean;
  htmlFor: string;
  children: React.ReactNode;
}

const Wrap = styled.div`
  background-color: white;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: auto;
`;

const ContentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  position: fixed;
  width: 100%;
  height: 4.4rem;
  z-index: 100;
`;

const ButtonHistoryBack = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  padding-left: 1.25rem;
`;

const RegisterTitle = styled.h4`
  color: #222;
  font-size: var(--font-xl);
  font-weight: 700;
  letter-spacing: -0;
`;

const ContentBody = styled.div`
  padding: 6.8rem 1.25rem 3.2rem 1.25rem;
`;

const ContentInnerBody = styled.div``;

const SignupStepInfo = styled.p`
  font-size: var(--font-xxxl);
  font-weight: 600;
  color: #222;
`;

const SignupStepInfoSub = styled.p`
  font-size: var(--font-m);
  color: var(--font-gray400);
`;

const SignupFormWrap = styled.div`
  margin-bottom: 1rem;
`;

const FormTitle = styled.h4`
  font-size: var(--font-l);
  margin-bottom: 0.2rem;
`;

const TrGenderLabel = styled.label<TrGenderLabelProps>`
  width: 100%;
  height: 3rem;
  background-color: var(--purple50);
  border: ${props => (props.selected ? "1.5px solid var(--primary)" : "none")};
  border-radius: 8px;
  margin: 0 0.3rem;
  padding: 0.75rem 0;
  text-align: center;
`;

const TrGenderRadio = styled.input`
  appearance: none;
  background-color: var(--purple50);
`;

const SignupOrderWrap = styled.div`
  font-size: var(--font-xxxs);
  display: flex;
  align-items: center;
  margin-bottom: 2.25rem;
`;

const SignupOrderCurrent = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--primary);
  color: var(--white);
  margin-bottom: 0.2rem;
  margin-right: 0.62rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
  font-size: var(--font-xs);
  font-weight: bold;
  text-align: center;
`;

const SignupOrder = styled.span`
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--purple100);
  color: var(--purple200);
  margin-bottom: 0.2rem;
  margin-right: 0.62rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
  font-size: var(--font-xs);
  font-weight: bold;
  text-align: center;
`;

const TrRegisItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* color: var(--black); */
`;

const SignupInput = styled.input`
  border: none;
  border-radius: 0.2rem;
  margin-bottom: 2rem;
  line-height: 2.3rem;
  background-color: var(--purple50);
  text-align: center;
  width: 100%;
  height: 3rem;
  margin: 0 0.3rem;
`;

const Slash = styled.span`
  padding: 0 0.75rem;
`;

const ButtonAreaFixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 2.4rem 1.6rem 1.6rem;
  width: 100%;
  z-index: 100;
  background-color: transparent;
`;

const NextStep = styled(Link)`
  display: block;
  border: none;
  border-radius: 0.6rem;
  line-height: 3.5rem;
  width: 100%;
  background-color: var(--primary);
  color: white;
  font-size: var(--font-m);
  text-align: center;
  padding: 0 1.6rem;
`;

export default function step1() {
  const [inputData, setInputData] = useState<TrInfo>({
    name: "",
    birth: {
      year: "",
      month: "",
      date: "",
    },
    sex: "",
  });

  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  const router = useRouter();
  const inputRef = useRef<null[] | HTMLInputElement[]>([]);
  const dispatch = useDispatch();
  const states = useAppSelector(state => state.signup);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "year" || name === "month" || name === "date") {
      setInputData(prevState => ({
        ...prevState,
        birth:
          typeof prevState.birth !== "string"
            ? {
                ...prevState.birth,
                [name]: value.replace(/[^0-9.]/g, ""),
              }
            : "",
      }));
    } else {
      setInputData({
        ...inputData,
        [name]: value,
      });
    }
  };

  console.log(inputData);

  const handleNext = () => {
    const birthJoin =
      typeof inputData.birth !== "string"
        ? `${inputData.birth.year}-${inputData.birth.month.padStart(
            2,
            "0",
          )}-${inputData.birth.date.padStart(2, "0")}`
        : "";

    if (
      inputData.name.length <= 0 &&
      inputRef.current[0] !== null &&
      inputRef.current[0] !== undefined
    ) {
      inputRef.current[0].focus();
      return false;
    }
    if (
      typeof inputData.birth !== "string" &&
      inputData.birth.year.length <= 0 &&
      inputRef.current[1] !== null &&
      inputRef.current[1] !== undefined
    ) {
      inputRef.current[1].focus();
      return false;
    }
    if (
      typeof inputData.birth !== "string" &&
      inputData.birth.month.length <= 0 &&
      inputRef.current[2] !== null
    ) {
      inputRef.current[2].focus();
      return false;
    }
    if (
      typeof inputData.birth !== "string" &&
      inputData.birth.date.length <= 0 &&
      inputRef.current[3] !== null
    ) {
      inputRef.current[3].focus();
      return false;
    }
    if (inputData.sex.length <= 0 && inputRef.current[4] !== null) {
      inputRef.current[4].focus();
      return false;
    }

    dispatch(
      signupActions.saveSignupState({
        name: inputData.name.trim(),
        birth: birthJoin,
        sex: inputData.sex,
      }),
    );
    // sessionStorage.setItem('member_login_step1', JSON.stringify(inputData))
    router.push(`/trainer/signup/step2`);
    console.log("states: ", states);
  };

  useEffect(() => {}, []);

  return (
    <Wrap>
      <ContentHeader>
        <ButtonHistoryBack type="button">
          <Image
            src={beforePage}
            alt="이전 페이지 이미지"
            width={20}
            height={20}
          />
        </ButtonHistoryBack>
        <RegisterTitle>회원가입</RegisterTitle>
        <div> </div>
      </ContentHeader>
      <ContentBody>
        <ContentInnerBody>
          <SignupOrderWrap>
            <SignupOrderCurrent>1</SignupOrderCurrent>
            <SignupOrder>2</SignupOrder>
            <SignupOrder>3</SignupOrder>
            <SignupOrder>4</SignupOrder>
          </SignupOrderWrap>
          <div style={{ marginBottom: "1.5rem" }}>
            <SignupStepInfo>안녕하세요 트레이너님!</SignupStepInfo>
            <SignupStepInfoSub>
              아래 정보가 맞는지 확인해주세요.
            </SignupStepInfoSub>
          </div>
          <form method="post" autoComplete="on">
            <SignupFormWrap>
              <FormTitle>이름</FormTitle>
              <TrRegisItemWrap>
                <Input2
                  name="name"
                  type="text"
                  required
                  value={inputData.name}
                  onChange={handleInputChange}
                ></Input2>
              </TrRegisItemWrap>
            </SignupFormWrap>
            <SignupFormWrap>
              <FormTitle>생년월일</FormTitle>
              <TrRegisItemWrap>
                <Input2
                  type="text"
                  name="year"
                  value={
                    typeof inputData.birth !== "string"
                      ? inputData.birth.year
                      : ""
                  }
                  maxLength={4}
                  onChange={handleInputChange}
                  ref={element => (inputRef.current[1] = element)}
                  style={{ textAlign: "center" }}
                  required
                ></Input2>
                <Slash>/</Slash>
                <Input2
                  type="text"
                  name="month"
                  maxLength={2}
                  value={
                    typeof inputData.birth !== "string"
                      ? inputData.birth.month
                      : ""
                  }
                  onChange={handleInputChange}
                  ref={element => (inputRef.current[2] = element)}
                  inputMode="decimal"
                  style={{ textAlign: "center" }}
                  required
                ></Input2>
                <Slash>/</Slash>
                <Input2
                  type="text"
                  name="date"
                  maxLength={2}
                  value={
                    typeof inputData.birth !== "string"
                      ? inputData.birth.date
                      : ""
                  }
                  onChange={handleInputChange}
                  ref={element => (inputRef.current[3] = element)}
                  inputMode="decimal"
                  style={{ textAlign: "center" }}
                  required
                ></Input2>
              </TrRegisItemWrap>
            </SignupFormWrap>
            <SignupFormWrap>
              <FormTitle>성별</FormTitle>
              <TrRegisItemWrap>
                <TrGenderLabel
                  name="sex"
                  htmlFor="radio-box1"
                  selected={selectedGender === "남자"}
                  onChange={handleInputChange}
                  ref={element => (inputRef.current[4] = element)}
                >
                  <TrGenderRadio
                    type="radio"
                    name="sex"
                    id="radio-box1"
                    value="남자"
                    checked={selectedGender === "남자"}
                    onChange={() => setSelectedGender("남자")}
                  ></TrGenderRadio>
                  남자
                </TrGenderLabel>
                <TrGenderLabel
                  htmlFor="radio-box2"
                  selected={selectedGender === "여자"}
                  onChange={handleInputChange}
                  ref={element => (inputRef.current[4] = element)}
                >
                  <TrGenderRadio
                    type="radio"
                    name="sex"
                    id="radio-box2"
                    value="여자"
                    checked={selectedGender === "여자"}
                    onChange={() => setSelectedGender("여자")}
                  ></TrGenderRadio>{" "}
                  여자
                </TrGenderLabel>
              </TrRegisItemWrap>
            </SignupFormWrap>
          </form>
          <ButtonAreaFixed>
            <Link href="/trainer/signup/step2">
              <Button variant="primary" onClick={handleNext}>
                다음
              </Button>
            </Link>
          </ButtonAreaFixed>
        </ContentInnerBody>
      </ContentBody>
    </Wrap>
  );
}
