const Page = async ({ params }: { params: Promise<{ tslug?: [string] }> }) => {
  const { tslug } = await params;
  return <>Hello from tslug:: {tslug?.join(",")}</>;
};

export default Page;
