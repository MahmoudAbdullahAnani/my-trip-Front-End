import { InputForm } from "../../components/FormComponents";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoderBtn } from "../../components/loder/Loder";
import { useDispatch } from "react-redux";
import { addUserLogged } from "../../data/Features/LoggedUser";
import { reRenderData } from "../../data/RecoilState/Notifications/NotificationsData";
import { useRecoilState } from "recoil";
import { Modal } from "@mui/material";
import {
  OpenResetPasswordPage,
  TokenJWT,
  openForgotPasswordPageState,
  openLoginPageState,
  openSignupPageState,
  openVerifyPageState,
  showPassword,
} from "../../data/RecoilState/AuthStatePages/Auth";
// Images
import { iconGoogle, iconLogo, iconFacebook } from "../../assets/icons/home";
import downLogo from "/public/assets/downLogo.png";
// Login Btn
import {
  LoginSocialFacebook,
  LoginSocialGoogle,
  IResolveParams,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "reactjs-social-login";
import BtnLogin from "../../components/BtnAuth/BtnLogin";
import OrLogin from "../../components/OrLogin";
// interfaces
export interface Inputs {
  email: string;
  password: string;
}
interface DTOInputs {
  placeholder: string;
  type?: string;
  classes?: string;
  register: UseFormRegisterReturn<string>;
  // error?: React.ReactHTMLElement<HTMLSpanElement>;
  error: unknown;
}
// Schema Login
const LoginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "the email very short" })
    .max(30, { message: "the email very long" }),
  password: z
    .string()
    .min(3, { message: "the password very short" })
    .max(20, { message: "the password very long" }),
});
// Set Data In window
export interface SchemaUser {
  password?: string;
  age?: number;
  email?: string;
  phoneNumber?: string;
  userName?: string;
  _id: string;
  firstName: string;
  lastName: string;
  role: string;
  active?: boolean;
  verificationCode?: string;
  avatar?: string;

