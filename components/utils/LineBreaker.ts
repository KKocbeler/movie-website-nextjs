export function LineBreaker (text: string, length: number = 25) {
    if(!text) return null

    if(text.length > length) {
        const brokenText = text.slice(0, length) + " " + "...";
        return brokenText;
    } else {
        return text
    }
}