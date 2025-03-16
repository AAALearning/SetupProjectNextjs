const Layout = ({
  children,
  teams,
  analytics,
}: {
  children: React.ReactNode;
  teams: React.ReactNode;
  analytics: React.ReactNode;
}) => {
  return (
    <>
      <div>{children}</div>
      <div>{analytics}</div>
      <div>{teams}</div>
    </>
  );
};

export default Layout;
