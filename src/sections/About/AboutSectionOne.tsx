import { useTranslation } from "react-i18next";
import imgService1 from "/public/service/2.png";
// import imgService2 from "/public/service/2.png"
const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const AboutSectionOne = () => {
  const { t, i18n } = useTranslation();
  const List = ({ text }: { text: string }) => (
    <p
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      className="mb-5 flex items-center text-lg font-medium text-body-color"
    >
      <span className="mr-4 flex h-[30px] w-[30px] text-[#117C99] items-center justify-center rounded-md bg-primary bg-opacity-10 text-primary">
        {checkIcon}
      </span>
      {t(text)}
    </p>
  );

  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28">
      <div className="container">
        <div className="border-b border-body-color/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
          <div
            dir={i18n.language === "ar" ? "ltr" : "rtl"}
            className="-mx-4 flex flex-wrap items-center"
          >
            <div className="w-full px-4 lg:w-1/2" dir="rtl">
              <div className="container flex flex-col items-center gap-3">
                <div
                  className="wow fadeInUp max-w-[570px] mb-[100px] w-full mx-auto text-center"
                  data-wow-delay=".1s"
                >
                  <h2 className="mb-4 text-3xl font-bold !leading-tight text-[#117C99]  sm:text-4xl md:text-[45px]">
                    {t("شهادات ضمان الامان")}
                  </h2>
                  <p className="text-base !leading-relaxed text-body-color md:text-lg">
                    {t(
                      `هذة بعض الشهادات التي حصلنا عليها في مجال تأجير السيارات علي مدار خبرتنا في سنين الخبرة التي حصلنا عليها`
                    )}
                  </p>
                </div>
              </div>
              <div
                className="wow fadeInUp mb-12 max-w-[570px] lg:mb-0"
                data-wow-delay=".15s"
              >
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="شهادة إدارة أسطول السيارات" />
                    <List text="شهادة خدمة العملاء في تأجير السيارات" />
                    <List text="شهادة تأمين وسلامة السيارات" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="شهادة تكنولوجيا المعلومات في تأجير السيارات" />
                    <List text="شهادة التسويق والترويج لخدمات تأجير السيارات" />
                    {/* <List text="Developer friendly" /> */}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div
                className="wow fadeInUp relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0"
                data-wow-delay=".2s"
              >
                <img
                  src={imgService1}
                  alt="trip-ajwaa"
                  className="mx-auto max-w-full rounded-lg lg:mr-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSectionOne;
