import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import z from "zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { InputForm } from "../FormComponents";
import { LoderBtn } from "../loder/Loder";
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
  // State Management
  //   const dispatch = useDispatch();

  const navigate = useNavigate();

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
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development1"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/updatePassword`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/updatePassword`,
        {
          password,
          confirmPassword,
          email: localStorage.getItem("verifyCodeEmail"),
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/login");
        localStorage.removeItem("verifyCodeEmail");
      })
      .catch(({ response }) => {
        console.log(response);
        // setIncorrectData(response.data?.error);
      });
    reset();
  };
  // Inputs UI
  const [isChecked, setIsChecked] = useState(false);
  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  const passwordInputs = [
    {
      type: isChecked ? "text" : "password",
      placeholder: "enter new password...",
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
    {
      type: isChecked ? "text" : "password",
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
        {passwordInputs.map(
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
        <div className={`flex items-center gap-2 `}>
          <input
            type="checkbox"
            id="showPass"
            checked={isChecked}
            onChange={checkHandler}
            className={`cursor-pointer mt-1 ms-3`}
          />
          <label className={`cursor-pointer`} htmlFor="showPass">
            show password
          </label>
        </div>
        <button
          className={`bg-green-200 hover:bg-green-300 rounded-lg w-[100%] h-[44px] flex justify-center items-center gap-3`}
          type="submit"
          disabled={isSubmitting}
        >
          Verify {isSubmitting && <LoderBtn />}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
