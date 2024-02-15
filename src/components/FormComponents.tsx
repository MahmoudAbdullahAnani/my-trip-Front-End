import { UseFormRegisterReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { showPassword } from "../data/RecoilState/AuthStatePages/Auth";
interface InputInterface {
  placeholder: string;
  type?: string;
  classes?: string;
  register: UseFormRegisterReturn<string>;
  error: JSX.Element;
  mainIcon?: JSX.Element;
  iconShowPassword?: JSX.Element;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
export const InputForm = ({
  placeholder,
  type,
  classes,
  register,
  error,
  mainIcon,
  iconShowPassword,
  handleFocus,
}: InputInterface) => {
  const [toggleConfirmPassword, setToggleConfirmPassword] =
    useRecoilState(showPassword);
  return (
    <div className={`flex flex-col w-full`}>
      <div className={`flex items-center relative rounded-[16px]`}>
        {type === "password" ? (
          <span
            className={`absolute left-[16px] cursor-pointer`}
            onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
          >
            {iconShowPassword}
          </span>
        ) : (
          <span
            className={`absolute left-[16px] cursor-pointer`}
            onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
          >
            {iconShowPassword}
          </span>
        )}
        <input
          style={{
            boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
          }}
          onFocus={handleFocus}
          placeholder={placeholder}
          type={type || "text"}
          className={classes}
          {...register}
        />
        <span className={`absolute right-[16px]`}>{mainIcon}</span>
      </div>

      {error}
    </div>
  );
};
