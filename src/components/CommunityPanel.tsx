import React, { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, PlusCircle, Award, Trophy, User, Calendar } from "lucide-react";
import { ForumPost, ForumComment, UserStats } from "../types";

interface CommunityPanelProps {
  stats: UserStats;
}

export default function CommunityPanel({ stats }: CommunityPanelProps) {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Array");
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [loading, setLoading] = useState(true);

  const visitorId = localStorage.getItem("algoverse-visitor-id") || "visitor_fallback";

  // Load posts on mount
  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/forum");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
        if (data.length > 0) {
          // Sync selected post
          setSelectedPost((prev) => {
            if (prev) {
              const matched = data.find((p: any) => p.id === prev.id);
              if (matched) return matched;
            }
            return data[0];
          });
        }
      }
    } catch (err) {
      console.error("Error loading forum threads from SQLite:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleUpvotePost = async (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch("/api/forum/upvote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      });
      if (res.ok) {
        // Optimistic increase or re-fetch
        setPosts((current) =>
          current.map((p) => {
            if (p.id === postId) {
              const updated = { ...p, upvotes: p.upvotes + 1 };
              if (selectedPost && selectedPost.id === postId) setSelectedPost(updated);
              return updated;
            }
            return p;
          })
        );
      }
    } catch (err) {
      console.error("Error logging upvote to SQLite:", err);
    }
  };

  const handleSubmitComment = async () => {
    if (!newCommentText.trim() || !selectedPost) return;

    const commentId = `comment-${Date.now()}`;
    const authorName = "You (Developer)";

    try {
      const res = await fetch("/api/forum/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: commentId,
          postId: selectedPost.id,
          visitorId,
          author: authorName,
          content: newCommentText,
        }),
      });

      if (res.ok) {
        setNewCommentText("");
        await fetchPosts();
      }
    } catch (err) {
      console.error("Error logging comment to SQLite:", err);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPostId = `post-${Date.now()}`;
    const authorName = "You (Developer)";

    try {
      const res = await fetch("/api/forum/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: newPostId,
          visitorId,
          title: newPostTitle,
          author: authorName,
          avatar: "YD",
          category: newPostCategory,
          content: newPostContent,
        }),
      });

      if (res.ok) {
        setIsCreatingPost(false);
        setNewPostTitle("");
        setNewPostContent("");
        await fetchPosts();
      }
    } catch (err) {
      console.error("Error creating forum thread in SQLite:", err);
    }
  };

  // Scoreboard leaderboard comparing global rank data 
  const leaderboard = [
    { rank: 1, name: "Sourish Dey", xp: 3200, streak: 12, tag: "Founder" },
    { rank: 2, name: "Alex Rivera", xp: 2800, streak: 10, tag: "Pro" },
    { rank: 3, name: "Jessica Taylor", xp: 1950, streak: 8, tag: "Solver" },
    { rank: 4, name: "You (Active)", xp: stats.xp, streak: stats.streak, tag: "Student" },
    { rank: 5, name: "Jessica stack", xp: 450, streak: 2, tag: "Beginner" },
  ].sort((a, b) => b.xp - a.xp);

  return (
    <div className="flex-1 overflow-hidden flex flex-col md:flex-row bg-[#FDFCFB] select-none h-full">
      {/* Discussion Boards left panel block */}
      <div className="flex-1 flex flex-col h-full border-r border-[#EBE9E4] overflow-hidden">
        {/* Toggle between creation view & reading lists */}
        <div className="p-4 border-b border-[#EBE9E4] bg-white flex justify-between items-center shrink-0">
          <h3 className="font-bold text-sm text-[#0D0D0B] tracking-tight">Community Forums</h3>
          <button
            onClick={() => setIsCreatingPost(!isCreatingPost)}
            className="text-xs bg-[#10B981] hover:bg-[#059669] text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{isCreatingPost ? "View Feed" : "New Post"}</span>
          </button>
        </div>

        {isCreatingPost ? (
          // Create New Post View Map
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-xl mx-auto w-full">
            <div>
              <h3 className="text-lg font-bold text-[#0D0D0B] tracking-tight">Create a Discussion Thread</h3>
              <p className="text-xs text-[#706E68] mt-0.5">Share queries or optimal concepts with fellow students.</p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block mb-1">
                  Thread Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dijkstra relaxation complexity limits..."
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  className="w-full bg-white border border-[#EBE9E4] rounded-lg px-3 py-2 text-sm text-[#1A1A17] focus:ring-1 focus:ring-[#10B981] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block mb-1">
                    DSA Categorization
                  </label>
                  <select
                    value={newPostCategory}
                    onChange={(e) => setNewPostCategory(e.target.value)}
                    className="w-full bg-white border border-[#EBE9E4] text-xs font-semibold rounded-lg px-3 py-2 text-[#706E68] outline-none cursor-pointer"
                  >
                    <option>Array</option>
                    <option>Sorting</option>
                    <option>Linked List</option>
                    <option>Stack</option>
                    <option>Tree</option>
                    <option>Graph</option>
                    <option>DP</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider block mb-1">
                  Content description
                </label>
                <textarea
                  rows={5}
                  placeholder="Explain structural problems, details, or write questions..."
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  className="w-full bg-white border border-[#EBE9E4] rounded-lg px-3 py-2 text-sm text-[#1A1A17] focus:ring-1 focus:ring-[#10B981] focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={handleCreatePost}
                className="w-full py-2 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-lg text-xs transition-all cursor-pointer active:scale-95"
              >
                Submit Discussion Thread
              </button>
            </div>
          </div>
        ) : (
          // Split posts viewing list
          <div className="flex-1 grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 overflow-hidden">
            {/* Feed List Left */}
            <div className="border-b lg:border-b-0 lg:border-r border-[#EBE9E4] overflow-y-auto p-4 space-y-3">
              {posts.map((post) => {
                const isActive = selectedPost && selectedPost.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                    className={`p-4 border rounded-xl hover:shadow-xs transition-all cursor-pointer space-y-3.5 bg-white ${
                      isActive ? "border-[#10B981] bg-white ring-1 ring-[#10B981]/15" : "border-[#EBE9E4]"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#A3A199]">
                      <span className="bg-[#F5F3EF] border border-[#EBE9E4] px-2 py-0.5 rounded text-[#706E68]">
                        {post.category}
                      </span>
                      <span>{post.timeAgo}</span>
                    </div>

                    <h4 className="font-bold text-sm text-[#0D0D0B] leading-snug hover:text-[#10B981] transition-colors line-clamp-2">
                      {post.title}
                    </h4>

                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#EBE9E4] flex items-center justify-center text-[8px] font-bold text-[#706E68]">
                          {post.avatar}
                        </div>
                        <span className="text-xs font-semibold text-[#706E68]">{post.author}</span>
                      </div>

                      <div className="flex items-center gap-3 text-xs font-semibold">
                        <button
                          onClick={(e) => handleUpvotePost(post.id, e)}
                          className="flex items-center gap-1 text-[#706E68] hover:text-[#10B981]"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>{post.upvotes}</span>
                        </button>
                        <span className="flex items-center gap-1 text-[#A3A199]">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{post.replies}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {posts.length === 0 && (
                <div className="text-center py-12 text-xs text-[#A3A199] italic">
                  No discussion threads found in SQLite database. Or check connection.
                </div>
              )}
            </div>

            {/* Post Comments reader Right */}
            <div className="overflow-y-auto p-5 space-y-5 bg-white flex flex-col justify-between">
              {selectedPost ? (
                <div className="space-y-4">
                  <div className="border-b border-[#EBE9E4] pb-4 space-y-3">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-[#10B981] bg-[#DCFCE7] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {selectedPost.category}
                      </span>
                      <span className="text-[#A3A199] font-medium font-mono">{selectedPost.timeAgo}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0D0D0B] tracking-tight leading-snug">
                      {selectedPost.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#EBE9E4] border border-[#D6D3CD] flex items-center justify-center text-xs font-bold text-[#706E68]">
                        {selectedPost.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1A17]">{selectedPost.author}</div>
                        <div className="text-[10px] text-[#A3A199] -mt-0.5 font-medium">Platform Contributor</div>
                      </div>
                    </div>

                    <p className="text-xs text-[#57554F] leading-relaxed pt-2 whitespace-pre-line font-sans">
                      {selectedPost.content}
                    </p>
                  </div>

                  {/* List of comments */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-[#A3A199] tracking-wider mb-2">
                      Comments ({selectedPost.comments?.length || 0})
                    </h4>

                    {selectedPost.comments?.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3 bg-[#F9F8F6] border border-[#EBE9E4] rounded-lg space-y-1.5 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-[#10B981]">{comment.author}</span>
                          <span className="text-[#A3A199] font-mono leading-none">{comment.timeAgo}</span>
                        </div>
                        <p className="text-[11px] leading-relaxed text-[#57554F] font-sans pr-1">
                          {comment.content}
                        </p>
                      </div>
                    ))}

                    {(!selectedPost.comments || selectedPost.comments.length === 0) && (
                      <div className="text-center py-6 text-xs text-[#A3A199] select-none italic bg-[#FDFCFB] border border-[#EBE9E4] border-dashed rounded-lg">
                        No comments posted on this thread yet.
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center text-xs text-[#A3A199] italic p-6">
                  Select a discussion thread to view replies context.
                </div>
              )}

              {/* Submit a comment row */}
              <div className="border-t border-[#EBE9E4] pt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a helpful response..."
                  value={newCommentText}
                  disabled={!selectedPost}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 bg-white border border-[#EBE9E4] rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-[#10B981] outline-none text-[#1A1A17] disabled:bg-gray-50 disabled:cursor-not-allowed"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmitComment();
                  }}
                />
                <button
                  onClick={handleSubmitComment}
                  disabled={!selectedPost}
                  className="px-4 py-2 bg-[#10B981] hover:bg-[#059669] text-white rounded-lg text-xs font-bold transition-all cursor-pointer active:scale-95 text-center disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Ranks scoreboard right panel block - 80 width */}
      <aside className="w-full md:w-80 border-t md:border-t-0 border-[#EBE9E4] bg-white flex flex-col h-full overflow-y-auto p-5 shrink-0 select-none">
        <div className="space-y-4">
          <div className="flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-[#F59E0B]" />
            <h3 className="font-bold text-sm text-[#0D0D0B] tracking-tight">Active Leaderboard</h3>
          </div>
          <p className="text-xs text-[#706E68]">Compare global XP scores logged across the Platform.</p>

          <div className="border border-[#EBE9E4] rounded-xl overflow-hidden shadow-xs bg-white">
            <div className="divide-y divide-[#EBE9E4]">
              {leaderboard.map((item, index) => {
                const isUser = item.name.includes("You");
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between px-4 py-3 text-xs ${
                      isUser ? "bg-amber-50/15" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Rank badge */}
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10.5px] shrink-0 ${
                          item.rank === 1
                            ? "bg-[#FEF3C7] text-[#92400E] border border-[#FCD34D]"
                            : item.rank === 2
                            ? "bg-[#F3F4F6] text-[#374151] border border-[#D1D5DB]"
                            : item.rank === 3
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "text-[#706E68]"
                        }`}
                      >
                        {item.rank}
                      </span>

                      <div>
                        <div className={`font-semibold flex items-center gap-1 leading-none ${isUser ? "text-[#10B981] font-bold" : "text-[#1A1A17]"}`}>
                          <span>{item.name}</span>
                        </div>
                        <span className="text-[9px] text-[#A3A199] font-bold font-mono tracking-wider block mt-0.5 uppercase">
                          {item.streak} days • {item.tag}
                        </span>
                      </div>
                    </div>

                    <span className="font-mono font-bold text-[#1A1A17]">
                      {item.xp} XP
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
