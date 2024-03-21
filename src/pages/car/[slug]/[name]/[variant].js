import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import groq from "groq";
import { client } from "@/lib/sanity";
import List from "@/component/list";
import { RadioGroup } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import Header from "@/component/header";
import { navigation, NoU } from "@/lib/nav";
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function list(arr1, arr2) {
  return arr1.map((val, i) =>
    val.startsWith("_") ||
    val.startsWith("ex_showroom_price") ||
    val.startsWith("on_road_price") ||
    val.startsWith("title") ? (
      <Fragment key={i + "Frag"} />
    ) : (
      <List key={val} property={val} value={arr2[i]} />
    ),
  );
}

export default function Index({ car, vari }) {
  const router = useRouter();
  const [isAndy, setAndy] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    NoU(car) ? car.colours[0] : [],
  );
  const [brands, setBrands] = useState(NoU(car) ? car.brands[0] : "");
  const [carSlug, setCarSlug] = useState(NoU(car) ? car.slug.current : "");
  const [breads, setBreads] = useState([
    {
      name: brands,
      href: "/car/" + brands,
    },
    {
      name: carSlug,
      href: "/car/" + brands + "/" + carSlug,
    },
  ]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (navigator.userAgent.indexOf("Android") > 0) setAndy(true);
    }
  }, []);
  if (!car || !vari)
    return (
      <div className="flex flex-row justify-center items-center w-full h-full text-violet-700">
        <span className=" text-9xl">404 | Not Found</span>
      </div>
    );
  return (
    <>
      <Head>
        <title>{router.query.variant.replaceAll("-", " ")}</title>
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
                    <a
                      href={bread.href}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      {bread.name}
                    </a>
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
                <a
                  href={vari.slug.current}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {vari.slug.current}
                </a>
              </li>
            </ol>
          </nav>

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-0 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
              {!isAndy && (
                <div>
                  <Image
                    src={car.images[0].imageurl}
                    alt=""
                    fill={true}
                    sizes="100w"
                    priority={true}
                    className="object-cover object-center"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-8 h-fit">
              <div className="hidden lg:aspect-h-2 lg:aspect-w-3 lg:overflow-hidden lg:rounded-lg lg:block lg:h-fit">
                {!isAndy && (
                  <div>
                    <Image
                      src={car.images[1].imageurl}
                      alt=""
                      fill={true}
                      sizes="100w"
                      priority={true}
                      className="object-cover object-center"
                    />
                  </div>
                )}
              </div>
              <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg block h-fit">
                <div>
                  <Image
                    src={selectedColor.coloururl}
                    alt=""
                    fill={true}
                    sizes="100w"
                    priority={true}
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
            <div className="hidden overflow-hidden lg:aspect-h-2 lg:aspect-w-3 rounded-lg lg:block">
              {!isAndy && (
                <div>
                  <Image
                    src={car.images[2].imageurl}
                    alt=""
                    fill={true}
                    sizes="100w"
                    priority={true}
                    className="object-cover object-center"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {`${car.title} ${vari.title}`}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {vari.prices.on_road_price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating + "rating"}
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
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
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
                            style={{ backgroundColor: `${color.colourvalue}` }}
                            className={classNames(
                              "h-8 w-8 rounded-full border border-black border-opacity-10",
                            )}
                          />
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.colourname}
                          </RadioGroup.Label>
                        </RadioGroup.Option>
                      ))}
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
                  <p className="text-base text-gray-900">{car.description}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-medium text-gray-900">
                  Specification
                </h2>
                {vari.specification.map((specs, index) => (
                  <div
                    className="mt-4 space-y-6 border-t border-gray-400"
                    key={index + "specs"}
                  >
                    <span className="font-bold">
                      {specs._type.replace(
                        specs._type[0],
                        specs._type[0].toUpperCase(),
                      )}
                    </span>
                    <ul key={index + "Unorder"}>
                      {list([...Object.keys(specs)], [...Object.values(specs)])}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <h2 className="text-2xl font-medium text-gray-900">Price</h2>
                <div className="mt-4 space-y-6 border-t border-gray-400">
                  <ul>
                    <List
                      property="ex_showroom_price"
                      value={vari.prices.ex_showroom_price}
                    />
                    {list(
                      [...Object.keys(vari.prices)],
                      [...Object.values(vari.prices)],
                    )}
                    <List
                      property={`on_road_price_in_${vari.prices.title.replaceAll(
                        " ",
                        "_",
                      )}`}
                      value={vari.prices.on_road_price}
                      className="border-t border-gray-400"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const queryvariant = groq`*[_type == "carvariant" && slug.current == $variant][0]{
  title,
  slug,
  "specification":specification[],
  "prices":prices[0]
}`;

const querycar = groq`*[_type == "car" && slug.current == $name][0]{
    title,
    description,
    slug,
    "brands":brands[]->title,
    "colours":colours[],
    "images":images[]
  }`;

export async function getStaticProps(context) {
  const { name, variant } = context.params;
  const car = await client.fetch(querycar, { name });
  const vari = await client.fetch(queryvariant, { variant });
  return {
    props: {
      car,
      vari,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const brands = await client.fetch(groq`*[_type == "brand"][].title`);
  const models = await client.fetch(
    groq`*[_type == "car" && defined(slug.current)][].slug.current`,
  );
  const variants = await client.fetch(
    groq`*[_type == "carvariant" && defined(slug.current)][].slug.current`,
  );
  const paths = [];
  brands.forEach((slug) => {
    models.forEach((name) => {
      variants.forEach((variant) => {
        paths.push({ params: { slug, name, variant } });
      });
    });
  });
  return {
    paths: paths,
    fallback: true,
  };
}
