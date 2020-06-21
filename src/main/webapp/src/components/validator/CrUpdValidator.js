export const required = value => {
    if (value) return undefined;
    return 'Please fill out the required field';
}