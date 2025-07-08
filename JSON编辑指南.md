# JSON文件编辑指南

## 📝 如何更新优惠券信息

### 1. 找到对应的JSON文件
- 美团优惠券：`meituan/coupons.json`
- 饿了么优惠券：`eleme/coupons.json`
- 京东优惠券：`jd/coupons.json`

### 2. 编辑JSON文件
使用任何文本编辑器（推荐VS Code、Notepad++等）打开对应的JSON文件。

### 3. 优惠券数据结构

```json
{
  "platform": "meituan",
  "platformName": "美团",
  "icon": "meituan/meituan.png",
  "sections": [
    {
      "title": "红包专区",
      "coupons": [
        {
          "id": "meituan-1",
          "title": "优惠券标题",
          "description": "优惠券描述",
          "type": "link",
          "action": "立即领取",
          "url": "http://example.com"
        }
      ]
    }
  ]
}
```

### 4. 添加新优惠券

在 `coupons` 数组中添加新的优惠券对象：

```json
{
  "id": "meituan-新ID",
  "title": "新优惠券标题",
  "description": "新优惠券描述",
  "type": "link",
  "action": "立即领取",
  "url": "新的链接地址"
}
```

### 5. 优惠券类型说明

#### 链接跳转类型
```json
{
  "id": "meituan-1",
  "title": "美团外卖红包",
  "description": "天天更新，最高可领56元！",
  "type": "link",
  "action": "立即领取",
  "url": "http://dpurl.cn/t0f689Dz"
}
```

#### 复制内容类型
```json
{
  "id": "meituan-2",
  "title": "3.9元购12张5元券",
  "description": "复制后，打开美团App领",
  "type": "copy",
  "action": "一键复制",
  "content": "1复制信息，去美团App http:/💰9sOWZiOTFiNGM💰"
}
```

#### 微信小程序类型
```json
{
  "id": "meituan-3",
  "title": "民宿大促销",
  "description": "200元无门槛立减券！",
  "type": "copy",
  "action": "一键复制",
  "content": "#小程序://美团/外卖团购特价美食酒店电影/民宿大促销/XpwQfhtLpu6Pluq",
  "dataType": "wxapp"
}
```

### 6. 更新今日主推

编辑对应的 `top.json` 文件：

```json
{
  "items": [
    "🔥 今日限时：美团外卖满30减15",
    "🎉 新用户专享：首单立减20元",
    "💎 会员专享：每周三额外红包"
  ]
}
```

### 7. 保存文件

编辑完成后保存文件，刷新浏览器即可看到更新效果。

## ⚠️ 注意事项

1. **JSON格式**：确保JSON格式正确，可以使用在线JSON验证工具检查
2. **ID唯一性**：每个优惠券的ID必须唯一
3. **文件编码**：保存为UTF-8编码
4. **备份**：修改前建议备份原文件

## 🔧 如果需要使用管理后台

如果后期需要使用可视化管理后台，可以：
1. 将 `admin.html.bak` 重命名为 `admin.html`
2. 或者设置访问权限限制

## 📞 技术支持

如有问题，请参考项目README.md文件或联系技术支持。 