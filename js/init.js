//adobeフォントの表示遅れ解消
setTimeout(function () {
  if (
    document.getElementsByTagName("html")[0].classList.contains("wf-active") !=
    true
  ) {
    document.getElementsByTagName("html")[0].classList.add("loading-delay");
  }
}, 3000);

//spナビ
jQuery(function ($) {
  $(".openbtn1").click(function () {
    //ボタンがクリックされたら
    $(this).toggleClass("active"); //ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
  });

  $("#g-nav a").click(function () {
    //ナビゲーションのリンクがクリックされたら
    $(".openbtn1").removeClass("active"); //ボタンの activeクラスを除去し
    $("#g-nav").removeClass("panelactive"); //ナビゲーションのpanelactiveクラスも除去
  });
});

/*totop*/
$(function () {
  $('a[href^="#"]').click(function () {
    var adjust = -113; // 移動先調整
    var speed = 400; // 速度
    var href = $(this).attr("href"); // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
    var target = $(href == "#" || href == "" ? "html" : href); // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
    var position = target.offset().top + adjust; // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
    $("body,html").animate({ scrollTop: position }, speed, "swing"); // スムーススクロール linear（等速） or swing（変速）
    return false;
  });
});

//スクロール
const scrollNum = document.getElementById("scroll-num"); //スクロール量計測

window.addEventListener("scroll", function () {
  // scrollNum.textContent = window.pageYOffset; //スクロール量計測

  let targets = document.querySelectorAll(".fadeInTrigger"); //アニメーションさせたい要素
  let targets02 = document.querySelectorAll(".flow"); //アニメーションさせたい要素

  //スクロールイベント
  var scroll = window.scrollY; //スクロール量を取得
  var windowHeight = window.innerHeight; //画面の高さを取得
  for (let target of targets) {
    //ターゲット要素がある分、アニメーション用のクラスをつける処理を繰り返す
    var targetPos = target.getBoundingClientRect().top + scroll; //ターゲット要素の位置を取得
    if (scroll > targetPos - windowHeight) {
      //スクロール量 > ターゲット要素の位置
      target.classList.add("fadeIn"); //is-animatedクラスを加える
    }
  }

  for (let target of targets02) {
    // ターゲット要素がある分、アニメーション用のクラスをつける処理を繰り返す
    var targetPos = target.getBoundingClientRect().top + scroll; // ターゲット要素の位置を取得
    if (scroll > targetPos - windowHeight) {
      // スクロール量 > ターゲット要素の位置
      target.classList.add("img_flow"); // img_flowクラスを加える
    }
  }
});
//スクロールここまで

//ヘッダーがスクロールしたらクラス付与
window.addEventListener("scroll", function () {
  // ヘッダーを変数の中に格納する
  const header = document.querySelector("header");
  // 50px以上スクロールしたらヘッダーに「scroll」クラスをつける
  header.classList.toggle("scroll", window.scrollY > 50);
});

//スクロールでクラス付与
function handleScrollAnimation(selector, addClass, offset) {
  $(selector).each(function () {
    var elemPos = $(this).offset().top - offset;
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    if (scroll >= elemPos - windowHeight) {
      $(this).addClass(addClass);
    }
  });
}
$(window).scroll(function () {
  handleScrollAnimation(".add_color", "back_color", -300); //カラー
  handleScrollAnimation(".fadeInTrigger", "fadeIn", 80); //ふわっと出現
  handleScrollAnimation(".flow", "img_flow", 80);
  handleScrollAnimation(
    ".recruit_top .sec08 .fadeInTrigger",
    "sec08 fadeIn",
    150
  );
});
