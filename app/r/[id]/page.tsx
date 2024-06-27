import prisma from "@/app/lib/db";
import { Card } from "@/components/ui/card";
import { get } from "http";
import Image from "next/image";
import Link from "next/link";

async function getData(name: string) {
  const data = await prisma.subreddit.findUnique({
    where: {
      name: name,
    },
    select: {
      name: true,
      createdAt: true,
      description: true,
      userId: true,
    },
  });
  return data;
}

export default async function SubRedditRoute({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);
  return (
    <div className="max-w-[1000px] mx-auto flex gap-x-10 mt-4 mb-10 ">
      <div className="w-[65%] flex flex-col gap-y-5">
        <h1>Post Section</h1>
      </div>

      <div className="w-[35%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data?.name}`}
                alt="Image of subreddit"
                width={60}
                height={60}
                className="rounded-full h-16 w-16"
              />
              <Link href={`/r/${data?.name}`} className="font-medium">
                r/{data?.name}
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
