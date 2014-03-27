var words = [
    ["我爱你", "李红姐姐", "屌丝", "浙里", "指纹", "高辉师兄", "系统结构", "浪潮之巅", "教超", "开来", "智泉大楼", "蜡笔小新", " MIUI", "时间去哪了", "精英教育", "小全全", "吹牛逼", "咋了爸爸", "毛师兄", "微小型卫星", "张师兄"],
    ["嵌入式系统", "杨老大", "C++", "土豪金", "Roboca", "坤哥坤叔", "自动驾驶", "乔帮主", "三角饼", "宝儿", "红米", "海绵宝宝", "车辆工程", "我是歌手", "张师妹", "吃货", "企鹅先生", "毛像", "女神", "三国杀", "老和山"],
    ["高性能嵌入式", "叶青妹妹", "编代码", "马航", "门禁卡", "小双妹子", "智能车", "雷布斯", "老生仪楼", "小卡", "葫芦娃", "华为", "VIVO", "爸爸去哪儿", "硬件组", "元哥", "姜大神", "求是鹰", "熬夜", "男神", "快的"]
];
var theWords;
var theWord;
var theScore;
var preTime;
var theTime;
var preTimer;
var theTimer;

var cloneObj = function (obj) {
    var newobj, s;
    if (typeof obj !== 'object') {
        return;
    }
    newobj = obj.constructor === Object ? {} : [];
    if (window.JSON) {
        s = JSON.stringify(obj); //系列化对象
        newobj = JSON.parse(s); //反系列化（还原）
    }
    else {
        if (newobj.constructor === Array) {
            newobj.concat(obj);
        }
        else {
            for (var i in obj) {
                newobj[i] = obj[i];
            }
        }
    }
    return newobj;
};

var preTimerChange = function () {
    if (preTime >= 1) {
        preTime--;
        $("#word").html(preTime);
    }
    else {
        gameStart();
    }
};

var theTimerChange = function () {
    if (theTime >= 1) {
        theTime--;
        $("#time").html(theTime);
    }
    else {
        gameOver();
    }
};

var gameStart = function () {
    clearInterval(preTimer);
    theTimer = setInterval(theTimerChange, 1000);
    theWord = theWords.shift();
    $("#word").html(theWord);
};

var gameOver = function () {
    clearInterval(theTimer);
    $("#totalScore").html("总分：" + (theScore * 5 > 100 ? 100:theScore * 5));
    switch (theScore) {
        case 0:
            $("#thanks").html("达煞比...");
            break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            $("#thanks").html("......");
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            $("#thanks").html("不错呀~~");
            break;
        case 11:
        case 12:
        case 13:
        case 14:
        case 15:
            $("#thanks").html("厉害~~~~");
            break;
        case 16:
        case 17:
        case 18:
        case 19:
            $("#thanks").html("高分，啪啪啪~~~");
            break;
        case 20:
        case 21:
            $("#thanks").html("满分！啪啪啪~~~");
            break;
    }
    $.scrollTo("#page-3", 3000);
};

$(document).ready(function () {
    $("a[href='#start']").bind("click", function (event) {
        event.preventDefault();
        var groupId = $(this).attr("data-group");
        theWords = cloneObj(words[groupId]);

        //reset
        theScore = 0;
        preTime = 6;
        theTime = 120;
        $("#word").html("The Word");
        $("#score").html(theScore);
        $("#time").html(theTime);
        $("#totalScore").html("");
        $("#thanks").html();

        preTimer = setInterval(preTimerChange, 1000);
        $.scrollTo("#page-2", 1000);
    });

    $("a[href='#right']").bind("click", function (event) {
        event.preventDefault();
        theScore++;
        $("#score").html(theScore);
        var addition = document.createElement("div");
        addition.classList.add("score-addition");
        addition.textContent = "+1";
        $("#score").append(addition);
        if (theWords.length >= 1) {
            theWord = theWords.shift();
            console.log(theWord);
            $("#word").html(theWord);
            console.log(theWords);
        }
        else {
            gameOver();
        }
    });

    $("a[href='#skip']").bind("click", function (event) {
        event.preventDefault();
        theWords.push(theWord);
        if (theWords.length >= 1) {
            theWord = theWords.shift();
            console.log(theWord);
            $("#word").html(theWord);
            console.log(theWords);
        }
        else {
            gameOver();
        }
    });

    $(".arrow").bind("click", function (event) {
        $.scrollTo("#page-1", 1000);
    });
});
