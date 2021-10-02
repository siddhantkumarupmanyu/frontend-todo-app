export default class IndexOutOfBoundException extends Error {
    constructor() {
        super(`Index out of bound`);
    }
}