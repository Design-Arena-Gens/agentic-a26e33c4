'use client';

import { useState, useEffect } from 'react';
import './styles.css';

export default function ReelViewer() {
  const [currentReel, setCurrentReel] = useState(0);
  const [liked, setLiked] = useState({});
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState(false);
  const [activeCommentReel, setActiveCommentReel] = useState(null);

  const reels = [
    {
      id: 1,
      username: "creative.studio",
      avatar: "🎨",
      description: "Amazing animation showcase! 🎬✨",
      likes: "15.2K",
      commentCount: 248,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      username: "travel.vibes",
      avatar: "✈️",
      description: "Sunset in paradise 🌅",
      likes: "23.8K",
      commentCount: 512,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      username: "tech.daily",
      avatar: "💻",
      description: "Coding magic ⚡ #webdev",
      likes: "8.9K",
      commentCount: 156,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      id: 4,
      username: "food.lovers",
      avatar: "🍕",
      description: "Delicious recipe tutorial 👨‍🍳",
      likes: "31.5K",
      commentCount: 892,
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      id: 5,
      username: "fitness.pro",
      avatar: "💪",
      description: "Ultimate workout routine 🔥",
      likes: "19.3K",
      commentCount: 367,
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    }
  ];

  const sampleComments = [
    { user: "user123", text: "This is amazing! 🔥" },
    { user: "cool_person", text: "Love this content!" },
    { user: "viewer_99", text: "Can you make more like this?" }
  ];

  const handleScroll = (e) => {
    const delta = e.deltaY;
    if (Math.abs(delta) > 30) {
      if (delta > 0 && currentReel < reels.length - 1) {
        setCurrentReel(prev => prev + 1);
      } else if (delta < 0 && currentReel > 0) {
        setCurrentReel(prev => prev - 1);
      }
    }
  };

  const handleLike = (reelId) => {
    setLiked(prev => ({ ...prev, [reelId]: !prev[reelId] }));
  };

  const handleComment = (reelId) => {
    setActiveCommentReel(reelId);
    setShowComments(true);
  };

  const handleShare = () => {
    alert('Share feature clicked! 📤');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && currentReel < reels.length - 1) {
        setCurrentReel(prev => prev + 1);
      } else if (e.key === 'ArrowUp' && currentReel > 0) {
        setCurrentReel(prev => prev - 1);
      } else if (e.key === 'Escape') {
        setShowComments(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentReel, reels.length]);

  return (
    <div className="app" onWheel={handleScroll}>
      <div className="reel-container" style={{ transform: `translateY(-${currentReel * 100}vh)` }}>
        {reels.map((reel, index) => (
          <div key={reel.id} className="reel" style={{ background: reel.gradient }}>
            <div className="reel-content">
              <div className="animated-shapes">
                <div className="shape shape1"></div>
                <div className="shape shape2"></div>
                <div className="shape shape3"></div>
              </div>

              <div className="reel-header">
                <div className="user-info">
                  <div className="avatar">{reel.avatar}</div>
                  <span className="username">{reel.username}</span>
                  <button className="follow-btn">Follow</button>
                </div>
              </div>

              <div className="reel-footer">
                <div className="description">
                  <p><strong>{reel.username}</strong> {reel.description}</p>
                </div>
              </div>

              <div className="actions">
                <button
                  className={`action-btn ${liked[reel.id] ? 'liked' : ''}`}
                  onClick={() => handleLike(reel.id)}
                >
                  <span className="icon">{liked[reel.id] ? '❤️' : '🤍'}</span>
                  <span className="count">{reel.likes}</span>
                </button>

                <button className="action-btn" onClick={() => handleComment(reel.id)}>
                  <span className="icon">💬</span>
                  <span className="count">{reel.commentCount}</span>
                </button>

                <button className="action-btn" onClick={handleShare}>
                  <span className="icon">📤</span>
                </button>

                <button className="action-btn">
                  <span className="icon">⋯</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showComments && (
        <div className="comments-overlay" onClick={() => setShowComments(false)}>
          <div className="comments-panel" onClick={(e) => e.stopPropagation()}>
            <div className="comments-header">
              <h3>Comments</h3>
              <button className="close-btn" onClick={() => setShowComments(false)}>✕</button>
            </div>
            <div className="comments-list">
              {sampleComments.map((comment, idx) => (
                <div key={idx} className="comment">
                  <div className="comment-avatar">👤</div>
                  <div className="comment-content">
                    <strong>{comment.user}</strong>
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="comment-input">
              <input type="text" placeholder="Add a comment..." />
              <button>Post</button>
            </div>
          </div>
        </div>
      )}

      <div className="navigation-hint">
        <p>Scroll or use ↑↓ arrows to navigate</p>
      </div>

      <div className="progress-indicator">
        {reels.map((_, idx) => (
          <div
            key={idx}
            className={`progress-dot ${idx === currentReel ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
