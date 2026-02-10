import { Instagram, Twitter, Youtube, Github } from "lucide-react";

export default function SocialButton() {
  return (
    <div className="flex gap-6 text-gray-500">
      {[Instagram, Twitter, Youtube, Github].map((Icon, i) => (
        <Icon
          key={i}
          size={22}
          className="hover:text-white hover:scale-110 transition cursor-pointer"
        />
      ))}
    </div>
  );
}
