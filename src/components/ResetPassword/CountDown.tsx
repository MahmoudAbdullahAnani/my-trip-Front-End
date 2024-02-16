import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { emailVerify } from "../../data/RecoilState/AuthStatePages/Auth";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../data/Features/LoggedUser";

function CountDown() {
  const [counterDownState, setCounterDownState] = useState(`10.0`);

  function countdown(minutes: number) {
    let seconds = minutes * 60;

    const countdownInterval = setInterval(function () {
      const minutesRemaining = Math.floor(seconds / 60);
      const secondsRemaining = seconds % 60;

      setCounterDownState(`${minutesRemaining}:${secondsRemaining}`);

      if (seconds === 0) {
        clearInterval(countdownInterval);
      } else {
        seconds--;
      }
    }, 1000);
  }
  useEffect(() => {
    countdown(1);
  }, []);

  const [emailVerifyState] = useRecoilState(emailVerify);
  const dispatch = useDispatch();

  const reSendCode = async () => {
    // 1) axios post req on /signin
    await axios
      .post(
        import.meta.env.VITE_PUBLIC_NODE_MODE === "development"
          ? `${import.meta.env.VITE_PUBLIC_API_LOCAL}/resetPassword`
          : `${import.meta.env.VITE_PUBLIC_API_PRODUCTION}/resetPassword`,
        {
          email: emailVerifyState,
        }
      )
      .then((response) => {
        if (response.data.status === "success") {
          localStorage.setItem("verifyCodeEmail", emailVerifyState);
          dispatch(userLoggedOut());
          // navigate("/verifyCode");
        }
      })
      .catch(({ response }) => {
        console.log(response);
      });
  };

  if (counterDownState === `0:0`) {
    return (
      <span
        onClick={() => {
          reSendCode();
          countdown(1);
        }}
        className={`text-[#117C99] cursor-pointer`}
      >
        اعادة ارسال
      </span>
    );
  }
  return <span className={`text-[#117C99]`}>{counterDownState}</span>;
}

export default CountDown;
