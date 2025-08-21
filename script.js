// 切换平台标签页的函数
function openPlatform(evt, platformName) {
  try {
    // 1. 获取所有的标签内容元素，并全部隐藏
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    // 2. 获取所有的标签链接元素，并移除"active"激活状态
    var tabLinks = document.getElementsByClassName("tab-link");
    for (var i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    // 3. 显示当前点击的标签页内容
    var targetElement = document.getElementById(platformName);
    if (targetElement) {
      targetElement.style.display = "block";
    }

    // 4. 给当前点击的标签按钮添加"active"激活状态
    if (evt && evt.currentTarget) {
      evt.currentTarget.className += " active";
    }

    // 新增：切换平台后滚动到页面顶部（兼容性写法）
    if (window.scrollTo) {
      try {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } catch(e) {
        // 降级方案
        window.scrollTo(0, 0);
      }
    }
  } catch(error) {
    console.error('切换平台时出错:', error);
  }
}

// 一键复制功能
function copyToClipboard(selector, customTip) {
  try {
    var el = document.querySelector ? document.querySelector(selector) : null;
    if (!el) return;
    var text = el.innerText || el.textContent || '';
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function() {
        showCopyTip(customTip || '复制成功！');
      }, function() {
        fallbackCopyTextToClipboard(text, customTip);
      });
    } else {
      fallbackCopyTextToClipboard(text, customTip);
    }
  } catch(error) {
    console.error('复制失败:', error);
    showCopyTip('复制失败，请手动复制');
  }
}

function fallbackCopyTextToClipboard(text, customTip) {
  try {
    var textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.style.top = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // 兼容iOS
    if (navigator.userAgent.match(/ipad|iphone/i)) {
      textarea.contentEditable = true;
      textarea.readOnly = false;
      var range = document.createRange();
      range.selectNodeContents(textarea);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      textarea.setSelectionRange(0, 999999);
    } else {
      textarea.select();
    }
    
    var successful = document.execCommand('copy');
    if (successful) {
      showCopyTip(customTip || '复制成功！');
    } else {
      showCopyTip('复制失败，请手动复制');
    }
  } catch (err) {
    console.error('复制操作失败:', err);
    showCopyTip('复制失败，请手动复制');
  } finally {
    if (textarea && textarea.parentNode) {
      document.body.removeChild(textarea);
    }
  }
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