export function InputStack({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "4px",
      }}
    >
      {children}
    </div>
  );
}
