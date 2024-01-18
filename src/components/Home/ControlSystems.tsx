import { useRecoilState } from "recoil";
import { typeSystem } from "../../data/RecoilState/FormHandling";

const dataSystems = [
  {
    title: "التوصيل",

    name: "car",
    iconActive: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 7.99999L19 9.99999L17.5 6.29999C17.3585 5.92133 17.1057 5.59442 16.7747 5.36235C16.4437 5.13028 16.0502 5.00394 15.646 4.99999H8.4C7.9925 4.99063 7.59188 5.10601 7.25177 5.33066C6.91166 5.55531 6.64832 5.87852 6.497 6.25699L5 9.99999L3 7.99999"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 14H7.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 14H17.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 10H5C3.89543 10 3 10.8954 3 12V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V12C21 10.8954 20.1046 10 19 10Z"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 18V20"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 18V20"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M21 7.99999L19 9.99999L17.5 6.29999C17.3585 5.92133 17.1057 5.59442 16.7747 5.36235C16.4437 5.13028 16.0502 5.00394 15.646 4.99999H8.4C7.9925 4.99063 7.59188 5.10601 7.25177 5.33066C6.91166 5.55531 6.64832 5.87852 6.497 6.25699L5 9.99999L3 7.99999"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 14H7.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 14H17.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 10H5C3.89543 10 3 10.8954 3 12V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V12C21 10.8954 20.1046 10 19 10Z"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5 18V20"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 18V20"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "الفنادق",

    name: "hotel",
    iconActive: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V4C20 3.46957 19.7893 2.96086 19.4142 2.58579C19.0391 2.21071 18.5304 2 18 2Z"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 16L9.348 15.76C10.813 14.747 13.188 14.747 14.652 15.76L15 16"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 7H8.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 7H16.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7H12.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11H12.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 11H16.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11H8.01"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 22V15.5M14 15.5V22"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V4C20 3.46957 19.7893 2.96086 19.4142 2.58579C19.0391 2.21071 18.5304 2 18 2Z"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 16L9.348 15.76C10.813 14.747 13.188 14.747 14.652 15.76L15 16"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 7H8.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 7H16.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 7H12.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 11H12.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 11H16.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11H8.01"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 22V15.5M14 15.5V22"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "الطياران",

    name: "air",
    iconActive: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.8 19.2L16 11L19.5 7.5C21 6 21.5 4 21 3C20 2.5 18 3 16.5 4.5L13 8L4.8 6.2C4.3 6.1 3.9 6.3 3.7 6.7L3.4 7.2C3.2 7.7 3.3 8.2 3.7 8.5L9 12L7 15H4L3 16L6 18L8 21L9 20V17L12 15L15.5 20.3C15.8 20.7 16.3 20.8 16.8 20.6L17.3 20.4C17.7 20.1 17.9 19.7 17.8 19.2Z"
          stroke="#117C99"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.8 19.2L16 11L19.5 7.5C21 6 21.5 4 21 3C20 2.5 18 3 16.5 4.5L13 8L4.8 6.2C4.3 6.1 3.9 6.3 3.7 6.7L3.4 7.2C3.2 7.7 3.3 8.2 3.7 8.5L9 12L7 15H4L3 16L6 18L8 21L9 20V17L12 15L15.5 20.3C15.8 20.7 16.3 20.8 16.8 20.6L17.3 20.4C17.7 20.1 17.9 19.7 17.8 19.2Z"
          stroke="#4F4F4F"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

function ControlSystems() {
  const [typeSystemState, setTypeSystemState] = useRecoilState(typeSystem);
  return (
    <>
      <div className={`sm:flex hidden justify-end gap-[24px]  `}>
        {dataSystems.map(({ name, title, iconActive, icon }) => (
          <div
            key={`${name}-${Math.random()}`}
            onClick={() => setTypeSystemState(name)}
            style={{
              fill: "rgba(182, 231, 251, 0.30)",
              strokeWidth: "1px",
              stroke: "#FFF",
              backdropFilter: "blur(20px)",
            }}
            className={`${
              typeSystemState === name
                ? "text-[#117C99] text-[20px] h-[calc(48px+6px)]  font-[700] rounded-[17px] rounded-b-[0px] border border-[#FFF] border-1 border-b-0"
                : "text-[#4F4F4F] text-[14px] h-[calc(48px)] font-[600] rounded-[17px] border border-[#FFF] border-1"
            } text-center gap-[10px] w-[146px] bg-[#b6e7fb29] hover:bg-[#b6e7fb48] hover:text-[#117C99]  cursor-pointer flex justify-center items-center `}
          >
            {title}
            {typeSystemState === name ? <>{iconActive} </> : <>{icon}</>}
          </div>
        ))}
      </div>
      {/* <div className={`w-[100%] h-[8px] relative `}>
        <div
          style={{
            // fill: "rgba(182, 231, 251, 0.30)",
            // strokeWidth: "1px",
            // stroke: "#FFF",
            backdropFilter: "blur(20px)",
          }}
          className={`roundedTop sm:block hidden w-[146px] h-[107%] bg-[#b6e7fb29] border border-1 border-[#FFF] border-y-0 absolute right-0`}
        ></div>
      </div> */}
    </>
  );
}

export default ControlSystems;
