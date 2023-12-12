import { useRecoilState } from "recoil";
import Form from "./Form";
import {
  dateGo,
  dateReturn,
  destinationSearch,
  textSearch,
} from "../data/RecoilState/FormHandling";
import { useState } from "react";

function HandleForm() {
  const [go] = useRecoilState(textSearch);
  const [ret] = useRecoilState(destinationSearch);
  const [originCodeState, setOriginCodeState] = useState("");
  const [returnCodeState, setReturnCodeState] = useState("");
  // console.log(originCodeState);
  // console.log(returnCodeState);
  // Get Date
  const [dateGoState] = useRecoilState(dateGo);
  const [dateRet] = useRecoilState(dateReturn);

  const getTravels = () => {
    if (go) {
      const startIndex = go.indexOf("(");
      const endIndex = go.indexOf(")");
      const originCode = go.slice(startIndex + 1, endIndex);
      setOriginCodeState(originCode);
    }
    if (ret) {
      const startIndex = ret.indexOf("(");
      const endIndex = ret.indexOf(")");
      const originCode = ret.slice(startIndex + 1, endIndex);
      setReturnCodeState(originCode);
    }
    console.log(`
    Origin: ${originCodeState}
    Destination: ${returnCodeState}
    Date Go: ${dateGoState}
    Date Return: ${dateRet}
    

    `);
  };
  return (
    <div className={`flex justify-between `}>
      {/* Field Origin City or start go*/}
      <Form isOrigin={true} />
      {/* Field Return City or end go*/}
      <Form isOrigin={false} />

      {/* Get Travels*/}
      <button className={`bg-green-300`} onClick={() => getTravels()}>
        Show Values
      </button>
    </div>
  );
}

export default HandleForm;
