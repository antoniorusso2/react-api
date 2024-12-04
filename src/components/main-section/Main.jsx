import Card from '../card/Card.jsx';
// import Form from '../form/Form.jsx';
import style from './main.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const BASE_URI = 'http://localhost:3000/';

const defaultFormData = {
  title: '',
  image: undefined /* compila questo campo */,
  content: '',
  published: true,
  tags: '',
};

function Main() {
  // const [titleInput, setTitleInput] = useState('');
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [addedList, setAddedList] = useState([]);
  const [tags, setTags] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);

  //fetch API
  function fetchPosts() {
    axios
      .get(`${BASE_URI}posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }

  //aggiunta tags
  useEffect(() => {
    setPublishedPosts(posts.filter((post) => post.published));

    const newTags = [];

    posts.forEach((post) => {
      const postTags = post.tags;

      Array.isArray(postTags) &&
        postTags.forEach((tag) => {
          !newTags.includes(tag) && newTags.push(tag);
        });
    });

    setTags(newTags);
  }, [posts]);

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

  function addPost(post) {
    axios
      .post(`${BASE_URI}posts`, post)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  function addNewElement(e) {
    console.log('render addNewElement');
    e.preventDefault();

    const post = {
      id: Date.now(),
      ...formData,
      tags: formData.tags.split(',').map((tag) => tag.trim()),
    };
    setFormData(post);
    setPosts([...posts, post]);
    setAddedList([...addedList, post]);

    addPost(post);
    setFormData(defaultFormData);

    console.log(post);
  }

  function deletePost(id) {
    // console.log('elemento eliminato');
    setPublishedPosts(publishedPosts.filter((post) => post.id !== id));
    //rimuovo il post dalla lista di post aggiunti
    setAddedList(addedList.filter((post) => post.id !== id));
    axios
      .delete(`/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.error(err));
  }

  return (
    <main className={style.main}>
      <div className="container">
        <div className="row">
          <div className="title col-12">
            <h1 className={`${style.title} col-12`}>Titolo pagina</h1>
          </div>
        </div>
      </div>
      <div className="container">
        <section className="row added_elements_section">
          <div className="col-12">
            <div className="add_form">
              <form onSubmit={addNewElement} className={style.form}>
                <h3>Aggiungi un nuovo post</h3>

                <input onChange={handleFormData} className={style.input} name="title" type="text" placeholder="Inserisci il nuovo titolo" value={formData.title} />

                <input onChange={handleFormData} className={style.input} name="image" type="text" placeholder="Inserisci un immagine" />

                <label htmlFor="category">scegli una categoria:</label>
                <select onChange={handleFormData} value={formData.category} className={style.category} name="category">
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="news">News</option>
                  <option value="plans">Plans</option>
                </select>

                <textarea className={style.textarea} onChange={handleFormData} name="content" type="text-area" placeholder="Inserisci il contenuto" value={formData.content} />

                <div className={style.tags_checkbox}>
                  <label onChange={handleFormData} key={Date.now() + 1} htmlFor="tags">
                    Scrivi i tag per l&apos; articolo
                  </label>
                  <input className={style.input} name="tags" type="text" onChange={handleFormData} value={formData.tags} />
                </div>
                <div className="btn_wrap">
                  <button
                    onClick={() => {
                      // addPost();
                      // emptyForm();
                    }}
                    className={style.add_btn}
                  >
                    Add
                  </button>
                </div>
              </form>
              <ul className={style.added_list}>
                {addedList &&
                  addedList.map((el) => (
                    <li key={el.id} className={style.new_el}>
                      <p>
                        <strong>Hai aggiunto:</strong> {el.title}
                      </p>
                      {/* delete */}
                      <button onClick={() => deletePost(el.id)} className={style.delete_btn}>
                        Delete
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className="container">
        <section className="published_posts">
          <div className="row">
            {publishedPosts.map((post) => {
              return <Card key={post.id} tags={tags} item={post} />;
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Main;
