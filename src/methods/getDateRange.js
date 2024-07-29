export function getDateRange(option) {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const day = now.getDay();
  
    const startOfDay = `${year}-${month}-${date} 00:00:00`;
    const endOfDay = `${year}-${month}-${date} 23:59:59`;
  
    let startDate, endDate, dateType;
  
    if (option === "today") {
      startDate = startOfDay;
      endDate = endOfDay;
      dateType = 'day';
    } else if (option === "week") {
      const firstDayOfWeek = new Date(now);
      firstDayOfWeek.setDate(now.getDate() - day + (day === 0 ? -6 : 1)); // Adjust when day is Sunday (0)
      const startWeekYear = firstDayOfWeek.getFullYear();
      const startWeekMonth = (firstDayOfWeek.getMonth() + 1).toString().padStart(2, '0');
      const startWeekDate = firstDayOfWeek.getDate().toString().padStart(2, '0');
      startDate = `${startWeekYear}-${startWeekMonth}-${startWeekDate} 00:00:00`;
      endDate = endOfDay;
      dateType = 'week';
    } else if (option === "month") {
      startDate = `${year}-${month}-01 00:00:00`;
      endDate = endOfDay;
      dateType = 'month';
    } else if (option === "year") {
      startDate = `${year}-01-01 00:00:00`;
      endDate = `${year}-12-31 23:59:59`;
      dateType = 'year';
    } else {
      throw new Error("Invalid option. Use 'today', 'week', 'month', or 'year'.");
    }
  
    return { startDate, endDate, dateType };
  }