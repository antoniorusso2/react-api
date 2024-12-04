/* eslint-disable react/prop-types */
import style from './Form.module.css';
import { useState, useEffect } from 'react';

const defaultFormData = {
  title: '',
  image: undefined /* compila questo campo */,
  content: '',
  published: true,
};

export default function Form({ add }) {
  const [formData, setFormData] = useState(defaultFormData);
  // const [tags, setTags] = useState([]);

  function handleFormData(e) {
    console.log('parte il form handler');

    const key = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    // const checkbox = e.target;

    // add tags
    // checkbox.checked ? setTags([...tags, checkbox.name]) : setTags(tags.filter((tag) => tag !== checkbox.name));

    // console.log(tags);

    const newData = {
      ...formData,
      [key]: value,
    };

    console.log(newData);

    setFormData(newData);
  }

  function emptyForm() {
    setFormData(defaultFormData);
  }

  //controllo presenza tags in base ai checkbox
  // useEffect(
  //   () =>
  //     setFormData({
  //       ...formData,
  //       // tags: tags,
  //     }),
  //   [],
  // );

  return (
    <form onSubmit={(e) => e.preventDefault()} className={style.form}>
      <h3>Aggiungi un nuovo post</h3>

      <input onChange={handleFormData} className={style.input} name="title" type="text" placeholder="Inserisci il nuovo titolo" value={formData.title} />

      <input onChange={handleFormData} className={style.input} name="image" type="text" placeholder="Inserisci un immagine" />

      <label htmlFor="category">
        scegli una categoria:
        <select className={style.category} name="category">
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="newsy">News</option>
          <option value="plans">Plans</option>
        </select>
      </label>

      <textarea className={style.textarea} onChange={handleFormData} name="content" type="text-area" placeholder="Inserisci il contenuto" value={formData.content} />

      <div className={style.tags_checkbox}>
        <label htmlFor="html">Html</label>
        <input onChange={handleFormData} className={style.input} name="html" type="checkbox" />

        <label htmlFor="css">Css</label>
        <input onChange={handleFormData} className={style.input} name="css" type="checkbox" />

        <label htmlFor="js">Javascript</label>
        <input onChange={handleFormData} className={style.input} name="js" type="checkbox" />

        <label htmlFor="php">Php</label>
        <input onChange={handleFormData} className={style.input} name="php" type="checkbox" />
      </div>
      <div className="btn_wrap">
        <button
          onClick={() => {
            add(formData);
            emptyForm();
          }}
          className={style.add_btn}
        >
          Add
        </button>
      </div>
    </form>
  );
}
