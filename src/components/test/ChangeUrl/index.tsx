"use client";

// Đổi url mà k navigate
const ChangeUrl = () => {
  return (
    <>
      <button onClick={() => window.history.pushState({}, "", "/new-url")}>Change url mà k đổi pages</button>
    </>
  );
};

export default ChangeUrl;
