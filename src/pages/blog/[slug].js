import Head from "next/head";
import Image from "next/image";
import groq from "groq";
import imageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { client } from "../../../lib/sanity";

function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}

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
  if(!post)
    return <></>
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
      <article className="flex flex-col justify-center items-center">
        <h1 className="text-4xl">{title}</h1>
        <h3 className="text-2xl">{description}</h3>
        <div className="relative mt-8 flex items-center gap-x-4 border-y">
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
              <a href="">
                <span className="absolute inset-0" />
                {name}
              </a>
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
        <div className="flex flex-col justify-center items-center">
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
  body
}`;
export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  return {
    props: {
      post,
    },
  };
}
export default Post;
