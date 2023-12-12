import { useRecoilState } from "recoil";
import Form from "./Form";
import {
  destinationSearch,
  textSearch,
} from "../data/RecoilState/FormHandling";

function HandleForm() {
  const [go] = useRecoilState(textSearch);
    const [ret] = useRecoilState(destinationSearch);
    // const getTravels = async () => {
    //     if (go && ret) {

    //     }
    // }
  return (
    <div className={`flex justify-between `}>
      <Form isOrigin={true} />
      <Form isOrigin={false} />
      <button className={`bg-green-300`} onClick={() => console.log(`go: ${go}, ret: ${ret}`)}>
        Show Values
      </button>
    </div>
  );
}

export default HandleForm;
