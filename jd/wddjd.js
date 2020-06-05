threads.start(function () {
    console.show();
    console.setSize(device.width / 2, device.height / 3);
    console.warn("音量上键关闭脚本");
    console.warn("音量上键关闭脚本");
    console.warn("音量上键关闭脚本");
    console.info("判断是否开启无障碍服务！");
    auto.waitFor();
    console.log("无障碍服务开启！");
    console.info("开启京东");
    launchApp("京东");

    //延迟给app 广告启动慢一些时间
    sleep(10000)
    //适配手机
    adapterPhone();
    //获取京豆
    getJd();
    //跳转到首页
    gotoHome();
    //关闭脚本
    closeAutoJs();
});

//获取京豆
function getJd() {
    if (gotoMy()) {
        if (className("android.widget.TextView").text("京豆").exists()) {
            console.info("进入京豆");
            let b = className("android.widget.TextView").text("京豆").findOnce().bounds();
            click(b.centerX(), b.centerY());
            sleep(6000);
            if (className("android.widget.TextView").text("去签到领京豆").exists()) {
                toast("去签到领京豆");
                let b = className("android.widget.TextView").text("去签到领京豆").findOnce().bounds();
                click(b.centerX(), b.centerY());
                sleep(5000);
                if (className("android.widget.TextView").text("签到领京豆").exists()) {
                    let b = className("android.widget.TextView").text("签到领京豆").findOnce().bounds();
                    click(b.centerX(), b.centerY());
                    back();
                    sleep(1000);
                }
                back();
                sleep(1000);
            } else {
                console.error("领取京豆失败！");
            }
            back();
            sleep(1000);
        } else {
            console.error("领取京豆失败！");
        }

    } else {
        console.error("查找<我的>menu元素失败，导致领取京豆失败！");
    }
}

//跳转到首页
function gotoMy(){
    sleep(1000);
    if(className("android.view.View").desc("我的").exists()){
        console.info("点击我的");
        className("android.view.View").desc("我的").findOnce().click();
        sleep(3000);
        return true;
    }
    return false;
}

//跳转到首页
function gotoHome(){
    sleep(1000);
    if(className("android.view.View").desc("首页").exists()){
        console.info("点击首页");
        className("android.view.View").desc("首页").findOnce().click();
        sleep(3000);
        return true;
    }
    return false;
}

//适配手机
function adapterPhone() {
    //三星手机会弹出支付安全
    var samsungIngoreBt = id("com.samsung.android.sm_cn:id/button2").findOnce();
    if (samsungIngoreBt) {
        console.warn("三星手机开启usb时，提示安全问题，自动点击忽略！");
        samsungIngoreBt.click();
    }
}

//启动监听按键
events.observeKey();
events.onceKeyDown("volume_up", function (event) {
    //音量上键被按下了
    console.info("音量上键被按下了");
    closeAutoJs();
})

function closeAutoJs() {
    console.info("开始关闭自动化程序");
    threads.shutDownAll();
    console.clear();
    console.hide();
    toast("自动化程序停止");
}