
import React from 'react';

const Calendar: React.FC = () => {
  const days = Array.from({ length: 35 }, (_, i) => i + 1);
  const weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <p className="text-teal-500 text-[10px] font-black uppercase tracking-[0.4em]">Planning Terminal</p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase font-display">Campaign Calendar</h1>
          <p className="text-gray-500 text-lg font-medium">Coordinate your launches and creator posting schedules.</p>
        </div>
        <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
          <button className="px-6 py-2.5 text-[11px] font-black text-white hover:bg-white/5 transition-all uppercase tracking-widest">Previous</button>
          <button className="px-10 py-2.5 text-[11px] font-black text-black bg-white rounded-xl uppercase tracking-widest">February 2026</button>
          <button className="px-6 py-2.5 text-[11px] font-black text-white hover:bg-white/5 transition-all uppercase tracking-widest">Next</button>
        </div>
      </header>

      <div className="bg-[#11141A] border border-white/5 rounded-[48px] overflow-hidden shadow-3xl">
        <div className="grid grid-cols-7 border-b border-white/5">
          {weekdays.map(day => (
            <div key={day} className="py-6 text-center text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] bg-black/20">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 grid-rows-5 h-[600px]">
          {days.map(day => {
            const actualDay = (day - 3); // Padding for start of month
            const isToday = actualDay === 6;
            const hasEvent = actualDay === 12 || actualDay === 15 || actualDay === 24;
            
            return (
              <div key={day} className={`border-r border-b border-white/5 p-4 space-y-2 transition-all hover:bg-white/[0.02] cursor-pointer ${actualDay < 1 || actualDay > 28 ? 'opacity-20 bg-black/10' : ''}`}>
                <span className={`text-xs font-black ${isToday ? 'text-teal-500 scale-125 inline-block px-2 py-1 bg-teal-500/10 rounded-lg' : 'text-gray-600'}`}>
                  {actualDay > 0 && actualDay <= 28 ? actualDay : ''}
                </span>
                
                {hasEvent && (
                  <div className={`p-3 rounded-2xl border text-[9px] font-black uppercase tracking-tight leading-none ${actualDay === 12 ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-teal-500/10 border-teal-500/20 text-teal-400'}`}>
                    {actualDay === 12 ? 'Airtel Launch' : actualDay === 15 ? 'Mumford Sub' : 'KFC Review'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
