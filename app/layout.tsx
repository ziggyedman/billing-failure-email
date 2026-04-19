export const metadata = {
  title: "Billing failure email demo",
  description:
    "A Next.js + React Email + Resend demo that sends a billing failure email.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          height: "100vh",
          overflow: "hidden",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#f6f7f9",
          color: "#111827",
        }}
      >
        {children}
      </body>
    </html>
  );
}
