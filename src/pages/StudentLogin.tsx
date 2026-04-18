import React from 'react';
import { motion } from 'motion/react';
import { User, ShieldCheck, PartyPopper, LogIn } from 'lucide-react';

export const StudentLogin = () => {
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [isStudent, setIsStudent] = React.useState(sessionStorage.getItem('isStudent') === 'true');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '2026') {
      setIsStudent(true);
      sessionStorage.setItem('isStudent', 'true');
      window.dispatchEvent(new Event('storage'));
      setError('');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsStudent(false);
    sessionStorage.removeItem('isStudent');
    window.dispatchEvent(new Event('storage'));
  };

  if (isStudent) {
    return (
      <div className="pt-32 md:pt-40 pb-20 px-4 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 md:p-12 rounded-[32px] md:rounded-[40px] shadow-xl border border-slate-100"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-green-50 text-green-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8">
            <User size={32} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">학생 인증 완료</h1>
          <p className="text-slate-500 mb-10 text-sm md:text-base">
            이제 공지사항, 교칙, 이벤트 페이지를 자유롭게 이용하실 수 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-10">
            <a href="/rules" className="p-5 md:p-6 bg-amber-50 rounded-2xl md:rounded-3xl border border-amber-100 text-amber-700 hover:bg-amber-100 transition-all flex flex-col items-center gap-2">
              <ShieldCheck size={24} />
              <span className="font-bold text-sm md:text-base">교칙 안내</span>
            </a>
            <a href="/events" className="p-5 md:p-6 bg-blue-50 rounded-2xl md:rounded-3xl border border-blue-100 text-blue-700 hover:bg-blue-100 transition-all flex flex-col items-center gap-2">
              <PartyPopper size={24} />
              <span className="font-bold text-sm md:text-base">이벤트</span>
            </a>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 font-bold text-sm hover:text-red-500 transition-all"
          >
            로그아웃
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40 pb-20 px-4 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-univ-navy text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <LogIn size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">학생 로그인</h1>
          <p className="text-slate-500 mt-2 text-sm leading-relaxed">
            비공개 콘텐츠 열람을 위해<br/>학생 전용 비밀번호를 입력해주세요.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="학생 비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-univ-navy/50 text-center text-2xl tracking-[0.3em]"
              required
            />
            {error && <p className="text-red-500 text-sm mt-3 text-center font-medium">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-univ-navy text-white py-4 rounded-2xl font-bold hover:brightness-110 transition-all shadow-lg shadow-univ-navy/10"
          >
            인증하기
          </button>
        </form>
      </motion.div>
    </div>
  );
};
