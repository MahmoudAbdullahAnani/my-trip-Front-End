import { InputForm } from "../components/FormComponents";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useState } from "react";
import Loder from "../components/loder/Loder";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserLogged } from "../data/Features/LoggedUser";
import { LinksForgotPassword } from "../components/ResetPassword/ForgotPassword";
// interfaces
export interface Inputs {
  userName: string;
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
  userName: z
    .string()
    .min(3, { message: "the user name very short" })
    .max(30, { message: "the user name very long" }),
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
}
function setData(token: string) {
  localStorage.setItem("token", token);
}
function Login() {
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
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    setIncorrectData("");
    // console.log(data);
    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}signin`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}signin`,
        {
          userName,
          password,
        }
      )
      .then((response) => {
        navigate("/");
        dispatch(addUserLogged(response.data?.data));
        setData(response.data.token);
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
      placeholder: "write your user name...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("userName"),
      name: "userName",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.userName?.message}
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
            {incorrectData}
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
          Submit {isSubmitting && <Loder />}
        </button>
        {/* Forgot Password ui */}
        <LinksForgotPassword />
      </form>
    </div>
  );
}

export default Login;
