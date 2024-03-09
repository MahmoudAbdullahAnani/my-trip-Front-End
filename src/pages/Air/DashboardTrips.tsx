import { Chart } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

/*
  allUsers,
  allUsersActive,
  allUsersUnActive,
}: {
  allUsers: SchemaUser[];
  allUsersActive: SchemaUser[];
  allUsersUnActive: SchemaUser[];
}
*/
function countSearches(data: []) {
  let countSearch = 0;
  let countChoose = 0;
  data.map(({ search, chooseTicket }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    countSearch += search.length;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    countChoose += chooseTicket.length;
  });
  return {
    countSearch,
    countChoose,
  };
}
function DashboardTrips({
  cashData,
}: {
  cashData: { data: []; count: number };
}) {
  // Lang
  const { t, i18n } = useTranslation();

  // Searches
  const dataChartSearch = countSearches(cashData.data);
  const dataSearches = {
    labels: [t("بحث عن رحلات"), t("اختيار تذكرة")],
    datasets: [
      {
        data: [
          dataChartSearch.countSearch,
          dataChartSearch.countChoose - dataChartSearch.countChoose / 2,
        ],
        backgroundColor: ["#005A6C", "#36A2EB", "#FF6384"],
      },
    ],
  };
  const optionsSearches = {
    cutout: "20%",
  };
  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2
          className="text-lg font-semibold mb-4"
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
        >
          {t("عمليات البحث")}
        </h2>
        <Chart type="doughnut" data={dataSearches} options={optionsSearches} />
      </div>
    </>
  );
}

export default DashboardTrips;
