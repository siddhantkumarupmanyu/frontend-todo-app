import Database from "../main/Database";
import {AbstractClassException} from "../main/AbstractExceptions";


test("throwAbstractClassExceptionOnInstantiation", () => {
    expect(() => new Database()).toThrow(AbstractClassException);
})
