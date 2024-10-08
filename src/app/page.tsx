import BlogCard from "@/components/BlogCard";
import Image from "next/image";
import { Post } from "@/components/BlogCard";
import HoveredChip from "@/components/HoveredChip";
import { CloseIcon } from "@/components/icons";
import { migrate } from "@/app/api/migrations";
import DefaultLayout from "@/layouts/DefaultLayout";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts: Post[] = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`
  ).then((res) => res.json());

  return posts.map((post) => ({ id: post.postID.toString() }));
}

export default function Home() {
  migrate();
  return (
    <DefaultLayout>
      <div className="font-semibold sm:text-4xl text-2xl flex sm:gap-3 gap-1 items-center flex-wrap sm:w-[80%] w-full">
        <span className="text-nowrap w-full">Welcome to my Blog!</span>
        <span className="text-nowrap">I&apos;m</span>
        <Image
          src="https://github.com/aryanranderiya.png"
          alt="Aryan randeriya image"
          width={32}
          height={32}
        />
        <span>Aryan Randeriya,</span>
        <span className="text-wrap">
          a Software Developer & Designer from India.
        </span>
      </div>

      <div className="flex gap-2 flex-wrap pt-6">
        <a href="https://aryanranderiya.com" target="_blank">
          <HoveredChip
            text={"View my Portfolio"}
            color="primary"
            bolded={true}
          />
        </a>

        <a href="https://linkedin.com/in/aryanranderiya" target="_blank">
          <HoveredChip text={"LinkedIn"} color="default" bolded={false} />
        </a>
        <a href="https://github.com/aryanranderiya" target="_blank">
          <HoveredChip text={"GitHub"} color="default" bolded={false} />
        </a>
      </div>

      <FeaturedPosts />
      <LatestPosts />
    </DefaultLayout>
  );
}

async function FeaturedPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  return (
    <div className="flex flex-col gap-2 pt-16 min-h-fit">
      <span className="font-semibold text-3xl">Featured Posts</span>
      <div className="flex gap-3 flex-wrap pt-4 sm:items-start items-center">
        {posts.length > 0 ? (
          posts.map((post, index) => <BlogCard post={post} key={index} />)
        ) : (
          <div className="flex gap-1">
            <CloseIcon color="#A1AECE" width={19} />
            <span className="text-foreground-500">No Posts found</span>
          </div>
        )}
      </div>
    </div>
  );
}

async function LatestPosts() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`);

  const posts: Post[] = await response.json().catch(() => ({
    data: { error: "An unknown error occurred" },
  }));

  return (
    <div className="flex flex-col gap-3 pt-8 min-h-fit">
      <span className="font-semibold text-3xl">Latest Posts</span>
      <div className="flex gap-3 flex-wrap pt-4 sm:items-start items-center">
        {posts.length > 0 ? (
          posts.map((post, index) => <BlogCard post={post} key={index} />)
        ) : (
          <div className="flex gap-1">
            <CloseIcon color="#A1AECE" width={19} />
            <span className="text-foreground-500">No Posts found</span>
          </div>
        )}
      </div>
    </div>
  );
}
