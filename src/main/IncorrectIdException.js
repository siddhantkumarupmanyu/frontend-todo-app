export default class IncorrectIdException extends Error {
    constructor(itemType) {
        super(`${itemType} item Contains Wrong Id`);
    }
}