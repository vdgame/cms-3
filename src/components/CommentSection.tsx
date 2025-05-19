import React, { useState, useEffect } from 'react';
import { addComment, getComments, toggleHide, isHidden } from '../utils/interactionUtils';

interface Author {
  id: number;
  name: string;
  avatar?: string;
}

interface CommentData {
  id: number;
  content: string;
  author: Author;
  timestamp: number;
  parentId?: number;
}

interface Props {
  contentId: number;
  contentType: 'question' | 'answer';
}

export default function CommentSection({ contentId, contentType }: Props) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    // Load comments from local storage
    setComments(getComments(contentId, contentType));
  }, [contentId, contentType]);

  const handleAddComment = (parentId?: number) => {
    if (!newComment.trim()) return;

    const commentId = addComment(contentId, contentType, newComment, parentId);

    // Refresh the comments
    setComments(getComments(contentId, contentType));
    setNewComment('');
    setReplyingTo(null);
  };

  const handleHideComment = (commentId: number) => {
    toggleHide(commentId, 'comment');
    // Re-render to show the comment is hidden
    setComments([...comments]);
  };

  // Filter for top-level comments
  const topLevelComments = comments.filter(comment => !comment.parentId);

  // Recursive component for rendering comments
  const CommentTree = ({ comment, level = 0 }: { comment: CommentData, level?: number }) => {
    const childComments = comments.filter(c => c.parentId === comment.id);
    const isCommentHidden = isHidden(comment.id, 'comment');

    return (
      <div
        className={`pl-${level * 4} py-2 ${level > 0 ? 'ml-8 border-l-2 border-gray-100' : ''}`}
        key={comment.id}
      >
        {isCommentHidden ? (
          <div className="text-gray-500 italic text-sm">
            该评论已被隐藏
            <button
              onClick={() => handleHideComment(comment.id)}
              className="ml-2 text-blue-500 hover:underline"
            >
              显示
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                  {comment.author.name.charAt(0)}
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between">
                  <div className="text-sm font-medium">
                    {comment.author.name}
                    <span className="text-gray-500 text-xs ml-2">
                      {new Date(comment.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                      className="text-xs text-gray-500 hover:text-blue-600"
                    >
                      回复
                    </button>
                    <button
                      onClick={() => handleHideComment(comment.id)}
                      className="text-xs text-gray-500 hover:text-blue-600"
                    >
                      隐藏
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-800 mt-1">{comment.content}</p>

                {replyingTo === comment.id && (
                  <div className="mt-2">
                    <div className="flex mt-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="输入回复..."
                        className="flex-grow p-2 text-sm border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleAddComment(comment.id)}
                        className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
                      >
                        回复
                      </button>
                    </div>
                  </div>
                )}

                {/* Render child comments recursively */}
                {childComments.length > 0 && (
                  <div className="mt-2">
                    {childComments.map(childComment => (
                      <CommentTree key={childComment.id} comment={childComment} level={level + 1} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-sm font-medium text-gray-700">
          {showComments ? `${topLevelComments.length} 条评论` : '添加评论'}
        </h4>
        {topLevelComments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-xs text-blue-600 hover:underline"
          >
            {showComments ? '隐藏评论' : '显示评论'}
          </button>
        )}
      </div>

      {/* Add comment input */}
      {(!showComments || replyingTo === null) && (
        <div className="flex mt-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="添加评论..."
            className="flex-grow p-2 text-sm border rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={() => handleAddComment()}
            className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          >
            提交
          </button>
        </div>
      )}

      {/* Comments list */}
      {showComments && (
        <div className="mt-4 border-t pt-2">
          {topLevelComments.length === 0 ? (
            <p className="text-sm text-gray-500">暂无评论</p>
          ) : (
            <div className="space-y-3">
              {topLevelComments.map(comment => (
                <CommentTree key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
