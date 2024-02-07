import BtnLogin from "./BtnLogin";
import { iconGoogle } from "../../assets/icons/home";
// Importing Components

import {
  LoginSocialFacebook,
  LoginSocialGoogle,
  IResolveParams,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} from "reactjs-social-login";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataBooking } from "../../data/RecoilState/Search/TicketData";
import { useRecoilState } from "recoil";

// interface DataRes {
//   id?: string;
//   name?: string;
//   email?: string;
//   picture?: {
//     data: {
//       height: number;
//       is_silhouette: boolean;
//       url: string;
//       width: number;
//     };
//   };
//   first_name?: string;
//   last_name?: string;
// }

function BtnLoginAirData() {
  // handler Get Data (Facebook)
  const [userInformation, setUserInformation] = useState(null);
  const getDataFacebook = async (res: IResolveParams) => {
    await axios
      .get(
        `${import.meta.env.VITE_PUBLIC_API_FETCHING_FACEBOOK}${
          res.data.accessToken
        }`
      )
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .then(({ data }) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUserInformation({ name: data.name, picture: data.picture });
      })
      .catch((err) => {
        console.log("facebook error", err);
      });
  };
  const [, setDataBookingState] = useRecoilState(DataBooking);

  useEffect(() => {
    if (userInformation) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setDataBookingState({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        NameBooking: userInformation.name,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        EmailBooking: userInformation.email,
      });
    }
  }, [userInformation]);
  return (
    <>
      {userInformation ? (
        <img
        className={`rounded-full`}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
          src={userInformation.picture?.data?.url || ""}
          alt="profile"
        />
      ) : (
        <LoginSocialFacebook
          className={`cursor-pointer rounded-[16px]`}
          isOnlyGetToken
          appId={import.meta.env.VITE_PUBLIC_REACT_APP_FACEBOOK || ""}
          // onLoginStart={onLoginStart}
          onResolve={(res: IResolveParams) => {
            console.log(res);
            getDataFacebook(res);
          }}
          onReject={(err: unknown) => {
            console.log(err);
          }}
        >
          <BtnLogin title={`حساب فيسبوك`} icon={iconGoogle} />
        </LoginSocialFacebook>
      )}

      {/* By Google */}
      <LoginSocialGoogle
        className={`cursor-pointer rounded-[16px]`}
        isOnlyGetToken
        appId={import.meta.env.VITE_PUBLIC_REACT_APP_GOOGLE || ""}
        // onLoginStart={onLoginStart}
        onResolve={(res: IResolveParams) => {
          console.log(res);
        }}
        onReject={(err: unknown) => {
          console.log(err);
        }}
      >
        <BtnLogin title={`حساب جوجل`} icon={iconGoogle} />
      </LoginSocialGoogle>
    </>
  );
}

export default BtnLoginAirData;
