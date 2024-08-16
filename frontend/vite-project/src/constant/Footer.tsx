const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div>&copy; 2024 Quera Clone. All rights reserved.</div>
        <div className="space-x-4">
          <a href="/" className="text-gray-400 hover:text-white">
            Privacy
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Terms
          </a>
          <a href="/" className="text-gray-400 hover:text-white">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
