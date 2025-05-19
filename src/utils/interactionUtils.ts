// Constants for localStorage keys
const STORAGE_KEYS = {
  VOTES: 'content_platform_votes',
  FAVORITES: 'content_platform_favorites',
  HIDDEN: 'content_platform_hidden',
  REPORTED: 'content_platform_reported',
  COMMENTS: 'content_platform_comments',
};

// Data structure for storing votes
interface VoteData {
  [contentId: string]: {
    type: 'question' | 'answer';
    vote: 1 | -1 | 0; // 1 = upvote, -1 = downvote, 0 = no vote
  };
}

// Data structure for storing favorites
interface FavoriteData {
  [contentId: string]: {
    type: 'question' | 'blog' | 'news';
    timestamp: number;
  };
}

// Data structure for storing hidden items
interface HiddenData {
  [contentId: string]: {
    type: 'question' | 'answer' | 'comment';
    timestamp: number;
  };
}

// Data structure for storing reported items
interface ReportedData {
  [contentId: string]: {
    type: 'question' | 'answer' | 'comment';
    reason: string;
    timestamp: number;
  };
}

// Comment data to be added
interface CommentData {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
  };
  timestamp: number;
  parentId?: number;
}

// Helper function to get data from localStorage
function getStorageData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;

  const data = localStorage.getItem(key);
  if (!data) return defaultValue;

  try {
    return JSON.parse(data) as T;
  } catch (e) {
    console.error('Error parsing localStorage data:', e);
    return defaultValue;
  }
}

// Helper function to save data to localStorage
function saveStorageData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Function to handle voting
export function handleVote(
  contentId: number,
  contentType: 'question' | 'answer',
  voteType: 1 | -1,
  currentCount: number
): number {
  const storageKey = `${contentType}_${contentId}`;
  const votes = getStorageData<VoteData>(STORAGE_KEYS.VOTES, {});

  const currentVote = votes[storageKey]?.vote || 0;
  let newVoteCount = currentCount;

  // Toggle vote if clicking the same button, otherwise change vote
  if (currentVote === voteType) {
    // Toggle vote off
    votes[storageKey] = { type: contentType, vote: 0 };
    newVoteCount -= voteType; // Remove the vote
  } else {
    // Change vote
    votes[storageKey] = { type: contentType, vote: voteType };
    newVoteCount = currentCount - currentVote + voteType; // Adjust vote count
  }

  saveStorageData(STORAGE_KEYS.VOTES, votes);
  return newVoteCount;
}

// Function to check if user has voted
export function getUserVote(contentId: number, contentType: 'question' | 'answer'): 1 | -1 | 0 {
  const storageKey = `${contentType}_${contentId}`;
  const votes = getStorageData<VoteData>(STORAGE_KEYS.VOTES, {});
  return votes[storageKey]?.vote || 0;
}

// Function to toggle favorite
export function toggleFavorite(contentId: number, contentType: 'question' | 'blog' | 'news'): boolean {
  const storageKey = `${contentType}_${contentId}`;
  const favorites = getStorageData<FavoriteData>(STORAGE_KEYS.FAVORITES, {});

  const isFavorite = !!favorites[storageKey];

  if (isFavorite) {
    delete favorites[storageKey];
  } else {
    favorites[storageKey] = {
      type: contentType,
      timestamp: Date.now()
    };
  }

  saveStorageData(STORAGE_KEYS.FAVORITES, favorites);
  return !isFavorite;
}

// Function to check if content is favorited
export function isFavorited(contentId: number, contentType: 'question' | 'blog' | 'news'): boolean {
  const storageKey = `${contentType}_${contentId}`;
  const favorites = getStorageData<FavoriteData>(STORAGE_KEYS.FAVORITES, {});
  return !!favorites[storageKey];
}

// Function to toggle hide
export function toggleHide(contentId: number, contentType: 'question' | 'answer' | 'comment'): boolean {
  const storageKey = `${contentType}_${contentId}`;
  const hidden = getStorageData<HiddenData>(STORAGE_KEYS.HIDDEN, {});

  const isHidden = !!hidden[storageKey];

  if (isHidden) {
    delete hidden[storageKey];
  } else {
    hidden[storageKey] = {
      type: contentType,
      timestamp: Date.now()
    };
  }

  saveStorageData(STORAGE_KEYS.HIDDEN, hidden);
  return !isHidden;
}

// Function to check if content is hidden
export function isHidden(contentId: number, contentType: 'question' | 'answer' | 'comment'): boolean {
  const storageKey = `${contentType}_${contentId}`;
  const hidden = getStorageData<HiddenData>(STORAGE_KEYS.HIDDEN, {});
  return !!hidden[storageKey];
}

// Function to report content
export function reportContent(
  contentId: number,
  contentType: 'question' | 'answer' | 'comment',
  reason: string
): boolean {
  const storageKey = `${contentType}_${contentId}`;
  const reported = getStorageData<ReportedData>(STORAGE_KEYS.REPORTED, {});

  const isReported = !!reported[storageKey];

  if (!isReported) {
    reported[storageKey] = {
      type: contentType,
      reason,
      timestamp: Date.now()
    };
    saveStorageData(STORAGE_KEYS.REPORTED, reported);
  }

  return !isReported;
}

// Function to check if content is reported
export function isReported(contentId: number, contentType: 'question' | 'answer' | 'comment'): boolean {
  const storageKey = `${contentType}_${contentId}`;
  const reported = getStorageData<ReportedData>(STORAGE_KEYS.REPORTED, {});
  return !!reported[storageKey];
}

// Function to add a comment
export function addComment(
  contentId: number,
  contentType: 'question' | 'answer',
  comment: string,
  parentId?: number
): number {
  // In a real app, this would be an API call
  // For now, we'll use localStorage to simulate
  const storageKey = `${contentType}_${contentId}_comments`;
  const comments = getStorageData<CommentData[]>(STORAGE_KEYS.COMMENTS + storageKey, []);

  // Generate a random ID (in a real app, this would come from the server)
  const newId = Date.now();

  const newComment: CommentData = {
    id: newId,
    content: comment,
    author: {
      id: 1, // Assume current user is ID 1
      name: "当前用户", // Assume current user name
    },
    timestamp: Date.now(),
    parentId,
  };

  comments.push(newComment);
  saveStorageData(STORAGE_KEYS.COMMENTS + storageKey, comments);

  return newId;
}

// Function to get comments
export function getComments(contentId: number, contentType: 'question' | 'answer'): CommentData[] {
  const storageKey = `${contentType}_${contentId}_comments`;
  return getStorageData<CommentData[]>(STORAGE_KEYS.COMMENTS + storageKey, []);
}

// Function to toggle accepting an answer
export function toggleAcceptAnswer(questionId: number, answerId: number): boolean {
  const storageKey = `question_${questionId}_accepted_answer`;
  const currentAcceptedId = getStorageData<number | null>(storageKey, null);

  if (currentAcceptedId === answerId) {
    // Unaccept
    saveStorageData(storageKey, null);
    return false;
  } else {
    // Accept
    saveStorageData(storageKey, answerId);
    return true;
  }
}

// Function to check if an answer is accepted
export function isAnswerAccepted(questionId: number, answerId: number): boolean {
  const storageKey = `question_${questionId}_accepted_answer`;
  const acceptedId = getStorageData<number | null>(storageKey, null);
  return acceptedId === answerId;
}
