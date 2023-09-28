import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import groq from "groq";
import { client, urlFor } from "@/lib/sanity";
import Meta from "@/component/meta";
import poster from "../../../public/poster-small.png";

export default function Index({ posts }) {
  const [query, setQuery] = useState("");
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  function getMonth(n) {
    return month[n];
  }
  function search() {}
  return (
    <>
      <Meta />
      <div className="w-full h-full p-5">
        <header className="flex flex-row justify-between items-center mb-8">
          <div className=" h-16 w-30 relative">
            <Link href="/">
              <Image alt="poster" src={poster} width={200} height={100} />
            </Link>
          </div>
        </header>
        <div className="mb-4">
          <div className="relative bg-white">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50"
              placeholder="Search blogs"
              onChange={(event) => setQuery(event.target.value)}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 sm:grid-cols-2">
          {posts.length > 0 &&
            posts
              .filter((post) => {
                if (query == "") {
                  return post;
                } else if (
                  post.title.toLowerCase().includes(query.toLowerCase())
                ) {
                  return post;
                }
              })
              .map(
                ({
                  _id,
                  title = "",
                  categories,
                  slug = "",
                  publishedAt = "",
                  mainImage,
                }) => (
                  <div
                    key={_id}
                    className="relative flex items-end justify-start w-full text-left bg-center bg-cover h-96 dark:bg-gray-500"
                    style={{
                      backgroundImage: `url("${
                        mainImage
                          ? urlFor(mainImage).width(600).height(600).url()
                          : "favicon-32x32.png"
                      }")`,
                    }}
                  >
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b dark:via-transparent dark:from-gray-900 dark:to-gray-900"></div>
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                      <a
                        rel="noopener noreferrer"
                        href="/category"
                        className="px-3 py-2 text-xs font-semibold tracki uppercase dark:text-gray-100 bgundefined"
                      >
                        {categories &&
                          categories.map((category) => (
                            <span key={category}> {category}</span>
                          ))}
                      </a>
                      <div className="flex flex-col justify-start text-center dark:text-gray-100">
                        <span className="text-3xl font-semibold leadi tracki">
                          {new Date(publishedAt).getDate()}
                        </span>
                        <span className="uppercase">
                          {getMonth(new Date(publishedAt).getMonth())}
                        </span>
                      </div>
                    </div>
                    <h2 className="z-10 p-5">
                      <Link
                        href={`/blog/${encodeURIComponent(slug.current)}`}
                        className="font-medium text-md hover:underline dark:text-gray-100"
                      >
                        {title}
                      </Link>
                    </h2>
                  </div>
                )
              )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await client.fetch(groq`
    *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
      _id,
      title,
      "categories": categories[]->title,
      publishedAt,
      slug,
      mainImage
    }
  `);
  return {
    props: {
      posts,
    },
  };
}
