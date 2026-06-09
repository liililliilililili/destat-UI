import type { Survey } from "../types/survey";

export const survey: Survey = {
  title: "Sample Survey",
  description: "This is a sample survey. Let's join to get Rewards",
  reward: 20,
  questions: [
    {
      question: "가장 좋아하는 프로그래밍 언어는 무엇인가요?",
      options: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
    },
    {
      question: "주로 사용하는 개발 환경은 어디인가요?",
      options: ["Windows", "macOS", "Linux", "기타"],
    },
    {
      question: "선호하는 코드 스타일은?",
      options: ["간결하고 짧게", "명확하게 주석이 많은 스타일", "코드 스타일 가이드 준수", "팀 규칙에 맞춤"],
    },
    {
      question: "가장 자주 사용하는 버전 관리 툴은?",
      options: ["Git", "SVN", "Mercurial", "기타"],
    },
    {
      question: "협업 시 선호하는 커뮤니케이션 도구는?",
      options: ["Slack", "Discord", "Teams", "Zoom", "기타"],
    },
    {
      question: "프론트엔드 프레임워크 중 가장 선호하는 것은?",
      options: ["React", "Vue", "Angular", "Svelte"],
    },
    {
      question: "고정된 기능 명세에 더 많은 시간은?",
      options: ["기획", "개발", "테스트", "배포"],
    },
    {
      question: "프로젝트를 시작할 때 가장 먼저 하는 일은?",
      options: ["요구사항 정리", "디자인 확인", "폴더 구조 설계", "패키지 설치"],
    },
    {
      question: "테스트 코드를 작성한다면 선호하는 프레임워크는?",
      options: ["Jest", "Vitest", "Playwright", "Cypress"],
    },
    {
      question: "개발 공부를 주로 어떤 방식으로 하나요?",
      options: ["강의 수강", "공식 문서", "블로그", "직접 구현"],
    },
  ],
};

export const questions = survey.questions;
