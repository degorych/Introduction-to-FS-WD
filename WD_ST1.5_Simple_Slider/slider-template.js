const API_URL = "https://picsum.photos/";
const BIG_SIZE = "600/400";
const SMALL_SIZE = "60";

const IMAGES = [
    "?image=1080",
    "?image=1079",
    "?image=1069",
    "?image=1063",
    "?image=1050",
    "?image=1039"
];

const previews = $(".slider-previews");
const currentImg = $(".slider-current img");
let currentImageId = 0;

// Create link
const createLink = (url, size, name) => (url + size + "/" + name);

// Get image name
const getName = (link, url, size) => (link.replace(url + size + "/", ""));

// Create preview
const imageList = IMAGES.reduce((sum, value) => (sum + `<li><img src="${createLink(API_URL, SMALL_SIZE, value)}" alt="0"></li>`), "");
previews.append(imageList).find(">:first-child").addClass("current");

// CircleRight
const circleRight = id => (IMAGES.length - id === 1) ? 0 : id + 1;

// CircleLeft
const circleLeft = id => (id === 0) ? IMAGES.length - 1 : id - 1;

// Change current <li> element
function changeCurrentEl(element) {
    element.find(".current").removeClass("current");
    element.find("li").eq(currentImageId).addClass("current");
}

// Click on preview
previews.children("li").on("click", "img", function () {
    const imgId = getName($(this).attr("src"), API_URL, SMALL_SIZE);
    currentImg.attr("src", createLink(API_URL, BIG_SIZE, imgId));
    currentImageId = IMAGES.indexOf(imgId);
    changeCurrentEl(previews);
});

// -> and <-
function changeImg(circle) {
    currentImageId = (circle === "right") ? circleRight(currentImageId) : circleLeft(currentImageId);
    currentImg.attr("src", createLink(API_URL, BIG_SIZE, IMAGES[currentImageId]));
    changeCurrentEl(previews);
}

$(document).on("keydown", function (e) {
    if (e.keyCode === 39) {
        changeImg("right");
    }

    if (e.keyCode === 37) {
        changeImg("left");
    }
});