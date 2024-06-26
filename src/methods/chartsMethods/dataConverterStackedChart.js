
export const dataConverterStackedChart = ({deals}) => {

  const series = [];

  deals.forEach((deal, index) => {
    // Extract the necessary data from the deal object
    const { BEGINDATE, OPPORTUNITY } = deal;
    
    // Extract the day of the week from the BEGINDATE (assuming BEGINDATE is in ISO format)
    const dayOfWeek = new Date(BEGINDATE).getDay();

    // Push the transformed object into the series array
    series.push({ x: dayOfWeek + 1, yval: parseFloat(OPPORTUNITY) });
  });

  return series;
}

