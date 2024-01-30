import FiltersBtn from '../Btns/FiltersBtn';
import FiltersSearchAirline from '../Filters/FiltersSearchAirline';
import { iconFFilters } from '../../../../../assets/icons/home';

function FiltersAir() {
  return (
    <div className={`hidden lg:flex flex-col gap-[34px] items-end pe-[96px]`}>
      <FiltersBtn title="تصفية" icon={iconFFilters} />
      {/* Filters */}
      <FiltersSearchAirline />
    </div>
  );
}

export default FiltersAir
