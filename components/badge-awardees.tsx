import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { format } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

export const BadgeAwardees = ({ awardees, loading }: any) => {
  const router = useRouter();

  const ListItemLoading = () => (
    <div className="flex flex-row py-3 px-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex flex-col ml-2 items-start justify-center">
        <Skeleton className="h-4 w-[200px] rounded-md mb-2" />
        <Skeleton className="h-2 w-[100px] rounded-md" />
      </div>
    </div>
  )

  if (loading) {
    return (
      <Card className="w-full max-w-[450px] min-h-[350px]">
        <CardHeader className="border-b bg-secondary py-4 flex flex-row items-center justify-between">
          <span className="text-lg font-semibold">
            Awardees
          </span>
          <Skeleton className="w-[60px] h-[30px] rounded-md" />
        </CardHeader>
        <ListItemLoading />
        <ListItemLoading />
        <ListItemLoading />
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-[450px]">
      <CardHeader className="border-b bg-secondary py-4 flex flex-row items-center justify-between">
        <span className="text-lg font-semibold">
          Awardees
        </span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <span className="text-lg font-semibold opacity-50">
                {(awardees || []).length > 0 ? `${awardees.length}` : '0'}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Number of users that have this badge.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
      </CardHeader>
      <CardContent className="flex flex-col w-full px-0 overflow-y-scroll max-h-[450px] min-h-[250px]">
        {(awardees || []).map((awardeeData: any) => {
          const awardee = awardeeData?.awardee;
          const metadata = awardee?.metadata;

          const awardeePicture = metadata?.picture || '';
          const awardeeAddr = metadata?.nip05 || awardee?.npub;
          const awardeeName = metadata?.displayName || metadata?.display_name || metadata?.name || metadata?.username;

          const formattedDate = format(new Date(awardeeData?.awardedAt * 1000), 'MMM do yyyy');

          return (
            <div
              key={awardee.id}
              onClick={() => router.push(`u/${awardee.npub}`)}
              className="flex cursor-pointer items-center px-4 py-3 hover:bg-secondary flex-row"
            >
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage alt={awardeeName} src={awardeePicture} />
                <AvatarFallback>{awardeeName?.substr(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col ml-2">
                <p className="text-sm font-medium leading-none ellipsis truncate max-w-[250px]">{awardeeName}</p>
                <p className="text-sm text-muted-foreground ellipsis truncate max-w-[250px]">{awardeeAddr}</p>
              </div>
              <div className="min-w-[100px] ml-auto text-right font-medium text-xs text-muted-foreground ellipsis truncate">
                {formattedDate}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  )
}