









import { IconMail, IconCheck, IconSelector } from '@tabler/icons-react';

const AsidebarAccount = () => {
  const user = {
    name: "Olivia Rhye",
    email: "olivia@untitledui.com",
    avatar: "https://images.unsplash.com",
    status: "online"
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all cursor-pointer group w-full max-w-sm">
      <div className="flex items-center gap-3">
        {/* Avatar with Status Indicator */}
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm"></span>
        </div>

        {/* Text Information */}
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-slate-900 leading-tight flex items-center gap-1">
            {user.name}
            {/* Optional Verified/Active Icon from Tabler */}
            <IconCheck size={14} className="text-blue-500" stroke={3} />
          </h3>
          <div className="flex items-center gap-1.5 text-slate-500">
            <IconMail size={12} stroke={1.5} />
            <span className="text-xs font-medium truncate max-w-[140px]">
              {user.email}
            </span>
          </div>
        </div>
      </div>

      {/* Tabler Selector Icon (Replacing the basic arrows) */}
      <div className="p-1 rounded-md group-hover:bg-slate-200 transition-colors">
        <IconSelector size={20} className="text-slate-400" />
      </div>
    </div>
  );
};

export default AsidebarAccount;
