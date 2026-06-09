import { SendIcon } from "lucide-react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import type { Address } from "viem";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { SURVEY_ABI } from "~/constants/contracts";
import MessageBubble from "../components/message-bubble";
import QuestionCard from "../components/question-card";
import type { SurveyQuestion } from "../types/survey";
import type { Route } from "./+types/survey";

const isFinished = false;

export default function Survey({ params }: Route.ComponentProps) {
  const surveyAddress = params.surveyId as Address;
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const { data: questionsData } = useReadContract({
    address: surveyAddress,
    abi: SURVEY_ABI,
    functionName: "getQuestions",
    args: [],
  });

  const { data: title } = useReadContract({
    address: surveyAddress,
    abi: SURVEY_ABI,
    functionName: "title",
    args: [],
  });

  const { data: description } = useReadContract({
    address: surveyAddress,
    abi: SURVEY_ABI,
    functionName: "description",
    args: [],
  });

  const submitAnswer = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address) return;

    const formData = new FormData(e.currentTarget);
    const answers: number[] = [];

    for (const value of formData.values()) {
      answers.push(Number(value));
    }

    writeContract({
      address: surveyAddress,
      abi: SURVEY_ABI,
      functionName: "submitAnswer",
      args: [
        {
          respondent: address,
          answers,
        },
      ],
    });
  };

  const questions = (questionsData ?? []) as readonly SurveyQuestion[];

  return (
    <div className="grid w-screen grid-cols-3 gap-3">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        {isFinished ? (
          <CardContent className="h-[78vh] overflow-y-auto">
            <h1 className="pb-4 text-xl font-semibold">Survey Progress</h1>
            <div className="grid grid-cols-2 gap-5">
              {questions.map((question) => (
                <QuestionCard key={question.question} question={question} />
              ))}
            </div>
          </CardContent>
        ) : (
          <CardContent className="h-[78vh] overflow-y-auto">
            <form onSubmit={submitAnswer} className="grid grid-cols-2 gap-6">
              {questions.map((question, i) => (
                <div key={question.question} className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">{question.question}</span>

                  {question.options.map((option, j) => (
                    <label
                      key={`${question.question}-${option}`}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Input
                        type="radio"
                        name={`question${i}`}
                        value={j}
                        className="peer hidden"
                      />
                      <span className="h-4 w-4 rounded-full border-2 peer-checked:bg-primary" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ))}

              <Button type="submit" className="col-span-2 w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        )}
      </Card>

      <Card className="col-span-1 flex flex-col">
        <CardHeader>
          <CardTitle>Live Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex h-[70vh] flex-col gap-5 overflow-y-auto">
          {Array.from({ length: 10 }).map((_, i) => (
            <MessageBubble key={i} sender={i % 2 === 0} />
          ))}
        </CardContent>
        <CardFooter className="w-full">
          <form className="relative flex w-full flex-row items-center">
            <input
              type="text"
              placeholder="type a message..."
              className="h-6 w-full rounded-md border px-2 text-xs"
            />
            <Button
              type="button"
              className="absolute right-0 flex h-6 w-6 flex-row items-center justify-center rounded-2xl px-2"
            >
              <SendIcon size={14} />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
