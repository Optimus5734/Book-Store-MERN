import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/' }) => {
  return (
    <div className='flex'>
      <Link to={destination}
        className='bg-white-800 text-sky px-4 py-1 rounded-lg'>
        <BsArrowLeft className='text-2xl' />
      </Link>
    </div>
  );
};

export default BackButton;