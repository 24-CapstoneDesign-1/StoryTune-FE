import React, { useState } from "react";
import styled from "styled-components";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";
import { MainContainer, CircleButton } from "@/entities";
import { InfoHeader } from "@/widgets";

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;


const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const Subtitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
`;


const ScoreLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
`;

const ScoreValue = styled.p`
  font-size: 36px;
  font-weight: bold;
  margin: 0;
`;


// Component
const PronunciationEvaluation: React.FC = () => {
  const [score, setScore] = useState<number | null>(null);

  const startPronunciationEvaluation = async () => {
    const speechKey = ""
    const serviceRegion = "koreacentral"
    const referenceText = "sample sentence";

    const speechConfig = speechsdk.SpeechConfig.fromSubscription(
      speechKey,
      serviceRegion
    );
    const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
    const pronunciationConfig = new speechsdk.PronunciationAssessmentConfig(
      referenceText,
      speechsdk.PronunciationAssessmentGradingSystem.HundredMark,
      speechsdk.PronunciationAssessmentGranularity.Phoneme
    );

    const recognizer = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationConfig.applyTo(recognizer);

    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === speechsdk.ResultReason.RecognizedSpeech) {
        const pronunciationResult =
          speechsdk.PronunciationAssessmentResult.fromResult(result);
        setScore(pronunciationResult.pronunciationScore);
      } else {
        setScore(null);
      }
    });
  };

  return (
    <MainContainer>
        <BackButton>←</BackButton>
        <InfoHeader type="역할 놀이" />
      <MainContent>
        <Subtitle>지혜의 발음 정확도</Subtitle>
        <CircleButton>
          <ScoreLabel>score</ScoreLabel>
          <ScoreValue>{score !== null ? `${score}점` : "..."}</ScoreValue>
        </CircleButton>
      </MainContent>
      
      <button onClick={startPronunciationEvaluation} style={{ display: "none" }}>
        발음평가하기
      </button>
    </MainContainer>
  );
};

export default PronunciationEvaluation;
