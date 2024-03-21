import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/img";
import { Menu, Transition } from "@headlessui/react";
import { Bars3BottomRightIcon } from "@heroicons/react/20/solid";

export function NavItem({ option }) {
  return (
    <Menu.Item>
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
  );
}

function DropDown({ children, options }) {
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
                <NavItem key={option.name} option={option} />
              ))}
            </div>
            {children ? (
              <NavItem
                option={{
                  name: children.props.children,
                  href: children.props.href,
                }}
              />
            ) : (
              <></>
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default function Header({ children, className = "", options = [] }) {
  return (
    <header
      className={`absolute block top-0 left-0 right-0 w-full z-50 ${className}`}
    >
      <nav
        className="flex items-center justify-between p-4 lg:px-5 w-full"
        aria-label="Global"
      >
        <div className="flex">
          <div className="h-8 w-8">
            <Image
              priority={true}
              alt="logo"
              src={logo}
              width={50}
              height={50}
              className="w-auto h-auto"
            />
          </div>
          <a href="https://wrenchworks.tech" className="p-2">
            <span className="">WrenchWorks</span>
          </a>
        </div>
        <div className="header-list">
          {options.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </a>
          ))}
          {children}
        </div>
        <div className="header-sign">
          <Link
            href="/signin"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Sign In <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        <div className="header-drop">
          <DropDown options={options}>{children}</DropDown>
        </div>
      </nav>
    </header>
  );
}
