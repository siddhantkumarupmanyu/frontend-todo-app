import TodoItem from "../../main/vo/TodoItem";
import SameIdDifferentValueException from "../../main/SameIdDifferentValueException";

// value object is also called value type
test("valueObject", () => {
    const a1 = new TodoItem("a", false, 1)
    const a2 = new TodoItem("a", false, 1)
    const b = new TodoItem("b", false, 2)

    expect(a1.equals(a1)).toBe(true)
    expect(a2.equals(a1)).toBe(true)
    expect(b.equals(a1)).toBe(false)
})

test("shouldThrowException_WhenIdIsSameButNoteIsDifferent", () => {
    const a = new TodoItem("a", false, 1)
    const b = new TodoItem("b", false, 1)

    expect(() => a.equals(b)).toThrow(SameIdDifferentValueException);
})

test("shouldThrowExceptionOnSameIdButDifferentIsDone", () => {
    const a = new TodoItem("a", false, 1)
    const b = new TodoItem("a", true, 1)

    expect(() => a.equals(b)).toThrow(SameIdDifferentValueException);
})