export const Subscription = () => {
  return (
    <div className=" text-center">
      <p className="text-2xl font-medium text-gray-800">
        Stay updated! Subscribe now!
      </p>
      <p className="text-gray-400 mt-3">
        Subscribe now for the latest updates and exclusive offers!
      </p>
      <div className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="button"
          className="bg-black text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  );
};
