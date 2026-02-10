export default function Profile() {
  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-6 group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 blur opacity-70 group-hover:animate-spin-slow" />
        <div className="relative w-24 h-24 rounded-full bg-black p-1">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=Destruction"
            alt="Profile"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>

      <h1 className="text-2xl font-black tracking-tight">
        DESTRUCTION.ID
      </h1>
      <p className="text-xs tracking-widest text-gray-400 uppercase mt-1">
        Streetwear & Digital Chaos
      </p>
    </div>
  );
}
