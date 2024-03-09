import { Chart } from "react-chartjs-2";

function DashboardTrips() {
  const dataUsers = {
    labels: ["Active Users", "Inactive Users"],
    datasets: [
      {
        data: [15, 5],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const optionsUsers = {
    cutout: "20%",
  };
  const dataTrips = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Dataset 1",
        data: [33, 53, 85, 41, 44, 65],
        backgroundColor: ["#117C99", "#005A6C", "#31B2E1"],
        barThickness: 40,
      },
    ],
  };
  const dataLine = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Dataset 1",
        data: [33, 53, 85, 41, 44, 65],
        borderColor: "#000",
        fill: false,
      },
    ],
  };
  const optionsTrips = {
    elements: {
      line: {
        tension: 0,
      },
    },
  };
 const dataExpenses = {
   labels: ["Food", "Rent", "Utilities", "Entertainment", "Others"],
   datasets: [
     {
       data: [300, 800, 200, 150, 100],
       backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0", "#9966FF"],
     },
   ],
 };
  const dataComparison = {
    datasets: [
      {
        label: "Dataset 1",
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 25 },
          { x: 20, y: 30 },
          { x: 25, y: 35 },
        ],
        backgroundColor: "#FFCE56",
      },
      {
        label: "Dataset 2",
        data: [
          { x: 12, y: 22 },
          { x: 17, y: 27 },
          { x: 22, y: 32 },
          { x: 27, y: 37 },
        ],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const optionsComparison = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
      y: {
        type: "linear",
        position: "left",
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <Chart type="doughnut" data={dataUsers} options={optionsUsers} />
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">line</h2>
        <Chart
          type="scatter"
          data={dataComparison}
          options={optionsComparison}
        />
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">line</h2>
        <Chart type="polarArea" data={dataExpenses} />
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">line</h2>
        <Chart type="radar" data={dataTrips} options={optionsTrips} />
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">line</h2>
        <Chart type="line" data={dataLine} />
      </div>

      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Trips</h2>
        <Chart
          type="bar"
          data={dataTrips}
          // height={100}
          className=" "
          // options={{ maintainAspectRatio: true }}
        />
      </div>
    </div>
  );
}

export default DashboardTrips;
