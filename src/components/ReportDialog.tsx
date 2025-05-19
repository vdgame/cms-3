import React, { useState } from 'react';
import { reportContent, isReported } from '../utils/interactionUtils';

interface Props {
  contentId: number;
  contentType: 'question' | 'answer' | 'comment';
  onClose: () => void;
  position?: { top: number; left: number };
}

export default function ReportDialog({ contentId, contentType, onClose, position }: Props) {
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) {
      setError('请选择举报原因');
      return;
    }

    const success = reportContent(contentId, contentType, reason);
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setError('您已经举报过此内容');
    }
  };

  const reportReasons = [
    '垃圾信息/广告',
    '内容侵权',
    '低质量内容',
    '不友善行为',
    '违法有害信息',
    '其他问题'
  ];

  const dialogStyle = position ? {
    position: 'absolute' as 'absolute',
    top: `${position.top}px`,
    left: `${position.left}px`,
    zIndex: 1000
  } : {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="fixed inset-0 bg-black opacity-30"></div>
      <div
        className="bg-white rounded-lg shadow-xl w-96 p-6 relative z-10"
        style={dialogStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {submitted ? (
          <div className="text-center py-4">
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <p className="text-lg font-medium mt-2">举报成功</p>
            <p className="text-gray-500">感谢您的反馈，我们会尽快处理</p>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-bold mb-4">举报内容</h3>
            <p className="text-gray-600 mb-4">请选择举报原因：</p>

            <div className="space-y-2 mb-4">
              {reportReasons.map((reportReason, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="radio"
                    id={`reason-${index}`}
                    name="reportReason"
                    value={reportReason}
                    checked={reason === reportReason}
                    onChange={() => setReason(reportReason)}
                    className="mr-2"
                  />
                  <label htmlFor={`reason-${index}`} className="text-gray-700">
                    {reportReason}
                  </label>
                </div>
              ))}
            </div>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                取消
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                提交举报
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
