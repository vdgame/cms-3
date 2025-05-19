/**
 * 格式化日期为 YYYY-MM-DD 格式
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * 计算相对时间（例如：3小时前，2天前等）
 */
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  let interval = Math.floor(seconds / 31536000); // 年
  if (interval >= 1) {
    return `${interval} 年前`;
  }

  interval = Math.floor(seconds / 2592000); // 月
  if (interval >= 1) {
    return `${interval} 个月前`;
  }

  interval = Math.floor(seconds / 86400); // 日
  if (interval >= 1) {
    return `${interval} 天前`;
  }

  interval = Math.floor(seconds / 3600); // 小时
  if (interval >= 1) {
    return `${interval} 小时前`;
  }

  interval = Math.floor(seconds / 60); // 分钟
  if (interval >= 1) {
    return `${interval} 分钟前`;
  }

  return '刚刚';
}
