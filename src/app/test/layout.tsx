import ClientTemplate from "@/components/test/ClientTemplate";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Layout part</div>
      <ClientTemplate/>
      {children}
    </div>
  );
}