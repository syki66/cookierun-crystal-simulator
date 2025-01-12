import { Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-40">
      <div className="flex justify-center">
        <span className="text-sm">
          © {new Date().getFullYear()} syki66. All rights reserved.
        </span>
        <span className="flex items-center ml-2">
          <a
            href="mailto:66syki@gmail.com"
            className="text-blue-300 hover:text-red-300"
          >
            <Mail size={20} />
          </a>
        </span>
      </div>
    </footer>
  );
}
