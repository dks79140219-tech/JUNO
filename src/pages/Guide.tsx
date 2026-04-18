import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Post } from '../types';
import { ChevronRight, HelpCircle } from 'lucide-react';

export const Guide = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    setPosts(storage.getPosts().filter(p => p.category === 'guide'));
  }, []);

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
      <header className="mb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
        >
          슬기로운 가이드
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600"
        >
          신입생부터 졸업반까지, CCC 생활의 모든 것을 기록합니다.
        </motion.p>
      </header>

      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 md:p-8 rounded-3xl border border-ccc-pink/5 shadow-sm hover:shadow-md transition-all flex gap-6 items-start group cursor-pointer"
          >
            <div className="w-12 h-12 bg-ccc-sky rounded-2xl flex items-center justify-center shrink-0">
              <HelpCircle className="text-ccc-pink" size={24} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold mb-2 text-slate-900 group-hover:text-ccc-pink transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="flex items-center text-ccc-pink font-semibold text-sm">
                자세히 보기 <ChevronRight size={16} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
