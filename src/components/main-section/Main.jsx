import Card from '../card/Card.jsx';
import Form from '../form/Form.jsx';
import style from './main.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const BASE_URI = 'http://localhost:3000/';

function Main() {
  // const [titleInput, setTitleInput] = useState('');
  const [publishedPosts, setPublishedPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [addedList, setAddedList] = useState([]);
  const [tags, setTags] = useState([]);

  //aggiunta tags
  useEffect(() => {
    setPublishedPosts(posts.filter((post) => post.published));

    const newTags = [];

    posts.forEach((post) => {
      const postTags = post.tags;

      postTags.forEach((tag) => {
        !newTags.includes(tag) && newTags.push(tag);
      });
    });

    setTags(newTags);
  }, [posts]);

  //fetch API
  function fetchPosts() {
    axios
      .get(`${BASE_URI}posts`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }

  function addPost(post) {
    axios.post(`${BASE_URI}posts`, post);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  //id da inserire ad ogni elemento aggiunto
  let lastId = publishedPosts.length;

  function addNewElement(newElement) {
    console.log('render addNewElement');

    newElement.id = lastId + 1;

    setPosts([...posts, newElement]);
    setAddedList([...addedList, newElement]);

    addPost(newElement);
  }

  function deletePost(id) {
    // console.log('elemento eliminato');

    setPublishedPosts(publishedPosts.filter((post) => post.id !== id));
    //rimuovo il post dalla lista di post aggiunti
    setAddedList(addedList.filter((post) => post.id !== id));
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
        <div className="row">
          <div className="col-12">
            <section className="added_elements_section">
              <div className="add_form">
                {/* <form onSubmit={(e) => e.preventDefault()} className="form_element">
                  <input onChange={addNewElement} className={style.input} name="new-title" type="text" placeholder="Inseri
                  sci il nuovo titolo" value={inputData} />
                </form> */}

                <Form add={addNewElement} />
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
            </section>
          </div>
        </div>
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
