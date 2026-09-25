import { useLocation } from "react-router-dom";

const KofiButton = () => {
  const location = useLocation();

  // Landing page (homepage) par hide kar do
  if (location.pathname === "/") {
    return null;
  }

  return (
    <a
      href="https://ko-fi.com/A0A620ZLB9"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 left-5 z-[9999] bg-yellow-400 text-gray-900 px-4 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
    >
      ☕ Support SkillTa
    </a>
  );
};

export default KofiButton;
