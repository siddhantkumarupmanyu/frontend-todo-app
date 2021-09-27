import {render} from "@testing-library/react";
import App from "../../main/app_screen/App";

// we cannot test this thing in here
// since this is also kind of 'how it looks' thing
// gonna skip this
test.skip("shouldSetTheCssRGBVarsOnMount", () => {
    render(<App/>)

    const computedRootStyleProperties = getComputedStyle(document.documentElement)

    console.log(computedRootStyleProperties)

    const exist = Object.values(computedRootStyleProperties).includes("--rgb-primary")

    expect(exist).toBe(true)
})