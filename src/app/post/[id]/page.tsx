"use client";

import { api } from "~/trpc/react";
import Image from "next/image";
import Comments from "~/app/_components/comment/AddComment";
import Link from "next/link";
import type { JsonValue, SinglePost } from "~/types/types";
import { isValidNode, parseTiptapJsonToHtml } from "~/utils/utils";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

export default function PostInfo(req: SinglePost) {
  const [html, setHtml] = useState("");

  const { data: post, isLoading } = api.post.getIndividualPost.useQuery({
    id: +req.params.id,
  });

  useEffect(() => {
    if (!isLoading && post) {
      const content = post.content as JsonValue;
      const parsedHtml = isValidNode(content)
        ? parseTiptapJsonToHtml(content)
        : "";
      setHtml(parsedHtml);
    }
  }, [isLoading, post]);

  return (
    <>
      {isLoading ? (
        <div className=" flex justify-center">
          <Spinner color="secondary" />
        </div>
      ) : (
        <>
          <div className="mt-4 w-full px-2 py-6">
            <div className=" mx-auto max-w-screen-lg">
              <Link href={"/profile/" + post!.createdBy.name}>
                <div className=" flex items-center gap-2 rounded-xl p-3 transition-background hover:bg-[#80808039]">
                  <Image
                    src={post!.createdBy.image}
                    alt="Post creator avatar"
                    className=" rounded-full"
                    width={50}
                    height={50}
                  />
                  <p className=" text-xl light light:text-[#383838] dark:text-[#ffffff]">
                    {post!.createdBy.name}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className=" mx-auto mb-2 max-w-screen-lg p-4 pb-10 ">
            <div className="flex flex-col justify-center">
              <p className=" mb-6 text-center text-4xl font-bold light light:text-black dark:text-[#ffffffc2] dark:text-white">
                {post!.title}
              </p>
              <div className=" max-w-[1024px]">
                <div className=" fex gap-7">
                  <div
                    className="tiptap"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </div>
            </div>
          </div>
          <Comments postId={req.params.id} post={post!} />
        </>
      )}
    </>
  );
}
