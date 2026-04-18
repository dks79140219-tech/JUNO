import React from 'react';
import { motion } from 'motion/react';
import { storage } from '../storage';
import { Inquiry as InquiryType } from '../types';
import { HelpCircle, Send, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const Inquiry = () => {
  const [inquiries, setInquiries] = React.useState<InquiryType[]>([]);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Only show answered inquiries to the public
    setInquiries(storage.getInquiries().filter(i => i.isAnswered));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newInquiry: InquiryType = {
      id: Date.now().toString(),
      title,
      content,
      date: new Date().toISOString().split('T')[0],
      isAnswered: false
    };

    const allInquiries = storage.getInquiries();
    storage.saveInquiries([...allInquiries, newInquiry]);
    
    setTitle('');
    setContent('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="pt-40 pb-20 px-4 max-w-5xl mx-auto">
      <header className="mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-univ-navy text-univ-gold rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl"
        >
          <HelpCircle size={40} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
        >
          문의처
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          궁금하신 점을 남겨주시면 관리자가 확인 후 답변해 드립니다.
        </motion.p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Inquiry Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm sticky top-40">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Send size={20} className="text-univ-navy" /> 문의하기
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">제목</label>
                <input
                  type="text"
                  placeholder="공개 문의 제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">내용</label>
                <textarea
                  placeholder="문의 내용을 입력하세요."
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50 resize-none"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg ${
                  submitted ? 'bg-green-500 text-white' : 'bg-univ-navy text-white hover:brightness-110 shadow-univ-navy/10'
                }`}
              >
                {submitted ? '제출 완료!' : '문의 제출하기'}
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-4">
                * 제출된 문의는 관리자 확인 전까지 비공개로 유지됩니다.<br/>
                * 답변이 완료되면 아래 목록에 공개됩니다.
              </p>
            </form>
          </div>
        </div>

        {/* Answered Inquiries List */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <MessageCircle size={28} className="text-univ-navy" /> 
            답변 완료된 문의
          </h2>

          <div className="space-y-4">
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <div 
                  key={inquiry.id} 
                  className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button 
                    onClick={() => setExpandedId(expandedId === inquiry.id ? null : inquiry.id)}
                    className="w-full px-8 py-6 flex items-center justify-between text-left"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-bold text-univ-navy bg-univ-gold/20 px-2 py-0.5 rounded uppercase">Answered</span>
                        <span className="text-xs text-slate-400">{inquiry.date}</span>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900">{inquiry.title}</h3>
                    </div>
                    {expandedId === inquiry.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                  </button>

                  {expandedId === inquiry.id && (
                    <div className="px-8 pb-8 pt-2">
                      <div className="bg-slate-50 p-6 rounded-2xl mb-6">
                        <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">Q. 문의 내용</p>
                        <p className="text-slate-700 leading-relaxed">{inquiry.content}</p>
                      </div>
                      <div className="pl-6 border-l-4 border-univ-navy">
                        <p className="text-xs font-bold text-univ-navy mb-2 uppercase tracking-widest">A. 답변 내용 ({inquiry.answeredDate})</p>
                        <p className="text-slate-900 font-medium leading-relaxed whitespace-pre-wrap">{inquiry.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-[40px] border border-dashed border-slate-200 text-slate-400">
                아직 답변이 완료된 문의가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
