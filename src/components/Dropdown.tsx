import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const blockRouts = ["/", "/hotel", "/car"];

export default function Dropdown() {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          dir={i18n.language !== "ar" ? "ltr" : "rtl"}
          className={`inline-flex items-center w-full justify-center gap-x-1.5 rounded-md text-[18px] font-[600] whitespace-nowrap text-[${
            blockRouts.includes(pathname) ? "#FFF" : "#117c99b3"
          }] hover:text-[#117C99]  duration-200 `}
        >
          {t("المزيد")}
          <ChevronDownIcon
            className={`-mr-1 h-5 w-5 text-[18px] font-[600] whitespace-nowrap text-[${
              blockRouts.includes(pathname) ? "#FFF" : "#117c99b3"
            }] hover:text-[#117C99]  duration-200`}
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
        <Menu.Items
          // dir={i18n.language !== "ar" ? "ltr" : "rtl"}
          className="absolute  right-0 z-10 mt-2 w-[90px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/about"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : `text-gray-700 text-center`,
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {t("من نحن")}
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/contact-us"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900"
                      : `text-gray-700 text-center`,
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {t("اتصل بنا")}
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
