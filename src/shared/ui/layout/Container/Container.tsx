type ContainerProps = {
    children: React.ReactNode;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
};

export const Container: React.FC<ContainerProps> = ({ children, className="", size = "xl" }: ContainerProps) => {
    return (
        <div
            className={'max-w-4xl mx-auto p-4 ' + className}
            style={{
                maxWidth: sizes[size],
                margin: "0 auto",
                width: "100%",
            }}
        >
            {children}
        </div>
    );
};