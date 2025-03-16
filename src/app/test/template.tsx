import ClientTemplate from "@/components/test/ClientTemplate";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div>Template part</div>
      <ClientTemplate/>
      {children}
    </div>
  );
}