"use client";

import PageTitle from "@/components/PageTitle";
import { workoutRecordActions } from "@/redux/reducers/workoutRecordSlice";
import { Button } from "@/styles/Button";
import { CategoryPartList } from "@/styles/CategoryPartList";
import { Input, InputRowWrap, InputWrap } from "@/styles/Input";
import { BaseContentWrap, ButtonAreaFixed, FormWrap } from "@/styles/Layout";
import { LabelTitle } from "@/styles/Text";
import { ToggleButton } from "@/styles/TogglButton";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";

const BookmarkButton = styled(Button)`
  margin-bottom: 1.5rem;
`;

const BookmarkSaveToggle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.25rem;
`;
const page = () => {
  const title = "운동 입력";
  const [inputData, setInputData] = useState({
    exerciseDate: "",
    title: "",
    weight: 0,
    set: 0,
    times: 0,
    hour: 0,
    bookmarkYn: "string",
    bodyPart: "WHOLE_BODY",
    exerciseType: "AEROBIC",
  });
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();

  const exerciseType = [
    {
      text: "유산소",
      value: "AEROBIC",
    },
    {
      text: "무산소",
      value: "ANAEROBIC",
    },
    {
      text: "스트레칭",
      value: "STRETCHING",
    },
  ];

  const bodyPart = [
    {
      text: "전신",
      value: "WHOLE_BODY",
    },
    {
      text: "팔",
      value: "ARM",
    },
    {
      text: "복근",
      value: "ABS",
    },
    {
      text: "하체",
      value: "LOWER_BODY",
    },
    {
      text: "등",
      value: "BACK",
    },
    {
      text: "어깨",
      value: "SHOULDER",
    },
    {
      text: "가슴",
      value: "CHEST",
    },
    {
      text: "허리",
      value: "WAIST",
    },
    {
      text: "엉덩이",
      value: "HIP",
    },
    {
      text: "코어",
      value: "CORE",
    },
  ];

  const handleChoiceExerciseType = (exerciseType: string) => {
    setInputData({
      ...inputData,
      exerciseType,
    });
  };

  const handleChoiceBodyPart = (bodyPart: string) => {
    setInputData({
      ...inputData,
      bodyPart,
    });
  };

  const handleBookmarkChecked = (checked: boolean) => {
    if (checked) {
      setInputData({ ...inputData, bookmarkYn: "Y" });
    } else if (!checked) {
      setInputData({ ...inputData, bookmarkYn: "N" });
    }
  };

  const handleAddRecord = () => {
    dispatch(workoutRecordActions.addWorkoutState(inputData));
    router.push("/member/record/workout/register");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    console.log("inputData: ", inputData);
  }, [inputData]);

  useEffect(() => {
    const date = searchParams.get("date");
    // dispatch(workoutRecordActions.addWorkoutState({
    //   exerciseDate: date
    // }))
    if (date) {
      setInputData({
        ...inputData,
        exerciseDate: date,
      });
    }
  }, []);

  return (
    <>
      <PageTitle title={title} />
      <BaseContentWrap>
        <BookmarkButton variant="outline">북마크에서 가져오기</BookmarkButton>
        <FormWrap>
          <LabelTitle>운동명</LabelTitle>
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            name="title"
            onChange={handleInputChange}
            value={inputData.title}
          />
        </FormWrap>
        <FormWrap>
          <LabelTitle>분류</LabelTitle>
          <CategoryPartList>
            {exerciseType?.map(type => {
              return (
                <li
                  onClick={() => handleChoiceExerciseType(type.value)}
                  className={
                    inputData.exerciseType === type.value ? "active" : ""
                  }
                >
                  {type.text}
                </li>
              );
            })}
          </CategoryPartList>
        </FormWrap>
        <FormWrap>
          <LabelTitle>부위</LabelTitle>
          <CategoryPartList>
            {bodyPart?.map(part => {
              return (
                <li
                  onClick={() => handleChoiceBodyPart(part.value)}
                  className={inputData.bodyPart === part.value ? "active" : ""}
                >
                  {part.text}
                </li>
              );
            })}
          </CategoryPartList>
        </FormWrap>
        <FormWrap>
          <LabelTitle>운동 내용</LabelTitle>
          <InputRowWrap>
            {inputData.exerciseType === "AEROBIC" ? (
              <InputWrap>
                <Input
                  type="text"
                  name="hour"
                  onChange={handleInputChange}
                  value={inputData.hour}
                />
                <span>분</span>
              </InputWrap>
            ) : inputData.exerciseType === "ANAEROBIC" ? (
              <>
                <InputWrap>
                  <Input
                    type="text"
                    name="weight"
                    onChange={handleInputChange}
                    value={inputData.weight}
                  />
                  <span>kg</span>
                </InputWrap>{" "}
                x
                <InputWrap>
                  <Input
                    type="text"
                    name="times"
                    onChange={handleInputChange}
                    value={inputData.times}
                  />
                  <span>회</span>
                </InputWrap>{" "}
                x
                <InputWrap>
                  <Input
                    type="text"
                    name="set"
                    onChange={handleInputChange}
                    value={inputData.set}
                  />
                  <span>set</span>
                </InputWrap>
              </>
            ) : (
              <InputWrap>
                <Input
                  type="text"
                  name="hour"
                  onChange={handleInputChange}
                  value={inputData.hour}
                />
                <span>분</span>
              </InputWrap>
            )}
          </InputRowWrap>
        </FormWrap>
        <BookmarkSaveToggle>
          <LabelTitle>북마크에 저장하기</LabelTitle>
          <ToggleButton>
            <input
              role="switch"
              type="checkbox"
              onChange={event => handleBookmarkChecked(event.target.checked)}
            />
          </ToggleButton>
        </BookmarkSaveToggle>
        <ButtonAreaFixed nav={true}>
          <Button variant="primary" onClick={handleAddRecord}>
            추가하기
          </Button>
        </ButtonAreaFixed>
      </BaseContentWrap>
    </>
  );
};

export default page;
