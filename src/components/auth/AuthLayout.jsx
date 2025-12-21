export default function AuthLayout({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-full max-w-md p-8 shadow-xl rounded-xl">
        <h2 className="text-3xl font-bold text-center text-black mb-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
