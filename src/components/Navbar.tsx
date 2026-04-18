import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, School, Globe, User } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(sessionStorage.getItem('isAdmin') === 'true');
  const [isStudent, setIsStudent] = React.useState(sessionStorage.getItem('isStudent') === 'true');
  const location = useLocation();

  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsAdmin(sessionStorage.getItem('isAdmin') === 'true');
      setIsStudent(sessionStorage.getItem('isStudent') === 'true');
    };
    window.addEventListener('storage', handleStorageChange);
    handleStorageChange();
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [location]);

  const navItems = [
    { name: '입학안내', path: '/admission' },
    { name: '학교생활', path: '/records' },
    { name: '문의처', path: '/inquiry' },
  ];

  const utilityItems = [
    { name: '관리자', path: '/admin' },
    { name: isStudent ? '학생 로그아웃' : '학생 로그인', path: '/login' },
    { name: '학교생활기록', path: '/records' },
    { name: '교칙', path: '/rules' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-slate-50 border-b border-slate-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-10 flex items-center justify-end space-x-6">
          {utilityItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                if (item.name === '학생 로그아웃') {
                  sessionStorage.removeItem('isStudent');
                  window.dispatchEvent(new Event('storage'));
                }
              }}
              className="text-[11px] font-medium text-slate-500 hover:text-univ-navy flex items-center gap-1.5 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-univ-navy rounded-full flex items-center justify-center text-white">
              <School size={28} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-univ-navy leading-tight">준정고등학교</span>
              <span className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase">JUNJEONG High School</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10 h-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`h-full flex items-center text-[15px] font-bold transition-all relative group ${
                  location.pathname === item.path ? 'text-univ-navy' : 'text-slate-700'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-1 bg-univ-navy transform origin-left transition-transform duration-300 ${
                  location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-univ-navy">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:hidden fixed inset-0 top-[80px] bg-white z-50 overflow-y-auto"
        >
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4">Main Menu</p>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-4 rounded-xl text-lg font-bold text-slate-800 hover:bg-slate-50 hover:text-univ-navy transition-all"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="pt-6 border-t border-slate-100 space-y-2">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4">University Links</p>
              <div className="grid grid-cols-2 gap-3">
                {utilityItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      if (item.name === '학생 로그아웃') {
                        sessionStorage.removeItem('isStudent');
                        window.dispatchEvent(new Event('storage'));
                      }
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};
