import Link from "next/link";
import Image from "next/image";
import type { MainPostProps } from "~/types/types";
import { memo, useEffect, useMemo, useRef } from "react";
import { truncateString } from "~/utils/utils";
import { useInView } from "framer-motion";

/* skips rerender of previous posts by wrap Post in memo()
example without memo():
          console.log("render POST:", post.id) will log this:
             render POST: 1


             render POST: 1
             render POST: 2

             render POST: 1
             render POST: 2
             render POST: 3
             etc...
*/
export default memo(function Post({
  post,
  postsLength,
  fetchNextFn,
}: MainPostProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true
  });
  console.log(isInView, post.id)

  useEffect(() => {
    if (isInView) {
      fetchNextFn();
    }
  }, [isInView]);
  return (
    <div className="cursor-pointe flex justify-center">
      <div ref={post.id == postsLength ? ref : undefined}></div>
      <Link
        href={"/post/" + post.id}
        className="w-full rounded-3xl px-5 py-10 transition-background hover:bg-[#84838333] max-md:hover:bg-transparent"
      >
        <div className="mx-auto">
          <div className="mb-3 flex items-center gap-2">
            <Image
              src={post.createdBy.image}
              alt="User profile picture"
              width={50}
              height={50}
              className="mb-1 rounded-full"
            />
            <h1 className="font-montserrat text-2xl light light:text-[#595959] dark:text-[#ffffff]">
              {post.createdBy.name}
            </h1>
          </div>
          <pre className="mb-3 font-montserrat text-3xl font-bold light light:text-black dark:text-[#ffffffc2]">
            {truncateString(post.title, 50)}
          </pre>
          <p className="text-sm text-[#808080a8]">
            {post.createdAt.toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
});
