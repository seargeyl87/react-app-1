import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loader from '../components/UI/Loader/Loader'


const PostIdPage = () => {
    let params = useParams();
    let [post, setPost] = useState({});
    let [comments, setComments] = useState([]);
    let [fetchPostById, isLoading] = useFetching(async () => {
        let response = await PostService.getById(params.id);
        setPost(response.data)
    })
    let [fetchComments, isComLoading] = useFetching(async () => {
        let response = await PostService.getCommentsByPostId(params.id);
        setComments(response.data)
    })
    
    useEffect(() => {
      fetchPostById(params.id)
      fetchComments(params.id)
    }, [])

    return (
        <div>
            <h1>вы открыли страницу поста c ID= {params.id}</h1>
            {isLoading ? <Loader/>
            :  <div>{post.id}. {post.title}</div>
            }
            <h2>
                Комментарии
            </h2>
            {isComLoading
            ? <Loader/>
            : <div>
                {comments.map(comm => 
                <div key={comm.id} style={{marginTop: 15}}>
                    <h5>{comm.email}</h5>
                    <div>{comm.body}</div>
                </div>)}
            </div>
            }
            
        </div>
    );
};

export default PostIdPage;