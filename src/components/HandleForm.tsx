import { useRecoilState } from "recoil";
import Form from "./Form";
import {
  destinationSearch,
  textSearch,
} from "../data/RecoilState/FormHandling";
import { useState } from "react";

function HandleForm() {
  const [go] = useRecoilState(textSearch);
  const [ret] = useRecoilState(destinationSearch);
  const [originCodeState, setOriginCodeState] = useState("");
  const [returnCodeState, setReturnCodeState] = useState("");
  console.log(originCodeState);
  console.log(returnCodeState);

  const getTravels = async () => {
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
  };
  return (
    <div className={`flex justify-between `}>
      <Form isOrigin={true} />
      <Form isOrigin={false} />
      <button className={`bg-green-300`} onClick={() => getTravels()}>
        Show Values
      </button>
    </div>
  );
}

export default HandleForm;
