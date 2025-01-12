export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4">
      <div className="container mx-auto px-4">
        <div className="text-sm text-center">
          © {new Date().getFullYear()} syki66. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
