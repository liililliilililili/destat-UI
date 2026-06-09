import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function SurveyCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample Survey</CardTitle>
        <CardDescription>
          This is a sample survey. Let's join to get Rewards
        </CardDescription>
      </CardHeader>
      <CardContent>
        <img
          src="https://avatars.githubusercontent.com/u/108108287?v=4"
          alt="survey thumbnail"
          className="h-40 w-40 object-cover"
        />
      </CardContent>
      <CardFooter>
        <Button>Join</Button>
      </CardFooter>
    </Card>
  );
}
