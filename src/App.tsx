/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { School, ExternalLink } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Records } from './pages/Records';
import { Admin } from './pages/Admin';
import { Rules } from './pages/Rules';
import { Admission } from './pages/Admission';
import { SchoolIntro } from './pages/SchoolIntro';
import { Inquiry } from './pages/Inquiry';
import { Notice } from './pages/Notice';
import { Events } from './pages/Events';
import { StudentLogin } from './pages/StudentLogin';

const ProtectedRoute = ({ children, type }: { children: React.ReactNode, type: 'student' | 'admin' }) => {
  const isStudent = sessionStorage.getItem('isStudent') === 'true';
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  if (type === 'admin' && !isAdmin) {
    return <Admin />; // Show admin login
  }

  if (type === 'student' && !isStudent && !isAdmin) {
    return <StudentLogin />; // Show student login
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Records />} />
            <Route path="/admin" element={<ProtectedRoute type="admin"><Admin /></ProtectedRoute>} />
            <Route path="/rules" element={<ProtectedRoute type="student"><Rules /></ProtectedRoute>} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/about" element={<SchoolIntro />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/notices" element={<ProtectedRoute type="student"><Notice /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute type="student"><Events /></ProtectedRoute>} />
            <Route path="/login" element={<StudentLogin />} />
          </Routes>
        </main>
        <footer className="bg-slate-900 pt-20 pb-12 text-slate-400">
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                    <School size={24} />
                  </div>
                  <span className="font-bold text-xl tracking-tight text-white">준정고등학교</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-bold mb-6">주요 서비스</h4>
                <ul className="space-y-4 text-sm">
                  <li><Link to="#" className="hover:text-white transition-colors">이벤트</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">공지사항</Link></li>
                  <li><Link to="#" className="hover:text-white transition-colors">문의처</Link></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px]">
              <p>© 2026 준정고등학교. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
