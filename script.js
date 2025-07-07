/**
 * 切换平台标签页的函数
 * @param {Event} evt - 点击事件对象
 * @param {string} platformName - 要显示的平台ID (meituan, eleme, jingdong)
 */
function openPlatform(evt, platformName) {
  // 1. 获取所有的标签内容元素，并全部隐藏
  let tabContent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
  }

  // 2. 获取所有的标签链接元素，并移除"active"激活状态
  let tabLinks = document.getElementsByClassName("tab-link");
  for (let i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // 3. 显示当前点击的标签页内容
  document.getElementById(platformName).style.display = "block";

  // 4. 给当前点击的标签按钮添加"active"激活状态
  evt.currentTarget.className += " active";
}


/**
* 复制淘口令到剪贴板
* @param {string} elementSelector - 包含淘口令文本的元素的选择器 (例如 '#my-command')
*/
function copyToClipboard(elementSelector) {
  const element = document.querySelector(elementSelector);
  if (!element) return;

  const textarea = document.createElement('textarea');
  textarea.value = element.innerText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);

  // 判断类型和内容
  const type = element.getAttribute('data-type');
  const value = element.innerText.trim();
  if (
    type === 'wxapp' ||
    value.startsWith('#小程序://') ||
    value.startsWith('mp://')
  ) {
    alert('内容已复制，请在任一微信中粘贴打开！');
  } else {
    alert('内容已复制，请打开对应的App！');
  }
}

// 默认执行一次，确保页面加载时，第一个标签是激活的
document.addEventListener('DOMContentLoaded', (event) => {
  function renderTop(jsonPath, topDivId) {
    fetch(jsonPath)
      .then(res => res.json())
      .then(data => {
        const topDiv = document.getElementById(topDivId);
        if (!topDiv) return;
        // 获取当天日期
        const now = new Date();
        const dateStr = `${now.getMonth() + 1}月${now.getDate()}日`;
        let html = `<div class='highlight-section'>`;
        html += `<h2>🔥 今日主推 (${dateStr}更新)</h2>`;
        if (!data.items || data.items.length === 0) {
          html += `<div style='padding:12px 0 0 0;'>红包每天0点更新！点外卖先领红包！</div>`;
        } else {
          html += `<ul class='deals-list'>`;
          data.items.forEach(item => {
            html += `<li>${item}</li>`;
          });
          html += `</ul>`;
        }
        html += `</div>`;
        topDiv.innerHTML = html;
      });
  }
  function loadContent(id, url) {
    fetch(url)
      .then(res => res.text())
      .then(html => {
        document.getElementById(id).innerHTML = html;
        if (id === 'meituan') renderTop('meituan/top.json', 'meituan-top');
        if (id === 'eleme') renderTop('eleme/top.json', 'eleme-top');
        if (id === 'jingdong') renderTop('jd/top.json', 'jd-top');
      });
  }
  loadContent('meituan', 'meituan/meituan.html');
  loadContent('eleme', 'eleme/eleme.html');
  loadContent('jingdong', 'jd/jd.html');
  // 默认激活第一个tab
  document.querySelector('.tab-link').click();
});