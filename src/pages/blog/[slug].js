import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../../../lib/sanity";
import poster from "../../../public/poster-small.png";

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <Image
          alt=""
          loading="lazy"
          width={320}
          height={240}
          src={urlFor(value).width(320).height(240).url()}
        />
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
    p: ({ children }) => <p className="text-xl">{children}</p>,
  },
};

const Post = ({ post }) => {
  const router = useRouter();
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
    publishedAt,
    authorImage,
    body = [],
  } = post;
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta
          name="og:image"
          content={post.mainImage ? urlFor(post.mainImage).url() : poster}
        />
        <meta
          name="og:url"
          content={`https://www.wrenchworks.tech/blog/${router.query.slug}`}
        />
        <meta name="og:site_name" content="Wrench Works" />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="article" />
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
      <article className="flex flex-col justify-center items-start w-full h-full px-3 sm:px-5 lg:px-80">
        <h1 className="text-5xl text-left font-bold mb-3">{title}</h1>
        <h3 className="text-2xl text-left mb-3 text-slate-600">
          {description}
        </h3>
        <div className="flex flex-row justify-between items-center border-y w-full mt-3 mb-8 p-1">
          <div className="flex flex-row items-center">
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
            <div className="text-sm leading-5 ml-2">
              <p className="font-semibold text-gray-900">{name}</p>
              <div className="flex flex-row items-center">
                {categories && (
                  <p className="text-gray-600">
                    Posted in
                    {categories.map((category) => (
                      <span key={category}> {category}</span>
                    ))}
                  </p>
                )}
                <span className="mx-2">.</span>
                <time className="text-gray-500 text-sm">
                  {new Date(publishedAt).toDateString()}
                </time>
              </div>
            </div>
          </div>
          <div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.22 4.93a.42.42 0 0 1-.12.13h.01a.45.45 0 0 1-.29.08.52.52 0 0 1-.3-.13L12.5 3v7.07a.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5V3.02l-2 2a.45.45 0 0 1-.57.04h-.02a.4.4 0 0 1-.16-.3.4.4 0 0 1 .1-.32l2.8-2.8a.5.5 0 0 1 .7 0l2.8 2.8a.42.42 0 0 1 .07.5zm-.1.14zm.88 2h1.5a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2H8a.5.5 0 0 1 .35.14c.1.1.15.22.15.35a.5.5 0 0 1-.15.35.5.5 0 0 1-.35.15H6.4c-.5 0-.9.4-.9.9v10.2a.9.9 0 0 0 .9.9h11.2c.5 0 .9-.4.9-.9V8.96c0-.5-.4-.9-.9-.9H16a.5.5 0 0 1 0-1z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </div>
        <div className="relative w-full h-96 object-contain">
          <Image
            src={post.mainImage ? urlFor(post.mainImage).url() : poster}
            alt="mainImage"
            fill={true}
            sizes="100"
          />
        </div>
        <div className="flex flex-col justify-center w-full text-xl">
          <PortableText value={body} components={ptComponents}/>
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
  publishedAt,
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
