
export default class NoItemFoundException extends Error {
    constructor() {
        super(`No Item Found`);
    }
}