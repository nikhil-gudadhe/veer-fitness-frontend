// export const getExcerpt = (text: string, wordLimit: number): string => {
//     const words = text.split(' ');
//     if (words.length > wordLimit) {
//         return words.slice(0, wordLimit).join(' ') + '...';
//     }
//     return text;
// }

export const getExcerpt = (text: string = '', wordLimit: number): string => {
    // Check if the text is valid
    if (!text || typeof text !== 'string') {
        return '';
    }

    const words = text.split(' ');

    // If the text is shorter than the word limit, return it as is
    if (words.length <= wordLimit) {
        return text;
    }

    // Otherwise, return the truncated text with an ellipsis
    return words.slice(0, wordLimit).join(' ') + '...';
}