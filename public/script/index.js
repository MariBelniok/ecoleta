const buttonSearch = document.querySelector("#page-home main a")
const modalSearch = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})
close.addEventListener("click", () => {
    modal.classList.add("hide")
})