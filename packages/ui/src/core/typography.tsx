import React from "react";

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}

// Typography component interfaces
interface TypographyProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface HeadingProps extends TypographyProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

// Heading component (H1-H6)
export const Heading: React.FC<HeadingProps> = ({ children, level = 1, className, style }) => {
  const baseStyles = "font-bold leading-tight";

  const levelStyles = {
    1: "text-6xl md:text-7xl lg:text-8xl mb-6",
    2: "text-4xl md:text-5xl lg:text-6xl mb-5",
    3: "text-3xl md:text-4xl lg:text-5xl mb-4",
    4: "text-2xl md:text-3xl lg:text-4xl mb-4",
    5: "text-xl md:text-2xl lg:text-3xl mb-3",
    6: "text-lg md:text-xl lg:text-2xl mb-3",
  };

  const combinedClassName = cn(baseStyles, levelStyles[level], className);

  const HeadingTag: React.ElementType = `h${level}` as React.ElementType;

  return (
    <HeadingTag className={combinedClassName} style={style}>
      {children}
    </HeadingTag>
  );
};

// Individual heading components
export const H1: React.FC<TypographyProps> = ({ children, className, style }) => (
  <Heading level={1} className={className} style={style}>
    {children}
  </Heading>
);

export const H2: React.FC<TypographyProps> = ({ children, className, style }) => (
  <Heading level={2} className={className} style={style}>
    {children}
  </Heading>
);

export const H3: React.FC<TypographyProps> = ({ children, className, style }) => (
  <Heading level={3} className={className} style={style}>
    {children}
  </Heading>
);

export const H4: React.FC<TypographyProps> = ({ children, className, style }) => (
  <Heading level={4} className={className} style={style}>
    {children}
  </Heading>
);

export const H5: React.FC<TypographyProps> = ({ children, className, style }) => (
  <Heading level={5} className={className} style={style}>
    {children}
  </Heading>
);

export const H6: React.FC<TypographyProps> = ({ children, className, style }) => (
  <Heading level={6} className={className} style={style}>
    {children}
  </Heading>
);

// Paragraph component
export const P: React.FC<TypographyProps> = ({ children, className, style }) => (
  <p className={cn("text-base md:text-lg leading-relaxed mb-4", className)} style={style}>
    {children}
  </p>
);

// Large paragraph/lead text
export const Lead: React.FC<TypographyProps> = ({ children, className, style }) => (
  <p className={cn("text-lg md:text-xl leading-relaxed mb-6", className)} style={style}>
    {children}
  </p>
);

// Small text
export const Small: React.FC<TypographyProps> = ({ children, className, style }) => (
  <small className={cn("text-sm", className)} style={style}>
    {children}
  </small>
);

// Muted text
export const Muted: React.FC<TypographyProps> = ({ children, className, style }) => (
  <p className={cn("text-sm opacity-60", className)} style={style}>
    {children}
  </p>
);

// Code text
export const Code: React.FC<TypographyProps> = ({ children, className, style }) => (
  <code
    className={cn("text-sm font-mono bg-gray-100 text-gray-800 px-2 py-1 rounded-md", className)}
    style={style}
  >
    {children}
  </code>
);

// Blockquote
export const Blockquote: React.FC<TypographyProps> = ({ children, className, style }) => (
  <blockquote
    className={cn("border-l-4 border-blue-500 pl-6 italic text-gray-600 text-lg my-6", className)}
    style={style}
  >
    {children}
  </blockquote>
);

// List components
export const Ul: React.FC<TypographyProps> = ({ children, className, style }) => (
  <ul className={cn("list-disc list-inside space-y-2 mb-4 ml-4", className)} style={style}>
    {children}
  </ul>
);

export const Ol: React.FC<TypographyProps> = ({ children, className, style }) => (
  <ol className={cn("list-decimal list-inside space-y-2 mb-4 ml-4", className)} style={style}>
    {children}
  </ol>
);

export const Li: React.FC<TypographyProps> = ({ children, className, style }) => (
  <li className={cn("", className)} style={style}>
    {children}
  </li>
);

// Text emphasis
export const Strong: React.FC<TypographyProps> = ({ children, className, style }) => (
  <strong className={cn("font-bold", className)} style={style}>
    {children}
  </strong>
);

export const Em: React.FC<TypographyProps> = ({ children, className, style }) => (
  <em className={cn("italic", className)} style={style}>
    {children}
  </em>
);

// Badge/Tag component
export const Badge: React.FC<TypographyProps> = ({ children, className, style }) => (
  <span
    className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700",
      className
    )}
    style={style}
  >
    {children}
  </span>
);

// Caption text
export const Caption: React.FC<TypographyProps> = ({ children, className, style }) => (
  <figcaption className={cn("text-sm opacity-60 text-center mt-2", className)} style={style}>
    {children}
  </figcaption>
);

// Display text (larger than H1)
export const Display: React.FC<TypographyProps> = ({ children, className, style }) => (
  <h1 className={cn("text-8xl font-bold leading-none", className)} style={style}>
    {children}
  </h1>
);

// Pre-formatted text
export const Pre: React.FC<TypographyProps> = ({ children, className, style }) => (
  <pre
    className={cn(
      "bg-gray-50 border border-gray-300 rounded-lg p-4 overflow-x-auto text-sm font-mono whitespace-pre-wrap",
      className
    )}
    style={style}
  >
    {children}
  </pre>
);
