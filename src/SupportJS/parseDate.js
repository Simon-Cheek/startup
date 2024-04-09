export function setDueDate(dateString) {
    // dateString = yyyy-mm-dd
    let year = dateString.slice(0, 4);
    let month = dateString.slice(5, 7);
    let day = dateString.slice(-2);
    const date = new Date(year, parseInt(month - 1), parseInt(day), 23, 59, 59);
    return date;
}