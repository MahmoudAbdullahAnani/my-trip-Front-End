import { Link } from "react-router-dom";

import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputForm } from "../FormComponents";
import { LoderBtn } from "../loder/Loder";
import { userLoggedOut } from "../../data/Features/LoggedUser";
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
// Images
import { iconBackLogin, iconEmail, iconLogo } from "../../assets/icons/home";
import downLogo from "/public/assets/downLogo.png";
export interface Inputs {
  email: string;
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
const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Must be enter email" })
    .email("invalid email"),
});

// function setData(token: string) {
//   localStorage.setItem("token", token);
// }
function ForgotPassword() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // State Management
  const dispatch = useDispatch();

  // const navigate = useNavigate();

  const [incorrectData, setIncorrectData] = useState<string>("");

  const [, setOpenResetPasswordPageState] = useRecoilState(
    OpenResetPasswordPage
  );
  const [, setEmailVerify] = useRecoilState(emailVerify);
  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const [, setOpenSignupPage] = useRecoilState(openSignupPageState);
  const [, setOpenVerifyPageState] = useRecoilState(openVerifyPageState);
  const [openPage, setOpenForgotPasswordPageState] = useRecoilState(
    openForgotPasswordPageState
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
  }: {
    email: string;
  }) => {
    setIncorrectData("");

    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/resetPassword`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/resetPassword`,
        {
          email,
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          setOpenPage(false);
          setOpenSignupPage(false);
          setOpenResetPasswordPageState(false);
          setOpenForgotPasswordPageState(false);
          setOpenVerifyPageState(true);

          setEmailVerify(email);
          localStorage.setItem("verifyCodeEmail", email);
          dispatch(userLoggedOut());
          // navigate("/verifyCode");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setIncorrectData(response.data?.error);
      });
    reset();
  };
  // Inputs UI
  const styleField =
    "text-end px-[12px] pe-[46px] w-full h-[56px] py-[20px] rounded-[16px] bg-white  placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9F9D9D]";

  const emailInputs = [
    {
      type: "text",
      placeholder: "أدخل البريد الالكتروني",
      classes: styleField,
      register: register("email"),
      name: "email",
      mainIcon: iconEmail,

      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.email?.message}
        </span>
      ),
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
                هل نسيت كلمة المرور
              </h4>
              <span
                onClick={() => {
                  setOpenForgotPasswordPageState(false);
                  setOpenResetPasswordPageState(false);
                  setOpenPage(true);
                  setOpenSignupPage(false);
                  setOpenVerifyPageState(false);
                }}
                className={`cursor-pointer`}
              >
                {iconBackLogin}
              </span>
            </div>
            <div className={`mt-[26px] mb-[40px]`}>
              <h4 className={`text-[16px] text-end font-medium text-[#000]`}>
                رجاءً قم بإدخال البريد الالكتروني ونحن سوف نرسل إليلك كود التحقق
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
          {emailInputs.map(
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
                <div
                  key={placeholder}
                  className={`flex items-center relative rounded-[16px]`}
                >
                  <InputForm
                    placeholder={placeholder}
                    type={type}
                    classes={classes}
                    register={register}
                    error={<>{error}</>}
                    mainIcon={mainIcon}
                    iconShowPassword={iconShowPassword}
                    handleFocus={() => setIncorrectData("")}
                  />
                </div>
              );
            }
          )}
          <button
            name="forgotPassword"
            className={`flex justify-center items-center w-full h-[48px] mt-[30px]  bg-[#117C99] hover:bg-[#117c99d4] text-[#FFFFFF] hover:text-[#ebeaeace] rounded-[8px] text-[20px] font-bold`}
            type="submit"
            disabled={isSubmitting}
          >
            إرسال {isSubmitting && <LoderBtn />}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ForgotPassword;

/* Forgot Password ui */
export function LinksForgotPassword({ isSignUp }: { isSignUp: boolean }) {
  if (isSignUp) {
    return (
      <div className={`flex justify-around  `}>
        <Link
          className={`text-sm text-red-300 hover:text-red-400`}
          to={`/forgotPassword`}
        >
          Forgot Password?
        </Link>
        <Link
          className={`text-sm text-red-300 hover:text-red-400`}
          to={`/login`}
        >
          Login?
        </Link>
      </div>
    );
  }
  return (
    <div className={`flex justify-around  `}>
      <button name="forgotPassword">إنشاء حساب</button>
      <span>انا لا امتلك حساب</span>
    </div>
  );
}
