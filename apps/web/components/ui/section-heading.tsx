import { cn } from "@/lib/utils";
import Lines from "./lines";

interface SectionHeadingProps {
  title: string;
  showLines?: boolean;
  className?: string;
  containerClassName?: string;
  textClassName?: string;
  lineLength?: number;
  borderWidth?: string;
  borderRadius?: string;
  bgColor?: string;
  gradientAngle?: string;
  lineClassName?: string;
}

export default function SectionHeading({
  title,
  showLines = true,
  className = "",
  containerClassName = "",
  textClassName = "",
  lineLength = 300,
  borderWidth = "0.5px",
  borderRadius = "0 19.598px",
  bgColor = "rgba(0, 0, 0, 0.4)",
  gradientAngle = "90deg",
  lineClassName = "",
}: SectionHeadingProps) {
  const customStyles = {
    "--border-width": borderWidth,
    "--border-radius": borderRadius,
    "--bg-color": bgColor,
    "--gradient-angle": gradientAngle,
  } as React.CSSProperties;

  return (
    <div
      className={`max-w-5xl mx-auto flex items-center justify-center gap-6 ${containerClassName}`}
    >
      {showLines && <Lines length={lineLength} className={`hidden md:block ${lineClassName}`} />}
      <div className={`gradient-border px-5 py-4 ${className}`} style={customStyles}>
        <h1
          className={cn("whitespace-nowrap font-berry uppercase text-xl text-white", textClassName)}
        >
          {title}
        </h1>
      </div>
      {showLines && (
        <Lines
          flowDirection="rtl"
          length={lineLength}
          className={`hidden md:block ${lineClassName}`}
        />
      )}
    </div>
  );
}
