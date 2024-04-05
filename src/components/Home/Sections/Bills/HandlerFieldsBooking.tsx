import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { iconDate } from "../../../../assets/icons/home";
import { countrys } from "../../../../data/Countrys";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
// Handle Date
import { format } from "date-fns";

import { DataBooking } from "../../../../data/RecoilState/Search/TicketData";
import { toast } from "react-toastify";
import { adultsData } from "../../../../data/RecoilState/FormSearchData";

// Interfaces
export interface Inputs {
  fullName: string;
  gender: "Mr" | "Mrs";
  email: string;
  confirmEmail: string;
  birthDate: Date;
  passportNumber: string;
  nationality: string;
  country: string;
}
// Schema Login
const AirBookingSchema = z
  .object({
    fullName: z.string().min(3, { message: "من فضلك ادخل اسمك الكامل" }),
    gender: z.union([z.literal("Mr"), z.literal("Mrs")]),
    email: z
      .string()
      .min(3, { message: "البريد الالكتروني مطلوب" })
      .email({ message: "البريد الالكتروني غير صحيح" }),
    confirmEmail: z.string().email({ message: "البريد الالكتروني غير صحيح" }),
    birthDate: z.date({
      required_error: "تاريخ الميلاد مطلوب",
    }),
    passportNumber: z
      .string()
      .min(6, { message: "الرجاء إدخال رقم جواز سفر صالح" })
      .max(15, { message: "الرجاء إدخال رقم جواز سفر صالح" })
      .regex(/^[A-Za-z0-9]+$/, {
        message: "الرجاء إدخال رقم جواز سفر صالح",
      }),
    nationality: z.string().min(1, { message: "الجنسية مطلوبة" }),
    country: z.string().min(1, { message: "الدولة مطلوبة" }),
  })
  .refine(({ email, confirmEmail }) => email === confirmEmail, {
    message: "البريد الالكتروني غير مطابق",
    path: ["confirmEmail"],
  })
  .refine(
    ({ birthDate }) => {
      const today = new Date();
      return today.getFullYear() - birthDate.getFullYear() >= 12;
    },
    {
      message: "عذراً،عمرك غير مناسب",
      path: ["birthDate"],
    }
  );

