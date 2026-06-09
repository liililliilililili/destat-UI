import { EyeIcon, UsersIcon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

type SurveyCardProps = {
  title: string;
  description: string | null;
  surveyAddress: string;
};

export default function SurveyCard({
  title,
  description,
  surveyAddress,
}: SurveyCardProps) {
  return (
    <Link to={`/survey/${surveyAddress}`}>
      <Card className="max-w-92 py-3">
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle>{title}</CardTitle>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row items-center gap-0.5 text-xs font-extralight">
                <EyeIcon size={17} /> 1600
              </div>
              <div className="flex flex-row items-center gap-0.5 text-xs font-extralight">
                <UsersIcon size={17} /> 58
              </div>
            </div>
          </div>
          <CardDescription className="line-clamp-2 min-h-10">
            {description ?? surveyAddress}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <img
            className="aspect-video w-full rounded-2xl object-cover"
            src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=1200&auto=format&fit=crop"
            alt="survey thumbnail"
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full">Join</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
