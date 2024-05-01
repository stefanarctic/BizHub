
// For Simplicity Sake
export const lg = val => console.log(val)
export const $S = selector => document.querySelector(selector)
export const $All = selector => document.querySelectorAll(selector)
export const html = document.documentElement


// Debug CSS
export const toggleCSSDebug = _ => {
    html.classList.toggle("debug");
}


// Change Theme On The Spot
export const toggleDarkMode = _ => {
    if (!html.getAttribute("data-theme") || html.getAttribute("data-theme") == "light") {
        html.setAttribute("data-theme", "dark")
    }
    else {
        html.setAttribute("data-theme", "light")
    }
}