  passportNumber?: "";
  country?: "";
  nationality?: "";
  gender?: "";
}
function setData(token: string) {
  localStorage.setItem("token", token);
}
function OAuth() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [, setReRenderDataApp] = useRecoilState(reRenderData);

  // State Management
  const dispatch = useDispatch();

  const [, setOpenResetPasswordPageState] = useRecoilState(
    OpenResetPasswordPage
  );
  const [, setTokenJWT] = useRecoilState(TokenJWT);
  const [openPage, setOpenPage] = useRecoilState(openLoginPageState);
  const [, setOpenSignupPage] = useRecoilState(openSignupPageState);
  const [, setOpenForgotPasswordPageState] = useRecoilState(
    openForgotPasswordPageState
  );
  const [, setOpenVerifyPageState] = useRecoilState(openVerifyPageState);

  const [incorrectData, setIncorrectData] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIncorrectData("");
    // console.log(data);
    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/signin`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/signin`,
        {
          email,
          password,
        }
      )
      .then((response) => {
        setOpenForgotPasswordPageState(false);
        setOpenResetPasswordPageState(false);
        setOpenPage(false);
        setOpenSignupPage(false);
        setOpenVerifyPageState(false);
        setTokenJWT(response.data.token);
        dispatch(addUserLogged(response.data?.data));

        setReRenderDataApp(false);
        if (rememberMe) {
          return setData(response.data.token);
        }
      })
      .catch(({ response }) => {
        setIncorrectData(response.data?.message);
      });
    reset({ password: "" });
  };
  // Inputs UI
  const [toggleConfirmPassword] = useRecoilState(showPassword);

  const LoginInputs = [
    {
      type: "text",
      placeholder: "أدخل البريد الالكتروني",
      classes:
        "text-end px-[12px] w-full h-[56px] py-[20px] rounded-[16px] bg-white  placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9F9D9D]",
      register: register("email"),
      name: "email",
      error: (
        <span
          className={`bg-red-400 mt-1 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.email?.message}
        </span>
      ),
    },
    {
      // rgb(0 90 108 / 30%)
      type: toggleConfirmPassword ? "password" : "text",
      placeholder: "أدخل كلمة المرور",
      classes:
        "text-end px-[12px] w-full  h-[56px] py-[20px] shadow-md  rounded-[16px] bg-white  placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9F9D9D]",

      register: register("password"),
      name: "password",
      error: (
        <span
          className={`bg-red-400 text-center mt-1 rounded-md text-[#fafafa]`}
        >
          {errors?.password?.message}
        </span>
      ),
    },
  ];

  // const handleOpenPage = () => setOpenPage(true);
  const handleClosePage = () => {
    setOpenForgotPasswordPageState(false);
    setOpenResetPasswordPageState(false);
    setOpenPage(false);
    setOpenSignupPage(false);
    setOpenVerifyPageState(false);
  };
  return (
    // Login
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
        className={`lg:w-[90%] h-[90%]  bg-[url('/public/assets/bg-model-login.png')] bg-cover flex justify-center p-[30px] gap-[24px] rounded-[26px] bg-[#FFF]`}
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
          className={`lg:pt-[81px] relative`}
        >
          <div className="flex lg:justify-end justify-center w-full">
            <h2
              className={`text-[24px] font-semibold lg:text-end text-center text-[#231F20]`}
            >
              تسجيل الدخول
            </h2>
          </div>
          <div
            className={`flex flex-col lg:flex-row flex-wrap gap-[24px] mt-[37px] justify-end items-center`}
          >
            <LoginSocialFacebook
              style={{
                boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
              }}
              className={`cursor-pointer rounded-[16px] bg-[#FFF] w-fit`}
              isOnlyGetToken
              appId={import.meta.env.VITE_PUBLIC_REACT_APP_FACEBOOK || ""}
              // onLoginStart={onLoginStart}
              onResolve={(res: IResolveParams) => {
                console.log(res);
              }}
              onReject={(err: unknown) => {
                console.log(err);
              }}
            >
              <BtnLogin title={`google`} icon={iconGoogle} />
            </LoginSocialFacebook>
            {/* By Google */}
            <LoginSocialGoogle
              style={{
                boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
              }}
              className={`cursor-pointer rounded-[16px] bg-[#FFF] w-fit`}
              isOnlyGetToken
              appId={import.meta.env.VITE_PUBLIC_REACT_APP_GOOGLE || ""}
              // onLoginStart={onLoginStart}
              onResolve={(res: IResolveParams) => {
                console.log(res);
              }}
              onReject={(err: unknown) => {
                console.log(err);
              }}
            >
              <BtnLogin title={`facebook`} icon={iconFacebook} />
            </LoginSocialGoogle>
          </div>
          <div className={`my-[20px]`}>
            <OrLogin />
          </div>
          {incorrectData && (
            <span
              className={`bg-red-400 my-2 w-full block text-center rounded-md text-[#fafafa]`}
            >
              {Array.isArray(incorrectData) ? incorrectData[0] : incorrectData}
            </span>
          )}
          <div
            className={`flex flex-col lg:w-[506px] w-[70%] mx-auto gap-[6px]`}
          >
            {LoginInputs.map(
              ({ placeholder, type, classes, register, error }: DTOInputs) => {
                return (
                  <div
                    key={placeholder}
                    className={`flex flex-col rounded-[16px]`}
                  >
                    <InputForm
                      placeholder={placeholder}
                      type={type}
                      classes={classes}
                      register={register}
                      error={<>{error}</>}
                      handleFocus={() => setIncorrectData("")}
                    />
                  </div>
                );
              }
            )}
          </div>
          <div
            className={`flex lg:flex-row flex-col gap-[5px] lg:gap-0 items-center justify-between my-[18px]`}
          >
            <span
              onClick={() => {
                setOpenForgotPasswordPageState(true);
                setOpenResetPasswordPageState(false);
                setOpenPage(false);
                setOpenSignupPage(false);
                setOpenVerifyPageState(false);
              }}
              style={{
                textDecoration: "underline",
              }}
              className={`text-[#31B2E1] cursor-pointer`}
            >
              هل نسيت كلمة المرور
            </span>
            <div className={``}>
              <label className={`flex items-center justify-center gap-[2px]`}>
                <span>حفظ البيانات</span>
                <input
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  onClick={(e) => setRememberMe(e.target.checked)}
                  style={{
                    boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
                  }}
                  className={`border-0 outline-none w-[24px] h-[24px] rounded-[5px] ms-[5px]`}
                  type="checkbox"
                />
              </label>
            </div>
          </div>
          <div className={`mx-auto w-full flex justify-center mt-[26px]`}>
            <button
              className={`flex justify-center items-center lg:w-full h-[48px]  w-[70%] bg-[#117C99] hover:bg-[#117c99d4] text-[#FFFFFF] hover:text-[#ebeaeace] rounded-[8px]  text-[20px] font-bold`}
              type="submit"
              disabled={isSubmitting}
            >
              تسجيل {isSubmitting && <LoderBtn />}
            </button>
          </div>

          <div
            className={`flex mt-[44px] gap-[2px] justify-center absolute bottom-0 w-full`}
          >
            <span
              onClick={() => {
                setOpenForgotPasswordPageState(false);
                setOpenResetPasswordPageState(false);
                setOpenPage(false);
                setOpenSignupPage(true);
                setOpenVerifyPageState(false);
              }}
              style={{
                textDecoration: "underline",
              }}
              className={`text-[#31B2E1] cursor-pointer`}
            >
              إنشاء حساب
            </span>
            <span>انا لا امتلك حساب</span>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default OAuth;
