import { useEffect } from "react";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import { LoderBtn } from "../loder/Loder";
import { Modal } from "@mui/material";
import {
  OpenResetPasswordPage,
  emailVerify,
  openForgotPasswordPageState,
  openLoginPageState,
  openSignupPageState,
  openVerifyPageState,
} from "../../data/RecoilState/AuthStatePages/Auth";
import { useRecoilState } from "recoil";
import { iconBackLogin, iconLogo } from "../../assets/icons/home";

import downLogo from "/public/assets/downLogo.png";
import CountDown from "./CountDown";

// import { userLoggedOut } from "../../data/Features/LoggedUser";
export interface Inputs {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
}

interface DTOInputs {
  placeholder: string;
  type?: string;
  classes?: string;
  register: UseFormRegisterReturn<string>;
  // error?: React.ReactHTMLElement<HTMLSpanElement>;
  error?: unknown;
}
// Schema Login
const codeSchema = z.object({
  code1: z
    .string()
    .min(1, { message: "It must consist of 6 boxes" })
    .max(1, { message: "It must consist of 6 boxes" }),
  code2: z
    .string()
    .min(1, { message: "It must consist of 6 boxes" })
    .max(1, { message: "It must consist of 6 boxes" }),
  code3: z
    .string()
    .min(1, { message: "It must consist of 6 boxes" })
    .max(1, { message: "It must consist of 6 boxes" }),
  code4: z
    .string()
    .min(1, { message: "It must consist of 6 boxes" })
    .max(1, { message: "It must consist of 6 boxes" }),
  code5: z
    .string()
    .min(1, { message: "It must consist of 6 boxes" })
    .max(1, { message: "It must consist of 6 boxes" }),
  code6: z
    .string()
    .min(1, { message: "It must consist of 6 boxes" })
    .max(1, { message: "It must consist of 6 boxes" }),
});