function HandlerFieldsBooking(position:number) {
  //=========================================================== User Data For air booking ===========================================================================================
  const [dataBookingState, setDataBookingState] = useRecoilState(DataBooking);
  const countNamesUsers = dataBookingState.NameBooking.split(",");
  const countEmailBookingUsers = dataBookingState.EmailBooking.split(",");
  const countPassportNumberBookingUsers =
    dataBookingState.PassportNumberBooking.split(",");

  //=========================================================== User Data For air booking ===========================================================================================
  const [adultsDataState] = useRecoilState(adultsData);

  const navigator = useNavigate();
  const {
    register,
    handleSubmit,
    // reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(AirBookingSchema),
    mode: "onChange",
  });

  // SubmitHandler
  const [startDate, setStartDate] = useState<Date>(new Date());
  const onSubmit: SubmitHandler<Inputs> = ({
    birthDate,
    country,
    email,
    fullName,
    gender,
    nationality,
    passportNumber,
  }) => {
    const handleBirthDate = format(birthDate, "dd/MM/yyyy");
    // console.log({
    //   handleBirthDate,
    //   country,
    //   email,
    //   fullName,
    //   gender,
    //   nationality,
    //   passportNumber,
    // });
    setDataBookingState({
      BirthDateBooking: `${dataBookingState.BirthDateBooking},${handleBirthDate}`,
      NameBooking: `${dataBookingState.NameBooking},${fullName}`,
      GenderBooking: `${dataBookingState.GenderBooking},${gender}`,
      EmailBooking: `${dataBookingState.EmailBooking},${email}`,
      PassportNumberBooking: `${dataBookingState.PassportNumberBooking},${passportNumber}`,
      NationalityBooking: `${dataBookingState.NationalityBooking},${nationality}`,
      CountryBooking: `${dataBookingState.CountryBooking},${country}`,
    });
    if (countNamesUsers.length !== adultsDataState) {
      return toast.info("استكمل بيانات باقي المسافرين");
    }
    return navigator("/airPay");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={``}>
        <div
          className={`flex flex-col pe-[24px] lg:ps-[106px] ps-[24px] gap-[24px] mt-[47.5px] w-full justify-end`}
        >
          <div
            className={`flex flex-wrap-reverse md:flex-nowrap justify-end w-full gap-[25px]`}
          >
            {/* FullName */}
            <div className={`flex flex-col items-end gap-[10px] w-full`}>
              <label
                htmlFor="fullName"
                className={`text-[16px] font-medium text-[#000]`}
              >
                الاسم بالكامل
              </label>
              <div className={`w-full flex flex-col items-end `}>
                <input
                  defaultValue={
                    adultsDataState > 1
                      ? countNamesUsers[position]
                      : dataBookingState.NameBooking
                  }
                  type="text"
                  id="fullName"
                  {...register("fullName")}
                  placeholder={`مثال:Mohamed Mokhles Mohamed`}
                  className={` w-full px-[12px] py-[13px] rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
                  dir="rtl"
                />
                <span className={`text-red-400 rounded-md `}>
                  {errors?.fullName?.message}
                </span>
              </div>
            </div>
            {/* Gender */}
            <div className={`flex flex-col items-end gap-[10px] w-[58px]`}>
              <label
                htmlFor="gender"
                className={`text-[16px] font-medium text-[#000]`}
              >
                اللقب
              </label>
              <select
                id="gender"
                className={`w-[58px] h-[42px] flex justify-center items-center text-center rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
                {...register("gender")}
              >
                <option
                  selected={dataBookingState.GenderBooking === "Mr"}
                  value="Mr"
                >
                  Mr
                </option>
                <option
                  selected={dataBookingState.GenderBooking === "Mrs"}
                  value="Mrs"
                >
                  Mrs
                </option>
              </select>
            </div>
          </div>
          <div
            className={`flex flex-wrap-reverse md:flex-nowrap justify-end w-full gap-[25px]`}
          >
            {/* Confirm Email */}
            <div className={`flex flex-col items-end gap-[10px] w-full`}>
              <label
                htmlFor="confirmEmail"
                className={`text-[16px] font-medium text-[#000]`}
              >
                تأكيد البريد الالكتروني
              </label>
              <input
                defaultValue={
                  adultsDataState > 1
                    ? countEmailBookingUsers[position]
                    : dataBookingState.EmailBooking
                }
                type="email"
                id="confirmEmail"
                {...register("confirmEmail")}
                placeholder={`mo123@gmail.com`}
                className={`w-full max-w-[505px] px-[12px] py-[13px] rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
                dir="rtl"
              />
              <span className={`text-red-400 rounded-md `}>
                {errors?.confirmEmail?.message}
              </span>
            </div>
            {/* Email */}
            <div className={`flex flex-col items-end gap-[10px] w-full`}>
              <label
                htmlFor="email"
                className={`text-[16px] font-medium text-[#000]`}
              >
                البريد الالكتروني
              </label>
              <input
                defaultValue={
                  adultsDataState > 1
                    ? countEmailBookingUsers[position]
                    : dataBookingState.EmailBooking
                }
                type="email"
                id="email"
                {...register("email")}
                placeholder={`mo123@gmail.com`}
                className={`w-full max-w-[505px] px-[12px] py-[13px] rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
                dir="rtl"
              />
              <span className={`text-red-400 rounded-md `}>
                {errors?.email?.message}
              </span>
            </div>
          </div>
          <div
            className={`flex flex-wrap md:flex-nowrap justify-end w-full gap-[25px]`}
          >
            {/* Birth Date */}
            <div className={`flex flex-col items-end gap-[10px] w-full`}>
              <label
                htmlFor="birthDate"
                className={`text-[16px] font-medium text-[#000]`}
              >
                تاريخ الميلاد
              </label>
              <ReactDatePicker
                {...register("birthDate", {
                  required: "هذا الحقل مطلوب",
                  value: startDate,
                  setValueAs: () => startDate,
                })}
                id="birthDate"
                showYearDropdown
                maxDate={new Date()}
                showIcon
                icon={iconDate}
                dateFormat="dd/MM/yyyy"
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                className={`w-full max-w-[270px] h-[48px] text-center px-[12px] py-[13px] rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
              />
              <span className={`text-red-400 rounded-md `}>
                {errors?.birthDate?.message}
              </span>
            </div>
          </div>
        </div>
        <hr
          className={`w-[calc(100%-48px)] mx-auto h-[1.4px] bg-[#656565] mt-[48px] mb-[35px]`}
        />
        <div
          className={`flex flex-col pe-[24px] lg:ps-[106px] ps-[24px] gap-[24px] mt-[47.5px] w-full justify-end`}
        >
          <h2 className={`text-[#000] text-[20px] font-medium text-end`}>
            بيانات جواز السفر
          </h2>
          <div className={`flex flex-col justify-end items-start`}>
            {/* passportNumber */}
            <div className={`flex flex-col items-end gap-[10px] w-full`}>
              <label
                htmlFor="passportNumber"
                className={`text-[16px] font-medium text-[#000]`}
              >
                رقم جواز السفر
              </label>
              <input
                defaultValue={
                  adultsDataState > 1
                    ? countPassportNumberBookingUsers[position]
                    : dataBookingState.PassportNumberBooking
                }
                type="text"
                id="passportNumber"
                {...register("passportNumber")}
                className={`w-full max-w-[588px] px-[12px] py-[13px] rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
                dir="rtl"
              />
              <span className={`text-red-400 rounded-md `}>
                {errors?.passportNumber?.message}
              </span>
            </div>
            {/* nationality and counter */}
            <div
              className={`flex flex-wrap md:flex-nowrap justify-end w-full gap-[25px] mt-[16px]`}
            >
              <div className={`flex flex-col items-end gap-[10px] w-full`}>
                <label
                  htmlFor="passportNumber"
                  className={`text-[16px] font-medium text-[#000]`}
                >
                  الدولة
                </label>
                <select
                  dir="rtl"
                  id="nationality"
                  className={`w-[270px] h-[42px] flex justify-center items-center px-[13px] text rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
                  {...register("nationality")}
                >
                  <option value={""}>اختر</option>
                  {countrys.map(({ name, code }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                <span className={`text-red-400 rounded-md `}>
                  {errors?.nationality?.message}
                </span>
              </div>
              <div className={`flex flex-col items-end gap-[10px] w-full`}>
                <label
                  htmlFor="counter"
                  className={`text-[16px] font-medium text-[#000]`}
                >
                  الجنسية
                </label>
                <select
                  dir="rtl"
                  id="counter"
                  className={`w-[270px] h-[42px] flex justify-center items-center px-[13px] rounded-[8px] text-[#333333] placeholder:text-[#333333] border border-[#117C99] focus-visible:outline-[#117C99]`}
                  {...register("country")}
                >
                  <option value={""}>اختر</option>
                  {countrys.map(({ name, code }) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </select>
                <span className={`text-red-400 rounded-md `}>
                  {errors?.country?.message}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={`h-[120px]`}></div>
        {/* desktop */}
        <button
          className={`roundedCornerPay sm:block hidden absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
        >
          <span
            className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
          >
            ادخال البيانات & إكمال عملة الدفع
          </span>
        </button>
        {/* mobile */}
        <button
          className={`sm:hidden block absolute -bottom-2 left-[50%] translate-x-[-50%] bg-[#e9e9e9] py-2 md:px-7 px-4 rounded-t-[16px]`}
        >
          <span
            className={`w-[294px] h-[48px] rounded-[16px] bg-[#117C99] hover:bg-[#117c99b0] duration-200 text-[#FFF] flex justify-center relative top-0 items-center `}
          >
            ادخال البيانات & إكمال عملة الدفع
          </span>
        </button>
      </form>
    </>
  );
}

export default HandlerFieldsBooking;
