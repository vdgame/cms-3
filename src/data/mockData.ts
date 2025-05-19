export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface BaseContent {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: User;
  createdAt: string;
  viewCount: number;
  likeCount: number;
  tags: Tag[];
  featured?: boolean;
}

export interface BlogPost extends BaseContent {
  content: string;
  readTime: number;
  category: Category;
  coverImage?: string;
}

export interface NewsItem extends BaseContent {
  content: string;
  source?: string;
  category: Category;
  coverImage?: string;
}

export interface Question extends BaseContent {
  content: string;
  answerCount: number;
  solved: boolean;
  voteCount: number;
}

export interface Answer {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  voteCount: number;
  accepted: boolean;
  questionId: number;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  parentId?: number;
  contentId: number;
  contentType: 'blog' | 'news' | 'question' | 'answer';
}

// Mock Users
export const users: User[] = [
  { id: 1, name: "张三", avatar: "/images/avatars/avatar-placeholder.svg" },
  { id: 2, name: "李四", avatar: "/images/avatars/avatar-placeholder.svg" },
  { id: 3, name: "王五", avatar: "/images/avatars/avatar-placeholder.svg" },
  { id: 4, name: "赵六", avatar: "/images/avatars/avatar-placeholder.svg" },
  { id: 5, name: "钱七", avatar: "/images/avatars/avatar-placeholder.svg" },
  { id: 6, name: "孙八", avatar: "/images/avatars/avatar-placeholder.svg" },
  { id: 7, name: "周九", avatar: "/images/avatars/avatar-placeholder.svg" },
  { id: 8, name: "吴十", avatar: "/images/avatars/avatar-placeholder.svg" },
];

// Mock Tags
export const tags: Tag[] = [
  { id: 1, name: "前端", slug: "frontend" },
  { id: 2, name: "后端", slug: "backend" },
  { id: 3, name: "人工智能", slug: "ai" },
  { id: 4, name: "数据库", slug: "database" },
  { id: 5, name: "云计算", slug: "cloud" },
  { id: 6, name: "DevOps", slug: "devops" },
  { id: 7, name: "区块链", slug: "blockchain" },
  { id: 8, name: "React", slug: "react" },
  { id: 9, name: "Vue", slug: "vue" },
  { id: 10, name: "Angular", slug: "angular" },
  { id: 11, name: "Node.js", slug: "nodejs" },
  { id: 12, name: "Python", slug: "python" },
  { id: 13, name: "Java", slug: "java" },
  { id: 14, name: "Go", slug: "golang" },
  { id: 15, name: "Docker", slug: "docker" },
  { id: 16, name: "Kubernetes", slug: "kubernetes" },
];

// Mock Categories
export const categories: Category[] = [
  { id: 1, name: "前端开发", slug: "frontend-development" },
  { id: 2, name: "后端开发", slug: "backend-development" },
  { id: 3, name: "移动开发", slug: "mobile-development" },
  { id: 4, name: "DevOps", slug: "devops" },
  { id: 5, name: "人工智能", slug: "artificial-intelligence" },
  { id: 6, name: "大数据", slug: "big-data" },
  { id: 7, name: "云原生", slug: "cloud-native" },
  { id: 8, name: "区块链", slug: "blockchain" },
  { id: 9, name: "安全", slug: "security" },
  { id: 10, name: "资讯", slug: "news" },
];

// Helper function to get random items from an array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Helper function to get random date in the last 30 days
const getRandomDate = (): string => {
  const now = new Date();
  const pastDate = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  return pastDate.toISOString();
};

