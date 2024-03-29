import { useState } from "react";
import Image from "next/image";
import Head from "next/head";
import groq from "groq";
import Link from "next/link";
import { RadioGroup } from "@headlessui/react";
import { client } from "@/lib/sanity";
import { logo, brandsLogos } from "@/img";
import ComboBox from "@/component/comboBox";
import Header from "@/component/header";
import { navigation } from "@/lib/nav";
import { titleCase } from "@/lib/utils";

export default function Index({ brands, cars }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("brand"); //store view type
  function getLogo(name) {
    return brandsLogos.find((img) => img[0].src.includes(name))[0];
  }
  return (
    <>
      <Head>
        <title>Cars - Wrenchworks</title>
      </Head>
      <Header options={navigation} />
      <div className="absolute bg-white flex flex-col lg:flex-row top-14 -z-10">
        <div className="ml-1">
          <div className="w-80 h-80">
            <div className="h-full w-full rounded-md bg-white shadow-lg p-5">
              <div>
                <strong>Explore</strong>
              </div>
              <div>
                <RadioGroup
                  value={type}
                  onChange={setType}
                  className="flex flex-row items-center justify-evenly"
                >
                  <RadioGroup.Option value="brand">
                    {({ checked }) => (
                      <span className="flex flex-row justify-between items-center">
                        <input
                          className={`${checked ? "bg-blue-200" : ""} `}
                          type="radio"
                        />
                        <span>Brand</span>
                      </span>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="budget">
                    {({ checked }) => (
                      <span className="flex flex-row justify-between items-center">
                        <input
                          className={`${checked ? "bg-blue-200" : ""} `}
                          type="radio"
                        />
                        <span>Budget</span>
                      </span>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
              </div>
              <div>
                {type == "brand" ? (
                  <>
                    <ComboBox options={brands} />
                    <ComboBox options={brands} />
                  </>
                ) : (
                  <>
                    <ComboBox options={brands} />
                    <ComboBox options={brands} />
                  </>
                )}
              </div>
              <div className="w-full flex flex-row justify-center items-center relative mt-3">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full p-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              By Brands
            </h2>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {brands.map((brand) => (
                <div key={brand._id} className="group relative">
                  <a href={`/car/${brand.title}`}>
                    <div className="aspect-h-1 aspect-w-2 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                      <div>
                        <Image
                          src={brand.title ? getLogo(brand.title) : logo}
                          alt={brand.title}
                          fill={true}
                          className="object-fill object-center"
                          sizes="100w"
                        />
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <div>
                        <h3 className="text-md text-gray-700 text-center">
                          {titleCase(brand.title)}
                        </h3>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              By Models
            </h2>

            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {cars.map((car) => (
                <div key={car._id} className="group relative">
                  <div className="aspect-h-3 aspect-w-3 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <div>
                      {car.mainImage && car.mainImage.imageurl ? (
                        <Image
                          src={car.mainImage.imageurl}
                          alt={car.mainImage.imageurl}
                          fill={true}
                          className="object-cover object-center"
                          sizes="280w"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link
                          href={`/car/${car.brands[0].trim().toLowerCase()}/${car.slug.current.trim().toLowerCase()}`}
                          prefetch={false}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {car.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {car.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const cars = await client.fetch(groq`*[_type == "car"]{
    _id,
    title,
    price,
    "brands":brands[]->title,
    slug,
    "mainImage":images[0]
  }`);
  const brands = await client.fetch(groq`
    *[_type == "brand"]{
      _id,
      title
    }
  `);
  return {
    props: {
      brands,
      cars,
    },
  };
}
