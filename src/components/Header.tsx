import Link from 'next/link';
import CartIcon from './CartIcon';
import Search from './Search';
import CurrencySwitcher from './CurrencySwitcher';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Wigs by Jade
        </Link>
        
        <div className="hidden md:block">
          <Search />
        </div>

        <nav>
          <ul className="flex items-center space-x-4">
            <li><CurrencySwitcher /></li>
            <li><Link href="/products" className="text-gray-600 hover:text-gray-800">Products</Link></li>
            <li><Link href="/account" className="text-gray-600 hover:text-gray-800">Account</Link></li>
            <li><CartIcon /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
