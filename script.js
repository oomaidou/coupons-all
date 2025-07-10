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