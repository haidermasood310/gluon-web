import React from 'react';
import { cn } from '@/lib/utils';

export default function ComingSoon({
  className = '',
  textClass = '',
  border = false,
  children,
}: {
  children: React.ReactNode;
  textClass?: string;
  className?: string;
  border?: boolean;
}) {
  return (
    <div
      className={cn(
        'coming-soon-container border-light-border dark:border-dark-border rounded-[10px] px-4',
        className,
        border ? 'border' : '',
      )}
    >
      <div className="background-content">{children}</div>
      <div className="blur-overlay bg-dark-accent/60">
        <div className={cn('overlay-text text-light-text', textClass)}>
          Coming Soon
        </div>
      </div>
    </div>
  );
}
