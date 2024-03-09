import { Chart } from "react-chartjs-2";

const data = {
  labels: ["January", "February", "March", "April", "May", "June"],
  datasets: [
    {
      label: "Dataset 1",
      data: [33, 53, 85, 41, 44, 65],
      backgroundColor: "#000",
      // barThickness: 20,
    },
  ],
};
function DashboardTrips() {
  return (
    <div className={`flex`}>
      <Chart className="" type="pie" data={data} />
    </div>
  );
}

export default DashboardTrips;
