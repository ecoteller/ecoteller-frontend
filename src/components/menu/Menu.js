import { Link } from 'react-router-dom';

const menuContent = [
  {
    name: 'Product',
    path: '/product',
  },
  {
    name: 'How it Works?',
    path: '/how-it-works',
  },
  {
    name: 'Our Story',
    path: '/our-story',
  },
  {
    name: 'Our partners',
    path: '/our-partners',
  },
];

function Menu() {
  return (
    <nav className="flex justify-end items-center gap-x-12">
      {menuContent.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className="text-white hover:underline underline-offset-4"
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}

export default Menu;
