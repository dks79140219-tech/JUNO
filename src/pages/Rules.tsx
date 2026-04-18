import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Post } from '../types';
import { ShieldCheck, Calendar } from 'lucide-react';

export const Rules = () => {
  const [rules, setRules] = React.useState<Post[]>([]);

  React.useEffect(() => {
    setRules(storage.getPosts().filter(p => p.category === 'rule'));
  }, []);

  return (
    <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto">
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-16 h-16 bg-univ-navy text-univ-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <ShieldCheck size={32} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-slate-900 mb-4"
        >
          교칙 설명
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 max-w-2xl mx-auto"
        >
          준정고등학교의 바른 인성 함양과 질서 있는 학교 생활을 위한 핵심 규정입니다.<br />
          모든 학생은 본 규정을 숙지하고 준수해야 합니다.
        </motion.p>
      </header>

      <div className="space-y-6">
        {rules.length > 0 ? (
          rules.map((rule, index) => (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-univ-navy uppercase tracking-wider mb-4">
                <Calendar size={14} />
                <span>최종 개정일: {rule.date}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">{rule.title}</h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
                {rule.content}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-slate-400">
            등록된 교칙이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};
