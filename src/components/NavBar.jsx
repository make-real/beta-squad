import { navLinks } from '../constant/data';
import { Link } from 'react-router-dom';


const NavBar = () => {

  return (
    <header>

      <nav>
        {
          navLinks.map(({ id, name, path }) => (
            <Link to={path} key={id} className='mr-4 text-xl'>
              {name}
            </Link>
          ))
        }
      </nav>
    </header>
  )
}

export default NavBar