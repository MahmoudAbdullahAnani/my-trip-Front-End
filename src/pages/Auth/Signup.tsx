import { InputForm } from "../../components/FormComponents";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { LoderBtn } from "../../components/loder/Loder";
// import { useDispatch } from "react-redux";
// import { addUserLogged } from "../../data/Features/LoggedUser";
// Login Btn
// import {
//   LoginSocialFacebook,
//   LoginSocialGoogle,
//   IResolveParams,
//   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//   // @ts-ignore
// } from "reactjs-social-login";
import {
  EmailVerifyState,
  OpenResetPasswordPage,
  OpenVerifyAccountPageState,
  RememberMeState,
  TokenJWT,
  UserNameVerifyState,
  openForgotPasswordPageState,
  openLoginPageState,
  openSignupPageState,
  openVerifyPageState,
  showPassword,
} from "../../data/RecoilState/AuthStatePages/Auth";
import { useRecoilState } from "recoil";
import { Modal } from "@mui/material";
// Images
import {
  iconEmail,
  // iconFacebook,
  // iconGoogle,
  iconLogo,
  iconPassword,
  iconShowPassword,
  iconUserMain,
} from "../../assets/icons/home";
import downLogo from "/public/assets/downLogo.png";
// import BtnLogin from "../../components/BtnAuth/BtnLogin";
// import OrLogin from "../../components/OrLogin";

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
const singUpSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "the first name very short" })
    .max(30, { message: "the first name very long" }),
  lastName: z.string().optional(),
  userName: z.string().optional(),
  password: z
    .string()
    .min(3, { message: "the password name very short" })
    .max(20, { message: "the password name very long" }),
  email: z.string().email("Invalid Email"),
  phoneNumber: z.string().optional(),
  confirmPassword: z.string().optional(),
});
// function setData(token: string) {
//   localStorage.setItem("token", token);
// }
// Set Data In window
interface SchemaUser {
  password?: string;
  age?: number;
  email?: string;
  phoneNumber?: string;
  userName?: string;
  _id: string;
  firstName: string;
  lastName?: string;
  role?: string;
  active?: boolean;
  verificationCode?: string;
  confirmPassword?: string;
  address?: string;
}
function Signup() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  // State Management
  // const dispatch = useDispatch();

  const [incorrectData, setIncorrectData] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [,] = useRecoilState(TokenJWT);

  const [, setOpenVerifyAccountPageState] = useRecoilState(
    OpenVerifyAccountPageState
  );
  const [, setEmailVerifyState] = useRecoilState(EmailVerifyState);
  const [, setUserNameVerifyState] = useRecoilState(UserNameVerifyState);
  const [, setRememberMeState] = useRecoilState(RememberMeState);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SchemaUser>({
    resolver: zodResolver(singUpSchema),
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<SchemaUser> = async ({
    firstName,
    email,
    password,
  }: SchemaUser) => {
    setIncorrectData("");
    const emailData = email;
    const lastName = firstName.split(" ")[1] || "";
    // 1) axios post req on /signup
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/signup`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/signup`,
        {
          firstName: firstName.split(" ")[0] || "",
          lastName,
          email,
          userName: `${firstName.split(" ")[0]}-${lastName}`,
          password,
        }
      )
      .then((response) => {
        // console.log({ data: response.data });
        if (response?.data.data.token === "varification") {
          // user have an account but need to verify
          setEmailVerifyState(`${emailData}`);
          setUserNameVerifyState(`${firstName.split(" ")[0]}-${lastName}`);
          setOpenForgotPasswordPageState(false);
          setOpenResetPasswordPageState(false);
          setOpenPage(false);
          setOpenSignupPage(false);
          setOpenVerifyPageState(false);
          return setOpenVerifyAccountPageState(true);
        }
        setEmailVerifyState(`${response?.data.data.email}`);
        setUserNameVerifyState(`${response?.data.data.userName}`);
        setOpenForgotPasswordPageState(false);
        setOpenResetPasswordPageState(false);
        setOpenPage(false);
        setOpenSignupPage(false);
        setOpenVerifyPageState(false);
        setOpenVerifyAccountPageState(true);

        // setTokenJWT(response.data.token);

        // dispatch(addUserLogged(response.data?.data));
        if (rememberMe) {
          setRememberMeState(true);
        }
        reset();
      })
      .catch(({ response }) => {
        console.log(response);
        reset({ firstName: "", email: "" });

        setIncorrectData(response.data?.message);
      });
  };
  // Inputs UI
  const [toggleConfirmPassword] = useRecoilState(showPassword);
  const styleField =
    "text-end px-[12px] pe-[46px] w-full h-[56px] py-[20px] rounded-[16px] bg-white  placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9F9D9D]";

  const LoginInputs = [
    // firstName
    {
      type: "text",
      placeholder: "أدخل الاسم كامل",
      classes: styleField,
      register: register("firstName"),
      name: "firstName",
      mainIcon: iconUserMain,
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.firstName?.message}
        </span>
      ),
    },
    // // lastName
    // {
    //   type: "text",
    //   placeholder: "enter your last name...",
    //   classes: styleField,
    //   register: register("lastName"),
    //   name: "lastName",
    //   error: (
    //     <span
    //       className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
    //     >
    //       {errors?.lastName?.message}
    //     </span>
    //   ),
    // },

    // email
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
    // password
    {
      type: toggleConfirmPassword ? "password" : "text",
      placeholder: "أدخل كلمة المرور",
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
    // // confirmPassword
    // {
    //   type: toggleConfirmPassword ? "password" : "text",
    //   placeholder: "enter confirm password...",
    //   classes:
    //     "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
    //   register: register("confirmPassword"),
    //   name: "confirmPassword",
    //   error: (
    //     <span
    //       className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
    //     >
    //       {errors?.confirmPassword?.message}
    //     </span>
    //   ),
    // },
    // // phoneNumber
    // {
    //   type: "text",
    //   placeholder: "enter your phone number...",
    //   classes:
    //     "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
    //   register: register("phoneNumber"),
    //   name: "phoneNumber",
    //   error: (
    //     <span
    //       className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
    //     >
    //       {errors?.phoneNumber?.message}
    //     </span>
    //   ),
    // },
    // // age
    // {
    //   type: "number",
    //   placeholder: "enter your age...",
    //   classes:
    //     "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
    //   register: register("age"),
    //   name: "age",
    //   error: (
    //     <span
    //       className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
    //     >
    //       {errors?.age?.message}
    //     </span>
    //   ),
    // },
    // // address
    // {
    //   type: "text",
    //   placeholder: "enter your address...",
    //   classes:
    //     "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
    //   register: register("address"),
    //   name: "address",
    //   error: (
    //     <span
    //       className={`bg-red-400 mt-2 h-0 text-center rounded-md text-[#fafafa]`}
    //     >
    //       {errors?.address?.message}
    //     </span>
    //   ),
    // },
    // // userName
    // {
    //   type: "text",
    //   placeholder: "enter your user name...",
    //   classes:
    //     "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
    //   register: register("userName"),
    //   name: "userName",
    //   error: (
    //     <span
    //       className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
    //     >
    //       {errors?.userName?.message}
    //     </span>
    //   ),
    // },
  ];
  const [, setOpenResetPasswordPageState] = useRecoilState(
    OpenResetPasswordPage
  );
  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const [openPage, setOpenSignupPage] = useRecoilState(openSignupPageState);
  const [, setOpenForgotPasswordPageState] = useRecoilState(
    openForgotPasswordPageState
  );
  const [, setOpenVerifyPageState] = useRecoilState(openVerifyPageState);

  // const handleOpenPage = () => setOpenPage(true);
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
        className={`w-[90%] h-[90%] bg-[url('/public/assets/bg-model-login.png')] bg-cover flex justify-center p-[30px] gap-[24px] rounded-[26px] bg-[#FFF]`}
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
          // handleSubmit(onSubmit)
          onSubmit={handleSubmit(onSubmit)}
          className={`lg:pt-[21px] relative lg:w-[45%] w-full `}
        >
          <div className="flex lg:justify-end justify-center w-full mb-[10px]">
            <h2
              className={`text-[24px] font-semibold lg:text-end text-center text-[#231F20]`}
            >
              تسجيل الدخول
            </h2>
          </div>
          {/* <div
            className={`flex flex-col lg:flex-row flex-wrap gap-[24px] mt-[37px] justify-end items-center`}
          >
            <LoginSocialGoogle
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
            </LoginSocialGoogle>
            <LoginSocialFacebook
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
            </LoginSocialFacebook>
          </div> */}
          {/* <div className={`my-[20px]`}>
            <OrLogin />
          </div> */}
          {incorrectData && (
            <span
              className={`bg-red-400 my-2 w-full block text-center rounded-md text-[#fafafa]`}
            >
              {Array.isArray(incorrectData) ? incorrectData[0] : incorrectData}
            </span>
          )}
          <div
            className={`flex flex-col lg:w-[506px] w-[100%] mx-auto gap-[6px]`}
          >
            {LoginInputs.map(
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
          </div>
          <div
            className={`flex lg:flex-row flex-col gap-[5px] lg:gap-0 items-center justify-between lg:my-[18px]`}
          >
            <div className={``}>
              <span>انا امتلك حساب </span>
              <span
                onClick={() => {
                  setOpenForgotPasswordPageState(false);
                  setOpenResetPasswordPageState(false);
                  setOpenPage(true);
                  setOpenSignupPage(false);
                  setOpenVerifyPageState(false);
                }}
                style={{
                  textDecoration: "underline",
                }}
                className={`text-[#31B2E1] cursor-pointer`}
              >
                تسجيل الدخول
              </span>
            </div>
            {/* <span
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
            </span> */}
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
  name="login"
              className={`flex justify-center items-center lg:w-full h-[48px] w-[100%] bg-[#117C99] hover:bg-[#117c99d4] text-[#FFFFFF] hover:text-[#ebeaeace] rounded-[8px]  text-[20px] font-bold`}
              type="submit"
              disabled={isSubmitting}
            >
              تسجيل {isSubmitting && <LoderBtn />}
            </button>
          </div>

          <div
            className={`lg:flex hidden mt-[44px] gap-[2px] justify-center absolute bottom-0 w-full`}
          >
            <span
              onClick={() => {
                setOpenForgotPasswordPageState(false);
                setOpenResetPasswordPageState(false);
                setOpenPage(true);
                setOpenSignupPage(false);
                setOpenVerifyPageState(false);
              }}
              style={{
                textDecoration: "underline",
              }}
              className={`text-[#31B2E1] cursor-pointer`}
            >
              تسجيل الدخول
            </span>
            <span>انا امتلك حساب</span>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default Signup;
