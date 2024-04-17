import React, { useState } from "react";

import logo from "/public/assets/logoWhite.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../data/store";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import ModalVideo from "react-modal-video";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const stateUserData = useSelector((state: RootState) => state.loggedUser);
  const [isOpenMobile, setOpenMobile] = useState(false);
  const [isOpenPc, setOpenPC] = useState(false);
  const { t, i18n } = useTranslation();
  return (
    <>
      <div>
        <ModalVideo
          channel="youtube"
          isOpen={isOpenPc}
          videoId="EhPEyFHSvto"
          onClose={() => setOpenPC(false)}
        />
        <ModalVideo
          channel="youtube"
          isOpen={isOpenMobile}
          videoId="xrLicnVMJg8"
          onClose={() => setOpenMobile(false)}
        />
      </div>
      <footer
        dir="rtl"
        className="lg:px-[96px] px-[16px] relative z-10 text-[#FFF] bg-[#117c99d8] pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 sm:w-2/3 lg:w-5/12">
              <div className=" w-full">
                <a
                  href="/#"
                  className="mb-[21.45px] inline-block lg:max-w-[191px] max-w-[121px]"
                >
                  <img src={logo} alt="logo" className="max-w-full" />
                </a>
                <p className="mb-7 text-base text-body-color dark:text-dark-6">
                  {t(
                    "نحن نفخر بتقديم خدماتنا ذات المستوى العالمي التي تضمن لك تجربة سفر مميزة ومريحة. سواء كنت تبحث عن تنظيم عطلة عائلية ممتعة، أو رحلة عمل فعّالة، فإننا هنا لنجعل كل تفاصيل رحلتك تسير بسلاسة وبأفضل الأسعار."
                  )}
                </p>
                <p className="flex items-center text-sm font-medium text-dark dark:text-white">
                  <span className="mr-3 text-primary">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_941_15626)">
                        <path
                          d="M15.1875 19.4688C14.3438 19.4688 13.375 19.25 12.3125 18.8438C10.1875 18 7.84377 16.375 5.75002 14.2813C3.65627 12.1875 2.03127 9.84377 1.18752 7.68752C0.250019 5.37502 0.343769 3.46877 1.43752 2.40627C1.46877 2.37502 1.53127 2.34377 1.56252 2.31252L4.18752 0.750025C4.84377 0.375025 5.68752 0.562525 6.12502 1.18752L7.96877 3.93753C8.40627 4.59378 8.21877 5.46877 7.59377 5.90627L6.46877 6.68752C7.28127 8.00002 9.59377 11.2188 13.2813 13.5313L13.9688 12.5313C14.5 11.7813 15.3438 11.5625 16.0313 12.0313L18.7813 13.875C19.4063 14.3125 19.5938 15.1563 19.2188 15.8125L17.6563 18.4375C17.625 18.5 17.5938 18.5313 17.5625 18.5625C17 19.1563 16.1875 19.4688 15.1875 19.4688ZM2.37502 3.46878C1.78127 4.12503 1.81252 5.46877 2.50002 7.18752C3.28127 9.15627 4.78127 11.3125 6.75002 13.2813C8.68752 15.2188 10.875 16.7188 12.8125 17.5C14.5 18.1875 15.8438 18.2188 16.5313 17.625L18.0313 15.0625C18.0313 15.0313 18.0313 15.0313 18.0313 15L15.2813 13.1563C15.2813 13.1563 15.2188 13.1875 15.1563 13.2813L14.4688 14.2813C14.0313 14.9063 13.1875 15.0938 12.5625 14.6875C8.62502 12.25 6.18752 8.84377 5.31252 7.46877C4.90627 6.81252 5.06252 5.96878 5.68752 5.53128L6.81252 4.75002V4.71878L4.96877 1.96877C4.96877 1.93752 4.93752 1.93752 4.90627 1.96877L2.37502 3.46878Z"
                          fill="currentColor"
                        />
                        <path
                          d="M18.3125 8.90633C17.9375 8.90633 17.6563 8.62508 17.625 8.25008C17.375 5.09383 14.7813 2.56258 11.5938 2.34383C11.2188 2.31258 10.9063 2.00008 10.9375 1.59383C10.9688 1.21883 11.2813 0.906333 11.6875 0.937583C15.5625 1.18758 18.7188 4.25008 19.0313 8.12508C19.0625 8.50008 18.7813 8.84383 18.375 8.87508C18.375 8.90633 18.3438 8.90633 18.3125 8.90633Z"
                          fill="currentColor"
                        />
                        <path
                          d="M15.2187 9.18755C14.875 9.18755 14.5625 8.93755 14.5312 8.56255C14.3437 6.87505 13.0312 5.56255 11.3437 5.3438C10.9687 5.31255 10.6875 4.93755 10.7187 4.56255C10.75 4.18755 11.125 3.9063 11.5 3.93755C13.8437 4.2188 15.6562 6.0313 15.9375 8.37505C15.9687 8.75005 15.7187 9.0938 15.3125 9.1563C15.25 9.18755 15.2187 9.18755 15.2187 9.18755Z"
                          fill="currentColor"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_941_15626">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </span>
                  <Link to={"https://api.whatsapp.com/send?phone=201028876202"}>
                    +012 (877) 219 24
                  </Link>
                </p>
              </div>
            </div>

            {stateUserData._id !== "" && (
              <LinkGroup header={t("موارد")}>
                <NavLink link="/profile" label={t("الملف الشخصي")} />
                <NavLink link="/profile/friends" label={t("الاصدقاء")} />
                {stateUserData.role === "user" && (
                  <NavLink link="/profile/trips" label={t("رحلاتي")} />
                )}
                {stateUserData.role === "admin" && (
                  <NavLink link="/dashboard" label={t("لوحة التحكم")} />
                )}
              </LinkGroup>
            )}
            <LinkGroup header={t("شركة")}>
              <NavLink link="/#" label={t("حول اجواء")} />
              <NavLink link="tel:+201028876202" label={t("اتصل بالدعم")} />
            </LinkGroup>
            <LinkGroup header={t("روابط سريعة")}>
              <NavLink
                link="https://api.whatsapp.com/send?phone=201028876202"
                label={t("دعم متميز")}
              />
              <NavLink link="/#" label={t("خدماتنا")} />
              {/* <NavLink link="/#" label="طريقة تحميل التطبيق علي الكمبيوتر" />
              <NavLink link="/#" label="طريقة تحميل التطبيق علي الجوال" /> */}
              <div>
                <button
                  name="dropdownInformdropdownAvatarNameButtonationButton"
                  onClick={() => setOpenPC(true)}
                >
                  {t("طريقة تحميل التطبيق علي الكمبيوتر")}
                </button>
                <button
                  name="dropdownInformdropdownAvatarNameButtonationButton"
                  onClick={() => setOpenMobile(true)}
                >
                  {t("طريقة تحميل التطبيق علي الجوال")}
                </button>
              </div>
            </LinkGroup>

            <div className="w-full px-4 sm:w-1/2 lg:w-3/12">
              <div className="mb-10 w-full">
                <h4 className="mb-9 text-lg font-semibold text-dark dark:text-white">
                  {t("اتبعنا")}
                </h4>
                <div className="flex gap-3 items-center">
                  <Link
                    className={`text-xl hover:text-green-300 `}
                    to="https://api.whatsapp.com/send?phone=201028876202"
                  >
                    <WhatsAppIcon />
                  </Link>
                  <Link
                    className={`text-xl hover:text-blue-300 `}
                    to="tel:+201028876202"
                  >
                    <CallIcon />
                  </Link>
                  <Link
                    className={`text-xl hover:text-blue-300 `}
                    to="https://t.me/mahmoud18957321"
                  >
                    <TelegramIcon />
                  </Link>
                  <Link
                    className={`text-xl hover:text-blue-300 `}
                    to="https://www.linkedin.com/in/mahmoud-abdullah-ab253920b/"
                  >
                    <LinkedInIcon />
                  </Link>
                  <Link
                    className={`text-xl hover:text-blue-300 `}
                    to="https://twitter.com/Mahmoud02136886"
                  >
                    <TwitterIcon />
                  </Link>
                  <Link
                    download={true}
                    className={`text-xl hover:text-blue-300`}
                    to="https://expo.dev/artifacts/eas/dMKksCtsBQJwb6jGCEUpLH.apk"
                  >
                    <img
                      src="https://www.talabat.com/assets/images/logo_playstore.svg"
                      alt="google-play"
                      className={`w-full h-full`}
                    />
                  </Link>
                </div>
                {/* <p className="text-base text-body-color dark:text-dark-6 mt-2">
                  &copy; {new Date().getFullYear()} كل الحقوق محفوظة.
                </p> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-primary/10 py-8 lg:pb-8 pb-20  text-[#FFF] bg-[#117c99b6]">
        <div className="container">
          <p
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            className="text-center text-base text-body-color dark:text-white"
          >
            © 2022 - {new Date().getFullYear()} {t("كل الحقوق محفوظة")}
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

interface LinkGroupProps {
  children: React.ReactNode;
  header: string;
}
const LinkGroup = ({ children, header }: LinkGroupProps) => {
  return (
    <>
      <div className="w-full px-4 sm:w-1/2 lg:w-2/12">
        <div className="mb-10 w-full">
          <h4 className="mb-9 text-lg font-semibold text-dark dark:text-white">
            {header}
          </h4>
          <ul className="space-y-3">{children}</ul>
        </div>
      </div>
    </>
  );
};

const NavLink = ({ link, label }: { label?: string; link: string }) => {
  return (
    <li>
      <Link
        to={link}
        className="inline-block text-base leading-loose text-body-color hover:text-primary dark:text-dark-6"
      >
        {label}
      </Link>
    </li>
  );
};

// https://job-artifacts.eascdn.net/production/7aeab11c-204b-4fc6-aded-dbd93405eac5/2a8fbfac-1d38-4070-bb86-2f56892292fe/application-82a4f715-032b-4eb4-b4db-b09eafb9c6b8.apk?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=www-production%40exponentjs.iam.gserviceaccount.com%2F20240415%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240415T190520Z&X-Goog-Expires=900&X-Goog-SignedHeaders=host&X-Goog-Signature=05c993cec0b6dd03448dc8652dd5d87ef893949c0a6f4e9944c9856e69b6b5c340fbfc8b9c5ebb5010c4b8980f0dea8087b8283e3aa4a29a584a0a98e36af1761435aed0ecce61fe4503c78265a0f1555f4850bedaf4394b9ee7a88565ba67220253d1d052fcd6a0331b08f15d1a13238a033cc33da5fb12cee52e902b704bc0cd5fb96b127d8cbd2d453881bfb14209dccb30083e29c3ac939e7399a80da575e4234d46b068824bb12015dfa1d6fdd9c42e0715e73fdf456054c80e11aa16d9725defd6cf632bc00cca4fabc2b4c65b9e2c5a81dbccb174508e3a91a54f93e85d88442a99a63ecfca9354558484b10f8639bcda563358c6aae8961b2a080c42
