import axios from "axios";
import querystring from "query-string";

// x-www-form-urlencoded
const formData = querystring.stringify({
  client_id: import.meta.env.VITE_PUBLIC_CLIENT_ID,
  client_secret: import.meta.env.VITE_PUBLIC_CLIENT_SECRET,
  grant_type: import.meta.env.VITE_PUBLIC_GRANT_TYPE,
});
export async function getTokenForAmadeus() {
  console.log('loading Get Token for Amadeus...');
  
  const api = import.meta.env.VITE_PUBLIC_API_TOKEN_ACCOUNT;
  const res = await axios.post(api, formData, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  //   console.log("access_token==> ", res.data.access_token);

  return res.data.access_token;
}

// async function GetTokenAmadeus(): Promise<string> {
//   // console.log(res.data.access_token);
// }
