/**
 * 优惠券渲染器 - 从JSON数据动态生成优惠券内容
 */

class CouponRenderer {
  constructor() {
    this.platforms = ['meituan', 'eleme', 'jingdong'];
  }

  /**
   * 渲染指定平台的优惠券内容
   * @param {string} platform - 平台名称
   */
  async renderPlatform(platform) {
    try {
      const response = await fetch(`${platform}/coupons.json`);
      const data = await response.json();
      
      const container = document.getElementById(platform);
      if (!container) return;

      let html = `<div class="platform-block" id="${platform}-block">`;
      
      // 添加今日主推区域
      html += `<div id="${platform}-top"></div>`;
      
      // 渲染各个区域
      data.sections.forEach(section => {
        html += `<div class="regular-section">`;
        html += `<h2>${section.title}</h2>`;
        
        // 渲染该区域的所有优惠券
        section.coupons.forEach(coupon => {
          html += this.renderCouponCard(coupon, data.icon);
        });
        
        html += `</div>`;
      });
      
      html += `</div>`;
      container.innerHTML = html;
      
      // 渲染今日主推内容
      this.renderTop(`${platform}/top.json`, `${platform}-top`);
      
    } catch (error) {
      console.error(`加载${platform}数据失败:`, error);
    }
  }

  /**
   * 渲染单个优惠券卡片
   * @param {Object} coupon - 优惠券数据
   * @param {string} iconPath - 平台图标路径
   * @returns {string} HTML字符串
   */
  renderCouponCard(coupon, iconPath) {
    let html = `<div class="card">`;
    html += `<div class="card-icon"><img src="${iconPath}" alt="平台图标"></div>`;
    html += `<div class="card-content">`;
    html += `<h2>${coupon.title}</h2>`;
    html += `<p>${coupon.description}</p>`;
    
    // 如果是复制类型的优惠券，添加隐藏的内容
    if (coupon.type === 'copy') {
      const dataType = coupon.dataType ? ` data-type="${coupon.dataType}"` : '';
      html += `<span id="${coupon.id}" style="display:none"${dataType}>${coupon.content}</span>`;
    }
    
    html += `</div>`;
    
    // 根据类型渲染不同的按钮
    if (coupon.type === 'link') {
      html += `<a href="${coupon.url}" target="_blank" class="button">${coupon.action}</a>`;
    } else if (coupon.type === 'copy') {
      html += `<button class="button" onclick="copyToClipboard('#${coupon.id}')">${coupon.action}</button>`;
    }
    
    html += `</div>`;
    return html;
  }

  /**
   * 渲染今日主推内容
   * @param {string} jsonPath - JSON文件路径
   * @param {string} topDivId - 容器ID
   */
  async renderTop(jsonPath, topDivId) {
    try {
      const response = await fetch(jsonPath);
      const data = await response.json();
      
      const topDiv = document.getElementById(topDivId);
      if (!topDiv) return;
      
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
      
    } catch (error) {
      console.error('加载今日主推数据失败:', error);
    }
  }

  /**
   * 初始化所有平台
   */
  async init() {
    for (const platform of this.platforms) {
      await this.renderPlatform(platform);
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  const renderer = new CouponRenderer();
  renderer.init();
}); 