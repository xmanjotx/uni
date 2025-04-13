import './globals.css';

export const metadata = {
  title: 'Unicure',
  description: 'Unicure website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}