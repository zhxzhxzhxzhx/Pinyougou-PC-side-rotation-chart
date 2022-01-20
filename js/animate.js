function animate(obj, target, callback) {
    clearInterval(obj.timer);

    obj.timer = setInterval(() => {
        obj.step = (target - obj.offsetLeft) / 10;
        obj.step = obj.step > 0 ? Math.ceil(obj.step) : Math.floor(obj.step);
        if (obj.offsetLeft == target) {
            clearInterval(obj.timer);
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft + obj.step + "px";
    }, 15);
}