import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Post, Comment } from '../types';
import { Calendar, MessageSquare, User, Send } from 'lucide-react';

export const Records = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null);
  const [nickname, setNickname] = React.useState('');
  const [commentContent, setCommentContent] = React.useState('');

  React.useEffect(() => {
    setPosts(storage.getPosts().filter(p => p.category === 'record'));
  }, []);

  const handleAddComment = (postId: string) => {
    if (!nickname.trim() || !commentContent.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: nickname,
      content: commentContent,
      date: new Date().toISOString().split('T')[0]
    };

    const allPosts = storage.getPosts();
    const updatedPosts = allPosts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    });

    storage.savePosts(updatedPosts);
    setPosts(updatedPosts.filter(p => p.category === 'record'));
    
    // Update selected post if it's the one we're commenting on
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost({
        ...selectedPost,
        comments: [...(selectedPost.comments || []), newComment]
      });
    }

    setNickname('');
    setCommentContent('');
  };

  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <header className="mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-univ-navy mb-4"
        >
          학교생활기록
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-2xl mx-auto"
        >
          준정고등학교 학생들의 소중한 활동들을 기록하고 공유하는 공간입니다.
        </motion.p>
      </header>

      {selectedPost ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-4xl mx-auto"
        >
          <button 
            onClick={() => setSelectedPost(null)}
            className="mb-8 text-univ-navy font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
          >
            ← 목록으로 돌아가기
          </button>

          <article className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-slate-100 overflow-hidden mb-12">
            {selectedPost.imageUrl && (
              <div className="h-[400px] w-full">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            <div className="p-10 md:p-16">
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
                <span className="flex items-center gap-2"><Calendar size={16} /> {selectedPost.date}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">활동 기록</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-8">{selectedPost.title}</h2>
              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap mb-16">
                {selectedPost.content}
              </div>

              {/* Comments Section */}
              <div className="pt-12 border-t border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <MessageSquare size={24} className="text-univ-navy" />
                  댓글 {selectedPost.comments?.length || 0}
                </h3>

                {/* Comment List */}
                <div className="space-y-6 mb-12">
                  {selectedPost.comments && selectedPost.comments.length > 0 ? (
                    selectedPost.comments.map((comment) => (
                      <div key={comment.id} className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-900 flex items-center gap-2">
                            <User size={14} className="text-univ-navy" /> {comment.author}
                          </span>
                          <span className="text-xs text-slate-400">{comment.date}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{comment.content}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-10 text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      첫 댓글을 남겨보세요!
                    </p>
                  )}
                </div>

                {/* Comment Form */}
                <div className="bg-white p-8 rounded-[32px] border-2 border-univ-navy/5 shadow-inner">
                  <h4 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">댓글 남기기</h4>
                  <div className="grid gap-4">
                    <input
                      type="text"
                      placeholder="닉네임"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full md:w-1/3 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50 font-bold"
                    />
                    <div className="relative">
                      <textarea
                        placeholder="따뜻한 댓글을 남겨주세요."
                        rows={3}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="w-full px-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50 resize-none"
                      ></textarea>
                      <button
                        onClick={() => handleAddComment(selectedPost.id)}
                        className="mt-2 w-full md:w-auto md:absolute md:bottom-4 md:right-4 bg-univ-navy text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-univ-navy/10"
                      >
                        등록하기 <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
            >
              {post.imageUrl && (
                <div className="h-60 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 mb-4 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-4 text-slate-900 group-hover:text-univ-navy transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-slate-500 line-clamp-3 text-sm leading-relaxed mb-6">
                  {post.content}
                </p>
                <div className="pt-6 border-t border-slate-50 flex justify-between items-center text-xs font-bold text-univ-navy">
                  <span>자세히 보기 →</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <MessageSquare size={14} /> {post.comments?.length || 0}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  );
};

