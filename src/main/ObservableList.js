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

    removeAt(index) {
        this.#list.splice(index, 1)
        this._notifyListeners()
    }

    removeItem(item, areEqual) {
        for (let i = 0; i < this.#list.length; i++) {
            if (areEqual(item, this.#list[i])) {
                return this.removeAt(i)
            }
        }
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