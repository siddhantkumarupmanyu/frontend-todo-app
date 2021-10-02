import ObservableList from "../main/ObservableList";

test("push", (done) => {
    const list = new ObservableList()
    list.addListener((newList) => {
        expect(newList[0]).toEqual("item1")
        done()
    })

    list.push("item1")
})

test("getList", () => {
    const list = new ObservableList()
    list.push("item1")

    const innerList = list.getList()
    expect(innerList[0]).toEqual("item1")
})

test("insertAtIndex", (done) => {
    const list = new ObservableList()
    let count = 0
    list.addListener((newList) => {
        if (count !== 2) {
            count++
            return
        }
        expect(newList[0]).toEqual("item0")
        expect(newList[1]).toEqual("updatedItem")
        done()
    })

    list.push("item0")
    list.push("item1")
    list.insert("updatedItem", 1)
})


test("removeAt", (done) => {
    const list = new ObservableList()
    let count = 0
    list.addListener((newList) => {
        if (count !== 3) {
            count++
            return
        }
        expect(newList[0]).toEqual("item0")
        expect(newList[1]).toEqual("item2")
        done()
    })

    list.push("item0")
    list.push("item1")
    list.push("item2")

    list.removeAt(1)
})

test("removeItem", (done) => {
    const list = new ObservableList()
    let count = 0
    list.addListener((newList) => {
        if (count !== 3) {
            count++
            return
        }
        expect(newList[0]).toEqual("item0")
        expect(newList[1]).toEqual("item2")
        done()
    })

    list.push("item0")
    list.push("item1")
    list.push("item2")

    list.removeItem("item1", (item1, item2) => (item1 === item2))
})