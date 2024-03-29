import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import groq from "groq";
import Link from "next/link";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { client } from "@/lib/sanity";
import Header from "@/component/header";
import { navigation } from "@/lib/nav";
import { titleCase, NoU } from "@/lib/utils";

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Index({ car }) {
  const router = useRouter();
  const [isAndy, setAndy] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    NoU(car) ? car.colours[0] : [],
  );
  const [breads, setBreads] = useState([
    { name: NoU(car) ? car.brands[0] : "" },
  ]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.userAgent.indexOf("Android") > 0) setAndy(true);
    }
  }, []);
  if (!car) {
    return (
      <>
        <Head>
          <title>WrenchWorks</title>
        </Head>
        <div className="flex flex-col justify-center items-center w-full min-h-[600px] text-violet-700">
          <span className="text-3xl md:text-7xl">
            <b className="text-red-500">404</b>|
            <b className="text-red-500">Not Found</b>
          </span>
          <div className="flex flex-col gap-5 md:flex-row md:gap-10 text-2xl mt-2">
            <Link href="/" prefetch={false}>
              Back to Home
            </Link>
            <Link href="/car" prefetch={false}>
              Back to Cars
            </Link>
            {router.query.brand ? (
              <Link href={`/car/${router.query.brand}`} prefetch={false}>
                Back to {titleCase(router.query.brand)} Cars
              </Link>
            ) : (
              <></>
            )}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{car.title}</title>
      </Head>
      <Header options={navigation} />
      <div className="absolute w-full bg-white top-14 -z-10">
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {breads.map((bread) => (
                <li key={bread.name}>
                  <div className="flex items-center">
                    <Link
                      href={"/car/" + bread.name}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {bread.name}
                    </Link>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                {car.slug.current ? (
                  <Link
                    href="#"
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                    prefetch={false}
                  >
                    {car.slug.current}
                  </Link>
                ) : (
                  <></>
                )}
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-0 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              {!isAndy && (
                <div>
                  {car.images && car.images[0] && car.images[0].imageurl ? (
                    <Image
                      src={car.images[0].imageurl}
                      alt={car.images[0].imageurl}
                      fill={true}
                      sizes="100w"
                      priority={true}
                      className="object-cover object-center"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-8 h-fit">
              <div className="hidden lg:aspect-h-2 lg:aspect-w-3 lg:overflow-hidden lg:rounded-lg lg:block lg:h-fit">
                {!isAndy && (
                  <div>
                    {car.images && car.images[1] && car.images[1].imageurl ? (
                      <Image
                        src={car.images[1].imageurl}
                        alt={car.images[1].imageurl}
                        fill={true}
                        sizes="100w"
                        priority={true}
                        className="object-cover object-center"
                      />
                    ) : (
                      <></>
                    )}
                  </div>
                )}
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg block h-fit">
                <div>
                  {selectedColor && selectedColor.coloururl ? (
                    <Image
                      src={selectedColor.coloururl}
                      alt={selectedColor.coloururl}
                      fill={true}
                      sizes="100w"
                      priority={true}
                      className="object-cover object-center"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden overflow-hidden lg:aspect-h-2 lg:aspect-w-3 rounded-lg lg:block">
              {!isAndy && (
                <div>
                  {car.images && car.images[2] && car.images[2].imageurl ? (
                    <Image
                      src={car.images[2].imageurl}
                      alt={car.images[2].imageurl}
                      fill={true}
                      sizes="100w"
                      priority={true}
                      className="object-cover object-center"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {car.title ? car.title : <></>}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {car.price ? car.price : <></>}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "h-5 w-5 flex-shrink-0",
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <Link
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    prefetch={false}
                  >
                    {reviews.totalCount} reviews
                  </Link>
                </div>
              </div>

              <div className="mt-10">
                {/* Colors */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a color
                    </RadioGroup.Label>
                    <div className="flex items-center space-x-3">
                      {car.colours ? (
                        <>
                          {car.colours.map((color) => (
                            <RadioGroup.Option
                              key={color.colourname}
                              value={color}
                              className={({ active, checked }) =>
                                classNames(
                                  active && checked ? "ring ring-offset-1" : "",
                                  !active && checked ? "ring-2" : "",
                                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none",
                                )
                              }
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  backgroundColor: `${color.colourvalue}`,
                                }}
                                className={classNames(
                                  "h-8 w-8 rounded-full border border-black border-opacity-10",
                                )}
                              />
                              <RadioGroup.Label as="span" className="sr-only">
                                {color.colourname}
                              </RadioGroup.Label>
                            </RadioGroup.Option>
                          ))}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </RadioGroup>
                </div>

                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Buy
                </button>
              </div>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {car.description ? car.description : <></>}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">Variants</h3>

                <div className="mt-4">
                  {car.variants ? (
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {car.variants.map((variant) => (
                        <li key={variant} className="text-gray-400">
                          <Link
                            className="text-gray-600"
                            href={`/car/${car.brands[0].trim().toLowerCase()}/${car.slug.current.trim().toLowerCase()}/${variant.slug.current.trim().toLowerCase()}`}
                            prefetch={false}
                          >
                            {variant.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const query = groq`*[_type == "car" && slug.current == $name][0]{
  title,
  description,
  base,
  slug,
  "brands":brands[]->title,
  "colours":colours[],
  "images":images[],
  price,
}`;

const variantquery = groq`*[_type == "carvariant" && references(*[_type == "car" && slug.current == $name]._id)]{
  title,
  slug
}`;

export async function getStaticProps(context) {
  const { name = "", brand = "" } = context.params;
  let car = await client.fetch(query, { name });
  const variants = await client.fetch(variantquery, { name });
  car.variants = variants;
  return {
    props: {
      car,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const brands = await client.fetch(groq`*[_type == "brand"][].title`);
  const models = await client.fetch(
    groq`*[_type == "car" && defined(slug.current)][].slug.current`,
  );
  const paths = [];
  brands.forEach((brand) => {
    models.forEach((name) => {
      paths.push({ params: { brand, name } });
    });
  });
  return {
    paths: paths,
    fallback: true,
  };
}
