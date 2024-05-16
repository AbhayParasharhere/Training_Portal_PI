export default function filterSalesByEndDate(salesData) {
  // Function to convert date string to Date object
  const toDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  // Get current date
  const currentDate = new Date();

  // Filter sales that have already ended or are going to end in the next 7 days
  const endedSales = salesData.filter(
    (sale) => toDate(sale.end_date) < currentDate
  );
  const salesEndingSoon = salesData.filter((sale) => {
    const endDate = toDate(sale.end_date);
    return (
      currentDate <= endDate &&
      endDate <= new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
  });

  // Combine the two filtered arrays into a single array
  const combinedSales = endedSales.concat(salesEndingSoon);

  return combinedSales;
}