// function setData(token: string) {
//   localStorage.setItem("token", token);
// }
function VerifyCode() {
  const [openPage, setOpenVerifyPageState] =
    useRecoilState(openVerifyPageState);
  useEffect(() => {
    // countdown(10);
    window.scroll(0, 0);
  }, []);
  // State Management
  //   const dispatch = useDispatch();

  const [incorrectData, setIncorrectData] = useState<string>("");
  const [emailVerifyState] = useRecoilState(emailVerify);

  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const [, setOpenResetPasswordPageState] = useRecoilState(
    OpenResetPasswordPage
  );
  const [, setOpenSignupPage] = useRecoilState(openSignupPageState);

  const [, setOpenForgotPasswordPageState] = useRecoilState(
    openForgotPasswordPageState
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(codeSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async ({
    code1,
    code2,
    code3,
    code4,
    code5,
    code6,
  }: Inputs) => {
    setIncorrectData("");

    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/verifyCode`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/verifyCode`,
        {
          code: `${code1}${code2}${code3}${code4}${code5}${code6}`,
          email: localStorage.getItem("verifyCodeEmail"),
        }
      )
      .then((response) => {
        if (response?.data.status === "success") {
          setOpenPage(false);
          setOpenSignupPage(false);
          setOpenVerifyPageState(false);
          setOpenForgotPasswordPageState(false);
          setOpenResetPasswordPageState(true);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setIncorrectData(response?.data.message);
      });
    reset();
  };
  // Inputs UI
  const styleField =
    "px-[12px] text-center w-[82px] h-[56px] py-[20px] rounded-[16px] bg-white placeholder:text-[32px] placeholder:font-bold placeholder:text-[#9F9D9D]";

  const emailInputs = [
    {
      type: "text",
      placeholder: "-",
      classes: styleField,
      register: register("code1"),
      name: "code1",
      error: (
        <span
          className={`bg-red-400 mt-2 w-full block text-center rounded-md text-[#fafafa]`}
        >
          {errors?.code1?.message}
        </span>
      ),
    },
    {
      type: "text",
      placeholder: "-",
      classes: styleField,
      register: register("code2"),
      name: "code2",
      error: "",
    },
    {
      type: "text",
      placeholder: "-",
      classes: styleField,
      register: register("code3"),
      name: "code3",
      error: "",
    },
    {
      type: "text",
      placeholder: "-",
      classes: styleField,
      register: register("code4"),
      name: "code4",
      error: "",
    },
    {
      type: "text",
      placeholder: "-",
      classes: styleField,
      register: register("code5"),
      name: "code5",
      error: "",
    },
    {
      type: "text",
      placeholder: "-",
      classes: styleField,
      register: register("code6"),
      name: "code6",
      error: "",
    },
  ];

  const handleClosePage = () => {
    setOpenForgotPasswordPageState(false);
    setOpenResetPasswordPageState(false);
    setOpenPage(false);
    setOpenSignupPage(false);
    setOpenVerifyPageState(false);
    setOpenForgotPasswordPageState(false);
  };
  // Refs
  return (
    <Modal
      open={openPage}
      onClose={handleClosePage}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={`absolute top-[50%] left-[50%] flex justify-center items-center w-[100%]`}
      style={{
        fill: "rgb(182 231 251 / 30%)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className={`lg:w-[90%] h-[90%] bg-[url('/public/assets/bg-model-login.png')] bg-cover flex justify-center p-[30px] gap-[24px] rounded-[26px] bg-[#FFF]`}
      >
        <div
          style={{
            boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",
          }}
          className={`w-[55%] ps-[69px] pe-[82px] pb-[172px] pt-[55px] lg:flex flex-col items-center gap-[45px] hidden bg-[#FFF] rounded-[16px]`}
        >
          <div>{iconLogo}</div>
          <div>
            <img src={downLogo} alt="" />
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`lg:pt-[81px] relative lg:w-[45%] w-full`}
        >
          <div>
            <div className={`flex w-full gap-[12px] justify-end items-start`}>
              <h4 className={`text-[24px] text-end font-semibold`}>
                من فضلك راجع بريدك الإلكتروني
              </h4>
              <span
                onClick={() => {
                  setOpenForgotPasswordPageState(true);
                  setOpenResetPasswordPageState(false);
                  setOpenPage(false);
                  setOpenSignupPage(false);
                  setOpenVerifyPageState(false);
                }}
                className={`cursor-pointer`}
              >
                {iconBackLogin}
              </span>
            </div>
            <div className={`mt-[26px] mb-[40px] `}>
              <h4
                className={`flex flex-wrap-reverse justify-end gap-[2px] text-[16px] text-end font-medium text-[#000]`}
              >
                <span className={`font-bold`}>
                  {emailVerifyState.length > 25
                    ? emailVerifyState.slice(0, 25) + "..."
                    : emailVerifyState}
                </span>
                <span>لقد ارسلنا كود التحقق علي البريد</span>
              </h4>
            </div>
          </div>
          {incorrectData && (
            <span
              className={`bg-red-400 my-2 w-full block text-center rounded-md text-[#fafafa]`}
            >
              {Array.isArray(incorrectData) ? incorrectData[0] : incorrectData}
            </span>
          )}
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-ignore */}
          {/* <span>{error}</span> */}
          <div
            className={`grid 2xl:grid-cols-6 xl:grid-cols-4 grid-cols-3 items-center gap-[5px]`}
          >
            {emailInputs
              .slice(0, 1)
              .map(({ placeholder, type, classes, register }: DTOInputs) => {
                return (
                  <input
                    key={`${placeholder}-${Math.random()}`}
                    style={{
                      boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
                    }}
                    maxLength={1}
                    placeholder={placeholder}
                    type={type || "text"}
                    className={classes}
                    {...register}
                  />
                );
              })}
            {emailInputs
              .slice(1, 2)
              .map(({ placeholder, type, classes, register }: DTOInputs) => {
                return (
                  <input
                    key={`${placeholder}-${Math.random()}`}
                    style={{
                      boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
                    }}
                    maxLength={1}
                    placeholder={placeholder}
                    type={type || "text"}
                    className={classes}
                    {...register}
                  />
                );
              })}
            {emailInputs
              .slice(2, 3)
              .map(({ placeholder, type, classes, register }: DTOInputs) => {
                return (
                  <input
                    key={`${placeholder}-${Math.random()}`}
                    style={{
                      boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
                    }}
                    maxLength={1}
                    placeholder={placeholder}
                    type={type || "text"}
                    className={classes}
                    {...register}
                  />
                );
              })}
            {emailInputs
              .slice(3, 4)
              .map(({ placeholder, type, classes, register }: DTOInputs) => {
                return (
                  <input
                    key={`${placeholder}-${Math.random()}`}
                    style={{
                      boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
                    }}
                    maxLength={1}
                    placeholder={placeholder}
                    type={type || "text"}
                    className={classes}
                    {...register}
                  />
                );
              })}
            {emailInputs
              .slice(4, 5)
              .map(({ placeholder, type, classes, register }: DTOInputs) => {
                return (
                  <input
                    key={`${placeholder}-${Math.random()}`}
                    style={{
                      boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
                    }}
                    maxLength={1}
                    placeholder={placeholder}
                    type={type || "text"}
                    className={classes}
                    {...register}
                  />
                );
              })}
            {emailInputs
              .slice(5, 6)
              .map(({ placeholder, type, classes, register }: DTOInputs) => {
                return (
                  <input
                    key={`${placeholder}-${Math.random()}`}
                    style={{
                      boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
                    }}
                    maxLength={1}
                    placeholder={placeholder}
                    type={type || "text"}
                    className={classes}
                    {...register}
                  />
                );
              })}
          </div>
          {emailInputs.slice(0, 1).map(({ error }: { error: unknown }) => {
            return (
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              /* @ts-ignore */
              <span key={`${Math.random()}---${Math.random()}`}>{error}</span>
            );
          })}
          <h5 className={`text-[16px] text-center mt-[14px]`}>
            ارسل كود التحقق مرة اخري <CountDown />
          </h5>
          <button
            className={`flex justify-center items-center w-full h-[48px] mt-[36px] bg-[#117C99] hover:bg-[#117c99d4] text-[#FFFFFF] hover:text-[#ebeaeace] rounded-[8px] text-[20px] font-bold`}
            type="submit"
            disabled={isSubmitting}
          >
            تحقق {isSubmitting && <LoderBtn />}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default VerifyCode;
