import { atom } from "recoil";
import { exampleDataCurrency } from "./ExampleData";

const StoreCurrency = atom({
  key: "StoreCurrency",
  default: exampleDataCurrency,
});
export { StoreCurrency };
