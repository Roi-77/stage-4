const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const base = 'font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700',
    secondary: 'glass px-6 py-3 rounded-3xl border-2 border-white/50 hover:bg-white/30 backdrop-blur-xl',
    danger: 'bg-red-500 hover:bg-red-600 text-white'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-2xl',
    lg: 'px-8 py-4 text-lg rounded-3xl'
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;