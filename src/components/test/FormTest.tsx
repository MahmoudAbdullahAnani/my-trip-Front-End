import React from "react";

function FormTest() {
  return (
    <div>
      <div className="h-[349px] sm:h-[494px] md:h-[576px] relative w-full">
        <div
          className="absolute bg-cover bg-no-repeat flex flex-col h-max inset-[0] items-end justify-center m-auto p-[7px] w-full"
          style={{ backgroundImage: "url('images/img_group6.png')" }}
        >
          <div className="flex flex-col justify-start mb-[71px] mr-1.5 w-[94%] md:w-full">
            <div className="flex sm:flex-col flex-row gap-8 items-end justify-end md:ml-[0] ml-[649px] w-[44%] md:w-full">
              <div className="flex flex-row gap-6 items-center justify-between w-[63%] sm:w-full">
                <button
                  className="bg-transparent border border-solid cursor-pointer flex items-center justify-center min-w-[146px]"

                  // shape="round"
                >
                  <div className="font-semibold text-right text-sm white_A700_white_A700_00_border">
                    التوصيل
                  </div>
                </button>
                <button className="common-pointer bg-transparent border border-solid cursor-pointer flex items-center justify-center min-w-[146px]">
                  <div className="font-semibold text-right text-sm white_A700_white_A700_00_border2">
                    الفنادق
                  </div>
                </button>
              </div>
              <div className="flex flex-row gap-2.5 items-center justify-start sm:mt-0 mt-[7px] px-5 py-2 w-auto">
                <p className="text-cyan-800 text-right text-xl w-auto">
                  الطياران
                </p>
                <img
                  className="h-6 w-6"
                  src="images/img_airplane.svg"
                  alt="airplane"
                />
              </div>
            </div>
            <div className="flex sm:flex-col flex-row sm:gap-5 items-center justify-end md:ml-[0] ml-[682px] mt-[46px] w-[33%] md:w-full">
              <div className="flex flex-row gap-3 items-start justify-between w-[33%] sm:w-full">
                <p className="mt-[3px] text-blue_gray-900 text-right text-sm">
                  وجهات متعددة
                </p>
                <div className="bg-white-A700_b2 h-5 rounded-[50%] w-5"></div>
              </div>
              <div className="flex flex-row gap-3 items-start justify-center sm:ml-[0] ml-[26px] w-[26%] sm:w-full">
                <p className="mt-[3px] text-blue_gray-900 text-right text-sm">
                  ذهاب فقط
                </p>
                <div className="bg-white-A700_b2 h-5 rounded-[50%] w-5"></div>
              </div>
              {/* <Radio
                    value=""
                    className="leading-[normal] sm:ml-[0] ml-[26px] sm:pr-5 text-black-900 text-right text-sm"
                    inputClassName="bg-white-A700 border border-cyan-800 border-solid h-5 mr-[5px] rounded-[10px] w-5"
                    checked={true}
                    name="six"
                    label=" "
                  ></Radio> */}
            </div>
            <div className="flex md:flex-col flex-row md:gap-5 items-start justify-start mr-[93px] mt-[31px] md:pr-10 sm:pr-5 pr-[188px] w-[92%] md:w-full">
              <div className="flex flex-col gap-[5px] items-end justify-start md:mt-0 mt-0.5 w-1/4 md:w-full">
                <p className="text-black-900 text-right text-xl">
                  المسافرين & الدرجة
                </p>
                <div className="bg-white-A700 flex flex-row items-center justify-start p-3 rounded-lg shadow-bs1 w-full">
                  <img
                    className="h-6 ml-[3px] w-6"
                    src="images/img_arrowdown_black_900.svg"
                    alt="arrowdown"
                  />
                  <p className="ml-1.5 text-cyan-800 text-right text-sm">
                    1مسافر & اقتصادية
                  </p>
                  <img
                    className="h-6 ml-[13px] w-6"
                    src="images/img_frame_blue_gray_900.svg"
                    alt="frame"
                  />
                </div>
              </div>
              <ul className="sm:flex-col flex-row gap-6 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-4 ml-6 md:ml-[0] w-[95%] md:w-full">
                <div className="flex flex-col gap-[5px] items-end justify-start w-full">
                  <p className="text-black-900 text-right text-xl">العودة</p>
                  <div className="bg-white-A700 flex flex-row gap-[21px] items-center justify-end p-3 rounded-lg shadow-bs1 w-full">
                    <p className="text-cyan-800 text-right text-sm">
                      31/6/2024{" "}
                    </p>
                    <img
                      className="h-6 mr-[3px] w-6"
                      src="images/img_frame_blue_gray_900_24x24.svg"
                      alt="frame"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[5px] items-end justify-start w-full">
                  <p className="text-black-900 text-right text-xl">الذهاب </p>
                  <div className="bg-white-A700 flex flex-row gap-[21px] items-center justify-end p-3 rounded-lg shadow-bs1 w-full">
                    <p className="text-cyan-800 text-right text-sm">
                      31/5/2024{" "}
                    </p>
                    <img
                      className="h-6 mr-[3px] w-6"
                      src="images/img_frame_blue_gray_900_24x24.svg"
                      alt="frame"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[5px] items-end justify-start w-full">
                  <p className="text-black-900 text-right text-xl">الوجهة </p>
                  <div className="bg-white-A700 flex flex-row gap-[31px] items-center justify-end p-[11px] rounded-lg shadow-bs1 w-full">
                    <p className="text-cyan-800 text-right text-sm">الدوحة</p>
                    <img
                      className="h-6 mr-[3px] w-6"
                      src="images/img_television.svg"
                      alt="television"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end justify-start w-full">
                  <p className="text-black-900 text-right text-xl">
                    المغادرة من
                  </p>
                  <div className="bg-white-A700 flex flex-row gap-[30px] items-center justify-end p-[11px] rounded-lg shadow-bs1 w-full">
                    <p className="text-cyan-800 text-right text-sm">القاهرة</p>
                    <img
                      className="h-6 mr-[3px] w-6"
                      src="images/img_television_blue_gray_900.svg"
                      alt="television"
                    />
                  </div>
                </div>
              </ul>
              <img
                className="h-6 md:mt-0 mt-[41px] w-6"
                src="images/img_arrowdown.svg"
                alt="arrowdown_One"
              />
            </div>
            <div className="flex flex-row gap-11 items-center justify-end md:ml-[0] ml-[721px] mt-[17px] w-[30%] md:w-full">
              <div className="flex flex-row gap-3 items-start justify-between w-[45%]">
                <div className="md:h-4 h-[17px] relative w-[79%]">
                  <p className="absolute bottom-[0] inset-x-[0] mx-auto text-[14.96px] text-right text-white-A700 w-max">
                    تواريخ مرنة 3 ايام
                  </p>
                  <div className="absolute flex flex-col items-start justify-start left-[22%] top-[0]">
                    <p className="text-[11px] text-right text-white-A700">+</p>
                    <p className="text-[11px] text-right text-white-A700">-</p>
                  </div>
                </div>
                <div className="bg-white-A700 h-5 rounded-[5px] w-5"></div>
              </div>
              {/* <CheckBox
                    className="leading-[normal] text-[14.96px] text-right"
                    inputClassName="border-2 border-cyan-800 border-solid h-5 mr-[5px] w-5"
                    name="Thirteen"
                    id="Thirteen"
                    label="رحلات بدون توقف"
                  ></CheckBox> */}
            </div>
          </div>
        </div>
        <button
          className="absolute bottom-[0] cursor-pointer font-black leading-[normal] left-[21%] min-w-[177px] rounded-[13px] text-[14.96px] text-center"
          color="cyan_800"
        >
          ابحث
        </button>
      </div>
    </div>
  );
}

export default FormTest;
