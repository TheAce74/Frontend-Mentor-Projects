$(document).ready(function () {
  const root = document.querySelector(":root");

  const softRed = getComputedStyle(root).getPropertyValue("--soft-red").trim();

  const fadedSoftRed = getComputedStyle(root)
    .getPropertyValue("--faded-soft-red")
    .trim();

  const cyan = getComputedStyle(root).getPropertyValue("--cyan").trim();

  const fadedCyan = getComputedStyle(root)
    .getPropertyValue("--faded-cyan")
    .trim();

  const darkBrown = getComputedStyle(root)
    .getPropertyValue("--dark-brown")
    .trim();

  const paleOrange = getComputedStyle(root)
    .getPropertyValue("--very-pale-orange")
    .trim();

  const backgrounds = [
    softRed,
    softRed,
    softRed,
    softRed,
    softRed,
    softRed,
    softRed,
  ];

  const fadedBackgrounds = [
    fadedSoftRed,
    fadedSoftRed,
    fadedSoftRed,
    fadedSoftRed,
    fadedSoftRed,
    fadedSoftRed,
    fadedSoftRed,
  ];

  const day = new Date().getDay();

  if (day === 0) {
    backgrounds[backgrounds.length - 1] = cyan;
    fadedBackgrounds[fadedBackgrounds.length - 1] = fadedCyan;
  } else {
    backgrounds[day - 1] = cyan;
    fadedBackgrounds[day - 1] = fadedCyan;
  }

  const labels = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  const data = [17.45, 34.91, 52.36, 31.07, 23.39, 43.28, 25.48];

  const ctx = $("#myChart");

  const myChart = new Chart(ctx, {
    type: "bar",

    data: {
      labels: labels,

      datasets: [
        {
          data: data,
          backgroundColor: backgrounds,
          borderSkipped: false,
          borderRadius: 6,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          display: false,
        },

        tooltip: {
          backgroundColor: darkBrown,
          displayColors: false,
          titleAlign: "center",
          titleColor: paleOrange,
          titleMarginBottom: 0,
          titleFont: {
            size: 15,
            weight: 550,
          },
          padding: 8,
          callbacks: {
            title: (context) => {
              return `$${context[0].dataset.data[context[0].dataIndex]}`;
            },
            label: () => {
              return "";
            },
          },
          yAlign: "bottom",
          xAlign: "center",
          caretSize: 0,
          caretPadding: 8,
        },
      },

      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },

        y: {
          display: false,
        },
      },

      elements: {
        bar: {
          hoverBackgroundColor: fadedBackgrounds,
        },
      },
    },
  });
});
