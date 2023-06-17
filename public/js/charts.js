const ctx = document.getElementById("expensesByWeek");
const ctx2 = document.getElementById("ingresosVsGastos");

if (ctx) {
  $.get("/transactions/charts", (data) => {
    if (data.weekExpenses) {
      // eslint-disable-next-line no-undef
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: data.weekExpenses.labels,
          datasets: [
            {
              label: "Gastos por semana",
              data: data.weekExpenses.data,
              backgroundColor: ["rgb(255, 99, 132)"],
              borderColor: ["rgb(255, 99, 132)"],
              borderWidth: 1,
            },
          ],
        },
      });
    }

    if (ctx2 && data.incomesVsExpenses) {
      // eslint-disable-next-line no-undef
      new Chart(ctx2, {
        type: "doughnut",
        data: {
          labels: data.incomesVsExpenses.labels,
          datasets: [
            {
              label: "Ingresos vs Gastos",
              data: data.incomesVsExpenses.data,
              backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
              hoverOffset: 4,
            },
          ],
        },
      });
    }
  });
}
