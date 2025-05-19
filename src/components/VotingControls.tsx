import React, { useState, useEffect } from 'react';
import { handleVote, getUserVote, toggleFavorite, isFavorited, toggleAcceptAnswer, isAnswerAccepted } from '../utils/interactionUtils';

interface Props {
  contentId: number;
  contentType: 'question' | 'answer';
  initialVoteCount: number;
  canAccept?: boolean;
  questionId?: number;
  initialAccepted?: boolean;
  onAcceptToggle?: (isAccepted: boolean) => void;
}

export default function VotingControls({
  contentId,
  contentType,
  initialVoteCount,
  canAccept = false,
  questionId,
  initialAccepted = false,
  onAcceptToggle
}: Props) {
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [userVote, setUserVote] = useState<1 | -1 | 0>(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [accepted, setAccepted] = useState(initialAccepted);

  useEffect(() => {
    // Initialize user's vote status from localStorage
    const savedVote = getUserVote(contentId, contentType);
    setUserVote(savedVote);

    // Initialize favorite status if it's a question
    if (contentType === 'question') {
      setIsFavorite(isFavorited(contentId, 'question'));
    }

    // Initialize accepted status if it's an answer
    if (contentType === 'answer' && questionId) {
      setAccepted(isAnswerAccepted(questionId, contentId));
    }
  }, [contentId, contentType, questionId]);

  const handleVoteClick = (voteType: 1 | -1) => {
    const newCount = handleVote(contentId, contentType, voteType, voteCount);
    setVoteCount(newCount);
    setUserVote(getUserVote(contentId, contentType));
  };

  const handleFavoriteClick = () => {
    if (contentType === 'question') {
      const newFavoriteStatus = toggleFavorite(contentId, 'question');
      setIsFavorite(newFavoriteStatus);
    }
  };

  const handleAcceptClick = () => {
    if (contentType === 'answer' && questionId && canAccept) {
      const isNowAccepted = toggleAcceptAnswer(questionId, contentId);
      setAccepted(isNowAccepted);
      if (onAcceptToggle) {
        onAcceptToggle(isNowAccepted);
      }
    }
  };

  return (
    <div className="flex flex-col items-center mr-6">
      {/* Upvote button */}
      <button
        className={`p-2 focus:outline-none transition-colors ${
          userVote === 1 ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'
        }`}
        onClick={() => handleVoteClick(1)}
        aria-label="赞同"
        title="赞同"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
        </svg>
      </button>

      {/* Vote count */}
      <span className="text-xl font-bold my-2">{voteCount}</span>

      {/* Downvote button */}
      <button
        className={`p-2 focus:outline-none transition-colors ${
          userVote === -1 ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
        }`}
        onClick={() => handleVoteClick(-1)}
        aria-label="反对"
        title="反对"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Favorite button for questions */}
      {contentType === 'question' && (
        <button
          className={`p-2 mt-2 focus:outline-none transition-colors ${
            isFavorite ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
          }`}
          onClick={handleFavoriteClick}
          aria-label="收藏"
          title="收藏问题"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      )}

      {/* Accept answer button */}
      {contentType === 'answer' && canAccept && (
        <button
          className={`p-2 mt-2 focus:outline-none transition-colors ${
            accepted ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
          }`}
          onClick={handleAcceptClick}
          aria-label="采纳回答"
          title="采纳为最佳回答"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={accepted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      )}
    </div>
  );
}
