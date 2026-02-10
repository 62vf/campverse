
import React from 'react';
import { User, Role } from '../types';
import { Book, Calendar, CreditCard, GraduationCap, ClipboardList } from 'lucide-react';

interface CollegeMgmtProps {
  user: User;
}

const CollegeMgmt: React.FC<CollegeMgmtProps> = ({ user }) => {
  const isStudent = user.role === Role.STUDENT;

  const courses = [
    { code: 'CS301', name: 'Artificial Intelligence', attendance: 85, prof: 'Dr. Alan Turing' },
    { code: 'CS302', name: 'Compiler Design', attendance: 92, prof: 'Grace Hopper' },
    { code: 'CS303', name: 'Software Engineering', attendance: 78, prof: 'Linus Torvalds' },
  ];

  const timetable = [
    { day: 'Monday', subjects: ['AI', 'Soft Eng', 'Lab'] },
    { day: 'Tuesday', subjects: ['Compilers', 'Math', 'AI'] },
    { day: 'Wednesday', subjects: ['Soft Eng', 'AI', 'Ethics'] },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[40px] text-white shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <GraduationCap size={28} />
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">Academic Status</span>
          </div>
          <p className="text-3xl font-black mb-1">GPA 3.84</p>
          <p className="text-white/60 text-sm font-medium">Deans List Candidate</p>
        </div>
        
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8 text-slate-400">
            <ClipboardList size={28} className="text-orange-500" />
            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full text-slate-500">Attendance</span>
          </div>
          <p className="text-3xl font-black text-slate-800 mb-1">86.4%</p>
          <p className="text-slate-400 text-sm font-medium">Average across 5 courses</p>
        </div>

        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8 text-slate-400">
            <CreditCard size={28} className="text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full text-slate-500">Fees</span>
          </div>
          <p className="text-3xl font-black text-slate-800 mb-1">$0.00</p>
          <p className="text-green-500 text-sm font-bold flex items-center">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
            Account Clear
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Progress */}
        <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Current Courses</h3>
            <Book className="text-blue-600" size={20} />
          </div>
          <div className="space-y-6">
            {courses.map(course => (
              <div key={course.code}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="font-bold text-slate-800">{course.name}</h4>
                    <p className="text-xs text-slate-400">{course.prof}</p>
                  </div>
                  <span className={`text-xs font-black ${course.attendance > 80 ? 'text-green-500' : 'text-orange-500'}`}>
                    {course.attendance}%
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${course.attendance > 80 ? 'bg-green-500' : 'bg-orange-400'}`} 
                    style={{width: `${course.attendance}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timetable */}
        <div className="bg-slate-900 p-10 rounded-[40px] text-white shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold">Weekly Schedule</h3>
            <Calendar className="text-blue-400" size={20} />
          </div>
          <div className="space-y-4">
            {timetable.map((item, idx) => (
              <div key={idx} className="flex items-center p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="w-24 font-bold text-blue-400 text-sm">{item.day}</div>
                <div className="flex flex-wrap gap-2">
                  {item.subjects.map((s, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-slate-800 text-[10px] font-bold text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 font-bold bg-white text-slate-900 rounded-2xl hover:bg-slate-100 transition-all">
            Download PDF Syllabus
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollegeMgmt;
