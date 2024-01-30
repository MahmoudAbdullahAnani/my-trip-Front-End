function FiltersBtn({
  title,
  icon,
  drawer,
}: {
  title: string;
  icon: JSX.Element;
  drawer?: JSX.Element;
}) {
  return (
    <div
      className={`text-[#000] text-[24px] font-[700] flex gap-[0px] justify-center items-center bg-[#FFF] p-[10px] rounded-[16px] h-[48px] w-[188px]`}
    >
      {drawer && <span>{drawer}</span>}
      <span className={`${drawer&&"ms-[16px] me-[8px]"} me-[7px]`}>{title}</span>
      <span>{icon}</span>
    </div>
  );
}

export default FiltersBtn;
