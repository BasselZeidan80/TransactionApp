import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import axios from "axios";
import { useQuery } from "react-query";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function TransactionChart({ filteredTransactions, selectedCustomerId, chartType }) {
  const getCustomers = async () => {
    const response = await axios.get(`http://localhost:3002/customers`);
    return response.data;
  };

  const { data: customers, isLoading: isLoadingCustomers } = useQuery("customers", getCustomers);

  // const getCustomerName = (customerId) => {
  //   const customer = customers.find((c) => c.id == customerId);
  //   return customer ? customer.name : "Unknown";
  // };

  const customerTransactions = filteredTransactions.filter(transaction => transaction.customer_id == selectedCustomerId);

  const chartData = {
    labels: customerTransactions.map(transaction => transaction.date),
    datasets: [
      {
        label: "Transaction Amount",
        data: customerTransactions.map(transaction => transaction.amount),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transaction Chart',
      },
    },
  };

  if (isLoadingCustomers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {chartType === "line" ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <Bar data={chartData} options={chartOptions} />
      )}
    </div>
  );
}
