import { useState } from "react";
import Image from "next/image";
import groq from "groq";
import { client } from "@/lib/sanity";
import { logo, brandsLogos } from "@/img/imgexport";
import ComboBox from "@/component/comboBox";
import { RadioGroup } from "@headlessui/react";
import Header from "@/component/header";
import { navigation } from "@/lib/nav";
export default function Index({ brands }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("brand");
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
      imageAlt: "Thar",
      price: "$35",
      color: "Black",
    },
  ];
  function getLogo(name) {
    return brandsLogos.find((val) => val.src.includes(name));
  }
  return (
    <>
      <Header options={navigation}/>
      <div className="bg-white flex flex-col lg:flex-row">
        <div className="ml-8">
          <div className=" w-80 h-80">
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
                        <h3 className="text-sm text-gray-700 text-center">
                          {brand.title.replace(
                            brand.title[0],
                            brand.title[0].toUpperCase()
                          )}
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
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-3 aspect-w-3 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                    <div>
                      <Image
                        src={logo}
                        alt=""
                        fill={true}
                        className="object-cover object-center"
                        sizes="280w"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
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
  const brands = await client.fetch(groq`
    *[_type == "brand"]{
      _id,
      title
    }
  `);
  return {
    props: {
      brands,
    },
  };
}
