'use strict';

/**
 * 診断文テンプレ（###userName### を入力名に置換）
 */
const answers = [
  '###userName###のいいところは声です。###userName###の特徴的な声は皆を惹きつけ、心に残ります。',
  '###userName###のいいところはまなざしです。###userName###に見つめられた人は、気になって仕方がないでしょう。',
  '###userName###のいいところは情熱です。###userName###の情熱に周りの人は感化されます。',
  '###userName###のいいところは厳しさです。###userName###の厳しさがものごとをいつも成功に導きます。',
  '###userName###のいいところは知識です。博識な###userName###を多くの人が頼りにしています。',
  '###userName###のいいところはユニークさです。###userName###だけのその特徴が皆を楽しくさせます。',
  '###userName###のいいところは用心深さです。###userName###の洞察に、多くの人が助けられます。',
  '###userName###のいいところは見た目です。内側から溢れ出る###userName###の良さに皆が気を惹かれます。',
  '###userName###のいいところは決断力です。###userName###がする決断にいつも助けられる人がいます。',
  '###userName###のいいところは思いやりです。###userName###に気をかけてもらった多くの人が感謝しています。',
  '###userName###のいいところは感受性です。###userName###が感じたことに皆が共感し、わかりあうことができます。',
  '###userName###のいいところは節度です。強引すぎない###userName###の考えに皆が感謝しています。',
  '###userName###のいいところは好奇心です。新しいことに向かっていく###userName###の心構えが多くの人に魅力的に映ります。',
  '###userName###のいいところは気配りです。###userName###の配慮が多くの人を救っています。',
  '###userName###のいいところはそのすべてです。ありのままの###userName###自身がいいところなのです。',
  '###userName###のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる###userName###が皆から評価されています。'
];

/**
 * 文字列の各文字コード合計を返す（同一入力→同一結果のため）
 * @param {string} str
 * @returns {number}
 */
function sumCharCode(str) {
  let sum = 0;
  for (const ch of str) sum += ch.charCodeAt(0);
  return sum;
}

/**
 * 名前から診断結果を生成（同じ名前なら同じ結果）
 * @param {string} userName
 * @returns {string}
 */
function assessment(userName) {
  const index = sumCharCode(userName) % answers.length;
  return answers[index].replaceAll('###userName###', userName);
}

/**
 * 結果表示（カードで見せる）
 * @param {HTMLElement} resultDivision
 * @param {string} userName
 * @param {string} resultText
 */
function renderResult(resultDivision, userName, resultText) {
  resultDivision.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card';

  const body = document.createElement('div');
  body.className = 'card-body';

  const title = document.createElement('h2');
  title.className = 'h5 card-title mb-2';
  title.innerText = '診断結果';

  const p = document.createElement('p');
  p.className = 'card-text mb-0';
  p.innerText = resultText;

  body.appendChild(title);
  body.appendChild(p);
  card.appendChild(body);
  resultDivision.appendChild(card);
}

/**
 * ツイートボタン生成（Xのwidgets.jsを読み込む）
 * @param {HTMLElement} tweetDivision
 * @param {string} resultText
 */
function renderTweetButton(tweetDivision, resultText) {
  tweetDivision.innerHTML = '';

  // aタグ（intent/tweet）
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', resultText);
  anchor.setAttribute('data-show-count', 'false');
  anchor.innerText = 'Tweet #あなたのいいところ';
  tweetDivision.appendChild(anchor);

  // widgets.js
  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  script.async = true;
  script.charset = 'utf-8';
  tweetDivision.appendChild(script);
}

/**
 * UI
 */
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.addEventListener('click', () => {
  const userName = (userNameInput.value || '').trim();

  // 未入力なら何もしない（ただし結果は消す）
  if (userName.length === 0) {
    resultDivision.innerHTML = '';
    tweetDivision.innerHTML = '';
    userNameInput.focus();
    return;
  }

  const resultText = assessment(userName);
  renderResult(resultDivision, userName, resultText);
  renderTweetButton(tweetDivision, resultText);
});

/**
 * 最低限のテスト（開発者コンソールで確認）
 */
console.assert(assessment('太郎') === assessment('太郎'), '同じ入力で同じ結果になるべき');
console.assert(assessment('太郎').includes('太郎'), '結果に名前が含まれるべき');