// Generate mock blog posts
export const generateMockBlogPosts = (count: number = 20): BlogPost[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `如何使用 ${getRandomItems(tags, 1)[0].name} 构建现代化应用`,
    slug: `how-to-build-modern-app-with-${getRandomItems(tags, 1)[0].slug}-${i + 1}`,
    excerpt: "这篇文章详细介绍了使用最新技术构建现代化应用的方法和技巧。包括架构设计、性能优化和最佳实践。",
    content: `
      <h2>引言</h2>
      <p>现代Web开发正在快速发展，新工具和技术不断涌现。本文将分享构建高性能、可维护的现代应用的关键步骤。</p>

      <h2>架构设计</h2>
      <p>良好的架构是应用成功的基础。我们将探讨前端架构的各种模式和它们的优缺点。</p>

      <h2>性能优化</h2>
      <p>用户体验很大程度上取决于性能。我们将学习如何使用代码分割、懒加载和缓存策略来提高应用性能。</p>

      <h2>最佳实践</h2>
      <p>遵循最佳实践可以避免常见陷阱。我们将讨论代码规范、测试策略和部署流程。</p>

      <h2>总结</h2>
      <p>成功的现代应用需要综合考虑多方面因素。希望本文提供的指南能帮助你构建出色的应用。</p>
    `,
    author: users[Math.floor(Math.random() * users.length)],
    createdAt: getRandomDate(),
    viewCount: Math.floor(Math.random() * 1000) + 100,
    likeCount: Math.floor(Math.random() * 100) + 10,
    readTime: Math.floor(Math.random() * 20) + 5,
    category: categories[Math.floor(Math.random() * categories.length)],
    tags: getRandomItems(tags, Math.floor(Math.random() * 3) + 1),
    featured: Math.random() > 0.8,
    coverImage: `/images/default-cover.svg`,
  }));
};

// Generate mock news items
export const generateMockNewsItems = (count: number = 20): NewsItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `${getRandomItems(tags, 1)[0].name} 领域最新发展：突破性技术解析`,
    slug: `latest-development-in-${getRandomItems(tags, 1)[0].slug}-breakthrough-${i + 1}`,
    excerpt: "行业领先企业公布了新一代技术栈，预计将对开发流程和产品性能带来显著提升。本文分析其关键特性和潜在影响。",
    content: `
      <h2>重要公告</h2>
      <p>今日，行业领军企业发布了令人兴奋的新技术，这项技术有望彻底改变我们构建应用的方式。</p>

      <h2>核心特性</h2>
      <p>新框架包含多项创新，包括即时编译、自动优化和增强的类型检查机制。</p>

      <h2>市场反应</h2>
      <p>开发者社区反应积极，多家大型企业已宣布计划迁移到新技术栈。</p>

      <h2>未来展望</h2>
      <p>分析师预测，这项技术将在未来两年内成为行业标准，建议企业及早规划过渡策略。</p>
    `,
    author: users[Math.floor(Math.random() * users.length)],
    createdAt: getRandomDate(),
    viewCount: Math.floor(Math.random() * 2000) + 500,
    likeCount: Math.floor(Math.random() * 150) + 50,
    category: categories[Math.floor(Math.random() * categories.length)],
    tags: getRandomItems(tags, Math.floor(Math.random() * 3) + 1),
    source: ["科技日报", "开发者周刊", "程序员杂志", "TechCrunch中文版"][Math.floor(Math.random() * 4)],
    featured: Math.random() > 0.8,
    coverImage: `/images/default-cover.svg`,
  }));
};

// Generate mock questions
export const generateMockQuestions = (count: number = 20): Question[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `如何解决 ${getRandomItems(tags, 1)[0].name} 中的常见性能问题？`,
    slug: `how-to-solve-performance-issues-in-${getRandomItems(tags, 1)[0].slug}-${i + 1}`,
    excerpt: "我在开发大型应用时遇到了性能瓶颈，特别是在数据处理和渲染方面。有什么推荐的优化策略或工具可以帮助诊断和解决这些问题？",
    content: `
      <p>我正在使用最新版本开发一个复杂的Web应用，但遇到了几个性能问题：</p>

      <ol>
        <li>大量数据渲染导致的界面卡顿</li>
        <li>复杂计算造成的主线程阻塞</li>
        <li>频繁API调用引起的网络开销</li>
      </ol>

      <p>我已经尝试了以下方法：</p>

      <ul>
        <li>实现虚拟列表</li>
        <li>使用Web Worker进行复杂计算</li>
        <li>添加缓存层减少API调用</li>
      </ul>

      <p>但效果不是很明显。有没有其他方法或工具可以更彻底地解决这些问题？有类似经验的开发者能分享一下解决方案吗？</p>
    `,
    author: users[Math.floor(Math.random() * users.length)],
    createdAt: getRandomDate(),
    viewCount: Math.floor(Math.random() * 800) + 100,
    likeCount: Math.floor(Math.random() * 50) + 5,
    answerCount: Math.floor(Math.random() * 8) + 1,
    voteCount: Math.floor(Math.random() * 30) + 5,
    solved: Math.random() > 0.3,
    tags: getRandomItems(tags, Math.floor(Math.random() * 3) + 2),
    featured: Math.random() > 0.8,
  }));
};

