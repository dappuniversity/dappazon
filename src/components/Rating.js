import star_regular from '../assets/star-regular.svg';
import star_solid from '../assets/star-solid.svg';

const Rating = ({ value }) => {
    return (
        <div className='rating'>
            <img src={value >= 1 ? star_solid : star_regular} width="20px" height="20px" alt="Star" />
            <img src={value >= 2 ? star_solid : star_regular} width="20px" height="20px" alt="Star" />
            <img src={value >= 3 ? star_solid : star_regular} width="20px" height="20px" alt="Star" />
            <img src={value >= 4 ? star_solid : star_regular} width="20px" height="20px" alt="Star" />
            <img src={value >= 5 ? star_solid : star_regular} width="20px" height="20px" alt="Star" />
        </div>
    );
}

export default Rating;