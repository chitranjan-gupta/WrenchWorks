import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import groq from "groq";
import { client, urlFor } from "@/lib/sanity";
import Meta from "@/component/meta";
import poster from "../../public/poster-small.png";
import { car, logo, piping, instagram, brandsLogos } from "@/img/imgexport";
import { DropDown } from "@/component/header";
import { navigation } from "@/lib/nav";
import { BoltIcon } from "@heroicons/react/20/solid";

export default function Main({ posts, cars }) {
  const blogRef = useRef();
  const [scrollPos, setScrollPos] = useState(0);
  function leftScroll() {
    let rect = blogRef.current.getBoundingClientRect();
    blogRef.current.scroll({
      top: rect.y + 20,
      left: scrollPos - (rect.width - rect.x),
      behavior: "smooth",
    });
    setScrollPos((pos) =>
      pos - (rect.width - rect.x) < 0 ? pos : pos - (rect.width - rect.x)
    );
  }
  function rightScroll() {
    let rect = blogRef.current.getBoundingClientRect();
    blogRef.current.scroll({
      top: rect.y + 20,
      left: scrollPos + (rect.width - rect.x),
      behavior: "smooth",
    });
    setScrollPos((pos) =>
      pos + (rect.width - rect.x) > posts.length * 320
        ? pos
        : pos + (rect.width - rect.x)
    );
  }
  const brandsRef = useRef();
  const [brandsPos, setBrandsPos] = useState(0);
  function leftBrand() {
    let rect = brandsRef.current.getBoundingClientRect();
    brandsRef.current.scroll({
      top: rect.y + 20,
      left: brandsPos - (rect.width - rect.x),
      behavior: "smooth",
    });
    setBrandsPos((pos) =>
      pos - (rect.width - rect.x) < 0 ? pos : pos - (rect.width - rect.x)
    );
  }
  function rightBrand() {
    let rect = brandsRef.current.getBoundingClientRect();
    brandsRef.current.scroll({
      top: rect.y + 20,
      left: brandsPos + (rect.width - rect.x),
      behavior: "smooth",
    });
    setBrandsPos((pos) =>
      pos + (rect.width - rect.x) > posts.length * 320
        ? pos
        : pos + (rect.width - rect.x)
    );
  }
  const carRef = useRef();
  const [carPos, setCarPos] = useState(0);
  function leftCar() {
    let rect = carRef.current.getBoundingClientRect();
    carRef.current.scroll({
      top: rect.y + 20,
      left: carPos - (rect.width - rect.x),
      behavior: "smooth",
    });
    setCarPos((pos) =>
      pos - (rect.width - rect.x) < 0 ? pos : pos - (rect.width - rect.x)
    );
  }
  function rightCar() {
    let rect = carRef.current.getBoundingClientRect();
    carRef.current.scroll({
      top: rect.y + 20,
      left: carPos + (rect.width - rect.x),
      behavior: "smooth",
    });
    setCarPos((pos) =>
      pos + (rect.width - rect.x) > posts.length * 320
        ? pos
        : pos + (rect.width - rect.x)
    );
  }
  const features = [
    {
      id: 1,
      name: "Comprehensive Car Features",
      description:
        "Discover detailed information about the latest car models and their standout features. From advanced safety technologies to cutting-edge entertainment systems, explore how each car is designed to enhance your driving experience.",
    },
    {
      id: 2,
      name: "Expert Car Servicing",
      description:
        "Trust your car's maintenance and repairs to our provided details about team of certified technicians. Our provided details about expert service center offers a wide range of services, including routine maintenance, diagnostics, and repairs, ensuring your car stays in top condition for years to come.",
    },
    {
      id: 3,
      name: "Extensive Car Showroom",
      description:
        "Visit spacious showroom provided on this website and explore a diverse range of cars from various renowned brands. Experience firsthand the latest models, sit behind the wheel, and get a feel for their performance, comfort, and style.",
    },
    {
      id: 4,
      name: "Transparent Car Prices",
      description:
        "We believe in providing transparent pricing information to empower our customers. Our website features up-to-date car prices, allowing you to compare options and make informed decisions. No hidden costs or surprises—just clear and competitive pricing.",
    },
    {
      id: 5,
      name: "Financing and Special Offers",
      description:
        "We understand that purchasing a car involves financial considerations. Take advantage of our flexible financing options, including loan assistance and leasing programs tailored to your budget. Stay updated on our special offers, discounts, and promotions to make your dream car even more affordable.",
    },
  ];
  const people = [
    {
      id: 1,
      name: "Bablu Yadav",
      role: "Founder / CEO",
      url: "https://github.com/bablu-kumar-yadav",
      imageUrl: "https://avatars.githubusercontent.com/u/73455612?v=4",
    },
    {
      id: 2,
      name: "Chitranjan Gupta",
      role: "Co-Founder / CTO",
      url: "https://github.com/chitranjan-gupta",
      imageUrl: "https://avatars.githubusercontent.com/u/37315561?v=4",
    },
    {
      id: 3,
      name: "Anurag Pandey",
      role: "Frontend Engineer",
      url: "https://github.com/Anurag7645",
      imageUrl: "https://avatars.githubusercontent.com/u/114188019?v=4",
    },
  ];
  return (
    <>
      <Meta />
      <section name="hero" id="hero">
        <div className="bg-white">
          <header className="absolute inset-x-0 top-0 z-50">
            <nav
              className="flex items-center justify-between p-4 lg:px-8"
              aria-label="Global"
            >
              <div className="flex lg:flex-1">
                <div className="h-8 w-8">
                  <Image
                    priority={true}
                    alt="logo"
                    src={logo}
                    width={50}
                    height={50}
                  />
                </div>
                <a href="https://www.wrenchworks.tech" className="p-1.5">
                  <span className="">WrenchWorks</span>
                </a>
              </div>
              <div className="block sm:hidden">
                <DropDown options={navigation} />
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                <Link
                  href="/sign_in"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </nav>
          </header>

          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>

            <div className="w-full flex -ml-8 mainheader justify-between flex-col sm:flex-row md:flex-row lg:flex-row">
              <div className="">
                <Image
                  priority={true}
                  alt=""
                  src={car}
                  width={500}
                  height={700}
                />
              </div>
              <div className="w-full lg:w-3/4 lg:mt-20 flex flex-col justify-start items-center text-center mx-8 sm:ml-0 md:ml-0 lg:ml-0">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Explore the World of Auto
                </h1>
                <p className="text-lg leading-8 text-gray-600">
                  Why go anywhere when there is wrenchworks.tech for finding
                  your dream auto.
                  <br></br>
                  Get the proper knowledge about the features and price details
                  about the auto.
                </p>
                <div className=" flex items-center justify-center">
                  <a
                    href="#cars"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                </div>
                <div className="sm:w-full">
                  <div className="lg:px-8">
                    <h2 className="text-center text-lg font-semibold leading-8 text-gray-900">
                      Explore from variety of brands
                    </h2>
                    <div
                      ref={brandsRef}
                      className="mt-10 overflow-x-scroll overflow-y-hidden grid max-w-xs grid-cols-18 grid-rows-4 gap-x-20 gap-y-10 pl-2 lg:pl-0 lg:max-w-2xl lg:grid-cols-13 lg:gap-x-32 lg:grid-rows-3 lg:gap-y-8 scrollbar"
                    >
                      {brandsLogos.map((logos, index) => (
                        <div
                          key={index}
                          className="relative h-12 w-40"
                        >
                          <Image
                            className="object-contain"
                            src={logos}
                            alt=""
                            fill={true}
                            sizes="158w 48h"
                          />
                        </div>
                      ))}
                    </div>
                    <div className="w-full flex flex-row justify-center items-center">
                      <button
                        onClick={leftBrand}
                        className="text-3xl font-black"
                      >
                        &larr;
                      </button>
                      <button
                        onClick={rightBrand}
                        className="text-3xl font-black"
                      >
                        &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section name="features" id="features">
        <div className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                What we offer
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Our knowledgeable website will assist you in finding the perfect
                car to suit your needs
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white">
                        <BoltIcon className="h-5 w-5 text-amber-500" />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section name="cars" id="cars" className="p-4">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <h2
                  className="
              font-bold
              text-3xl
              sm:text-4xl
              md:text-[40px]
              text-dark
              mb-4
              "
                >
                  <Link href="/blog">Our Recent Cars</Link>
                </h2>
                <p className="text-base text-body-color">Experience the Extraordinary Journey</p>
              </div>
            </div>
          </div>
          <div ref={carRef} className="flex flex-nowrap p-2 overflow-x-scroll overflow-y-hidden -ml-4 sm:ml-0 scrollbar">
            {cars.map((car) => (
            <div key={car._id} className="group relative w-full lg:w-auto">
              <div className="aspect-h-1 aspect-w-1 lg:aspect-h-2 lg:aspect-w-3 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
                <div>
                  <Image
                    src={car.mainImage ? car.mainImage.imageurl : logo}
                    alt=""
                    fill={true}
                    priority={false}
                    className="object-cover object-center"
                    sizes="100w"
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col lg:flex-row">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={`/car/${car.brand[0]}/${car.slug.current}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {car.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{car.description}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {car.price}
                </p>
              </div>
            </div>
            ))}
          </div>
          <div className="w-full flex flex-row justify-center items-center">
            <button onClick={leftCar} className="text-3xl font-black">
              &larr;
            </button>
            <button onClick={rightCar} className="text-3xl font-black">
              &rarr;
            </button>
          </div>
        </div>
      </section>
      <section name="blogs" id="blogs" className="p-4">
        <div className="container">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                <h2
                  className="
              font-bold
              text-3xl
              sm:text-4xl
              md:text-[40px]
              text-dark
              mb-4
              "
                >
                  <Link href="/blog">Our Recent Blogs</Link>
                </h2>
                <p className="text-base text-body-color">
                  Insights and Inspiration for Car Enthusiasts
                </p>
              </div>
            </div>
          </div>
          <div
            ref={blogRef}
            className="flex flex-nowrap p-2 overflow-x-scroll overflow-y-hidden -ml-4 sm:ml-0 scrollbar"
          >
            {posts.map((post) => (
              <div key={post._id} className="w-full md:w-1/2 lg:w-1/3 mx-7">
                <div className="max-w-[370px] min-w-[370px] mx-auto mb-10">
                  <div className="rounded overflow-hidden mb-8">
                    {post.mainImage ? (
                      <Image
                        src={urlFor(post.mainImage)
                          .width(600)
                          .height(600)
                          .url()}
                        alt="mainImage"
                        width={200}
                        height={200}
                        className="w-full"
                      />
                    ) : (
                      <Image
                        src={logo}
                        alt="mainImage"
                        width={300}
                        height={300}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-x-4 text-xs">
                    <time className="text-gray-500">
                      {new Date(post.publishedAt).toDateString()}
                    </time>
                    <Link
                      href={`/blog/${encodeURIComponent(post.slug.current)}`}
                      className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                    >
                      {post.categories &&
                        post.categories.map((category) => (
                          <span key={category}> {category}</span>
                        ))}
                    </Link>
                  </div>
                  <div>
                    <h3>
                      <Link
                        href={`/blog/${encodeURIComponent(post.slug.current)}`}
                        className="
                    font-semibold
                    text-xl
                    sm:text-2xl
                    lg:text-xl
                    xl:text-2xl
                    mb-4
                    inline-block
                    text-dark
                    hover:text-primary
                    "
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-base text-body-color">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <Image
                      src={urlFor(post.authorImage).width(40).height(40).url()}
                      alt={`${post.name}'s picture`}
                      width={460}
                      height={460}
                      className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <Link href="/blog">
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
          <div className="w-full flex flex-row justify-center items-center">
            <button onClick={leftScroll} className="text-3xl font-black">
              &larr;
            </button>
            <button onClick={rightScroll} className="text-3xl font-black">
              &rarr;
            </button>
          </div>
        </div>
      </section>
      <section name="teams" id="teams">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Meet our leadership
              </h2>
            </div>
            <ul
              role="list"
              className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
            >
              {people.map((person) => (
                <li key={person.name}>
                  <div className="flex items-center gap-x-6">
                    <Image
                      className="h-16 w-16 rounded-full"
                      width={460}
                      height={460}
                      src={person.imageUrl}
                      alt=""
                    />
                    <a href={person.url}>
                      <div>
                        <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                          {person.name}
                        </h3>
                        <p className="text-sm font-semibold leading-6 text-indigo-600">
                          {person.role}
                        </p>
                      </div>
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section
        name="testmonials"
        id="testmonials"
        className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto">
          <h1 className="mx-auto text-2xl text-center">Testimonials</h1>
        </div>
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <div className="mx-auto h-28 w-52 p-1">
            <Image
              width={200}
              height={200}
              src={piping}
              alt="Testimonial logo"
            />
          </div>
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
                “The blog section on this website is a treasure trove of
                valuable information for car enthusiasts like me. I love reading
                their articles on car features, maintenance tips, and industry
                insights. The content is well-researched, engaging, and keeps me
                updated with the latest happenings in the automotive world.”
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <Image
                className="mx-auto h-14 w-14 rounded-full"
                width={60}
                height={60}
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Selena</div>
                <svg
                  viewBox="0 0 2 2"
                  width={3}
                  height={3}
                  aria-hidden="true"
                  className="fill-gray-900"
                >
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">CEO of Piping Wheel</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
      <section name="newsletter">
        <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              <div className="max-w-xl lg:max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Subscribe to our newsletter.
                </h2>
                <p className="mt-4 text-lg leading-8 text-gray-300">
                  Don&apos;t Miss out: Exclusive Articles.
                </p>
                <div className="mt-6 flex max-w-md gap-x-4">
                  <label htmlFor="email-address" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10"></div>
                  <dt className="mt-4 font-semibold text-white">
                    Weekly articles
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    Every week we post articles on car.
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10"></div>
                  <dt className="mt-4 font-semibold text-white">No spam</dt>
                  <dd className="mt-2 leading-7 text-gray-400">
                    We do not send spam emails.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <div
            className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
            aria-hidden="true"
          >
            <div
              className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </section>
      <footer className="bg-white rounded-lg shadow m-4">
        <div className="w-full mx-auto p-4 md:py-8">
          <div className="w-full flex flex-col justify-between items-start md:flex-row">
            <div className=" h-16 w-30 mb-10 md:mb-0">
              <a href="https://www.wrenchworks.tech">
                <Image alt="poster" src={poster} width={200} height={100} />
              </a>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 ">
              <li className="flex flex-col justify-center items-center mr-2">
                <Link target="_blank" href="https://instagram.com/wrenchworks_">
                  <Image
                    src={instagram}
                    alt="Instagram "
                    width={20}
                    height={20}
                  />
                </Link>
              </li>
              <li>
                <Link href="/about" className="mr-4 hover:underline md:mr-6 ">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy_policy"
                  className="mr-4 hover:underline md:mr-6"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:underline ml-2">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline ml-2">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <span className="block text-sm sm:text-center">
            <a href="https://wrenchworks.tech/" className="hover:underline">
              © 2023 WrenchWorks™
            </a>
          </span>
        </div>
      </footer>
    </>
  );
}

export async function getStaticProps() {
  const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc){
        _id,
        title,
        description,
        "name": author->name,
        "categories": categories[]->title,
        publishedAt,
        slug,
        "authorImage": author->image,
        mainImage,
      }
    `);
  const cars = await client.fetch(groq`
    *[_type == "car"]{
      _id,
      title,
      description,
      "brand":brands[]->title,
      price,
      slug,
      "mainImage":images[0]
    }
  `);
  return {
    props: {
      posts,
      cars,
    },
  };
}
