const quiz = [
  {
    question: "ゲーム市場最も売れたゲーム機は次の打ちどれ？",
    ans: ["スーパーファミコン", "PS2", "Switch", "DS"],
    correct: "DS",
  },
  {
    question: "糸井重里が企画に関わった、任天堂の看板ゲームといえば？",
    ans: [
      "MOTHER2",
      "スーパーマリオブラザーズ3",
      "スーパードンキーコング",
      "星のカービィ",
    ],
    correct: "MOTHER2",
  },
  {
    question: "ファイナルファンタジーIVの主人公の名前は？",
    ans: ["フリオニール", "クラウド", "ティーダ", "セシル"],
    correct: "セシル",
  },
];
const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.getElementsByTagName("button");

//問題、解答セットアップ
const setup = () => {
  //問題
  document.getElementById("question").textContent = quiz[quizIndex].question;

  let i = 0;
  //解答
  while (i < quiz[quizIndex].ans.length) {
    $button[i].textContent = quiz[quizIndex].ans[i];
    i++;
  }
};
setup();

//正誤判定
const clickEvent = () => {
  const click = (e) => {
    if (quiz[quizIndex].correct === e.target.textContent) {
      window.alert("正解");
      score++;
    } else {
      window.alert("不正解");
    }

    quizIndex++;

    if (quizIndex < quizLength) {
      //問題があればこちらを実行
      setup();
    } else {
      //問題がなければこちらを実行
      window.alert(
        "終了！あなたの正解数は" + score + "/" + quizLength + "です"
      );
    }
  };

  let i = 0;
  while (i < $button.length) {
    $button[i].addEventListener("click", (e) => {
      click(e);
    });
    i++;
  }
};
clickEvent();
