import Link from "next/link";
import { Fragment } from "react";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/20/solid";

export function DropDown({ options }) {
  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-gray-400 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <Bars3BottomRightIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-400"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {options.map((option) => (
                <Menu.Item key={option.name}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-violet-500 text-gray-900" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <a href={option.href}>{option.name}</a>
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default function Header({ options }) {
  return (
    <>
      <header className="w-full flex flex-row justify-between items-center z-10">
        <div className="lg:pl-10">
          <Link href="/">
            <Image
              alt="poster"
              src="/poster-small.png"
              width={100}
              height={60}
              priority={true}
            />
          </Link>
        </div>
        <nav className="z-10">
          <DropDown options={options} />
        </nav>
      </header>
    </>
  );
}
