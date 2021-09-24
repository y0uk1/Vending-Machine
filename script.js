class Item{
    constructor(name, price, url){
        this.name = name;
        this.price = price;
        this.url = url;
    }
}

const items = [
    new Item("Hineken", 2, "https://cdn.pixabay.com/photo/2020/05/20/11/38/beverage-5196021_960_720.jpg"),
    new Item("Guiness", 2, "https://cdn.pixabay.com/photo/2021/02/13/21/52/guinness-6012896_960_720.jpg"),
    new Item("Corona", 2, "https://cdn.pixabay.com/photo/2021/01/12/05/32/beer-5910451_960_720.jpg"),
    new Item("Cola", 1, "https://cdn.pixabay.com/photo/2014/09/12/18/20/can-443123_960_720.png"),
    new Item("Pepsi", 1, "https://cdn.pixabay.com/photo/2020/05/10/05/14/pepsi-5152332_960_720.jpg"),
    new Item("Fanta", 1, "https://cdn.pixabay.com/photo/2016/02/19/14/43/cans-1210402_960_720.jpg"),
    new Item("Orange Juice", 1, "https://cdn.pixabay.com/photo/2016/12/20/21/43/orange-1921548_960_720.jpg"),
    new Item("Coffee", 1.5, "https://cdn.pixabay.com/photo/2013/07/13/09/51/drink-156158_960_720.png"),
    new Item("Tea", 1, "https://cdn.pixabay.com/photo/2013/07/12/18/09/tea-153067_960_720.png"),
    new Item("Cafelatte", 1.6, "https://cdn.pixabay.com/photo/2019/12/02/11/23/coffee-4667507_960_720.jpg"),
    new Item("Smoothie", 3, "https://cdn.pixabay.com/photo/2019/05/18/09/28/blueberries-4211525_960_720.jpg"),
    new Item("Passion Fruit", 2,"https://cdn.pixabay.com/photo/2015/08/25/03/27/passion-fruit-daiquiri-906099_960_720.jpg"),
    new Item("Soup", 2, "https://cdn.pixabay.com/photo/2018/10/15/21/22/pumpkin-spice-latte-3750038_960_720.jpg"),
    new Item("Hot Chocolate", 3,"https://cdn.pixabay.com/photo/2015/11/23/11/57/hot-chocolate-1058197_960_720.jpg"),
    new Item("Milk", 1.7, "https://cdn.pixabay.com/photo/2014/11/05/16/35/milk-518067_960_720.jpg"),
]

let sliderShow = document.getElementById("slider-show");
let main = document.createElement("img");
let extra = document.createElement("img");

sliderShow.classList.add("box", "d-flex", "flex-nowrap", "overflow-hiddens");
main.classList.add("main", "box-img-l");
extra.classList.add("extra", "box-img-l");

sliderShow.append(main);
sliderShow.append(extra);

main.src = items[0].url;
main.classList.add("expand-animation");
extra.src = items[0].url;
extra.classList.add("deplete-animation");
document.getElementById("numH1").innerHTML = String(1);
document.getElementById("nameH1").innerHTML = items[0].name;
document.getElementById("priceH1").innerHTML = "$" + items[0].price;
main.setAttribute("data-index", "0");

let pushBtn = document.getElementById("pushBtn");
pushBtn.setAttribute("data-index", "0");

let buyingHistory = document.getElementById("buying-history");


function slideJump(steps, animationType) {
    let index = parseInt(main.getAttribute("data-index"));
    let currentImg = items[index].url;

    index += steps;

    if(index < 0) index = items.length -1;
    else if(index >= items.length) index = 0;

    let nextImg = items[index].url;

    main.setAttribute("data-index", index.toString());

    // animateMain関数の呼び出し
    animateMain(currentImg, nextImg, animationType);
}


function animateMain(currentImg, nextImg, animationType) {
    main.src = "";
    main.src = nextImg;

    extra.src = "";
    extra.src = currentImg;

    main.classList.add("expand-animation");
    extra.classList.add("deplete-animation");

    if (animationType === "right"){
        sliderShow.innerHTML = "";
        sliderShow.append(extra);
        sliderShow.append(main);
    } else if (animationType === "left") {
        sliderShow.innerHTML = "";
        sliderShow.append(main);
        sliderShow.append(extra);
    }
}

//slideJumpのパラメータを取得する
function getParameter(currentIndex, ToIndex){
    diff = Math.abs(currentIndex - ToIndex);
    anotherDiff = items.length - diff;
    if (currentIndex < ToIndex) {
        return diff <= anotherDiff ? [1, "right"] : [-1, "left"];
    } else if (currentIndex > ToIndex) {
        return diff <= anotherDiff ? [-1, "left"] : [1, "right"];
    }
}


// 右下の数字ボタン作成
let numberBoxDiv = document.getElementById("number-box");

for (let i = 0; i < items.length; i++){
    let btn = document.createElement("button");
    btn.classList.add("num-box", "btn-primary","btn");
    btn.innerHTML = String(i+1);
    btn.addEventListener("click", function(){
        // 右上のディスプレイに表示
        document.getElementById("numH1").innerHTML = String(i+1);
        document.getElementById("nameH1").innerHTML = items[i].name;
        document.getElementById("priceH1").innerHTML = "$" + items[i].price;
        pushBtn.setAttribute("data-index", String(i));

        // 中央のスライド
        let index = parseInt(main.getAttribute("data-index"));
        if (i != index) {
            let parameter = getParameter(index, i);
            min_distance = Math.min(Math.abs(i-index), items.length - Math.abs(i-index));
            let count = 0;
            // 参考：https://gxy-life.com/2PC/PC/PC20210722.html
            let timerId = setInterval(function(){
                count++;
                slideJump(parameter[0], parameter[1]);
                if (count === min_distance) {
                    clearInterval(timerId);
                }
            }, 200);
        }
    })
    numberBoxDiv.append(btn);
}

// Buying History
pushBtn.addEventListener("click", function(){
    let itemImg = document.createElement("img");
    let index = parseInt(pushBtn.getAttribute("data-index"));
    itemImg.classList.add("box-img-s", "m-1");
    itemImg.src = items[index].url;
    buyingHistory.append(itemImg);
})