import { useEffect} from "react"
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
  code: string;
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
const codeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "It must consist of 6 boxes" })
    .max(6, { message: "It must consist of 6 boxes" }),
});

// function setData(token: string) {
//   localStorage.setItem("token", token);
// }
function VerifyCode() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("verifyCodeEmail")) {
      navigate("/forgotPassword");
    }
  }, [])
  // State Management
  //   const dispatch = useDispatch();


  const [incorrectData, setIncorrectData] = useState<string>("");
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
    code,
  }: {
    code: string;
  }) => {
    setIncorrectData("");

    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development1"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}verifyCode`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}verifyCode`,
        {
          code,
          email: localStorage.getItem("verifyCodeEmail"),
        }
      )
      .then((response) => {
        if (response?.data.status === "success") {
          navigate("/resetPassword");
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setIncorrectData(response?.data.message);
      });
    reset();
  };
  // Inputs UI

  const emailInputs = [
    {
      type: "text",
      placeholder: "enter verify code...",
      classes:
        "px-3 py-2 rounded-lg bg-slate-400 placeholder:text-white focus:text-[#000] focus:bg-white ",
      register: register("code"),
      name: "code",
      error: (
        <span
          className={`bg-red-400 mt-2 text-center rounded-md text-[#fafafa]`}
        >
          {errors?.code?.message}
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
          Verify {isSubmitting && <LoderBtn />}
        </button>
      </form>
    </div>
  );
}

export default VerifyCode;
