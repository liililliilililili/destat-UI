import { supabase } from "~/lib/supabase";
import { useState } from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  SURVEY_FACTORY_ABI,
  SURVEY_FACTORY_ADDRESS,
} from "~/constants/contracts";

type QuestionForm = {
  id: number;
  options: number[];
};

export default function CreateSurvey() {
  const [questions, setQuestions] = useState<QuestionForm[]>([
    { id: 0, options: [0, 1] },
  ]);
  const [image, setImage] = useState("");
  const { writeContract } = useWriteContract();

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: prev.length,
        options: [0, 1],
      },
    ]);
  };

  const deleteQuestion = () => {
    setQuestions((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const addOption = (i: number) => {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === i
          ? {
              ...question,
              options: [...question.options, question.options.length],
            }
          : question,
      ),
    );
  };

  const deleteOption = (i: number) => {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === i && question.options.length > 1
          ? {
              ...question,
              options: question.options.slice(0, -1),
            }
          : question,
      ),
    );
  };

  const createSurvey = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get("title")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";
    const targetNumber = formData.get("targetNumber")?.toString() ?? "0";
    const poolSize = formData.get("poolSize")?.toString() ?? "0";
    const questionsData = formData.getAll("q") as string[];

    const parsedQuestions = questionsData.map((question, i) => {
      const options = formData
        .getAll(i.toString())
        .map((option) => option.toString());

      return {
        question,
        options,
      };
    });

    writeContract({
      address: SURVEY_FACTORY_ADDRESS,
      abi: SURVEY_FACTORY_ABI,
      functionName: "createSurvey",
      args: [
        {
          title,
          description,
          targetNumber: BigInt(targetNumber),
          questions: parsedQuestions,
        },
      ],
      value: parseEther(poolSize),
    });
    const { error } = await supabase.from("surveys").insert({
      title,
      description,
      contract_address: SURVEY_FACTORY_ADDRESS,
    });

    if (error) {
      console.error(error);
      alert("Supabase 저장 실패");
      return;
    }

    alert("설문 생성 완료");
  };

  return (
    <div className="flex w-full justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Create Survey</CardTitle>
          <CardDescription>
            Build and publish a new survey to collect reliable responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createSurvey} className="flex flex-col gap-4">
            <label className="flex flex-col gap-2">
              <h1 className="font-bold">Title</h1>
              <Input type="text" name="title" />
            </label>

            <label className="flex flex-col gap-2">
              <h1 className="font-bold">Description</h1>
              <Input type="text" name="description" />
            </label>

            <label className="flex flex-col gap-2">
              <h1 className="font-bold">Target Number</h1>
              <Input type="number" name="targetNumber" />
            </label>

            <label className="flex flex-col gap-2">
              <h1 className="font-bold">Pool Size</h1>
              <Input type="number" name="poolSize" />
            </label>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Questions</h1>
              {questions.map((question, i) => (
                <div key={question.id} className="flex flex-col gap-2">
                  <Input type="text" name="q" placeholder="Question" />
                  {question.options.map((option) => (
                    <Input
                      key={option}
                      type="text"
                      name={i.toString()}
                      placeholder="Option"
                      className="ml-4 w-[calc(100%-1rem)]"
                    />
                  ))}
                  <div className="flex justify-center gap-2">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteOption(i)}
                    >
                      -
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      size="icon"
                      onClick={() => addOption(i)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
              <div className="flex justify-center gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={deleteQuestion}
                >
                  -
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={addQuestion}
                >
                  +
                </Button>
              </div>
            </div>

            <label className="flex flex-col gap-2">
              <h1 className="font-bold">Upload File</h1>
              <Input type="file" name="image" onChange={uploadFile} />
              <div className="flex h-56 items-center justify-center rounded-md border">
                {image ? (
                  <img
                    src={image}
                    alt="preview"
                    className="h-full w-full object-contain"
                  />
                ) : null}
              </div>
            </label>

            <Button type="submit" className="w-full">
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
