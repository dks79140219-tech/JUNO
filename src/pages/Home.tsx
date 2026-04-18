import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, BookOpen, Camera, Info, Calendar, Megaphone, Users, GraduationCap, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { storage } from '../storage';
import { Post } from '../types';

export const Home = () => {
  const [newsPosts, setNewsPosts] = React.useState<Post[]>([]);
  const [noticePosts, setNoticePosts] = React.useState<Post[]>([]);
  const [eventPosts, setEventPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    // Get latest posts for the home screen highlights
    const allPosts = storage.getPosts();
    const recordPosts = allPosts.filter(p => p.category === 'record').slice(0, 2);
    const recentNotices = allPosts.filter(p => p.category === 'notice').slice(0, 4);
    const recentEvents = allPosts.filter(p => p.category === 'event').slice(0, 2);
    
    setNewsPosts(recordPosts);
    setNoticePosts(recentNotices);
    setEventPosts(recentEvents);
  }, []);

  const quickLinks = [
    { name: '이벤트', icon: <Calendar size={24} />, color: 'bg-blue-50 text-blue-600', path: '/events' },
    { name: '공지사항', icon: <Megaphone size={24} />, color: 'bg-indigo-50 text-indigo-600', path: '/notices' },
    { name: '생활기록', icon: <Users size={24} />, color: 'bg-purple-50 text-purple-600', path: '/records' },
    { name: '학교교칙', icon: <ShieldCheck size={24} />, color: 'bg-amber-50 text-amber-600', path: '/rules' },
  ];

  const notices: {title: string, date: string, category: string}[] = [];

  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[450px] flex items-center overflow-hidden bg-univ-navy">
        <div className="absolute inset-0 z-0 text-center md:text-left">
          <div className="absolute inset-0 bg-gradient-to-br from-univ-navy via-univ-navy-light to-univ-navy opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-white mx-auto md:mx-0"
          >
            <h2 className="text-univ-gold font-bold text-sm md:text-lg mb-2 tracking-widest uppercase">Global Leading Education</h2>
            <h1 className="text-3xl md:text-6xl font-extrabold mb-6 leading-tight md:leading-[1.15]">
              바른 인성을 추구하는,<br />
              <span className="text-white decoration-univ-gold underline underline-offset-8">준정고등학교</span>와 함께
            </h1>
            <p className="text-base md:text-lg text-slate-100/90 mb-8 max-w-lg font-medium leading-relaxed mx-auto md:mx-0">
              준정고등학교는 엄격한 환경과 그 속의 바름을 추구하는 학교로,<br className="hidden md:block" />
              당신의 성장을 돕는 인재 양성의 요람입니다.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/admission" className="px-10 py-4 bg-univ-gold text-univ-navy font-bold rounded-xl md:rounded-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/20">
                입학안내 바로가기 <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl md:rounded-sm hover:bg-white/20 transition-all flex items-center justify-center">
                학교소개
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-8 bg-white border-b border-slate-100 shadow-sm relative z-20 mx-4 lg:mx-0 mt-[-2rem] md:mt-0 lg:rounded-none rounded-3xl">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-4 md:flex md:justify-center gap-4 md:gap-12">
            {quickLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Link to={link.path} className="flex flex-col items-center group w-full md:w-24">
                  <div className={`w-12 h-12 md:w-16 md:h-16 ${link.color} rounded-xl md:rounded-2xl flex items-center justify-center mb-2 md:mb-3 group-hover:rotate-12 transition-all duration-300 shadow-sm`}>
                    {React.cloneElement(link.icon as React.ReactElement, { size: window.innerWidth < 768 ? 20 : 24 })}
                  </div>
                  <span className="text-[10px] md:text-sm font-bold text-slate-600 group-hover:text-univ-navy transition-colors">{link.name}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Notice Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Notice Column */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900">공지사항</h3>
                <Link to="/notices" className="text-slate-400 hover:text-univ-navy transition-colors">
                  <PlusIcon size={20} />
                </Link>
              </div>
              <div className="space-y-4">
                {noticePosts.length > 0 ? (
                  noticePosts.map((notice) => (
                    <Link
                      key={notice.id}
                      to="/notices"
                      className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100 hover:shadow-md transition-all group"
                    >
                      <div className="flex-1 overflow-hidden pr-4">
                        <h4 className="font-bold text-slate-800 group-hover:text-univ-navy transition-colors truncate">
                          {notice.title}
                        </h4>
                      </div>
                      <span className="text-xs text-slate-400 font-medium shrink-0">{notice.date}</span>
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center text-slate-400 font-medium bg-white/50 rounded-2xl border border-dashed border-slate-200">
                    등록된 공지사항이 없습니다.
                  </div>
                )}
              </div>
            </div>

            {/* News/Highlights Column */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900">학교소식</h3>
                <Link to="/records" className="text-slate-400 hover:text-univ-navy transition-colors">
                  <PlusIcon size={20} />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {newsPosts.length > 0 ? (
                  newsPosts.map((post) => (
                    <Link key={post.id} to="/records" className="group">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md bg-slate-100">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Camera size={32} />
                          </div>
                        )}
                        <div className="absolute top-2 left-2 px-3 py-1 bg-univ-navy/90 text-white text-[10px] font-bold rounded-full">
                          {post.date}
                        </div>
                      </div>
                      <h4 className="font-bold text-slate-900 line-clamp-1 group-hover:text-univ-navy transition-colors mb-2">
                        {post.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {post.content}
                      </p>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-2 py-12 text-center text-slate-400 font-medium bg-white/50 rounded-2xl border border-dashed border-slate-200">
                    최신 소식이 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-20">
            {/* Event Section */}
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
                <h3 className="text-2xl font-bold text-slate-900">이벤트</h3>
                <Link to="/events" className="text-slate-400 hover:text-blue-600 transition-colors">
                  <PlusIcon size={20} />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {eventPosts.length > 0 ? (
                  eventPosts.map((post) => (
                    <Link key={post.id} to="/events" className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                      <div className="relative aspect-video overflow-hidden">
                        {post.imageUrl ? (
                          <img 
                            src={post.imageUrl} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
                            <Camera size={48} />
                          </div>
                        )}
                        <div className="absolute top-4 left-4 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded-full shadow-lg">
                          EVENT
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-3 uppercase tracking-widest">
                          <Calendar size={12} /> {post.date}
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {post.title}
                        </h4>
                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                          {post.content}
                        </p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center text-slate-400 font-medium bg-white/50 rounded-3xl border border-dashed border-slate-200">
                    진행 중인 이벤트가 없습니다.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

const PlusIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M5 12h14" />
  </svg>
);
