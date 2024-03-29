import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import groq from "groq";
import { RadioGroup } from "@headlessui/react";
import { client } from "@/lib/sanity";
import { logo } from "@/img";
import ComboBox from "@/component/comboBox";
import Header from "@/component/header";
import { navigation } from "@/lib/nav";
import { titleCase } from "@/lib/utils";

export default function Index({ models }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("model");
  if (models && models.length < 1) {
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
          <div className="flex flex-row gap-10 text-2xl mt-2">
            <Link href="/" prefetch={false}>
              Back to Home
            </Link>
            <Link href="/car" prefetch={false}>
              Back to Cars
            </Link>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{`${titleCase(router.query.brand)} Models`}</title>
      </Head>
      <Header options={navigation} />
      <div className="absolute bg-white flex flex-col lg:flex-row top-14 -z-10">
        <div className="flex flex-row justify-center items-center lg:block lg:ml-8">
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
                  <RadioGroup.Option value="model">
                    {({ checked }) => (
                      <span className="flex flex-row justify-between items-center">
                        <input
                          className={`${checked ? "bg-blue-200" : ""} `}
                          type="radio"
                        />
                        <span>Model</span>
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
                {type == "model" ? (
                  <>
                    <ComboBox options={models} />
                  </>
                ) : (
                  <>
                    <ComboBox options={models} />
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
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            {titleCase(router.query.brand)} Cars
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {models
              .filter((model) => {
                if (query == "") {
                  return model;
                } else if (
                  model.title.toLowerCase().includes(query.toLowerCase())
                ) {
                  return model;
                }
              })
              .map((model) => (
                <div key={model._id} className="group relative">
                  <div className="aspect-h-2 aspect-w-2 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <div>
                      <Image
                        src={model.mainImage ? model.mainImage.imageurl : logo}
                        alt={model.slug.current}
                        fill={true}
                        priority={false}
                        className="object-cover object-center"
                        sizes="100w"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link
                          href={`${model.brands[0].trim().toLowerCase()}/${model.slug.current.trim().toLowerCase()}`}
                          prefetch={false}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {model.title}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500"></p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {model.price}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { brand = "" } = context.params;
  const models = await client.fetch(groq`
    *[_type == "car" && references(*[_type == "brand" && title == "${brand}"]._id)] {
      _id,
      title,
      price,
      "brands":brands[]->title,
      slug,
      "mainImage":images[0]
    }
  `);
  return {
    props: {
      models,
    },
  };
}
