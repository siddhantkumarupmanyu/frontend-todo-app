export class AbstractMethodException extends Error {
    constructor(methodName) {
        super(`Abstract Method/Function '${methodName}' must be implemented.`);
    }
}

export class AbstractClassException extends Error {
    constructor(className) {
        super(`Abstract class '${className}' can't be instantiated.`);
    }
}