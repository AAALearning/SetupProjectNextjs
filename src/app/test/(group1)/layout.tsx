export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>This is layout for all route in this group</div>
      {children}
    </div>
  );
}
