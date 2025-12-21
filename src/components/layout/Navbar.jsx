export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <h1 className="text-2xl font-bold">E-Shop</h1>

      <div className="flex items-center gap-6">
        <a href="#" className="hover:text-blue-600">Home</a>
        <a href="#" className="hover:text-blue-600">Products</a>
        <a href="#" className="hover:text-blue-600">Cart</a>
        <a href="#" className="hover:text-blue-600">Login</a>
      </div>
    </nav>
  );
}
