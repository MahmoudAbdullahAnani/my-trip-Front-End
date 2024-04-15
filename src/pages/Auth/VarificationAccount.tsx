import { useState } from "react";
import { LoderBtn } from "../../components/loder/Loder";
import { Modal } from "@mui/material";
import {
  EmailVerifyState,
  OpenResetPasswordPage,
  OpenVerifyAccountPageState,
  RememberMeState,
  TokenJWT,
  UserNameVerifyState,
  openForgotPasswordPageState,
  openLoginPageState,
  openSignupPageState,
  openVerifyPageState,
} from "../../data/RecoilState/AuthStatePages/Auth";
import { useRecoilState } from "recoil";
import { iconLogo } from "../../assets/icons/home";
import downLogo from "/public/assets/downLogo.png";
// import OrLogin from "../../components/OrLogin";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserLogged } from "../../data/Features/LoggedUser";
import { toast } from "react-toastify";

function setData(token: string) {
  localStorage.setItem("token", token);
}

function VarificationAccount() {
  const [incorrectData, setIncorrectData] = useState([]);

  const [, setOpenResetPasswordPageState] = useRecoilState(
    OpenResetPasswordPage
  );

  const [, setOpenPage] = useRecoilState(openLoginPageState);
  const [, setOpenSignupPage] = useRecoilState(openSignupPageState);
  const [, setOpenForgotPasswordPageState] = useRecoilState(
    openForgotPasswordPageState
  );
  const [, setOpenVerifyPageState] = useRecoilState(openVerifyPageState);
  const [openPage, setOpenVerifyAccountPageState] = useRecoilState(
    OpenVerifyAccountPageState
  );
  const handleClosePage = () => {
    setOpenForgotPasswordPageState(false);
    setOpenResetPasswordPageState(false);
    setOpenPage(false);
    setOpenSignupPage(false);
    setOpenVerifyPageState(false);
    setOpenForgotPasswordPageState(false);
    setOpenVerifyAccountPageState(false);
  };
  // setTokenJWT(response.data.token);

  // dispatch(addUserLogged(response.data?.data));
  // if (rememberMe) {
  //   setData(response.data.token);
  // }
  const [emailVerifyState] = useRecoilState(EmailVerifyState);
  const [userNameVerifyState] = useRecoilState(UserNameVerifyState);
  const [, setTokenJWT] = useRecoilState(TokenJWT);
  const dispatch = useDispatch();
  const [rememberMe] = useRecoilState(RememberMeState);

  const [codeVerify, setCodeVerify] = useState("");
  const [loadingVerify, setLoadingVerify] = useState(false);
  const onSubmit = async () => {
    setLoadingVerify(true);
    await axios
      .patch(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/signup`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/signup`,
        {
          email: emailVerifyState,
          userName: userNameVerifyState,
          verificationAccountCode: codeVerify,
        }
      )
      .then((response) => {
        setLoadingVerify(false);
        setOpenForgotPasswordPageState(false);
        setOpenResetPasswordPageState(false);
        setOpenPage(false);
        setOpenSignupPage(false);
        setOpenVerifyPageState(false);
        setOpenVerifyAccountPageState(false);
        // console.log("res Data==> ", response.data);

        setTokenJWT(response.data.token);

        dispatch(addUserLogged(response.data?.data));
        if (rememberMe) {
          setData(response.data.token);
        }
      })
      .catch(({ response }) => {
        console.log(response);
        setLoadingVerify(false);

        setIncorrectData(response.data?.message);
      });
  };

  return (
    <Modal
      open={openPage}
      onClose={handleClosePage}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={`absolute top-[50%] left-[50%] flex justify-center items-start w-[100%] `}
      style={{
        fill: "rgb(182 231 251 / 30%)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className={`lg:w-[90%] mt-[50px] h-[80%] bg-[url('/public/assets/bg-model-login.png')] bg-cover flex justify-center p-[30px] gap-[24px] rounded-[26px] bg-[#FFF]`}
      >
        <div
          style={{
            boxShadow: "0 4px 4px rgb(0 0 0 / 25%)",
          }}
          className={`w-[55%] ps-[69px] pe-[82px] pb-[172px] pt-[55px] lg:flex flex-col items-center gap-[45px] hidden bg-[#FFF] rounded-[16px]`}
        >
          <div>{iconLogo}</div>
          <div>
            <img src={downLogo} alt="" />
          </div>
        </div>
        <div
          // handleSubmit(onSubmit)
          className={`lg:pt-[21px] relative lg:w-[45%] w-full`}
        >
          <div className="flex lg:justify-end justify-center w-full">
            <h2
              className={`text-[24px] font-semibold lg:text-end text-center text-[#231F20]`}
            >
              تحقق من حسابك
            </h2>
          </div>

          {/* <div className={`my-[20px]`}>
            <OrLogin />
          </div> */}
          {incorrectData && (
            <span
              className={`bg-red-400 my-2 w-full block text-center rounded-md text-[#fafafa]`}
            >
              {Array.isArray(incorrectData) ? incorrectData[0] : incorrectData}
            </span>
          )}
          <div
            className={`flex flex-col lg:w-[506px] w-[100%] mx-auto gap-[6px]`}
          >
            <input
              type="text"
              onChange={(e) => setCodeVerify(e.target.value)}
              className="text-end px-[12px] f pe-[46px] w-full h-[56px] py-[20px] rounded-[16px] bg-white  placeholder:text-[16px] placeholder:font-medium placeholder:text-[#9F9D9D]"
              style={{
                boxShadow: "0 4px 4px rgb(0 90 108 / 30%)",
              }}
            />
          </div>

          <div className={`mx-auto w-full flex justify-center mt-[26px]`}>
            <button
              name="verify"
              className={`flex justify-center items-center lg:w-full h-[48px] w-[100%] bg-[#117C99] hover:bg-[#117c99d4] text-[#FFFFFF] hover:text-[#ebeaeace] rounded-[8px]  text-[20px] font-bold`}
              type="submit"
              disabled={loadingVerify}
              onClick={() => {
                if (
                  !emailVerifyState ||
                  !userNameVerifyState ||
                  !codeVerify ||
                  codeVerify.length !== 6
                ) {
                  return toast.error("رقم تأكيد خطأ", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                }
                onSubmit();
              }}
            >
              تأكيد الحساب {loadingVerify && <LoderBtn />}
            </button>
          </div>

          <div
            className={`flex mt-[44px] gap-[2px] justify-center absolute bottom-0 w-full`}
          >
            <span
              onClick={() => {
                setOpenForgotPasswordPageState(false);
                setOpenResetPasswordPageState(false);
                setOpenPage(true);
                setOpenSignupPage(false);
                setOpenVerifyPageState(false);
                setOpenVerifyAccountPageState(false);
              }}
              style={{
                textDecoration: "underline",
              }}
              className={`text-[#31B2E1] cursor-pointer`}
            >
              تسجيل الدخول
            </span>
            <span>انا امتلك حساب</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default VarificationAccount;
