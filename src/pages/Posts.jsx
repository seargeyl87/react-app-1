 import React, {useEffect, useState, useRef } from 'react';
 import PostList from "../components/PostList";
 import MyButton from '../components/UI/button/MyButton';
 import PostForm from "../components/PostForm";
 import PostFilter from "../components/PostFilter";
 import MyModal from '../components/UI/MyModal/MyModal';
 import { usePosts } from '../hooks/usePosts'
 import PostService from '../API/PostService';
 import Loader from '../components/UI/Loader/Loader'
 import { useFetching } from '../hooks/useFetching';
 import {getPageCount} from '../utils/pages';
 import Pagination from '../components/UI/pagination/Pagination';
 import {useObserver} from '../hooks/useObserver';
 import MySelect from '../components/UI/select/MySelect';

function Posts() {
  let [posts, setPosts] = useState([])
  let [filter, setFilter] = useState({sort: '', query: ''});
  let [modal, setModal] = useState(false);
  let [totalPages, setTotalPages] = useState(0);
  let [limit, setLimit] = useState(10);
  let [page, setPage] = useState(1);
  let sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  let lastElement = useRef();
  let [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    let response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    let totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit));
  })
  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

 useEffect(() => {
  fetchPosts(limit, page);
 }, [page, limit])

  let createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }


  let removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  let changePage = (page) => {
    setPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={()=> setModal(true)}>Создать пост</MyButton>
      <MyModal 
                  visible={modal} 
                  setVisible={setModal}>
      <PostForm 
                  create={createPost}/>
      </MyModal>
           <hr style={{margin: '15px 0'}}/>
      <PostFilter 
                  filter={filter}
                  setFilter={setFilter}/>
                  <MySelect 
                      value={limit}
                      onChange={value => setLimit(value)}
                      defaultValue="количество элементов на странице"
                      options={[
                        {value: 5, name:  '5'},
                        {value: 10, name: '10'},
                        {value: 15, name: '15'},
                        {value: -1, name: 'показать все посты'}
                      ]}/>
                  {postError &&
                 <h1>Произошла ошибка ${postError}</h1>}
      <PostList remove={removePost} posts={sortedAndSearchedPosts} title='Посты'/>
      <div ref={lastElement} style={{height:20, background: 'red'}}/>
      {isPostsLoading &&
                  <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader/></div> 
                 }
        
       <Pagination 
                  page={page} 
                  changePage={changePage} 
                  totalPages={totalPages}/>
    </div>
  );
}

export default Posts;