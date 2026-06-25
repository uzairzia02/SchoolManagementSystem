import './globals.css';

export const metadata = {
  title: 'School ERP System',
  description: 'Manage school resources and operations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Add any head tags here */}
      </head>
      <body>{children}</body>
    </html>
  );
}