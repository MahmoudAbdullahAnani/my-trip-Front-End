import { InputForm } from "../components/FormComponents";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useState } from "react";
import Loder from "../components/loder/Loder";
import { LinksForgotPassword } from "../components/ResetPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUserLogged } from "../data/Features/LoggedUser";

interface DTOInputs {
  placeholder: string;
  type?: string;
  classes?: string;
  register: UseFormRegisterReturn<string>;
  // error?: React.ReactHTMLElement<HTMLSpanElement>;
  error: unknown;
}
// Schema Login
const singUpSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "the first name very short" })
      .max(30, { message: "the first name very long" }),
    lastName: z
      .string()
      .min(3, { message: "the first name very short" })
      .max(30, { message: "the first name very long" }),
    userName: z
      .string()
      .min(3, { message: "the user name very short" })
      .max(30, { message: "the user name very long" }),
    password: z
      .string()
      .min(3, { message: "the password name very short" })
      .max(20, { message: "the password name very long" }),
    email: z.string().email("Invalid Email"),
    phoneNumber: z.string().optional(),
    confirmPassword: z
      .string()
      .min(3, { message: "the password name very short" })
      .max(20, { message: "the password name very long" }),
  })
  .refine(({ password, confirmPassword }) => confirmPassword === password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
function setData(token: string) {
  localStorage.setItem("token", token);
}
// Set Data In window
interface SchemaUser {
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
  confirmPassword?: string;
  address?: string;
}
function Signup() {
  // State Management
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [incorrectData, setIncorrectData] = useState<string>("");
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
    lastName,
    email,
    userName,
    password,
    age,
    phoneNumber,
  }: SchemaUser) => {
    setIncorrectData("");
    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}signup`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}signup`,
        {
          firstName,
          lastName,
          email,
          userName,
          password,
          age,
          phoneNumber,
        }
      )
      .then((response) => {
        navigate("/");
        dispatch(addUserLogged(response.data?.data));
        setData(response.data?.token);
      })
      .catch(({ response }) => {
        setIncorrectData(response.data?.message);
      });
    reset();
  };
  // Inputs UI

  const LoginInputs = [
    // firstName
    {
      type: "text",
      placeholder: "enter your first name...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("firstName"),
      name: "firstName",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.firstName?.message}
        </span>
      ),
    },
    // lastName
    {
      type: "text",
      placeholder: "enter your last name...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("lastName"),
      name: "lastName",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.lastName?.message}
        </span>
      ),
    },
    // phoneNumber
    {
      type: "text",
      placeholder: "enter your phone number...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("phoneNumber"),
      name: "phoneNumber",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.phoneNumber?.message}
        </span>
      ),
    },
    // age
    {
      type: "number",
      placeholder: "enter your age...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("age"),
      name: "age",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.age?.message}
        </span>
      ),
    },
    // address
    {
      type: "text",
      placeholder: "enter your address...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("address"),
      name: "address",
      error: (
        <span
          className={`bg-red-400 mt-2 h-0 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.address?.message}
        </span>
      ),
    },
    // email
    {
      type: "text",
      placeholder: "enter your email...",
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
    // userName
    {
      type: "text",
      placeholder: "enter your user name...",
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
    // password
    {
      type: "password",
      placeholder: "enter your password...",
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
    // confirmPassword
    {
      type: "password",
      placeholder: "enter confirm password...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("confirmPassword"),
      name: "confirmPassword",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.confirmPassword?.message}
        </span>
      ),
    },
  ];
  return (
    <div className={`bg-slate-600  flex justify-center items-center`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`lg:grid flex flex-wrap justify-center lg:gap-4 bg-slate-500 rounded-lg h-full w-full p-2 `}
      >
        {incorrectData && (
          <span
            className={`bg-red-400 my-2 px-2 text-center rounded-md text-[#fafafa]`}
          >
            {Array.isArray(incorrectData) ? incorrectData[0] : incorrectData}
          </span>
        )}
        <div className={``}>
          {LoginInputs.map(
            ({ placeholder, type, classes, register, error }: DTOInputs) => {
              return (
                <div
                  key={placeholder}
                  className={`flex flex-col my-2 lg:w-[500px] w-[40vh]`}
                >
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
        </div>
        {/* <div className={``}>
          {LoginInputs.slice(-4).map(
            ({ placeholder, type, classes, register, error }: DTOInputs) => {
              return (
                <div key={placeholder} className={`flex flex-col my-2`}>
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
        </div> */}
        <div>
          <button
            className={`bg-green-200 hover:bg-green-300 rounded-lg w-[100%] h-[44px] flex justify-center items-center gap-3`}
            type="submit"
            disabled={isSubmitting}
          >
            Submit {isSubmitting && <Loder />}
          </button>
          {/* Forgot Password ui */}
          <LinksForgotPassword isSignUp={true} />
        </div>
      </form>
    </div>
  );
}

export default Signup;
