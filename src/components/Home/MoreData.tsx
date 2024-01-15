
function MoreData() {
  return (
    <div className={`flex gap-[44px]`}>
      <div className={`flex gap-[12px]`}>
        <input id="travelNotStope" type="checkbox" />
        <label htmlFor="travelNotStope" className={`text-[14.957px] text-[#FFF] font-[400]`}>رحلات بدون توقف</label>
      </div>
      <div className={`flex gap-[12px]`}>
        <input id="travelOptions" type="checkbox" />
        <label htmlFor="travelOptions" className={`text-[14.957px] text-[#FFF] font-[400]`}>تواريخ مرنة 3 ايام</label>
      </div>
    </div>
  );
}

export default MoreData
