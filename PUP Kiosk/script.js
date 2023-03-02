function backToHome(){
    location.reload()
}

function viewPUPMap(){
    let viewMap = document.querySelector(".welcome-section");
    viewMap.style.display = "none";
};

function displayInfoContainer(imgSrc, structureName, shortDesc) {
    let infoContainer = document.getElementById("head-desc-container");
    let body = document.getElementById("body");
    body.style.overflow = "hidden";
    document.addEventListener('mousemove', followMyCursor);
    infoContainer.innerHTML = "<div id = 'wrapper'><img id = 'imgid' src = '" + imgSrc + "'>" + "<p id = 'heading'>" + structureName + "</p>" + "<p id = 'desc'>" + shortDesc + "</p></div>";
};

function followMyCursor() {
    let infoContainer = document.getElementById('head-desc-container');
    infoContainer.style.left = event.clientX + 5 + "px";
    infoContainer.style.top = event.clientY + 5 + "px";
};

function hideInfoContainer() {
    let a = document.getElementById("head-desc-container");
    document.removeEventListener('mousemove', followMyCursor);
    a.removeChild(a.childNodes[0]);
};

$(function() {
    $(".my-map-area").maphilight();
});