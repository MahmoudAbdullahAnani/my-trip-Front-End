import { UseFormRegisterReturn } from "react-hook-form";
import { useRecoilState } from "recoil";
import { showPassword } from "../data/RecoilState/AuthStatePages/Auth";
import { iconShowPasswordNot, iconShowPassword } from "../assets/icons/home";
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

  handleFocus,
}: InputInterface) => {
  const [toggleConfirmPassword, setToggleConfirmPassword] =
    useRecoilState(showPassword);
  return (
    <div className={`flex flex-col w-full`}>
      <div className={`flex items-center relative rounded-[16px]`}>
        {placeholder === "أدخل كلمة المرور" && (
          <span
            className={`absolute left-[16px] cursor-pointer`}
            onClick={() => setToggleConfirmPassword(!toggleConfirmPassword)}
          >
            {toggleConfirmPassword ? iconShowPasswordNot : iconShowPassword}
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
