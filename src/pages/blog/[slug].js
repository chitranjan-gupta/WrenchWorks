import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import groq from "groq";
import poster from "../../../img/poster-small.png";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../../../lib/sanity";

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          alt={value.alt || " "}
          loading="lazy"
          width={320}
          height={240}
          src={urlFor(value).width(320).height(240).fit("max").auto("format")}
        />
      );
    },
  },
};

const Post = ({ post }) => {
  if (!post)
    return (
      <div className="flex flex-row justify-center items-center w-full h-full text-violet-700">
        <span className=" text-9xl">404 | Not Found</span>
      </div>
    );
  const {
    title = "Missing title",
    description = "Missing description",
    name = "Missing name",
    categories,
    authorImage,
    body = [],
  } = post;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <header className="flex flex-row justify-between items-center p-1 lg:p-3 mb-2">
        <div className=" h-16 w-30">
          <Link href="/">
            <Image alt="poster" src={poster} width={200} height={100} />
          </Link>
        </div>
        <form action="#" method="POST" className="bg-white hidden lg:block">
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
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>
      </header>
      <article className="flex flex-col justify-center items-center w-full h-full px-3 sm:px-5 lg:px-96">
        <h1 className="text-4xl text-center">{title}</h1>
        <h3 className="text-2xl text-center">{description}</h3>
        <div className="flex items-center gap-x-4 border-y-4 w-full">
          {authorImage && (
            <div>
              <Image
                src={urlFor(authorImage).width(40).height(40).url()}
                alt={`${name}'s picture`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full bg-gray-50"
              />
            </div>
          )}
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
                {name}
            </p>
            {categories && (
              <p className="text-gray-600">
                Posted in
                {categories.map((category) => (
                  <span key={category}> {category}</span>
                ))}
              </p>
            )}
          </div>
        </div>
        <div className="">
          <Image
            src={urlFor(post.mainImage).width(600).height(600).url()}
            alt="mainImage"
            width={400}
            height={400}
          />
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <PortableText value={body} components={ptComponents} />
        </div>
      </article>
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  mainImage,
  body
}`;

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default Post;
