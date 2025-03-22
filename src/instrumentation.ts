import { Instrumentation } from "next";

export function register() {
  console.log("SERVER INIT");
}

export const onRequestError: Instrumentation.onRequestError = async (
  // Khi có lỗi ở server sẽ gọi
  err, // error xảy ra trong server
  request, // request gây ra error
  context // thông tin về nơi xảy ra lỗi
) => {
  const rawError = err as { digest: string } & Error;
  console.log(`ERROR IN SERVER::${rawError?.message}`);
  console.log(`ERROR IN SERVER DIGEST::${rawError?.digest}`);
  console.log(`ERROR IN SERVER PATH::${request.path}`);
  console.log(`ERROR IN SERVER SOURCE::${context.renderSource}`);
  console.log(`ERROR IN SERVER TYPE::${context.routeType}`);
};
