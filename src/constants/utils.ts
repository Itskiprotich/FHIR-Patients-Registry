export const calculateAge = (dob: string) => {
    const date = new Date(dob);
    if (!(date instanceof Date)) {
        return dob;
    }
    return `${Math.floor(
        (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365),
    )} Yrs old`;
};

export const getAvatarInitials = (textString: string) => {
    if (!textString) return '';
    const text = textString.trim();
    const textSplit = text.split(' ');
    if (textSplit.length <= 1) return text.charAt(0);
    const initials =
        textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);
    return initials;
};