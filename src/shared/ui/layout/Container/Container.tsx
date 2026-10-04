type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  noPadding?: boolean;
};

const sizes = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
};

export const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  size = "xl",
  noPadding,
}: ContainerProps) => {
  return (
    <div
      className={`
                max-w-4xl mx-auto 
                ${noPadding ? "" : "p-2 sm:p-4"}
                ${className}
            `}
      style={{
        maxWidth: sizes[size],
        margin: "0 auto",
        width: "100%",
      }}
      data-atr="container"
    >
      {children}
    </div>
  );
};