
import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

let PostForm = ({create}) => {
    let [post, setPost] = useState({title: '', body: ''});

    let addNewPost = (e) => {
      e.preventDefault();
      let newPost = {
          ...post, id: Date.now()
         }
       create(newPost)
      
      setPost({title: '', body: ''});
    
    }


return (
    <div>
      <form>
         <MyInput 
            value={post.title} 
            onChange={e=> {setPost({...post, title: e.target.value})}}
            type="text"
            placeholder="Название поста"
         />
         <MyInput 
            value={post.body} 
            onChange={e=> setPost({...post, body: e.target.value})}
            placeholder="Описание поста"/>
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    </div>
  )

}

export default PostForm;