import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import groq from "groq";
import { PortableText } from "@portabletext/react";
import { posterSmall, logo } from "@/img";
import { client, urlFor } from "@/lib/sanity";
import Header from "@/component/header";
import { Table } from "@/component/table";
import { navigation } from "@/lib/nav";

const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 object-contain my-10">
          <Image alt="" loading="lazy" src={urlFor(value).url()} fill={true} />
        </div>
      );
    },
    table: ({ value }) => {
      if (!value) {
        return null;
      }
      const { rows } = value;
      return <Table rows={rows} />;
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

const Post = ({ post, posts }) => {
  const router = useRouter();
  if (!post)
    return (
      <div className="flex flex-col justify-center items-center w-full min-h-[600px] text-violet-700">
        <span className="text-3xl md:text-7xl">
          <b className="text-red-500">404</b>|
          <b className="text-red-500">Not Found</b>
        </span>
        <div className="flex flex-row gap-10 text-2xl mt-2">
          <Link href="/" prefetch={false}>
            Back to Home
          </Link>
          <Link href="/blog" prefetch={false}>
            Back to Blog
          </Link>
        </div>
      </div>
    );
  const {
    title = "Missing title",
    description = "Missing description",
    name = "Missing name",
    bio = "Missing bio",
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
          content={post.mainImage ? urlFor(post.mainImage).url() : posterSmall.src}
        />
        <meta
          name="og:url"
          content={`https://wrenchworks.tech/blog/${router.query.slug}`}
        />
        <meta name="og:site_name" content="Wrench Works" />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="article" />
      </Head>
      <Header options={navigation} />
      <div className="flex flex-row justify-center items-center p-2 sm:px-0 mt-14">
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
              src={post.mainImage ? urlFor(post.mainImage).url() : posterSmall}
              alt="mainImage"
              fill={true}
              sizes="100w"
            />
          </div>
          <div className="w-full mt-10">
            <PortableText value={body} components={ptComponents} />
          </div>
        </article>
      </div>
      <div className="w-full flex flex-col justify-center items-center px-2 md:px-10 mt-10">
        <div>
          <div>
            <div className="relative mt-2 flex items-center gap-x-4 min-w-[360px] md:min-w-[800px]">
              <Image
                src={urlFor(authorImage).url()}
                alt={`${name}'s picture`}
                width={460}
                height={460}
                className="h-20 w-20 rounded-full bg-gray-50"
              />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <Link href="/blog/author" prefetch={false}>
                    <span className="absolute inset-0" />
                    {name}
                  </Link>
                </p>
                <p className="text-gray-600">{bio}</p>
              </div>
            </div>
          </div>
          <span className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-1">
            <Link href="/blog" prefetch={false}>
              Suggested Post :{" "}
            </Link>
          </span>
        </div>
        <div className="ml-3 md:ml-0">
          <div className="flex flex-row flex-wrap justify-center p-2 overflow-x-scroll overflow-y-hidden -ml-4 sm:ml-0">
            {posts.map((post) => (
              <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 mx-7">
                <div className="max-w-[370px] min-w-[370px] mx-auto mb-10">
                  <div className="rounded overflow-hidden mb-2 h-[250px] max-h-[250px] min-h-[250px]">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage).url()}
                        alt="mainImage"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={logo}
                        alt="mainImage"
                        width={300}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time className="text-gray-500">
                      {new Date(post.publishedAt).toDateString()}
                    </time>
                    <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {post.categories &&
                        post.categories.map((category) => (
                          <Link
                            href={`/blog/category`}
                            key={category}
                            prefetch={false}
                          >
                            {category}
                          </Link>
                        ))}
                    </div>
                  </div>
                  <div className="max-h-[85px] min-h-[85px] overflow-hidden overflow-ellipsis">
                    <h3>
                      <Link
                        href={`/blog/${encodeURIComponent(post.slug.current.trim())}`}
                        className="font-semibold text-xl sm:text-2xl lg:text-xl xl:text-2xl mb-1 inline-block text-dark hover:text-primary"
                        prefetch={false}
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-base text-body-color">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-2 flex items-center gap-x-4">
                    <Image
                      src={urlFor(post.authorImage).url()}
                      alt={`${post.name}'s picture`}
                      width={460}
                      height={460}
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <Link href="/blog/author" prefetch={false}>
                          <span className="absolute inset-0" />
                          {post.name}
                        </Link>
                      </p>
                      <p className="text-gray-600"></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  description,
  "name": author->name,
  "bio": author->bio[0].children[0].text,
  "authorSlug": author->slug,
  "categories": categories[]->title,
  publishedAt,
  "authorImage": author->image,
  mainImage,
  body
}`;

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const post = await client.fetch(query, { slug });
  let posts = [];
  if (post && post.authorSlug && post.authorSlug.current.trim()) {
    posts = await client.fetch(
      groq`
    *[_type == "post" && author->slug.current == $authorSlug][0...4] | order(publishedAt desc){
      _id,
      title,
      description,
      "name": author->name,
      "categories": categories[]->title,
      publishedAt,
      slug,
      "authorImage": author->image,
      mainImage
    }
  `,
      { authorSlug: post.authorSlug.current.trim() },
    );
  }
  return {
    props: {
      post,
      posts,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`,
  );

  return {
    paths: paths.map((slug) => ({ params: { slug: slug.trim() } })),
    fallback: true,
  };
}

export default Post;
