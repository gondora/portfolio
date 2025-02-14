//adobeフォントの表示遅れ解消
// setTimeout(function () {
//   if (
//     document.getElementsByTagName("html")[0].classList.contains("wf-active") !=
//     true
//   ) {
//     document.getElementsByTagName("html")[0].classList.add("loading-delay");
//   }
// }, 3000);

//mv　フェードイン
document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll("#imgList li");

  listItems.forEach((item, index) => {
    item.style.opacity = "0"; // 初期状態で非表示
    item.style.transform = "translateY(-50px)"; // 下から登場
    item.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";

    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 400); // 0.3秒ごとに順番に表示
  });
});

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
    var adjust = -65; // 移動先調整
    var speed = 400; // 速度
    var href = $(this).attr("href"); // アンカーの値取得 リンク先（href）を取得して、hrefという変数に代入
    var target = $(href == "#" || href == "" ? "html" : href); // 移動先を取得 リンク先(href）のidがある要素を探して、targetに代入
    var position = target.offset().top + adjust; // 移動先を調整 idの要素の位置をoffset()で取得して、positionに代入
    $("body,html").animate({ scrollTop: position }, speed, "swing"); // スムーススクロール linear（等速） or swing（変速）
    return false;
  });
});
// $(function () {
//   $('a[href^="#"]').click(function () {
//     var speed = 400; // スクロール速度
//     var headerHeight = $("header").outerHeight(); // ヘッダーの高さを取得
//     var href = $(this).attr("href"); // アンカーの値取得
//     var target = $(href == "#" || href == "" ? "html" : href); // 移動先を取得
//     var position = target.offset().top - headerHeight; // ヘッダーの高さ分調整

//     $("body,html").animate({ scrollTop: position }, speed, "swing");
//     return false;
//   });
// });

//scrollとTotopスクロール
document.addEventListener("DOMContentLoaded", function () {
  const scrollButton = document.getElementById("scroll");
  const scrollText = scrollButton.querySelector("span");
  const footer = document.querySelector("footer");
  let isAtFooter = false; // フッターに到達したかの判定用

  function toggleScrollClass() {
    const footerRect = footer.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // フッターに到達した場合
    if (footerRect.top <= windowHeight && !isAtFooter) {
      isAtFooter = true; // 到達判定をtrueに
      scrollButton.classList.add("toTop"); // クラスを追加
      fadeText(scrollText, "Top"); // テキスト変更
    }
    // フッターから離れた場合
    else if (footerRect.top > windowHeight && isAtFooter) {
      isAtFooter = false; // 到達判定をfalseに
      scrollButton.classList.remove("toTop"); // クラスを削除
      fadeText(scrollText, "Scroll"); // テキストを元に戻す
    }
  }

  function fadeText(element, newText) {
    element.style.transition = "opacity 0.1s ease"; // スムーズなフェード
    element.style.opacity = 0; // フェードアウト
    setTimeout(() => {
      element.textContent = newText;
      element.style.opacity = 1; // フェードイン
    }, 100); // 300ms後に変更
  }

  // スクロールイベントで監視
  window.addEventListener("scroll", toggleScrollClass);
});

//ヘッダーがスクロールしたらクラス付与
window.addEventListener("scroll", function () {
  // ヘッダーを変数の中に格納する
  const header = document.querySelector("header");
  // 50px以上スクロールしたらヘッダーに「scroll」クラスをつける
  header.classList.toggle("scroll", window.scrollY > 50);
});

//ボタン展開
document.querySelectorAll(".list li .title_but span").forEach((button) => {
  button.addEventListener("click", function () {
    const box = this.closest("li").querySelector(".box");

    if (box.classList.contains("open")) {
      // 閉じるとき
      box.style.height = "0px";
      // box.style.padding = "0 4em";
      box.classList.remove("open");
      this.classList.remove("open_but");
    } else {
      // 開くとき
      const textHeight = box.scrollHeight; // 実際の高さを取得
      box.style.height = textHeight + "px";
      // box.style.padding = "2.25em 4em";
      box.classList.add("open");
      this.classList.add("open_but");
    }
  });
});

//li 10件表示
document.addEventListener("DOMContentLoaded", function () {
  const listItems = document.querySelectorAll("#works .list li");
  const loadMoreButton = document.getElementById("loadMore");
  let itemsPerPage = 10;
  let currentIndex = 0;

  function showItems() {
    let count = 0;
    for (
      let i = currentIndex;
      i < currentIndex + itemsPerPage && i < listItems.length;
      i++
    ) {
      listItems[i].style.display = "block"; // 一度表示
      setTimeout(() => {
        listItems[i].classList.add("show"); // フェードインアニメーション
      }, count * 100); // 0.1秒ごとに順番に表示
      count++;
    }
    currentIndex += itemsPerPage;

    // すべてのアイテムを表示したらボタンをフェードアウト
    if (currentIndex >= listItems.length) {
      setTimeout(() => {
        loadMoreButton.style.opacity = "0"; // フェードアウト
        setTimeout(() => {
          loadMoreButton.style.display = "none"; // 完全に消す
        }, 500);
      }, count * 100);
    }
  }

  // 初回表示
  showItems();

  // ボタンをクリックしたら次の10件を表示
  loadMoreButton.addEventListener("click", showItems);
});

//liの数取得
document.addEventListener("DOMContentLoaded", function () {
  // `#list` の中の `li` をすべて取得
  const listItems = document.querySelectorAll("#works #list li");

  // `li` の数を取得
  const itemCount = listItems.length;

  // 表示する要素を作成
  const countDisplay = document.createElement("p");
  countDisplay.id = "itemCount"; // IDをつける
  countDisplay.textContent = `${itemCount}件`; // "〇件" の形式にする

  // `#list` の前に追加（または他の場所に追加）
  document
    .getElementById("list")
    .insertAdjacentElement("beforebegin", countDisplay);
});

//li自動ID
document.addEventListener("DOMContentLoaded", function () {
  // `#list` の中の `li` をすべて取得
  const listItems = document.querySelectorAll("#list li");

  // 1 ～ 3 個目の `li` に `id="num01"` ～ `id="num03"` を付与
  listItems.forEach((li, index) => {
    if (index < 3) {
      // 3つ目まで
      const num = String(index + 1).padStart(2, "0"); // "01", "02", "03" に変換
      li.id = `num${num}`;
    }
  });
});
// document.addEventListener("DOMContentLoaded", function () {
//   const header = document.querySelector("header");
//   const main = document.querySelector("main");

//   if (header && main) {
//     const headerHeight = header.offsetHeight;
//     main.style.paddingTop = `${headerHeight}px`;

//     // ウィンドウサイズが変わったときも更新
//     window.addEventListener("resize", () => {
//       main.style.paddingTop = `${header.offsetHeight}px`;
//     });
//   }
// });
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const main = document.querySelector("main");

  if (header && main) {
    // ルート要素のフォントサイズを取得（1remのピクセル値）
    const rootFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const additionalPadding = 3 * rootFontSize; // 3rem の値

    const updatePadding = () => {
      const headerHeight = header.offsetHeight;
      main.style.paddingTop = `${headerHeight + additionalPadding}px`;
    };

    updatePadding(); // 初回適用

    // ウィンドウサイズが変わったときも更新
    window.addEventListener("resize", updatePadding);
  }
});
