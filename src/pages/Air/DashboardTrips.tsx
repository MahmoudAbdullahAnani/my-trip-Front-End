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
  cutout: "50%",
};
const dataTrips = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Dataset 1",
      data: [33, 53, 85, 41, 44, 65],
      backgroundColor: "#000",
      barThickness: 20,
    },
  ],
};
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <Chart type="doughnut" data={dataUsers} options={optionsUsers} />
      </div>

      <div className="bg-white p-4 rounded-md shadow-md ">
        <h2 className="text-lg font-semibold mb-4">Trips</h2>
        <Chart type="bar" data={dataTrips} />
      </div>
    </div>
  );
}

export default DashboardTrips;
