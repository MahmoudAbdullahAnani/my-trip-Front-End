import { Link } from "react-router-dom";

import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputForm } from "../FormComponents";
import Loder from "../loder/Loder";
import { userLoggedOut } from "../../data/Features/LoggedUser";
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
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}resetPassword`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}resetPassword`,
        {
          email,
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("verifyCodeEmail", email);
          dispatch(userLoggedOut());
          navigate("/verifyCode");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setIncorrectData(response.data?.error);
      });
    reset();
  };
  // Inputs UI

  const emailInputs = [
    {
      type: "email",
      placeholder: "write your email...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("email"),
      name: "email",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.email?.message}
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
        {emailInputs.map(
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
      </form>
    </div>
  );
}

export default ForgotPassword;

/* Forgot Password ui */
export function LinksForgotPassword(isSignUp: { isSignUp: boolean }) {
  if (isSignUp) {
    return <div className={`flex justify-around  `}>
      <Link
        className={`text-sm text-red-300 hover:text-red-400`}
        to={`/forgotPassword`}
      >
        Forgot Password?
      </Link>
      <Link className={`text-sm text-red-300 hover:text-red-400`} to={`/login`}>
        Login?
      </Link>
    </div>;
  }
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
        to={`/signup`}
      >
        Sign Up?
      </Link>
    </div>
  );
}
