export function LineBreaker (text: string) {
    if(!text) return null

    if(text.length > 25) {
        const brokenText = text.slice(0, 25) + " " + "...";
        return brokenText;
    } else {
        return text
    }
}