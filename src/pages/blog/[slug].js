import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "@/lib/sanity";
import poster from "../../../public/poster-small.png";
import Header from "@/component/header";
import { navigation } from "@/lib/nav";

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 object-contain">
          <Image
            alt=""
            loading="lazy"
            src={urlFor(value).url()}
            fill={true}
          />
        </div>
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="">{children}</h1>,
    h2: ({ children }) => <h2 className="">{children}</h2>,
    h3: ({ children }) => <h3 className="">{children}</h3>,
    h4: ({ children }) => <h4 className="">{children}</h4>,
    p: ({ children }) => <p className="">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-purple-500">{children}</blockquote>
    ),
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
      <Header options={navigation}/>
      <div className="flex flex-row justify-center items-center p-2 sm:px-0 mt-10">
        <article className="prose prose-stone lg:prose-xl bg-white">
          <h1 className="">{title}</h1>
          <h4 className="text-slate-600">{description}</h4>
          <div className="not-prose flex flex-row justify-between items-center border-y w-full mt-3 mb-3 p-1">
            <div className="flex flex-row items-center">
              {authorImage && (
                <div className="relative h-10 w-10 bg-gray-50">
                  <Image
                    src={urlFor(authorImage).url()}
                    alt={`${name}'s picture`}
                    fill={true}
                    sizes="100w"
                    className="rounded-full"
                  />
                </div>
              )}
              <div className="ml-2 flex flex-col items-start justify-around">
                <p className="font-semibold text-gray-900">{name}</p>
                <div className="flex flex-col items-start lg:flex-row lg:items-center">
                  {categories && (
                    <p className="text-gray-600">
                      Posted in
                      {categories.map((category) => (
                        <span key={category}> {category}</span>
                      ))}
                    </p>
                  )}
                  <span className="hidden lg:block mx-2">.</span>
                  <time className="text-gray-500">
                    {new Date(publishedAt).toDateString()}
                  </time>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 object-contain">
            <Image
              src={post.mainImage ? urlFor(post.mainImage).url() : poster}
              alt="mainImage"
              fill={true}
              sizes="100w"
            />
          </div>
          <div className="w-full pt-3">
            <PortableText value={body} components={ptComponents} />
          </div>
        </article>
      </div>
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
    revalidate: 10,
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
