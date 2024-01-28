import { Link } from "react-router-dom";

interface DataInterface {
  id: number;
  mainImage: string;
  titleAR: string;
  titleEN: string;
  link: string;
}
function PopularDestinationsCard({
  mainImage,
  titleAR,
  titleEN,
  link,
}: DataInterface) {
  return (
    <Link to={link} className={``}>
      <img
        className={`h-full object-fill `}
        src={mainImage}
        // width={100}
        // height={100}
      />
      <div
        className={`flex flex-col sm:gap-[21px] gap-[1px] items-center justify-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
      >
        <span>{titleAR}</span>
        <span>{titleEN}</span>
      </div>
    </Link>
  );
}

export default PopularDestinationsCard;
