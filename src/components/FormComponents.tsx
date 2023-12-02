import { UseFormRegisterReturn } from "react-hook-form";
interface InputInterface {
  placeholder: string;
  type?: string;
  classes?: string;
  register: UseFormRegisterReturn<string>;
  error: unknown;
  handleFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}
export const InputForm = ({
  placeholder,
  type,
  classes,
  register,
  error,
  handleFocus,
}: InputInterface) => {
  return (
    <>
      <input
        onFocus={handleFocus}
        placeholder={placeholder}
        type={type || "text"}
        className={classes}
        {...register}
      />
      {error}
    </>
  );
};
