import { useTranslation } from "react-i18next";
import { SchemaUser } from "../../pages/Auth/Login";
import { Chart } from "react-chartjs-2";

/*
 {
      openWebsite: { user_id: '65e18dcd097330f55e64a8e6', isGuest: false },
      _id: '65eaf8d95dffd96c107fcf99',
      search: [],
      chooseTicket: [],
      createdAt: '2024-03-08T11:39:05.577Z',
      updatedAt: '2024-03-08T11:39:05.577Z',
      __v: 0
    }
*/
function countUsersOnMonths(data: []) {
  let countJanuary = 0;
  let countFebruary = 0;
  let countMarch = 0;
  let countApril = 0;
  let countMay = 0;
  let countJune = 0;
  let countJuly = 0;
  let countAugust = 0;
  let countSeptember = 0;
  let countOctober = 0;
  let countNovember = 0;
  let countDecember = 0;
  data.map(({ createdAt }) => {
    switch (new Date(createdAt).getMonth()) {
      case 0:
        countJanuary += 1;
        break;
      case 1:
        countFebruary += 1;
        break;
      case 2:
        countMarch += 1;
        break;
      case 3:
        countApril += 1;
        break;
      case 4:
        countMay += 1;
        break;
      case 5:
        countJune += 1;
        break;
      case 6:
        countJuly += 1;
        break;
      case 7:
        countAugust += 1;
        break;
      case 8:
        countSeptember += 1;
        break;
      case 9:
        countOctober += 1;
        break;
      case 10:
        countNovember += 1;
        break;
      case 11:
        countDecember += 1;
        break;
    }
  });
  return {
    countJanuary,
    countFebruary,
    countMarch,
    countApril,
    countMay,
    countJune,
    countJuly,
    countAugust,
    countSeptember,
    countOctober,
    countNovember,
    countDecember,
  };
}

function MainChartsTop({
  allUsers,
  allUsersActive,
  allUsersUnActive,
  cashData,
}: {
  allUsers: SchemaUser[];
  allUsersActive: SchemaUser[];
  allUsersUnActive: SchemaUser[];
  cashData: { data: []; count: number };
}) {
  // Lang
  const { t, i18n } = useTranslation();

  const dataUsers = {
    labels: [t("Total Users"), t("Active Users"), t("Inactive Users")],
    datasets: [
      {
        data: [allUsers.length, allUsersActive.length, allUsersUnActive.length],
        backgroundColor: ["#005A6C", "#36A2EB", "#FF6384"],
      },
    ],
  };
  const optionsUsers = {
    cutout: "20%",
  };
  const dataChart = countUsersOnMonths(cashData.data);
  // Handle Data Cashing
  const dataTrips = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: `${t("Entries every month")}`,
        data: [
          dataChart.countJanuary,
          dataChart.countFebruary,
          dataChart.countMarch,
          dataChart.countApril,
          dataChart.countMay,
          dataChart.countJune,
          dataChart.countJuly,
          dataChart.countAugust,
          dataChart.countSeptember,
          dataChart.countOctober,
          dataChart.countNovember,
          dataChart.countDecember,
        ],
        backgroundColor: [
          "#117C99",
          "#005A6C",
          "#31B2E1",
          "#117C99",
          "#005A6C",
          "#31B2E1",
          "#117C99",
          "#005A6C",
          "#31B2E1",
          "#117C99",
          "#005A6C",
          "#31B2E1",
        ],
        barThickness: 20,
      },
    ],
  };

  return (
    <>
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2
          className="text-lg font-semibold mb-4"
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
        >
          {t("المستخدمين")}
        </h2>
        <Chart type="doughnut" data={dataUsers} options={optionsUsers} />
      </div>
      <div className="bg-white p-4 rounded-md  shadow-md lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Trips</h2>
        <Chart
          type="bar"
          data={dataTrips}
          // height={100}
          className=" "
          // options={{
          //   scales: {
          //     y: {
          //       suggestedMin: 1,
          //       suggestedMax: 600,
          //     },
          //   },
          // }}
        />
      </div>
      <div className="bg-white p-4 rounded-md  shadow-md lg:col-span-2">
        <h2 className="text-lg font-semibold mb-4">Trips</h2>
        <Chart
          type="bar"
          data={dataTrips}
          // height={100}
          className=" "
          // options={{
          //   scales: {
          //     y: {
          //       suggestedMin: 1,
          //       suggestedMax: 600,
          //     },
          //   },
          // }}
        />
      </div>
    </>
  );
}

export default MainChartsTop;
