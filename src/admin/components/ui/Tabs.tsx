import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, children }: TabsProps) {
  return (
    <div className="w-full">
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { 
            'data-value': value,
            'data-onchange': onValueChange 
          });
        }
        return child;
      })}
    </div>
  );
}

export function TabsList({ children, className = '' }: TabsListProps) {
  return (
    <div className={`flex gap-2 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: TabsTriggerProps) {
  return (
    <button
      onClick={() => {
        const parent = document.querySelector('[data-tabs-value]');
        if (parent) {
          const currentValue = parent.getAttribute('data-tabs-value');
          if (currentValue !== value) {
            parent.setAttribute('data-tabs-value', value);
            const event = new CustomEvent('tabChange', { detail: value });
            parent.dispatchEvent(event);
          }
        }
      }}
      className={`px-4 py-2 text-sm font-medium transition-colors relative
        ${value === document.querySelector('[data-tabs-value]')?.getAttribute('data-tabs-value')
          ? 'text-[#2B227C] border-b-2 border-[#2B227C]'
          : 'text-gray-500 hover:text-[#2B227C]'
        }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: TabsContentProps) {
  const parent = document.querySelector('[data-tabs-value]');
  const isActive = parent?.getAttribute('data-tabs-value') === value;

  if (!isActive) return null;

  return <div className="pt-6">{children}</div>;
}