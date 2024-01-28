function MoreData() {
  return (
    <div className={`flex gap-[44px] ms-5 py-[10px]`}>
      <div className={`flex gap-[12px]`}>
        <label
          htmlFor="travelNotStope"
          className={`text-[14.957px] text-[#FFF] font-[400] containerCheckBox`}
        >
          <input id="travelNotStope" type="checkbox" />
          <span className="checkmark after:left-0"></span>
          <span className={`text-[#117C99] lg:text-[#FFF]`}>
            رحلات بدون توقف
          </span>
        </label>
      </div>
      <div className={`flex gap-[12px]`}>
        <label
          htmlFor="travelOptions"
          className={`text-[14.957px] text-[#FFF] font-[400] containerCheckBox`}
        >
          <span className={`text-[#117C99] lg:text-[#FFF] flex`}>
            تواريخ مرنة 3
            <div className={`flex flex-col justify-center items-center`}>
              <span>+</span>
              <span className={`relative bottom-[16px]`}>-</span>
            </div>
              ايام
          </span>
          <input id="travelOptions" type="checkbox" />
          <span className="checkmark after:left-0"></span>
        </label>
      </div>
    </div>
  );
}

export default MoreData;
