export default class SameIdDifferentValueException extends Error {
    constructor() {
        super("Value Object with Same Id but Different Values");
    }
}