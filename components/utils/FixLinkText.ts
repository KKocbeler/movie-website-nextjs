export function FixLinkText (text: string) {
    if(!text) return "";

    const fixedText = encodeURIComponent(text.toLowerCase().trim());

    return fixedText;
}