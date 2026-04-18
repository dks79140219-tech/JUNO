import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Post, SiteSettings, Inquiry } from '../types';
import { Plus, Trash2, Edit2, Save, Settings, FileText, Image as ImageIcon, X, HelpCircle, MessageSquare, CheckCircle, Send } from 'lucide-react';

export const Admin = () => {
  const [isAdmin, setIsAdmin] = React.useState(sessionStorage.getItem('isAdmin') === 'true');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const [posts, setPosts] = React.useState<Post[]>([]);
  const [inquiries, setInquiries] = React.useState<Inquiry[]>([]);
  const [settings, setSettings] = React.useState<SiteSettings>(storage.getSettings());
  const [activeTab, setActiveTab] = React.useState<'posts' | 'settings' | 'inquiries'>('posts');
  const [replyContent, setReplyContent] = React.useState<{ [key: string]: string }>({});
  
  // New Post State
  const [newPost, setNewPost] = React.useState<Partial<Post>>({
    title: '',
    content: '',
    category: 'record',
    date: new Date().toISOString().split('T')[0],
    imageUrl: ''
  });
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    if (isAdmin) {
      setPosts(storage.getPosts());
      setInquiries(storage.getInquiries());
    }
  }, [isAdmin]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = (process.env as any).VITE_ADMIN_PASSWORD || '8432';
    if (password === correctPassword) {
      setIsAdmin(true);
      sessionStorage.setItem('isAdmin', 'true');
      window.dispatchEvent(new Event('storage')); // Trigger navbar update
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('isAdmin');
    window.dispatchEvent(new Event('storage')); // Trigger navbar update
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border border-slate-100 overflow-hidden"
        >
          <div className="relative h-48 -mx-8 -mt-8 mb-8 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
              alt="Admin Login"
              className="w-full h-full object-cover opacity-80"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg border border-slate-100">
                <Settings className="text-univ-navy" size={32} />
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900">관리자 로그인</h1>
            <p className="text-slate-500 mt-2">홈페이지 관리를 위해 비밀번호를 입력해주세요.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50 text-center text-2xl tracking-[0.25em]"
              />
              {error && <p className="text-red-500 text-sm mt-2 ml-1">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-univ-navy text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-univ-navy/10"
            >
              로그인
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const handleAddPost = () => {
    if (!newPost.title || !newPost.content) return;
    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title!,
      content: newPost.content!,
      category: newPost.category as any,
      date: newPost.date!,
      imageUrl: newPost.imageUrl || `https://picsum.photos/seed/${Date.now()}/800/600`
    };
    const updated = [post, ...posts];
    setPosts(updated);
    storage.savePosts(updated);
    setNewPost({ title: '', content: '', category: 'record', date: new Date().toISOString().split('T')[0], imageUrl: '' });
  };

  const handleDeletePost = (id: string) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    storage.savePosts(updated);
  };

  const handleReplyInquiry = (id: string) => {
    const content = replyContent[id];
    if (!content?.trim()) return;

    const updated = inquiries.map(i => {
      if (i.id === id) {
        return {
          ...i,
          answer: content,
          answeredDate: new Date().toISOString().split('T')[0],
          isAnswered: true
        };
      }
      return i;
    });

    setInquiries(updated);
    storage.saveInquiries(updated);
    setReplyContent({ ...replyContent, [id]: '' });
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    storage.saveInquiries(updated);
  };

  const handleSaveSettings = () => {
    storage.saveSettings(settings);
    alert('설정이 저장되었습니다!');
  };

  return (
    <div className="pt-40 pb-20 px-4 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 space-y-2">
          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'posts' ? 'bg-univ-navy text-white shadow-lg shadow-univ-navy/10' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <FileText size={20} /> 콘텐츠 관리
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'settings' ? 'bg-univ-navy text-white shadow-lg shadow-univ-navy/10' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Settings size={20} /> 사이트 설정
          </button>
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
              activeTab === 'inquiries' ? 'bg-univ-navy text-white shadow-lg shadow-univ-navy/10' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <HelpCircle size={20} /> 문의 관리
          </button>
          <div className="pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
            >
              로그아웃
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          {activeTab === 'posts' ? (
            <div className="space-y-10">
              {/* Existing Post Section */}
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Plus className="text-univ-navy" /> 새 포스트 작성
                </h2>
                <div className="grid gap-4">
                  <input
                    type="text"
                    placeholder="제목"
                    value={newPost.title}
                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                  />
                  <div className="flex gap-4">
                    <select
                      value={newPost.category}
                      onChange={e => setNewPost({ ...newPost, category: e.target.value as any })}
                      className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                    >
                      <option value="record">활동 기록</option>
                      <option value="rule">교칙</option>
                      <option value="admission">입학 안내</option>
                      <option value="about">학교 소개</option>
                      <option value="notice">공지 사항</option>
                      <option value="event">이벤트</option>
                    </select>
                    <input
                      type="date"
                      value={newPost.date}
                      onChange={e => setNewPost({ ...newPost, date: e.target.value })}
                      className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      ref={fileInputRef}
                    />
                    {!newPost.imageUrl ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-univ-navy hover:border-univ-navy/50 transition-all bg-slate-50"
                      >
                        <ImageIcon size={32} className="mb-2" />
                        <span className="text-sm font-medium">사진 업로드 (선택 사항)</span>
                      </button>
                    ) : (
                      <div className="relative w-full h-48 rounded-xl overflow-hidden border border-slate-200">
                        <img src={newPost.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setNewPost({ ...newPost, imageUrl: '' })}
                          className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <textarea
                    placeholder="내용"
                    rows={5}
                    value={newPost.content}
                    onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                  ></textarea>
                  <button
                    onClick={handleAddPost}
                    className="bg-univ-navy text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-univ-navy/10"
                  >
                    포스트 게시하기
                  </button>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-6">게시물 목록</h2>
                <div className="space-y-4">
                  {posts.map(post => (
                    <div key={post.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div>
                        <h4 className="font-bold text-slate-800">{post.title}</h4>
                        <p className="text-xs text-slate-500">{post.date} • {post.category === 'record' ? '활동' : '교칙'}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : activeTab === 'inquiries' ? (
            <div className="space-y-10">
              <section>
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <HelpCircle className="text-univ-navy" /> 사용자 문의 관리
                </h2>
                
                <div className="space-y-6">
                  {inquiries.length > 0 ? (
                    inquiries.map((inquiry) => (
                      <div key={inquiry.id} className="bg-slate-50 rounded-[32px] p-8 border border-slate-100">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              {inquiry.isAnswered ? (
                                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded uppercase">
                                  <CheckCircle size={10} /> Answered
                                </span>
                              ) : (
                                <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded uppercase">Pending</span>
                              )}
                              <span className="text-xs text-slate-400">{inquiry.date}</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{inquiry.title}</h3>
                          </div>
                          <button
                            onClick={() => handleDeleteInquiry(inquiry.id)}
                            className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl mb-6 shadow-sm">
                          <p className="text-slate-600 leading-relaxed">{inquiry.content}</p>
                        </div>

                        {inquiry.isAnswered ? (
                          <div className="bg-univ-navy/5 p-6 rounded-2xl border-l-4 border-univ-navy">
                            <p className="text-xs font-bold text-univ-navy mb-2 uppercase tracking-widest flex items-center gap-2">
                              <MessageSquare size={14} /> 답변 내용 ({inquiry.answeredDate})
                            </p>
                            <p className="text-slate-900 leading-relaxed whitespace-pre-wrap">{inquiry.answer}</p>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <textarea
                              placeholder="답변 내용을 작성하세요..."
                              rows={3}
                              value={replyContent[inquiry.id] || ''}
                              onChange={(e) => setReplyContent({ ...replyContent, [inquiry.id]: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                            ></textarea>
                            <button
                              onClick={() => handleReplyInquiry(inquiry.id)}
                              className="bg-univ-navy text-white px-6 py-3 rounded-xl font-bold hover:brightness-110 transition-all flex items-center gap-2 ml-auto"
                            >
                              <Send size={18} /> 답변 등록하기
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200 text-slate-400">
                      새로운 문의가 없습니다.
                    </div>
                  )}
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Settings className="text-univ-navy" /> 사이트 설정
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">사이트 이름</label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={e => setSettings({ ...settings, siteName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">사이트 설명</label>
                  <textarea
                    rows={3}
                    value={settings.description}
                    onChange={e => setSettings({ ...settings, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">메인 배경색</label>
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={e => setSettings({ ...settings, primaryColor: e.target.value })}
                      className="w-full h-12 rounded-xl cursor-pointer border border-slate-200 p-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">포인트 색상</label>
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={e => setSettings({ ...settings, accentColor: e.target.value })}
                      className="w-full h-12 rounded-xl cursor-pointer border border-slate-200 p-1"
                    />
                  </div>
                </div>
                <button
                  onClick={handleSaveSettings}
                  className="w-full bg-univ-navy text-white py-4 rounded-xl font-bold hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-univ-navy/10"
                >
                  <Save size={20} /> 설정 저장하기
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
