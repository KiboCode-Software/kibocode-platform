const VARIANTS = {
  solid:
    'bg-silver-100 text-ink-950 hover:bg-white focus-visible:outline-silver-100',
  outline:
    'border border-ink-700 text-silver-100 hover:border-silver-400 focus-visible:outline-silver-400',
};

export function Button({
  as: Tag = 'button',
  variant = 'solid',
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`inline-flex min-h-[48px] items-center justify-center px-6 py-3.5 text-center text-sm font-medium tracking-wide transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-7 ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
