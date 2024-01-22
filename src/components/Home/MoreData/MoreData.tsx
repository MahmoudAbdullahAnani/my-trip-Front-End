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
          <span> رحلات بدون توقف</span>
        </label>
      </div>
      <div className={`flex gap-[12px]`}>
        <label
          htmlFor="travelOptions"
          className={`text-[14.957px] text-[#FFF] font-[400] containerCheckBox`}
        >
          <span> تواريخ مرنة 3 ايام</span>
          <input id="travelOptions" type="checkbox" />
          <span className="checkmark after:left-0"></span>
        </label>
      </div>
    </div>
  );
}

export default MoreData;
