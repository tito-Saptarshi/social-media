import { handleVote } from "@/app/actions";
import { CommentForm } from "@/app/components/CommentForm";
import { CopyLink } from "@/app/components/CopyLink";
import { RendertoJson } from "@/app/components/RendertoJson";
import { DownVote, UpVote } from "@/app/components/SubmitButtons";
import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Cake, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// this is a server-component

async function getData(id: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: id,
    },
    select: {
      createdAt: true,
      title: true,
      imageString: true,
      textContent: true,
      subName: true,
      id: true,
      Vote: {
        select: {
          voteType: true,
        },
      },
      Subreddit: {
        select: {
          name: true,
          createdAt: true,
          description: true,
        },
      },
      User: {
        select: {
          userName: true,
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return (
    <div className="max-w-[1200px] mx-auto flex gap-x-10 mt-4 mb-10">
      <div className="w-[70%] flex flex-col gap-y-5">
        <Card className="p-2 flex">
          <div className="flex flex-col  items-center  gap-y-2  p-2">
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="UP" />
              <input type="hidden" name="postId" value={data.id} />
              <UpVote />
            </form>
            {data.Vote.reduce((acc, vote) => {
              if (vote.voteType === "UP") return acc + 1;
              if (vote.voteType === "DOWN") return acc - 1;
              return acc;
            }, 0)}
            <form action={handleVote}>
              <input type="hidden" name="voteDirection" value="DOWN" />
              <input type="hidden" name="postId" value={data.id} />
              <DownVote />
            </form>
          </div>

          <div className="p-2 w-full">
            <p className="text-xs text-muted-foreground">
              Posted by u/{data.User?.userName}
            </p>

            <h1 className="font-medium mt-1 text-lg">{data.title}</h1>

            {data.imageString && (
              <Image
                src={data.imageString}
                alt="User Image"
                width={500}
                height={400}
                className="w-full h-auto object-contain mt-2"
              />
            )}

            {data.textContent && <RendertoJson data={data.textContent} />}

            <div className="flex gap-x-5 items-center mt-3">
              <div className="flex items-center gap-x-1">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <p className="text-muted-foreground font-medium text-xs">
                  108 Comments
                </p>
              </div>

              <CopyLink id={params.id} />
            </div>

            <CommentForm />

          </div>
        </Card>
      </div>

      <div className="w-[30%]">
        <Card>
          <div className="bg-muted p-4 font-semibold">About Community</div>
          <div className="p-4">
            <div className="flex items-center gap-x-3">
              <Image
                src={`https://avatar.vercel.sh/${data?.subName}`}
                alt="Image of subreddit"
                width={60}
                height={60}
                className="rounded-full h-16 w-16"
              />
              <Link href={`/r/${data?.subName}`} className="font-medium">
                r/{data?.subName}
              </Link>
            </div>

            <p className="text-sm font-normal text-secondary-foreground mt-2">
              {data?.Subreddit?.description}
            </p>

            <div className="flex items-center gap-x-2 mt-4">
              <Cake className="h-5 w-5 text-muted-foreground" />
              <p className="text-muted-foreground font-medium text-sm">
                Created:{" "}
                {new Date(data?.createdAt as Date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <Separator className="my-5" />
            <Button asChild className="rounded-full w-full">
              <Link href={`/r/${data?.subName}/create`}>Create Post</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
