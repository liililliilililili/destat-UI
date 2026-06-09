import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import SurveyCard from "../components/survey-card";

type Survey = {
  id: string;
  title: string;
  description: string | null;
  contract_address: string;
  created_at: string | null;
};

export default function AllSurvey() {
  const [surveys, setSurveys] = useState<Survey[]>([]);

  useEffect(() => {
    const getSurveys = async () => {
      const { data, error } = await supabase.from("surveys").select("*");

      if (error) {
        console.error(error);
        return;
      }

      setSurveys(data ?? []);
    };

    getSurveys();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-extrabold">Live Surveys</h1>
        <span className="text-sm font-light">Join the surveys!</span>
      </div>

      {surveys.map((survey) => (
        <SurveyCard
          key={survey.id}
          title={survey.title}
          description={survey.description}
          surveyAddress={survey.contract_address}
        />
      ))}
    </div>
  );
}
