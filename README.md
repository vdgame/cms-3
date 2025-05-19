# 内容平台 (Content Platform)

基于 Astro 和 Tailwind CSS 构建的现代化内容平台，包含博客、资讯和问答系统。

## 技术栈

- **前端框架**：[Astro](https://astro.build/)
- **样式**：[Tailwind CSS](https://tailwindcss.com/)
- **动态组件**：[React](https://reactjs.org/)
- **服务端渲染**：Astro SSR

## 主要功能

- 响应式设计，适配移动端和桌面端
- 博客系统，支持文章发布、浏览和搜索
- 资讯模块，展示最新技术动态
- 问答系统，类似 Stack Overflow 的社区问答功能
- 用户认证系统 (UI)

## 项目结构

```
/
├── public/            # 静态资源
│   ├── images/        # 图片资源
│   └── favicon.svg    # 网站图标
├── src/
│   ├── components/    # 可重用组件
│   ├── data/          # 模拟数据
│   ├── layouts/       # 页面布局组件
│   ├── pages/         # 路由页面
│   ├── styles/        # 全局样式
│   └── utils/         # 工具函数
├── astro.config.mjs   # Astro 配置
├── package.json       # 项目依赖
└── tailwind.config.mjs # Tailwind 配置
```

## 页面路由

- `/` - 首页
- `/blog` - 博客列表页
- `/blog/[slug]` - 博客详情页
- `/news` - 资讯列表页
- `/questions` - 问答列表页
- `/questions/[slug]` - 问答详情页

## 本地开发

1. 克隆项目
2. 安装依赖：`bun install`
3. 启动开发服务器：`bun run dev`
4. 打开浏览器访问：`http://localhost:4321/`

## 构建部署

```bash
# 打包构建
bun run build

# 预览构建结果
bun run preview
```

## 许可

MIT
