import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
import { InputForm } from "../FormComponents";
import { LoderBtn } from "../loder/Loder";
import { Modal } from "@mui/material";
import {
  OpenResetPasswordPage,
  openForgotPasswordPageState,
  openLoginPageState,
  openSignupPageState,
  openVerifyPageState,
  showPassword,
} from "../../data/RecoilState/AuthStatePages/Auth";
import { useRecoilState } from "recoil";
// IMages
import downLogo from "/public/assets/downLogo.png";
import {
  iconBackLogin,
  iconLogo,
  iconPassword,
  iconShowPassword,
} from "../../assets/icons/home";
// import { userLoggedOut } from "../../data/Features/LoggedUser";
export interface Inputs {
  password: string;
  confirmPassword: string;
}
interface DTOInputs {
  placeholder: string;
  type?: string;
  classes?: string;
  register: UseFormRegisterReturn<string>;
  // error?: React.ReactHTMLElement<HTMLSpanElement>;
  error: unknown;
  mainIcon?: JSX.Element;
  iconShowPassword?: JSX.Element;
}
// Schema Login
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(3, { message: "the password very short" })
      .max(20, { message: "the password very long" }),
    confirmPassword: z
      .string()
      .min(3, { message: "the password very short" })
      .max(20, { message: "the password very long" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// function setData(token: string) {
//   localStorage.setItem("token", token);
// }
function ResetPassword() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // State Management
  //   const dispatch = useDispatch();

  const [incorrectData, setIncorrectData] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async ({
    password,
    confirmPassword,
  }: Inputs) => {
    setIncorrectData("");

    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/updatePassword`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/updatePassword`,
        {
          password,
          confirmPassword,
          email: localStorage.getItem("verifyCodeEmail"),
        }
      )
      .then((response) => {
        setOpenForgotPasswordPageState(false);
        setOpenResetPasswordPageState(false);
        setOpenPage(true);
        setOpenSignupPage(false);
        setOpenVerifyPageState(false);
        console.log(response);

        localStorage.removeItem("verifyCodeEmail");
      })
      .catch(({ response }) => {
        console.log(response);
        // setIncorrectData(response.data?.error);
      });
    reset();
  };
  // Inputs UI

  const styleField =
    "text-end px-[12px] pe-[46px] w-full h-[56px] py-[20px] rounded-[16px] bg-white  placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9F9D9D]";
  const [toggleConfirmPassword] = useRecoilState(showPassword);
  const passwordInputs = [
    {
      type: toggleConfirmPassword ? "password" : "text",
      placeholder: "أدخل كلمة المرور الجديدة",
      classes: styleField,
      register: register("password"),
      name: "password",
      mainIcon: iconPassword,
      iconShowPassword: iconShowPassword,
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.password?.message}
        </span>
      ),
    },
    {
      type: toggleConfirmPassword ? "password" : "text",
      placeholder: "تأكيد كلمة المرور",
      classes: styleField,
      register: register("confirmPassword"),
      name: "confirmPassword",
      mainIcon: iconPassword,
      iconShowPassword: iconShowPassword,
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.confirmPassword?.message}
        </span>
      ),
    },
  ];

  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const [openPage, setOpenResetPasswordPageState] = useRecoilState(
    OpenResetPasswordPage
  );
  const [, setOpenSignupPage] = useRecoilState(openSignupPageState);
  const [, setOpenVerifyPageState] = useRecoilState(openVerifyPageState);
  const [, setOpenForgotPasswordPageState] = useRecoilState(
    openForgotPasswordPageState
  );
  const handleClosePage = () => {
    setOpenForgotPasswordPageState(false);
    setOpenResetPasswordPageState(false);
    setOpenPage(false);
    setOpenSignupPage(false);
    setOpenVerifyPageState(false);
  };

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
          className={`w-[55%]  ps-[69px] pe-[82px] pb-[172px] pt-[55px] ll:flex flex-col items-center gap-[45px] hidden bg-[#FFF] rounded-[16px]`}
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
                قم بإنشاء كلمة مرور جديدة
              </h4>
              <span
                onClick={() => {
                  setOpenForgotPasswordPageState(false);
                  setOpenResetPasswordPageState(false);
                  setOpenPage(false);
                  setOpenSignupPage(false);
                  setOpenVerifyPageState(true);
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
                كلمة المرور هذه يجب ان تكون مختلفة عن كلمة المرور السابقة
              </h4>
            </div>
          </div>

          {incorrectData && (
            <span
              className={`bg-red-400 my-2 text-center rounded-md text-[#fafafa]`}
            >
              {Array.isArray(incorrectData) ? incorrectData[0] : incorrectData}
            </span>
          )}
          {passwordInputs.map(
            ({
              placeholder,
              type,
              classes,
              register,
              error,
              mainIcon,
              iconShowPassword,
            }: DTOInputs) => {
              return (
                <div key={placeholder} className={`grid`}>
                  <InputForm
                    placeholder={placeholder}
                    type={type}
                    classes={classes}
                    mainIcon={mainIcon}
                    register={register}
                    error={<>{error}</>}
                    iconShowPassword={iconShowPassword}
                    handleFocus={() => setIncorrectData("")}
                  />
                </div>
              );
            }
          )}

          <button
            name="submit"
            className={`flex justify-center items-center w-full h-[48px] mt-[36px] bg-[#117C99] hover:bg-[#117c99d4] text-[#FFFFFF] hover:text-[#ebeaeace] rounded-[8px] text-[20px] font-bold`}
            type="submit"
            disabled={isSubmitting}
          >
            تأكيد {isSubmitting && <LoderBtn />}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ResetPassword;
