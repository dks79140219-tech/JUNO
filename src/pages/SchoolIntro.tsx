import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Post } from '../types';
import { School, Info } from 'lucide-react';

export const SchoolIntro = () => {
  const [introPosts, setIntroPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    // Only fetch posts in the 'about' category
    setIntroPosts(storage.getPosts().filter(p => p.category === 'about'));
  }, []);

  return (
    <div className="pt-40 pb-20 px-4 max-w-5xl mx-auto">
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-univ-navy text-univ-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <School size={40} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
        >
          준정고 소개
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
          바른 인성과 창의적 역량을 키워가는 준정고등학교의 비전을 소개합니다.
        </motion.p>
      </header>

      <div className="space-y-12">
        {introPosts.length > 0 ? (
          introPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 md:p-16 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group"
            >
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8 border-l-8 border-univ-navy pl-6 group-hover:text-univ-navy transition-colors">
                {post.title}
              </h2>

              {post.imageUrl && (
                <div className="mb-10 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-auto" referrerPolicy="no-referrer" />
                </div>
              )}

              <div className="prose prose-lg prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </div>
            </motion.article>
          ))
        ) : (
          <div className="text-center py-24 bg-slate-50 rounded-[40px] border border-dashed border-slate-200 text-slate-400">
            등록된 학교 소개 글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
