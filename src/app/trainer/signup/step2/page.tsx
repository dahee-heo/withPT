"use client";

import styled from "styled-components";
import Link from "next/link";

const Wrap = styled.div`
  background-color: white;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: auto;
`;

const ContentHeader = styled.div`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 4.4rem;
  align-items: center;
  z-index: 100;
  display: flex;
`;

const ButtonHistoryBack = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  background-color: green;
`;

const SignupTitle = styled.h4`
  line-height: 3rem;
  color: #222;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0;
`;

const ContentBody = styled.div`
  padding: 6.8rem 1.6rem 3.2rem 1.6rem;
`;

const ContentInnerBody = styled.div``;

const SignupStepInfo = styled.p`
  color: #222;
  font-size: 1.6rem;
  font-weight: bold;
  letter-spacing: -0.04rem;
`;

const SignupFormWrap = styled.div`
  margin-bottom: 1rem;
`;

const FormTitle = styled.h4`
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.2rem;
`;

const TrGenderLabel = styled.label`
  width: 100%;
  text-align: center;
  border: none;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  line-height: 2.3rem;
  background-color: var(--purple50);
  margin: 0 0.3rem;
`;

const TrGenderRadio = styled.input`
  appearance: none;
`;

const SignupOrderWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SignupOrderCurrent = styled.span`
  background-color: var(--primary);
  color: var(--white);
  margin-bottom: "0.2rem";
  margin-right: 0.3rem;
  padding: 0.1rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;

const SignupOrder = styled.span`
  background-color: var(--purple100);
  color: var(--purple200);
  margin-right: 0.3rem;
  padding: 0.1rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;

const TrRegisItemWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
`;

const SignupInput = styled.input`
  border: none;
  border-radius: 0.2rem;
  margin-bottom: 1rem;
  line-height: 2.3rem;
  background-color: var(--purple50);
  font-size: 1rem;
  width: 100%;
  margin: 0 0.3rem;
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
  line-height: 3rem;
  width: 100%;
  background-color: var(--primary);
  color: white;
  padding: 0 1.6rem;
  text-align: center;
`;

export default function step2() {
  return (
    <Wrap>
      <ContentHeader>
        <ButtonHistoryBack type="button"></ButtonHistoryBack>
        <SignupTitle>회원가입</SignupTitle>
      </ContentHeader>
      <ContentBody>
        <ContentInnerBody>
          <SignupOrderWrap>
            <SignupOrder>1</SignupOrder>
            <SignupOrderCurrent>2</SignupOrderCurrent>
            <SignupOrder>3</SignupOrder>
          </SignupOrderWrap>
          <div style={{ marginBottom: "1rem" }}>
            <SignupStepInfo>센터 정보와 일정을 등록해주세요.</SignupStepInfo>
            <SignupStepInfo style={{ fontSize: "1rem", color: "#797979" }}>
              재직 중인 센터와 센터별 일정을 등록해 주세요.
            </SignupStepInfo>
          </div>
          <form method="post" autoComplete="on">
            <SignupFormWrap>
              <FormTitle>센터정보 등록</FormTitle>
              <TrRegisItemWrap>
                <SignupInput
                  type="text"
                  placeholder="등록하실 센터를 검색해보세요"
                  required
                ></SignupInput>
              </TrRegisItemWrap>
            </SignupFormWrap>
            <SignupFormWrap>
              <FormTitle>일정 등록하기</FormTitle>
              <TrRegisItemWrap>
                <SignupInput
                  style={{ textAlign: "center" }}
                  type="text"
                  placeholder="+"
                  required
                ></SignupInput>
              </TrRegisItemWrap>
            </SignupFormWrap>
          </form>
          <ButtonAreaFixed>
            <NextStep href="/trainer/register/step2">다음</NextStep>
          </ButtonAreaFixed>
        </ContentInnerBody>
      </ContentBody>
    </Wrap>
  );
}
