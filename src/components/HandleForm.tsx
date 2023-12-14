import { useRecoilState } from "recoil";
// import Form from "./Form";
import {
  dateGo,
  dateReturn,
  destinationSearch,
  textSearch,
} from "../data/RecoilState/FormHandling";
import { useState } from "react";
import TypeTravelComponent from "./TypeTravelComponent";
import HandleFieldsData from "./HandleFieldsData";

function HandleForm({ oneWay = false }: { oneWay: boolean }) {
  const [go] = useRecoilState(textSearch);
  const [ret] = useRecoilState(destinationSearch);
  const [, setOriginCodeState] = useState("");
  const [, setReturnCodeState] = useState("");
  // console.log(originCodeState);
  // console.log(returnCodeState);
  // Get Date
  const [dateGoState] = useRecoilState(dateGo);
  const [dateRet] = useRecoilState(dateReturn);

  const getTravels = () => {
    let goStack: string = "";
    let returnStack: string = "";
    if (go) {
      const startIndex = go.indexOf("(");
      const endIndex = go.indexOf(")");
      const originCode = go.slice(startIndex + 1, endIndex);
      goStack = originCode;
      setOriginCodeState(originCode);
    }
    if (ret) {
      const startIndex = ret.indexOf("(");
      const endIndex = ret.indexOf(")");
      const originCode = ret.slice(startIndex + 1, endIndex);
      returnStack = originCode;
      setReturnCodeState(originCode);
    }

    console.log(`
    Origin: ${goStack}
    Destination: ${returnStack}
    Date Go: ${dateGoState}
    Date Return: ${dateRet}
    `);
  };

  if (oneWay) {
    return (
      <div className={`flex justify-between `}>
        {/* Field Return City or end go*/}
        {/* <Form isOrigin={true} /> */}
        <TypeTravelComponent />
        <HandleFieldsData />
        {/* Get Travels*/}
        <button className={`bg-green-300`} onClick={() => getTravels()}>
          Show Values
        </button>
      </div>
    );
  }
  return (
    <div className={`flex justify-between `}>
      {/* Field Origin City or start go*/}
      {/* <Form isOrigin={true} /> */}
      {/* Field Return City or end go*/}
      {/* <Form isOrigin={false} /> */}
      <TypeTravelComponent />
      <HandleFieldsData />
      {/* Get Travels*/}
      <button className={`bg-green-300`} onClick={() => getTravels()}>
        Show Values
      </button>
    </div>
  );
}

export default HandleForm;
