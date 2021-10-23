// every element in the list should be unique
// this function does not take care of duplicate elements as this is meant to be used to elements with primary key
export function getListDiff(oldList, newList, equal) {
    const diffedList = []

    let i = 0
    let j = 0
    for (; i < oldList.length; i++, j++) {
        const oldItem = oldList[i]
        if (!equal(oldItem, newList[j])) {
            let addedItemsInBetween = false
            for (let k = j; k < newList.length; k++) {
                if (equal(oldItem, newList[k])) { // in between items are added
                    addedItemsInBetween = true

                    for (let m = j; m < k; m++) {
                        diffedList.push({
                            item: newList[m],
                            diff: "add"
                        })
                    }

                    diffedList.push({
                        item: oldItem,
                        diff: ""
                    })

                    j = k
                    break;
                }
            }
            if (!addedItemsInBetween) {
                // item is removed
                diffedList.push({
                    item: oldItem,
                    diff: "remove"
                })
                j--
            }
        } else {
            // no change
            diffedList.push({
                item: oldItem,
                diff: ""
            })
        }
    }

    // items added at end
    for (; j < newList.length; j++) {
        diffedList.push({
            item: newList[j],
            diff: "add"
        })
    }

    return diffedList
}