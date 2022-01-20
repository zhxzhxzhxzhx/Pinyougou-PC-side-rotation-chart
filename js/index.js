window.addEventListener("load", function () {
    //1.获取元素
    var prev = this.document.querySelector(".prev");
    var next = this.document.querySelector(".next");
    var forcus = this.document.querySelector(".forcus");
    var num = 0;
    //2.鼠标经过显示与隐藏
    forcus.addEventListener("mouseenter", function () {
        prev.style.display = "block";
        next.style.display = "block";
        clearInterval(imgtimer);
        imgtimer = null;
    })
    forcus.addEventListener("mouseleave", function () {
        prev.style.display = "none";
        next.style.display = "none";
        imgtimer = setInterval(() => {
            next.click();
        }, 3000);
    })
    //3.动态生成小圆圈
    var ul = forcus.querySelector("ul");
    var ol = forcus.querySelector("ol");
    for (var i = 0; i < ul.children.length; i++) {
        var li = this.document.createElement("li");
        li.setAttribute("index", i);
        ol.appendChild(li);
    }
    ol.children[0].className = "current";
    var forcuswidth = forcus.offsetWidth;
    for (var i = 0; i < ol.children.length; i++) {
        //4.排他
        ol.children[i].addEventListener("click", function () {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            this.className = "current";
            //5.点击按钮，移动图片
            num = parseInt(this.getAttribute("index"));
            animate(ul, -this.getAttribute("index") * forcuswidth);
        })
    }
    //6.克隆第一张图片
    var firstimg = ul.children[0].cloneNode(true);
    ul.appendChild(firstimg);
    //7.点击右侧按钮，图片滚动一张
    //节流阀
    var flag = true;
    next.addEventListener("click", function () {
        if (flag) {
            flag = false;
            num++;
            if (num == ul.children.length) {
                ul.style.left = 0;
                num = 1;
            }
            animate(ul, -num * forcuswidth, function () {
                flag = true;
            });
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            if (num == ul.children.length - 1) {
                ol.children[0].className = "current";
            }
            ol.children[num].className = "current";
        }
    })
    //8.点击左侧按钮，图片滚动一张

    prev.addEventListener("click", function () {
        if (flag) {
            flag = false;
            num--;
            if (num == -1) {
                ul.style.left = -(ul.children.length - 1);
                num = (ul.children.length - 1) - 1;
            }
            animate(ul, -num * forcuswidth, function () {
                flag = true;
            });
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = "";
            }
            ol.children[num].className = "current";
        }

    })
    // 9.自动播放
    var imgtimer = setInterval(() => {
        next.click();
    }, 3000);
})