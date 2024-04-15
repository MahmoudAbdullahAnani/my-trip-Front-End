import { useTranslation } from "react-i18next";
import NewsLatterBox from "./NewsLatterBox";
import { send } from "../../assets/icons/home";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Contact = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const msgRef = useRef(null);
  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (name.length < 3) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      nameRef.current?.focus();
      return toast.error(t("Name must be at least 3 characters"));
    }
    if (email.length < 11) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      emailRef.current?.focus();
      return toast.error(t("Email Not Valid"));
    }
    if (msg.length < 5) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      msgRef.current?.focus();
      return toast.error(t("Message must be at least 5 characters"));
    }
    // send

    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/msg`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/msg`,
        {
          name,
          email,
          msg
        }
      )
      .then((res) => {
        console.log(res.data);
        setEmail("");
        setName("");
        setMsg("");
        toast.success(t(res.data.message));
      })
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .catch((err) => {
        // setErrorGender(err);
        typeof err.response.data.message !== "string" &&
          toast.error(t(err.response.data.message[0]));
        typeof err.response.data.message === "string" &&
          toast.error(t(err.response.data.message));
        console.log("Sub Msg ===> ", err.response.data.message);
      });
  };

  return (
    <section
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
      id="contact"
      className="overflow-hidden py-16 md:py-20 lg:py-28  px-[16px] lg:px-[96px] bg-[#F9F9F9]"
    >
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              dir={i18n.language === "ar" ? "rtl" : "ltr"}
              className="wow fadeInUp mb-12 rounded-md bg-primary/[3%] py-11 px-8 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px]"
              data-wow-delay=".15s"
            >
              <h2 className="mb-3 text-2xl font-bold text-[#117C99]  sm:text-3xl lg:text-2xl xl:text-3xl">
                {t("هل تحتاج مساعدة؟")}
              </h2>
              <p className="mb-12 text-base font-medium text-[#333333]">
                {t(
                  "24/7 Support: We are here to support you every step of the way in order to enjoy the best experience"
                )}
              </p>
              {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment //
              @ts-ignore */}
              <form onSubmit={onSubmit}>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium  text-black"
                      >
                        {t("Your Name")}
                      </label>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                        placeholder={t("Enter your name")}
                        className="w-full rounded-md border border-[#117C99] py-3 px-6 text-base text-[#000] placeholder-[#A3A3A3] shadow-one outline-none focus:border-[#2ABDE4]  focus-visible:shadow-none "
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium  text-black"
                      >
                        {t("Email Address")}
                      </label>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                        type="email"
                        placeholder={t("Enter your email")}
                        className="w-full rounded-md border border-[#117C99] py-3 px-6 text-base text-[#000] placeholder-[#A3A3A3] shadow-one outline-none focus:border-[#2ABDE4]  focus-visible:shadow-none "
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium  text-black"
                      >
                        {t("Your Message")}
                      </label>
                      <textarea
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        dir={i18n.language === "ar" ? "rtl" : "ltr"}
                        name="message"
                        rows={5}
                        placeholder={t("Enter your message")}
                        className="w-full rounded-md border border-[#117C99] py-3 px-6 text-base text-[#000] placeholder-[#A3A3A3] shadow-one outline-none focus:border-[#2ABDE4]  focus-visible:shadow-none "
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4">
                    {/* <input
                      type="submit"
                      value={
                        <>
                          <span>{t("Send Message")}</span>
                          <span className="text-[#fff]">{send}</span>
                        </>
                      }
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onClick={onSubmit}
                      className="rounded-2xl flex gap-2 items-center justify-center bg-[#117C99] py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    /> */}
                    <button
                      name="submit"
                      type="submit"
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      onSubmit={onSubmit}
                      className="rounded-2xl flex gap-2 items-center justify-center bg-[#117C99] py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
                    >
                      <span>{t("Send Message")}</span>
                      <span className="text-[#fff]">{send}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
