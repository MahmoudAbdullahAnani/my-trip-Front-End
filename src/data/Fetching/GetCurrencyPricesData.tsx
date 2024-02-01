import axios from "axios";
import { useRecoilState } from "recoil";
import { StoreCurrency } from "./StoreCurrency";

const GetCurrencyPricesData = async () => {
  const [, SetStoreCurrency] = useRecoilState(StoreCurrency);
  const { data } = await axios.get(
    `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${
      import.meta.env.VITE_PUBLIC_CURRENCY_MAHMOUD_ABDULLAH
    }`
  );
  return SetStoreCurrency(data);
};

export { GetCurrencyPricesData };
