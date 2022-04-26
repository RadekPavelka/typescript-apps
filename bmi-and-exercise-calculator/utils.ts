export const isArrayOfNumbers = (array: any): boolean => {
    return Array.isArray(array) && array.length > 0 && array.every(item => typeof item === "number");
};