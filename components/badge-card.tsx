import { Skeleton } from "./ui/skeleton";
import { format } from 'date-fns';
import {
  Card,
  CardTitle,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export const BadgeCard = ({ badge, loading }: any) => {
  if (loading) {
    return (
      <Card className="min-w-[300px] mr-6">
        <div className="pt-6 px-6 pb-3">
          <Skeleton className="w-full rounded-md min-h-[250px]" />
        </div>
        <CardContent className="pt-6">
          <Skeleton className="w-full rounded-md h-[24px] mb-2" />
          <Skeleton className="w-[100px] rounded-md h-[16px]" />
        </CardContent>
      </Card>
    )
  }

  const formattedDate = format(new Date(badge?.updatedAt * 1000), 'MMM do yyyy');

  return (
    <Card className="min-w-[300px] mr-6">
      <div className="pt-6 px-6 pb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={badge?.image} alt={badge?.name} className="max-w-full max-h-[400px] mx-auto" />
      </div>
      <CardContent className="mt-3 pt-3 bg-secondary border-t">
        <CardTitle className="text-xl font-bold">{badge?.name}</CardTitle>
        <CardDescription>Last updated: {formattedDate}</CardDescription>
      </CardContent>
      {(badge?.description !== null && badge?.description !== undefined) ? (
        <CardFooter className="bg-secondary">
          {badge?.description}
        </CardFooter>
      ) : null}
    </Card>
  )
}