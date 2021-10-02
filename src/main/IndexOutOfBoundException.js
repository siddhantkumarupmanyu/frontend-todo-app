export default class IndexOutOfBoundException extends Error {
    constructor(itemType) {
        super(`Index out of bound`);
    }
}