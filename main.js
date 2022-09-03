enchant();
// ここで自作クラスBearをつくる
Bear = Class.create(Sprite, // Spriteクラスを継承
    {
        initialize: function (x, y) { //初期化する
            Sprite.call(this, 32, 32); //Spriteオブジェクトを初期化
            this.image = game.assets['chara1.gif'];
            this.x = x;
            this.y = y;
            this.frame = 4;
            game.rootScene.addChild(this);
        },
    });

var a;
var b;
var c;

window.onload = function () {

    //ゲームの作成
    game = new Game(320, 320);

    game.preload('chara1.gif', "bg01.jpg", "bg02.jpg","bg03.jpg");

    game.onload = function () {
        var bg = new Sprite(320, 320);
        bg.image = game.assets["bg01.jpg"];
        game.rootScene.addChild(bg);

        //メッセージの作成
        game.rootScene.addChild(makeMessage("男気徒競走をしよう！"));

        //選択肢
        var select0 = makeSelect("進む", 320 - 32 * 2);
        select0.addEventListener(Event.TOUCH_START, function (e) {
            game.pushScene(game.makeScene1());
        });
        game.rootScene.addChild(select0);
    };

    //シーン1
    game.makeScene1 = function () {
        var scene = new Scene();


        //背景の作成
        var bg = new Sprite(320, 320);
        bg.image = game.assets["bg02.jpg"];
        scene.addChild(bg);

        //くまの生成
        a = Math.random() * 10;
        bear1 = new Bear(32, 32);
        bear2 = new Bear(32, 110);
        scene.addChild(bear1);
        scene.addChild(bear2);

        //スタートボタン
        var select1 = makeSelect("ＳＴＡＲＴ", 0);

        select1.addEventListener(Event.TOUCH_START, function () {

            if (a >= 5){
                b = 5;
                c = 7;
            }else{
                b = 7;
                c = 5;
            };

            //くまの速度
            setInterval(function () {
                if (bear1.x <= 288){
                bear1.x += Math.random() * Math.random() * Math.random() * b;
                }

                if (bear2.x <= 288){
                bear2.x += Math.random() * Math.random() * Math.random() * c;
                }

            });
        },1000);
        scene.addChild(select1);

        //選択肢
        var selectA = makeSelect("進む", 320 - 32 * 2);
        selectA.addEventListener(Event.TOUCH_START, function (e) {
            game.pushScene(game.makeScene2());
        });
        scene.addChild(selectA);

        //選択肢の作成
        //var select2 = makeSelect("進む", 320 - 32 * 2);
        //select2.addEventListener(Even.TOUCH_START, function(e){
        //    game.pushScene(game.makeScene2());
        //});
        //scene.addChild(select2);

        return scene;
    };

    //シーン2
    game.makeScene2 = function(){
        var scene = new Scene();

        //背景の作成
        var bg = new Sprite(320, 320);
        bg.image = game.assets["bg03.jpg"];
        scene.addChild(bg);

        //ラベルの作成
        scene.addChild(makeMessage("勝った君はみんなにごちそうしよう！"));
        var select0 = makeSelect("戻る", 320 - 32 * 2);
        select0.addEventListener(Event.TOUCH_START, function(e){
            game.popScene();
        });

        scene.addChild(select0);
        return scene;
    };

    game.start();

};

//徒競走_選択肢の生成
function makeSelect(text, y) {
    var label = new Label(text);
    label.font = "16px monospace";
    label.color = "#FF6600";
    label.y = y;
    label.width = 320;
    return label;
};

//メッセージの作成
function makeMessage(text) {
    var label = new Label(text);
    var label = new Label(text);
    label.font = "16px monospace";
    label.color = "rgb(255,255,255)";
    label.backgroundColor = "rgba(0,0,0,0.6)";
    label.y = 320 - 32 * 3;
    label.width = 320;
    label.height = 32 * 3;
    return label;
}