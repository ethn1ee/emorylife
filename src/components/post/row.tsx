"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
import type { PostWithComments } from "@/lib/schema";
import { formatNumber, getRelativeTime } from "@/lib/utils";
import { type User } from "@prisma/client";
import { EllipsisIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAvatar } from "../user";
import PostMenu from "./menu";
import { type TableMode } from "./table";

type PostRowProps = {
  post: PostWithComments;
  mode: TableMode;
};

const PostRow = ({ post, mode }: PostRowProps) => {
  const router = useRouter();
  const uniqueCommenters = post.comments.reduce((acc, comment) => {
    if (!acc.some((user) => user.id === comment.authorId)) {
      acc.push(comment.author);
    }
    return acc;
  }, [] as User[]);

  const url = `/post/${post.id}`;

  const handleClick = () => {
    router.push(url);
  };

  return (
    <TableRow
      onClick={mode === "default" ? handleClick : undefined}
      className="group-data-[mode=default]:cursor-pointer group-data-[mode=data]:hover:bg-background"
    >
      <TableCell className="truncate">
        <span className="text-lg group-data-[size=sm]:text-base font-normal">
          {post.title}
        </span>
        <div className="space-x-1 text-muted-foreground text-sm">
          <span className="group-data-[mode=data]:hidden">
            {post.author.name}
          </span>
          <span className="group-data-[mode=data]:hidden">·</span>
          <span>{getRelativeTime(post.createdAt)}</span>
        </div>
      </TableCell>

      <TableCell className="group-data-[size=sm]:hidden max-md:hidden">
        <div className="h-7 py-0.5 flex w-fit">
          {uniqueCommenters
            ?.slice(0, 3)
            .map((user) => (
              <UserAvatar
                key={user.id}
                user={user}
                className="size-6 ring-2 ring-background not-first:-ml-1"
              />
            ))}
        </div>
      </TableCell>

      <TableCell className="text-center">
        {formatNumber(post.comments.length)}
      </TableCell>

      <TableCell className="text-center">{formatNumber(post.views)}</TableCell>

      <TableCell className="hidden group-data-[mode=data]:table-cell">
        <PostMenu id={post.id} />
      </TableCell>
    </TableRow>
  );
};

export default PostRow;

export const PostRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 mt-[4.5px] mb-2 group-data-[size=sm]:h-6 w-60" />
        <Skeleton className="h-4 w-40" />
      </TableCell>

      <TableCell className="group-data-[size=sm]:hidden max-md:hidden">
        <div className="h-7 py-0.5 flex w-fit">
          {[...Array<0>(3)].map((_, i) => (
            <Skeleton
              key={i}
              className="size-6 ring-2 ring-background not-first:-ml-1 rounded-full"
            />
          ))}
        </div>
      </TableCell>
      <TableCell className="text-center"></TableCell>
      <TableCell className="text-center"></TableCell>
      <TableCell className="hidden group-data-[mode=data]:table-cell">
        <EllipsisIcon size={16} className="text-muted-foreground mx-auto" />
      </TableCell>
    </TableRow>
  );
};
