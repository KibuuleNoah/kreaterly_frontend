interface SocialButtonProps {
  label: string;
  icon: React.ReactNode;
}

const SocialLoginButton = ({ label, icon }: SocialButtonProps) => {
  return (
    <button className="w-full bg-[#11141A] border border-white/5 hover:border-teal-500/40 hover:bg-teal-500/5 p-4 rounded-2xl flex items-center justify-center gap-4 transition-all duration-300 group active:scale-[0.98] shadow-lg">
      <div className="w-5 h-5 flex items-center justify-center transition-transform group-hover:scale-110 text-teal-500">
        {icon}
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-all">
        {label}
      </span>
    </button>
  );
};

export default SocialLoginButton;
