/* eslint-disable react/prop-types */
import Style from './card.module.css';
import Btn from '../btn/Card-btn.jsx';
import placeholder from '../../assets/placeholder.png';
import { BASE_URI } from '../main-section/Main.jsx';
import trashBin from '../../assets/trash-bin-minimalistic-svgrepo-com.svg';

function Card({ item, bin }) {
  const { title, image, content, tags } = item;

  function formatTags(tag) {
    return tag.toLowerCase().replaceAll(' ', '_');
  }

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
                    <li className={`${Style.tag_banner} ${Style[`${formatTags(tag)}`]}`} key={index}>
                      {tag}
                    </li>
                  );
                })}
            </ul>
          ) : null}

          <p className={Style.card__text}>{content}</p>
          {/* read more e delete */}
          <div className={Style.btns_wrap}>
            <Btn />
            <i onClick={bin} className={Style.delete_icon}>
              <img className={Style.bin} src={trashBin} alt="" />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
