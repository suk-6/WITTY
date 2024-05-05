let navSearchBar;
let searchIcon;

document.addEventListener("wheel", eventData => {
    const nav = document.getElementById("nav-bar-box");

    if (Math.abs(eventData.deltaY) < (Math.abs(2))) return;

    if(eventData.deltaY < 0 ){
        nav.style.top = ("0px")
    }else{
        nav.style.top = (`${-(nav.clientHeight)}px`)
    }
})

addEventListener("touchstart", () => {}, true);


addEventListener("DOMContentLoaded", () => {
    navSearchBar = document.getElementById("nav-bar-search");
    searchIcon = document.getElementById("search-icon");
})

function hasEnteredSearch(){
    let searchBarLength = (navSearchBar.value.length * 15) + 100;
    let searchMaxWidth = 250;

    if(navSearchBar.value){
        if(searchBarLength > searchMaxWidth){
            navSearchBar.style.setProperty("min-width", '250px');
        }
        else{
            navSearchBar.style.setProperty("min-width", `${searchBarLength}px`);
        }
        navSearchBar.style.setProperty("padding", "0px 1vh");
        searchIcon.style.setProperty("opacity", "0")
    }
    else {
        navSearchBar.style.removeProperty("min-width");
        navSearchBar.style.removeProperty("padding");
        searchIcon.style.setProperty("opacity", "1");
    }
}

function hasFocusedSearch(){
    navSearchBar.style.setProperty("padding", "0px 1vh");
    searchIcon.style.setProperty("opacity", "0")
}