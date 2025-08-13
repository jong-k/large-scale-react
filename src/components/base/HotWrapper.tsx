interface HotWrapperProps {
  children: [React.ReactElement]; // 배열 형태로 타입 지정도 가능
}

export default function HotWrapper({ children }: HotWrapperProps) {
  return (
    <div
      style={{
        background:
          "linear-gradient(90deg,rgba(131, 58, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)",
      }}
    >
      {children}
    </div>
  );
}
