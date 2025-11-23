export function DateGenerator (date?: string) {
    if(!date) return

    const updatedDate = new Date(date);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const formatted = `${updatedDate.getDate()} ${months[updatedDate.getMonth()]} ${updatedDate.getFullYear()}`

    return formatted
}