export function GetGenderLabel (genderId?: number) {
    if(genderId === 1) return "Not set / not specified";
    if(genderId === 1) return "Female";
    if(genderId === 2) return "Male";
    if(genderId === 3) return "Non-binary";
    return "Unknown"
}