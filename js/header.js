let header = document.querySelector(".header");
console.log(header);

window.addEventListener("scroll", () => {
    if (window.scrollY >= 100) {
        header.style.setProperty("background-color", "#fdfdfdff");
    }else if(window.scrollY < 100){
        header.style.setProperty("background-color", "transparent");
    }
})