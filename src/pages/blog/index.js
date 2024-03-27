import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import groq from "groq";
import { client, urlFor } from "@/lib/sanity";
import Meta from "@/component/meta";
import Header from "@/component/header";
import { navigation } from "@/lib/nav";

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
      <Header options={navigation} />
      <div className="w-full h-full p-5 mt-10 -z-10 absolute">
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
                  name = "",
                  categories,
                  publishedAt = "",
                  slug = "",
                  authorImage,
                  mainImage,
                }) => (
                  <div
                    key={_id}
                    className="relative flex items-end justify-start w-full text-left bg-center bg-cover h-96 bg-gray-500"
                    style={{
                      backgroundImage: `url("${
                        mainImage
                          ? urlFor(mainImage).width(600).height(600).url()
                          : "favicon-32x32.png"
                      }")`,
                    }}
                    onClick={() =>
                      window.open(
                        `https://wrenchworks.tech/blog/${encodeURIComponent(slug.current.trim())}`,
                        "_blank",
                      )
                    }
                  >
                    <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-b via-transparent from-gray-900 to-gray-900"></div>
                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                      <a
                        rel="noopener noreferrer"
                        href={`/blog/category`}
                        className="px-3 py-2 text-xs font-semibold tracki uppercase text-gray-100"
                        onClick={(event) => event.stopPropagation()}
                      >
                        {categories &&
                          categories.map((category) => (
                            <span key={category}> {category}</span>
                          ))}
                      </a>
                      <div className="flex flex-col justify-start text-center text-gray-100">
                        <span className="text-3xl font-semibold leadi tracki">
                          {new Date(publishedAt).getDate()}
                        </span>
                        <span className="uppercase">
                          {getMonth(new Date(publishedAt).getMonth())}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="relative flex items-center gap-x-4 mb-1">
                        <Image
                          src={urlFor(authorImage).url()}
                          alt={`${name}'s picture`}
                          width={460}
                          height={460}
                          className="h-10 w-10 rounded-full bg-gray-50"
                        />
                        <div className="text-sm leading-6">
                          <p className="font-semibold text-gray-100">
                            <Link
                              href="/blog/author"
                              onClick={(event) => event.stopPropagation()}
                            >
                              {name}
                            </Link>
                          </p>
                        </div>
                      </div>
                      <Link
                        href={`/blog/${encodeURIComponent(slug.current.trim())}`}
                        onClick={(event) => event.stopPropagation()}
                        className="relative"
                      >
                        <h2 className="font-medium text-md hover:underline text-white">
                          {title}
                        </h2>
                      </Link>
                    </div>
                  </div>
                ),
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
      "name": author->name,
      "categories": categories[]->title,
      publishedAt,
      slug,
      "authorImage": author->image,
      mainImage
    }
  `);
  return {
    props: {
      posts,
    },
  };
}
