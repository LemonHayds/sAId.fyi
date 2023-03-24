import Script from "next/script";

export default function NotFound() {
  return (
    <>
      <Script id="redirect">{`document.location.href="/";`}</Script>
    </>
  );
}
