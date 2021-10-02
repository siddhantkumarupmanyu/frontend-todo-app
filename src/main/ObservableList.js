import IndexOutOfBoundException from "./IndexOutOfBoundException";
import NoItemFoundException from "./NoItemFoundException";

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

    updateAt(index, item) {
        // should fast-fail; i.e. require()
        if ((index < 0) || (index >= this.#list.length)) {
            throw new IndexOutOfBoundException()
        }
        this.#list[index] = item
        this._notifyListeners()
    }

    updateItem(currentItem, areEqual, updatedItem) {
        const index = this._getItemIndex(currentItem, areEqual)
        return this.updateAt(index, updatedItem)
    }

    removeAt(index) {
        // should fast-fail; i.e. require()
        if ((index < 0) || (index >= this.#list.length)) {
            throw new IndexOutOfBoundException()
        }
        this.#list.splice(index, 1)
        this._notifyListeners()
    }

    removeItem(item, areEqual) {
        const index = this._getItemIndex(item, areEqual)
        return this.removeAt(index)
    }

    _getItemIndex(item, areEqual) {
        for (let i = 0; i < this.#list.length; i++) {
            if (areEqual(item, this.#list[i])) {
                return i
            }
        }
        throw new NoItemFoundException()
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