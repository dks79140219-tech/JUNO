import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Post } from '../types';
import { Megaphone, Calendar, ChevronRight } from 'lucide-react';

export const Notice = () => {
  const [notices, setNotices] = React.useState<Post[]>([]);
  const [selectedNotice, setSelectedNotice] = React.useState<Post | null>(null);

  React.useEffect(() => {
    setNotices(storage.getPosts().filter(p => p.category === 'notice'));
  }, []);

  return (
    <div className="pt-40 pb-20 px-4 max-w-5xl mx-auto">
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-univ-navy text-univ-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <Megaphone size={40} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
        >
          공지사항
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          className="h-1.5 bg-univ-gold mx-auto mb-8"
        ></motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          준정고등학교의 주요 학사 일정 및 중요 소식을 전해드립니다.
        </motion.p>
      </header>

      {selectedNotice ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <button 
            onClick={() => setSelectedNotice(null)}
            className="mb-8 text-univ-navy font-bold flex items-center gap-2 hover:translate-x-[-4px] transition-transform"
          >
            ← 목록으로 돌아가기
          </button>

          <article className="bg-white p-10 md:p-16 rounded-[40px] shadow-xl border border-slate-100">
            <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
              <span className="flex items-center gap-2"><Calendar size={16} /> {selectedNotice.date}</span>
              <span className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-xs font-bold uppercase tracking-wider">Notice</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-10">{selectedNotice.title}</h2>
            
            {selectedNotice.imageUrl && (
              <div className="mb-12 rounded-3xl overflow-hidden shadow-lg">
                <img src={selectedNotice.imageUrl} alt={selectedNotice.title} className="w-full h-auto" referrerPolicy="no-referrer" />
              </div>
            )}

            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {selectedNotice.content}
            </div>
          </article>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {notices.length > 0 ? (
            notices.map((notice, index) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedNotice(notice)}
                className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-univ-navy/10 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider">Important</span>
                    <span className="text-xs text-slate-400 font-medium">{notice.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-univ-navy transition-colors">
                    {notice.title}
                  </h3>
                </div>
                <div className="ml-4 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-univ-navy group-hover:text-white transition-all">
                  <ChevronRight size={20} />
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-24 bg-slate-50 rounded-[40px] border border-dashed border-slate-200 text-slate-400">
              현재 등록된 공지사항이 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};
