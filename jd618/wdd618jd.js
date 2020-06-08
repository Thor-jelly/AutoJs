//auto();

var pCount = 0;
var taskCount = 1;

threads.start(function () {
    console.show();
    console.setSize(device.width / 2, device.height / 3);
    console.warn("京东app，做好是退出后台模式、后台时在首页、在活动界面，时启动该脚本！");
    console.warn("京东app，做好是退出后台模式、后台时在首页、在活动界面，时启动该脚本！");
    console.warn("京东app，做好是退出后台模式、后台时在首页、在活动界面，时启动该脚本！");
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
    //首页找到叠蛋糕界面
    findCakeIv();
    //每天首次登陆签到弹窗
    everyDaySignInDialog();
    //开始金币
    startGold();
    //开始每天任务
    startEveryDayTask();
    //返回首页
    back();
    //关闭脚本
    closeAutoJs();
});

//开始每天任务
function startEveryDayTask() {
    taskCount = 1;
    //点击做任务
    console.info("开始做任务-----------");
    var closeD = getCloseDialogIv();
    if (closeD == null) {
        var taskV = className("android.view.View").text("做任务领金币").findOnce();
        if (taskV) {
            console.log("任务" + taskCount);
            taskV.parent().click();
            sleep(2000);
            clickEveryDayTask();
        } else {
            if (!clickEveryDayTask()) {
                console.error("未找到做任务按钮，请联系开发人员！");
            }
        }
    } else {
        clickEveryDayTask();
    }
}

//点击每天任务
function clickEveryDayTask() {
    var index = 0;
    var taskTv = className("android.view.View").text("去完成").findOnce();
    if (taskTv == null) {
        return false;
    }
    while (true) {
        //soutInitView(taskTv.parent().parent().parent());
        sleep(1300);
        var taskIndexTv = className("android.view.View").text("去完成").findOnce(index);
        if (taskIndexTv == null) {
            console.info("任务已经都完成了");
            break;
        }
        var p = taskIndexTv.parent().parent().parent();
        //获取可以判断的控件
        var t = p.child(0).child(1).text();
        if (-1 != t.search("8秒")) {
            //8秒任务
            index = 0;
            console.log("开始执行8秒任务");
            taskIndexTv.click();
            sleep(5000);
            textStartsWith("恭喜完成").findOne(8000);
            //关闭店铺商品优惠券弹窗
            closeSeeGoosDialog();
            sleep(1000);
            try {
                // 点击左上角的返回键
                id("fe").findOnce().click();
            } catch (error) {
                back();
            }
            console.log("已完成第" + taskCount + "次任务！");
            taskCount++;
        } else if (-1 != t.search("去加购")) {
            //去加购
            index = 0;
            console.log("开始加购任务");
            taskIndexTv.click();
            sleep(5000);
            for (var t = 0; t < 5; t++) {
                //修复加购问题,删掉了.child(2)子节点
                idContains("cart_").findOnce(t).click();
                sleep(1000);
            }
            try {
                // 点击左上角的返回键
                id("fe").findOnce().click();
            } catch (error) {
                back();
            }
            console.log("已完成第" + taskCount + "次任务！");
            taskCount++;
        } else if (-1 != t.search("浏览5个")) {
            //去加购
            index = 0;
            console.log("开始浏览5个任务");
            taskIndexTv.click();
            sleep(5000);
            for (var t = 0; t < 5; t++) {
                if (textContains("浏览以下").findOnce()) {
                    console.log("正在浏览第" + (t + 1) + "个商品！");
                    idContains("view_").findOnce(t).click();
                    sleep(1000);
                    //关闭店铺商品优惠券弹窗
                    closeSeeGoosDialog();
                    back();
                    sleep(1000);
                } else { }
            }
            try {
                // 点击左上角的返回键
                id("fe").findOnce().click();
            } catch (error) {
                back();
            }
            console.log("已完成第" + taskCount + "次任务！");
            taskCount++;
        } else {
            //没有找到任务
            index++;
        }
    }
    console.info("任务完成-----------");
    return true;
}

//关闭店铺商品优惠券弹窗
function closeSeeGoosDialog() {
    var seeCloseOutIv = className("android.widget.ImageView").id("asj");
    if (seeCloseOutIv.exists()) {
        var seeCloseIv = seeCloseOutIv.findOnce();
        if (seeCloseIv != null) {
            seeCloseIv.click();
        }
    }
}

function soutInitView(v) {
    pCount = 0;
    console.log("当前子数量：" + v.childCount());
    soutView(v);
}

function soutView(v) {
    var tem = pCount;
    for (var i = 0; i < v.childCount(); i++) {
        pCount = tem;
        var c = v.child(i);
        var s = "    ";
        for (var ii = 0; ii < pCount; ii++) {
            s = s + "     ";
        }
        console.log(s + "当前子数量：" + c.childCount());
        sleep(10);
        console.log(s + c);
        sleep(100);
        if (c.childCount() > 0) {
            pCount++;
            soutView(c);
        }
    }
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

//每天首次登陆签到弹窗
function everyDaySignInDialog() {
    sleep(5000);
    var signInV = className("android.view.View").textMatches("[^已]*签到.*").findOnce();
    if (signInV) {
        console.info("自动签到----------");
        signInV.parent().parent().click();
        sleep(1000);
        closeGetGoldTaskDialog();
    }

}

//关闭领金币任务弹窗
function closeGetGoldTaskDialog() {
    var closeD = getCloseDialogIv();
    if (closeD) {
        closeD.parent().click();
    }
}

function getCloseDialogIv() {
    return className("android.widget.Image").text("x6YonE079h84lBpxnX4CVJaqei7TKx8AAAAASUVORK5CYII=").findOnce();
}

//首页找到叠蛋糕界面
function findCakeIv() {
    sleep(1000)
    console.info("点击跳转到叠蛋糕界面");
    var cakeIv = className("android.widget.ImageView").desc("浮层活动").findOnce();
    if (cakeIv) {
        console.log("点击叠蛋糕任务图标");
        click(cakeIv.bounds().centerX(), cakeIv.bounds().centerY());
        click(cakeIv.bounds().centerX(), cakeIv.bounds().centerY());
    } else {
        console.error("未找到叠蛋糕控件");
    }
}

//开始金币
function startGold() {
    sleep(5000);
    console.info("点我得金币任务开始----------");
    var goldElfinCount = 1;
    while (true) {
        var goldV = className("android.view.View").id("goldElfin").findOnce();
        if (goldV == null) {
            console.error("正在进行点金币，重新连接----");
            //判断如果是网络错误，点击重新连接
            var connect = className("android.view.View").text("重新连接").findOnce();
            if (connect == null) {
                break;
            }
            connect.click();
            sleep(3000);
            continue;
        }
        console.log("执行第" + goldElfinCount + "次，点我得金币任务");
        for (var i = 0; i < 6; i++) {
            goldV.click();
            sleep(200);
        }
        goldElfinCount++;
        sleep(8000);
    }
    console.info("点我得金币任务结束----------");
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