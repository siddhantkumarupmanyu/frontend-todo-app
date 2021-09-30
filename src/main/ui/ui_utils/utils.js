export function setRGBVars() {
    const colorVars = getAllCssVars().filter((value) => (value.startsWith("--color")))

    const rootStyle = document.documentElement.style
    const computedRootStyle = getComputedStyle(document.documentElement)
    for (const colorVar of colorVars) {
        const colorHex = computedRootStyle.getPropertyValue(colorVar)
        const [r, g, b] = getRGBFromHex(colorHex)
        rootStyle.setProperty(`--rgb-${(colorVar.substr(8))}`, `${r},${g},${b}`)
    }
}

export function getAllCssVars() {
    const cssVars = []
    const rootStyleProperties = getComputedStyle(document.documentElement)
    for (const property in rootStyleProperties) {
        if (String(rootStyleProperties[property]).startsWith("--")) {
            cssVars.push(rootStyleProperties[property])
        }
    }
    return cssVars
}

export function getRGBFromHex(hex) {
    let r = ""
    let g = ""
    let b = ""

    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16).toString()
        g = parseInt(hex[2] + hex[2], 16).toString()
        b = parseInt(hex[3] + hex[3], 16).toString()

    } else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16).toString()
        g = parseInt(hex[3] + hex[4], 16).toString()
        b = parseInt(hex[5] + hex[6], 16).toString()
    } else {
        throw new Error("unsupported hex length")
    }

    return [r, g, b]
}