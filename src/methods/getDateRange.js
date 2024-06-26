
// call this function for getting time period in proper format
export function getDateRange(option) {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const date = now.getDate().toString().padStart(2, '0');
    const day = now.getDay();
    
    const startOfDay = `${year}-${month}-${date} 00:00:00`;
    const endOfDay = `${year}-${month}-${date} 23:59:59`;

    let startDate, endDate;

    if (option === "today") {
        startDate = startOfDay;
        endDate = endOfDay;
    } else if (option === "week") {
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - day + (day === 0 ? -6 : 1)); // Adjust when day is Sunday (0)
        const startWeekYear = firstDayOfWeek.getFullYear();
        const startWeekMonth = (firstDayOfWeek.getMonth() + 1).toString().padStart(2, '0');
        const startWeekDate = firstDayOfWeek.getDate().toString().padStart(2, '0');
        startDate = `${startWeekYear}-${startWeekMonth}-${startWeekDate} 00:00:00`;
        endDate = endOfDay;
    } else if (option === "month") {
        startDate = `${year}-${month}-01 00:00:00`;
        endDate = endOfDay;
    } else {
        throw new Error("Invalid option. Use 'today', 'week', or 'month'.");
    }

    return { startDate, endDate };
}
