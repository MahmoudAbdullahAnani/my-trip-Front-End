import { InputForm } from "../components/FormComponents";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useState } from "react";
import { LoderBtn } from "../components/loder/Loder";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserLogged } from "../data/Features/LoggedUser";
import { LinksForgotPassword } from "../components/ResetPassword/ForgotPassword";
import { reRenderData } from "../data/RecoilState/Notifications/NotificationsData";
import { useRecoilState } from "recoil";
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
}
function setData(token: string) {
  localStorage.setItem("token", token);
}
function Login() {
  const [, setReRenderDataApp] = useRecoilState(reRenderData);

  // State Management
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [incorrectData, setIncorrectData] = useState<string>("");
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
        navigate("/");
        dispatch(addUserLogged(response.data?.data));
        setData(response.data.token);
        setReRenderDataApp(false);
      })
      .catch(({ response }) => {
        setIncorrectData(response.data?.message);
      });
    reset();
  };
  // Inputs UI

  const LoginInputs = [
    {
      type: "text",
      placeholder: "write your email...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("email"),
      name: "userName",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.email?.message}
        </span>
      ),
    },
    {
      type: "password",
      placeholder: "write your password...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",

      register: register("password"),
      name: "password",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.password?.message}
        </span>
      ),
    },
  ];

  return (
    <div className={`bg-slate-600 h-[100vh] flex justify-center items-center`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`flex flex-col gap-4 bg-slate-500 rounded-lg w-[50vh] p-2 `}
      >
        {incorrectData && (
          <span
            className={`bg-red-400 my-2 text-center rounded-md text-[#fafafa]`}
          >
            {Array.isArray(incorrectData) ? incorrectData[0] : incorrectData}
          </span>
        )}
        {LoginInputs.map(
          ({ placeholder, type, classes, register, error }: DTOInputs) => {
            return (
              <div key={placeholder} className={`grid`}>
                <InputForm
                  placeholder={placeholder}
                  type={type}
                  classes={classes}
                  register={register}
                  error={error}
                  handleFocus={() => setIncorrectData("")}
                />
              </div>
            );
          }
        )}
        <button
          className={`bg-green-200 hover:bg-green-300 rounded-lg w-[100%] h-[44px] flex justify-center items-center gap-3`}
          type="submit"
          disabled={isSubmitting}
        >
          Submit {isSubmitting && <LoderBtn />}
        </button>
        {/* Forgot Password ui */}
        <LinksForgotPassword isSignUp={false} />
      </form>
    </div>
  );
}

export default Login;
