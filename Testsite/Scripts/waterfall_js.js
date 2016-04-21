var cols;
var heights;
var index;
var dataImgs = {
    "data": [
        { "src": "Sources/40.jpg" }, { "src": "Sources/41.jpg" }/*,
        { "src": "Sources/42.jpg" }, { "src": "Sources/43.jpg" },
        { "src": "Sources/44.jpg" }, { "src": "Sources/45.jpg" },
        { "src": "Sources/46.jpg" }, { "src": "Sources/47.jpg" },
        { "src": "Sources/48.jpg" }, { "src": "Sources/49.jpg" },
        { "src": "Sources/50.jpg" }, { "src": "Sources/51.jpg" },
        { "src": "Sources/52.jpg" }, { "src": "Sources/53.jpg" },
        { "src": "Sources/54.jpg" }, { "src": "Sources/55.jpg" },
        { "src": "Sources/56.jpg" }, { "src": "Sources/57.jpg" },
        { "src": "Sources/58.jpg" }, { "src": "Sources/59.jpg" }*/]
};
window.onload = function () {
    //计算container的宽度
    cols = Math.floor(window.screen.availWidth / getElement(".box")[0].offsetWidth);
    var containerW = cols * getElement(".box")[0].offsetWidth;
    getElement("#container").style.cssText = "width:" + containerW + "px;";
    //把头一列放进来
    setTheLowestPic();
    putTheLowestPic();

    this.onscroll = function(){
        appendBoxs();
    }
}

//当滚动的时候添加box
function appendBoxs() {
    //假如超载了，就增加
    if(checkOverload())
    {
        for (var i = 0; i < dataImgs.data.length; i++) {
            createBox(dataImgs.data[i].src);
        }
        putTheLowestPic();
    }
}

function createBox(src) {
    var div_box = document.createElement("div");
    div_box.className = "box";

    var div_img = document.createElement("div");
    div_img.className = "box_img";

    var img = document.createElement("img");
    img.src = src;
    img.style.width = "230px";
    img.style.height = "auto";

    div_img.appendChild(img);
    div_box.appendChild(div_img);

    var container = getElement("#container");
    container.appendChild(div_box);
}

function checkOverload() {
    //找最后一个
    var boxs = getElement(".box");
    var last = boxs[boxs.length - 1];
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (last.offsetTop < (scrollTop + document.documentElement.clientHeight)) {
        return true;
    }
    return false;
}

//开始循环放置图片
function putTheLowestPic() {
    //如果个数比它大才需要放置
    var cur;
    var lowestIndex;
    var boxs = getElement(".box");
    while (index < boxs.length) {
        //找最低的索引
        var temp = 9999;
        for (var i = 0; i < heights.length; i++) {
            if(heights[i] < temp)
            {
                temp = heights[i];
                lowestIndex = i;
            }
        }
        cur = boxs[index++];//当前需要放置的图片
        cur.style.position = "absolute";
        cur.style.left = boxs[lowestIndex].offsetLeft+"px";
        cur.style.top = heights[lowestIndex]+"px";
        heights[lowestIndex] = heights[lowestIndex] + cur.offsetHeight;
        //设置图片位置
        console.log("");
    }
}

function setTheLowestPic() {
    var boxs = getElement(".box");
    //用来存放图片高度的数组，存的个数是前cols个
    heights = new Array(cols);
    //先将头一列的高度放进来
    for (var i = 0; i < cols; i++) {
        var temp = boxs[i].offsetTop + boxs[i].offsetHeight;
        heights[i] = temp;
    }

    index = heights.length;
}

function getElement(selector) {

    var first = selector[0];
    var last = selector.substr(1);
    var elements;
    switch(first)
    {
        case "#":
            elements = document.getElementById(last);
            break;
        case ".":
            elements = document.getElementsByClassName(last);
            break;
        default:
            elements = document.getElementByTagName(selector);
            break;
    }
    return elements;
}