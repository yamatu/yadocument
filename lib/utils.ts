interface CategoryStyle {
  icon: string;
  iconBg: string;
  iconColor: string;
  hoverIconBg: string;
  hoverIconColor: string;
  hoverTitleColor: string;
  tagBg: string;
  tagColor: string;
  tagBorder: string;
  borderGradient: string;
  readColor: string;
}

export const getCategoryStyle = (category: string): CategoryStyle => {
  switch (category) {
    case 'Apple / macOS':
      return {
        icon: 'laptop_mac',
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-700',
        hoverIconBg: 'group-hover:bg-slate-800',
        hoverIconColor: 'group-hover:text-white',
        hoverTitleColor: 'group-hover:text-violet-600',
        tagBg: 'bg-slate-50',
        tagColor: 'text-slate-500',
        tagBorder: 'border-slate-100',
        borderGradient: 'from-gray-300 to-gray-400',
        readColor: 'text-violet-600'
      };
    case 'iOS':
      return {
        icon: 'phone_iphone',
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-700',
        hoverIconBg: 'group-hover:bg-black',
        hoverIconColor: 'group-hover:text-white',
        hoverTitleColor: 'group-hover:text-violet-600',
        tagBg: 'bg-slate-50',
        tagColor: 'text-slate-500',
        tagBorder: 'border-slate-100',
        borderGradient: 'from-gray-800 to-black',
        readColor: 'text-violet-600'
      };
    case 'Windows':
    case 'Win7':
    case 'Win10/11':
      return {
        icon: 'window', // Or desktop_windows based on sub-logic if needed
        iconBg: 'bg-blue-50',
        iconColor: 'text-blue-600',
        hoverIconBg: 'group-hover:bg-blue-600',
        hoverIconColor: 'group-hover:text-white',
        hoverTitleColor: 'group-hover:text-blue-600',
        tagBg: 'bg-blue-50',
        tagColor: 'text-blue-600',
        tagBorder: 'border-blue-100',
        borderGradient: 'from-blue-400 to-blue-600',
        readColor: 'text-blue-600'
      };
    case 'Account':
      return {
        icon: 'lock',
        iconBg: 'bg-red-50',
        iconColor: 'text-red-500',
        hoverIconBg: 'group-hover:bg-red-500',
        hoverIconColor: 'group-hover:text-white',
        hoverTitleColor: 'group-hover:text-red-500',
        tagBg: 'bg-red-50',
        tagColor: 'text-red-500',
        tagBorder: 'border-red-100',
        borderGradient: 'from-red-400 to-red-500',
        readColor: 'text-red-500'
      };
    case 'Android':
      return {
        icon: 'android',
        iconBg: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
        hoverIconBg: 'group-hover:bg-emerald-600',
        hoverIconColor: 'group-hover:text-white',
        hoverTitleColor: 'group-hover:text-emerald-600',
        tagBg: 'bg-emerald-50',
        tagColor: 'text-emerald-600',
        tagBorder: 'border-emerald-100',
        borderGradient: 'from-emerald-400 to-green-500',
        readColor: 'text-emerald-600'
      };
    default:
      return {
        icon: 'article',
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-700',
        hoverIconBg: 'group-hover:bg-slate-800',
        hoverIconColor: 'group-hover:text-white',
        hoverTitleColor: 'group-hover:text-violet-600',
        tagBg: 'bg-slate-50',
        tagColor: 'text-slate-500',
        tagBorder: 'border-slate-100',
        borderGradient: 'from-gray-300 to-gray-400',
        readColor: 'text-violet-600'
      };
  }
};
