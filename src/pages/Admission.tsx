import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Post } from '../types';
import { GraduationCap, Calendar } from 'lucide-react';

export const Admission = () => {
  const [admissionPosts, setAdmissionPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    setAdmissionPosts(storage.getPosts().filter(p => p.category === 'admission'));
  }, []);

  return (
    <div className="pt-40 pb-20 px-4 max-w-5xl mx-auto">
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-univ-navy text-univ-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <GraduationCap size={40} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
        >
          입학 안내
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
          준정고등학교는 미래를 이끌어갈 바른 인성을 갖춘 인재를 기다립니다.
        </motion.p>
      </header>

      <div className="space-y-10">
        {admissionPosts.length > 0 ? (
          admissionPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 md:p-12 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-univ-navy uppercase tracking-widest mb-6">
                <Calendar size={14} />
                <span>업데이트 일자: {post.date}</span>
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-6 group-hover:text-univ-navy transition-colors">
                {post.title}
              </h2>
              <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-[40px] border border-dashed border-slate-200 text-slate-400">
            현재 등록된 입학 안내 소식이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
