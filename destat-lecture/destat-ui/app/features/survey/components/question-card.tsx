import type { SurveyQuestion } from "../types/survey";

type QuestionCardProps = {
  question: SurveyQuestion;
};

export default function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="flex flex-col">
      <h1 className="font-semibold">{question.question}</h1>
      <div className="flex flex-col pl-2 gap-1">
        {question.options.map((option, index) => (
          <div
            key={`${question.question}-${option}`}
            className="relative flex flex-row justify-center items-center"
          >
            <div className="left-2 absolute text-xs font-semibold">{option}</div>
            <div className="w-full bg-gray-200 h-5 rounded-full">
              <div
                className="bg-blue-400 h-5 rounded-full"
                style={{ width: `${Math.max(15, 60 - index * 10)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
