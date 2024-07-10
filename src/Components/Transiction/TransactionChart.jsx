import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function Transiction({
  filteredTransactions,
  selectedCustomerId,
}) {
  const chartRef = useRef(null);

  const aggregateTransactionsByDay = () => {
    const aggregatedData = {};

    filteredTransactions.forEach((transaction) => {
      if (
        selectedCustomerId === null ||
        transaction.customer_id == selectedCustomerId
      ) {
        const date = transaction.date.split("T")[0];
        if (!aggregatedData[date]) {
          aggregatedData[date] = 0;
        }
        aggregatedData[date] += parseFloat(transaction.amount);
      }
    });

    return aggregatedData;
  };

  const prepareChartData = () => {
    const aggregatedData = aggregateTransactionsByDay();
    const labels = Object.keys(aggregatedData);
    const data = Object.values(aggregatedData);
    return { labels, data };
  };

  useEffect(() => {
    const { labels, data } = prepareChartData();

    if (chartRef.current) {
      if (chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartRef.current.chartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Total Amount",
              data,
              fill: false,
              borderColor: "#4fa94d",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              title: {
                display: true,
                text: "Total Amount",
              },
            },
          },
        },
      });
    }
  }, [filteredTransactions, selectedCustomerId]);

  return (
    <div className="w-full rounded-lg shadow-lg overflow-hidden">
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
}
