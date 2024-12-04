import style from './Form.module.css';
import { useState } from 'react';

const defaultFormData = {
  title: '',
  image: undefined /* compila questo campo */,
  content: '',
  published: true,
  tags: '',
};

export default function Form() {
  const [formData, setFormData] = useState(defaultFormData);

  function handleFormData(e) {
    console.log('parte il form handler');

    const key = e.target.name;
    console.log(key);
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    console.log(value);

    const newData = {
      id: Date.now(),
      ...formData,
      [key]: value,
    };

    console.log(formData.tags, e.target);
    // console.log(tags);

    setFormData(newData);
  }

  function addPost(e) {
    e.preventDefault();
    console.log('add post');

    const post = {
      id: Date.now(),
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };
    setFormData(post);

    console.log(formData.tags, post);
  }

  function emptyForm() {
    setFormData(defaultFormData);
  }

  return (
    <form onSubmit={(e) => addPost(e, formData)} className={style.form}>
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
        <label onChange={handleFormData} key={Date.now() + 1} htmlFor="tags">
          <span>Scrivi i tag per l&apos; articolo</span>
        </label>
        <input className={style.input} name="tags" type="text" onChange={handleFormData} value={formData.tags} />

        {/* <label htmlFor="html">Html</label>
        <input onChange={handleFormData} className={style.input} name="html" type="checkbox" />

        <label htmlFor="css">Css</label>
        <input onChange={handleFormData} className={style.input} name="css" type="checkbox" />

        <label htmlFor="js">Javascript</label>
        <input onChange={handleFormData} className={style.input} name="js" type="checkbox" />

        <label htmlFor="php">Php</label>
        <input onChange={handleFormData} className={style.input} name="php" type="checkbox" /> */}
      </div>
      <div className="btn_wrap">
        <button
          onClick={() => {
            addPost();
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