// Generate mock answers for a question
export const generateMockAnswers = (questionId: number, count: number = 5): Answer[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: questionId * 100 + i + 1,
    content: `
      <p>我在处理类似问题时，发现以下策略非常有效：</p>

      <h3>优化渲染性能</h3>
      <p>使用分页或虚拟滚动是处理大量数据的关键。我推荐尝试 react-window 或 react-virtualized 库，它们提供了高性能的虚拟列表实现。</p>

      <h3>减少不必要的计算</h3>
      <p>确保使用 React.memo 或 useMemo 来避免不必要的重新渲染和计算。对于真正复杂的计算，Web Worker 确实是正确的方向，但实现细节很关键。</p>

      <h3>优化网络请求</h3>
      <p>除了缓存，还可以考虑以下几点：</p>
      <ul>
        <li>实现请求批处理，将多个API调用合并成一个</li>
        <li>使用GraphQL只获取需要的数据</li>
        <li>实现智能预加载策略</li>
      </ul>

      <p>希望这些建议对你有所帮助！如果需要更具体的代码示例，我可以进一步解释。</p>
    `,
    author: users[Math.floor(Math.random() * users.length)],
    createdAt: getRandomDate(),
    voteCount: Math.floor(Math.random() * 20) + 1,
    accepted: i === 0 && Math.random() > 0.5,
    questionId: questionId,
  }));
};

// Generate mock comments
export const generateMockComments = (
  contentId: number,
  contentType: 'blog' | 'news' | 'question' | 'answer',
  count: number = 5
): Comment[] => {
  const baseComments = Array.from({ length: Math.floor(count * 0.6) }, (_, i) => ({
    id: contentId * 1000 + i + 1,
    content: `这是一条${contentType === 'blog' ? '博客' : contentType === 'news' ? '新闻' : contentType === 'question' ? '问题' : '回答'}评论，内容很有见地，谢谢分享！`,
    author: users[Math.floor(Math.random() * users.length)],
    createdAt: getRandomDate(),
    contentId,
    contentType,
  }));

  const replies = baseComments.flatMap((comment, index) => {
    if (Math.random() > 0.5) {
      return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
        id: comment.id * 10 + i + 1,
        content: `@${comment.author.name} 回复评论，补充一些我的看法...`,
        author: users[Math.floor(Math.random() * users.length)],
        createdAt: getRandomDate(),
        parentId: comment.id,
        contentId,
        contentType,
      }));
    }
    return [];
  });

  return [...baseComments, ...replies];
};

// Pre-generate some data
export const blogPosts = generateMockBlogPosts(40);
export const newsItems = generateMockNewsItems(40);
export const questions = generateMockQuestions(40);

// Filter featured items
export const featuredBlogs = blogPosts.filter(post => post.featured);
export const featuredNews = newsItems.filter(item => item.featured);
export const featuredQuestions = questions.filter(q => q.featured);

// Get latest items
export const latestBlogs = [...blogPosts].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
).slice(0, 20);

export const latestNews = [...newsItems].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
).slice(0, 20);

export const latestQuestions = [...questions].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
).slice(0, 20);

// Get popular items
export const popularBlogs = [...blogPosts].sort(
  (a, b) => b.viewCount - a.viewCount
).slice(0, 10);

export const popularNews = [...newsItems].sort(
  (a, b) => b.viewCount - a.viewCount
).slice(0, 10);

export const popularQuestions = [...questions].sort(
  (a, b) => b.viewCount - a.viewCount
).slice(0, 10);

// Generate answers for each question
export const answers = questions.flatMap(
  question => generateMockAnswers(question.id, Math.floor(Math.random() * 5) + 1)
);

// Generate some comments for each content type
export const blogComments = blogPosts.slice(0, 5).flatMap(
  post => generateMockComments(post.id, 'blog', Math.floor(Math.random() * 8) + 2)
);

export const newsComments = newsItems.slice(0, 5).flatMap(
  item => generateMockComments(item.id, 'news', Math.floor(Math.random() * 5) + 1)
);

export const questionComments = questions.slice(0, 5).flatMap(
  question => generateMockComments(question.id, 'question', Math.floor(Math.random() * 10) + 3)
);

export const answerComments = answers.slice(0, 10).flatMap(
  answer => generateMockComments(answer.id, 'answer', Math.floor(Math.random() * 6) + 1)
);
