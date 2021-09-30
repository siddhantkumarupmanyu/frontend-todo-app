export default class ObservableList {

    #list
    #listeners

    constructor() {
        this.#list = []
        this.#listeners = []
    }

    addListener(listener) {
        this.#listeners.push(listener)
    }

    push(item) {
        this.#list.push(item)
        this._notifyListeners()
    }

    insert(item, index) {
        this.#list[index] = item
        this._notifyListeners()
    }

    getList() {
        return this.#list
    }

    _notifyListeners() {
        for (const listener of this.#listeners) {
            listener(this.#list)
        }
    }
}