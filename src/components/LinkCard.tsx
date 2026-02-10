import { Share2, ShoppingBag, Github, MessageCircle, Zap, Globe } from "lucide-react";

export default function LinkCard() {
  const links = [
    {
      title: "DESTRUCTION WEBSTORE",
      url: "https://shopee.co.id",
      icon: <ShoppingBag size={20} />,
      className: "bg-gradient-to-r from-[#FF0080] to-[#7928CA] text-white",
    },
    {
      title: "NEW COLLECTION: CONCRETE",
      url: "#",
      icon: <Zap size={20} />,
      className: "bg-gradient-to-r from-[#FF4D4D] to-[#F9CB28] text-black font-black",
    },
    {
      title: "TIKTOK CATALOGUE",
      url: "#",
      icon: <Globe size={20} />,
      className: "bg-white text-black hover:bg-gray-200",
    },
    {
      title: "WHATSAPP ADMIN",
      url: "https://wa.me/6283156492864",
      icon: <MessageCircle size={20} />,
      className: "bg-[#25D366] text-black hover:bg-[#20bd5a]",
    },
    {
      title: "GITHUB PORTFOLIO",
      url: "https://github.com/samsulhidayat123",
      icon: <Github size={20} />,
      className:
        "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20",
    },
  ];

  return (
    <>
      {links.map((link, i) => (
        <a
          key={i}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            w-full h-14 rounded-full px-4
            flex items-center gap-3
            transition-all duration-300
            hover:scale-[1.02] active:scale-[0.97]
            shadow-lg hover:shadow-xl
            no-underline
            ${link.className}
          `}
        >
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center">
            {link.icon}
          </div>

          <span className="flex-1 text-center font-bold text-sm tracking-wide">
            {link.title}
          </span>

          <div className="w-4 opacity-50">
            <Share2 size={14} />
          </div>
        </a>
      ))}
    </>
  );
}
