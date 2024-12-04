/* eslint-disable react/prop-types */
import Style from './card.module.css';
import Btn from '../btn/Card-btn.jsx';
import placeholder from '../../assets/placeholder.png';
import { BASE_URI } from '../main-section/Main.jsx';

function Card({ item }) {
  const { title, image, content, tags } = item;
  console.log(image);
  console.log(tags);

  return (
    <div className="col-4">
      <div className={Style.card}>
        <img className={Style.card__img} src={image ? `${BASE_URI}${image}` : placeholder} alt="" />
        <div className={Style.card__body}>
          <h3 className={Style.card__title}>{title}</h3>
          {tags ? (
            <ul className={Style.banners}>
              {Array.isArray(tags) &&
                tags.map((tag, index) => {
                  return (
                    <li className={`${Style.tag_banner} ${Style[`${tag}`]}`} key={index}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          ) : null}

          <p className={Style.card__text}>{content}</p>
          <Btn />
        </div>
      </div>
    </div>
  );
}

export default Card;
