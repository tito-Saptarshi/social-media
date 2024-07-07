import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
  title: string;
  jsonContent: any;
  id: string;
  subName: string;
  userName: string;
  imageString: string | null;
}

export function PostCard({
  id,
  imageString,
  jsonContent,
  subName,
  title,
  userName,
}: iAppProps) {
  return (
    <Card className="flex relative gap-y-2 overflow-hidden">
      <div className="flex flex-col items-center gap-y-2 bg-muted p-2">
        <form>
          <Button variant="outline" size="sm">
            <ArrowUp className="h-4 w-4" />
          </Button>
        </form>
        0
        <form>
          <Button variant="outline" size="sm">
            <ArrowDown className="h-4 w-4" />
          </Button>
        </form>
      </div>

      <div>
        <div className="flex items-center gap-x-2 p-2">
          <Link className="font-semibold text-xs" href={`/r/${subName}`}>
            r/{subName}
          </Link>
          <p className="text-xs text-muted-foreground">
            Posted by: <span className="hover:text-primary">r/slade</span>
          </p>
        </div>

        <div className="px-2">
          <Link href="/">
            <h1 className="font-medium mt-1 text-lg">{title}</h1>
          </Link>
        </div>
        <div className="max-h-[300px] overflow-hidden">
          {imageString && (
            <Image
              src={imageString}
              alt="Post Image"
              width={600}
              height={300}
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </Card>
  );
}
