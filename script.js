// 切换平台标签页的函数
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

// 一键复制功能
function copyToClipboard(selector, customTip) {
  const el = document.querySelector(selector);
  if (!el) return;
  const text = el.innerText || el.textContent;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showCopyTip(customTip || '复制成功！');
    }, () => {
      fallbackCopyTextToClipboard(text, customTip);
    });
  } else {
    fallbackCopyTextToClipboard(text, customTip);
  }
}

function fallbackCopyTextToClipboard(text, customTip) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopyTip(customTip || '复制成功！');
  } catch (err) {
    showCopyTip('复制失败，请手动复制');
  }
  document.body.removeChild(textarea);
}

function showCopyTip(msg) {
  let tip = document.getElementById('copy-tip');
  if (!tip) {
    tip = document.createElement('div');
    tip.id = 'copy-tip';
    tip.style.position = 'fixed';
    tip.style.top = '20%';
    tip.style.left = '50%';
    tip.style.transform = 'translate(-50%, 0)';
    tip.style.background = 'rgba(0,0,0,0.7)';
    tip.style.color = '#fff';
    tip.style.padding = '10px 24px';
    tip.style.borderRadius = '8px';
    tip.style.fontSize = '16px';
    tip.style.zIndex = '9999';
    document.body.appendChild(tip);
  }
  tip.innerText = msg;
  tip.style.display = 'block';
  setTimeout(() => {
    tip.style.display = 'none';
  }, 1200);
}

window.copyToClipboard = copyToClipboard;
window.fallbackCopyTextToClipboard = fallbackCopyTextToClipboard;
window.showCopyTip = showCopyTip;

document.addEventListener('click', function(e) {
  const btn = e.target.closest('button[data-copy-id]');
  if (btn) {
    const id = btn.getAttribute('data-copy-id');
    if (id) {
      const span = document.getElementById(id);
      let tip = '复制成功！';
      if (span) {
        const dataType = span.getAttribute('data-type');
        // 优先判断微信小程序
        if (dataType === 'wxapp') {
          tip = '复制成功！打开任一微信粘贴';
        } else {
          // 尝试通过描述内容判断app类型
          // 找到卡片内容的描述文本
          const card = btn.closest('.card');
          let desc = '';
          if (card) {
            const p = card.querySelector('.card-content p');
            if (p) desc = p.innerText || p.textContent || '';
          }
          if (/美团|饿了么|淘宝|天猫|App|app|支付宝|京东/.test(desc)) {
            tip = '复制成功！打开对应app领取';
          }
        }
      }
      copyToClipboard(`#${id}`, tip);
    }
  }
});