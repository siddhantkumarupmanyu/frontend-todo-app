import {getListDiff} from "../../../main/ui/ui_utils/ListDiff";

test("itemsAddedInBetween", () => {
    const oldList = [1, 2, 3, 4, 5, 6]
    const newList = [1, 2, 3, 7, 8, 4, 9, 5, 10, 6]

    const listWithDiff = getListDiff(oldList, newList, (p1, p2) => (p1 === p2))
    
    expect(listWithDiff).toEqual([
        {item: 1, diff: ""},
        {item: 2, diff: ""},
        {item: 3, diff: ""},
        {item: 7, diff: "add"},
        {item: 8, diff: "add"},
        {item: 4, diff: ""},
        {item: 9, diff: "add"},
        {item: 5, diff: ""},
        {item: 10, diff: "add"},
        {item: 6, diff: ""},
    ])
})

test("itemsRemovedInBetween", () => {
    const oldList = [1, 2, 3, 7, 8, 4, 9, 5, 10, 6]
    const newList = [1, 2, 3, 4, 5, 6]

    const listWithDiff = getListDiff(oldList, newList, (p1, p2) => (p1 === p2))

    expect(listWithDiff).toEqual([
        {item: 1, diff: ""},
        {item: 2, diff: ""},
        {item: 3, diff: ""},
        {item: 7, diff: "remove"},
        {item: 8, diff: "remove"},
        {item: 4, diff: ""},
        {item: 9, diff: "remove"},
        {item: 5, diff: ""},
        {item: 10, diff: "remove"},
        {item: 6, diff: ""},
    ])
})

test("itemsAddedAndRemovedInBetween", () => {
    const oldList = [1, 2, 3, 4, 5, 6]
    const newList = [1, 2, 10, 4, 11, 6]

    const listWithDiff = getListDiff(oldList, newList, (p1, p2) => (p1 === p2))

    expect(listWithDiff).toEqual([
        {item: 1, diff: ""},
        {item: 2, diff: ""},
        {item: 3, diff: "remove"},
        {item: 10, diff: "add"},
        {item: 4, diff: ""},
        {item: 5, diff: "remove"},
        {item: 11, diff: "add"},
        {item: 6, diff: ""},
    ])
})

test("itemAddedInFrontAndEnd", () => {
    const oldList = [1, 2, 3, 4, 5, 6]
    const newList = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8]

    const listWithDiff = getListDiff(oldList, newList, (p1, p2) => (p1 === p2))

    expect(listWithDiff).toEqual([
        {item: -1, diff: "add"},
        {item: 0, diff: "add"},
        {item: 1, diff: ""},
        {item: 2, diff: ""},
        {item: 3, diff: ""},
        {item: 4, diff: ""},
        {item: 5, diff: ""},
        {item: 6, diff: ""},
        {item: 7, diff: "add"},
        {item: 8, diff: "add"},
    ])
})

test("itemRemovedFromFrontAndEnd", () => {
    const oldList = [1, 2, 3, 4, 5, 6]
    const newList = [3, 4,]

    const listWithDiff = getListDiff(oldList, newList, (p1, p2) => (p1 === p2))

    expect(listWithDiff).toEqual([
        {item: 1, diff: "remove"},
        {item: 2, diff: "remove"},
        {item: 3, diff: ""},
        {item: 4, diff: ""},
        {item: 5, diff: "remove"},
        {item: 6, diff: "remove"},
    ])
})

test("everyOperationAtOnce", () => {
    const oldList = [1, 2, 3, 4, 5, 6,]
    const newList = [9, 10, 3, 11, 5, 12, 13, 14]

    const listWithDiff = getListDiff(oldList, newList, (p1, p2) => (p1 === p2))

    expect(listWithDiff).toEqual([
        {item: 1, diff: "remove"},
        {item: 2, diff: "remove"},
        {item: 9, diff: "add"},
        {item: 10, diff: "add"},
        {item: 3, diff: ""},
        {item: 4, diff: "remove"},
        {item: 11, diff: "add"},
        {item: 5, diff: ""},
        {item: 6, diff: "remove"},
        {item: 12, diff: "add"},
        {item: 13, diff: "add"},
        {item: 14, diff: "add"},
    ])
})