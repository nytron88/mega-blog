import React, { useEffect, useState } from 'react'
import { PostForm, Loader } from '../components'
import { useParams, useNavigate } from 'react-router-dom'
import appwriteService from '../appwrite/appwriteService'

function EditPost() {

  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const post = await appwriteService.getPost(slug)
      if (post) setPost(post);
    }
    if (slug) fetchPost().then(() => setLoading(false));
    else navigate('/');

  }, [slug])

  return (
    <>
      {post ? (
        <div className="container mx-auto px-4 py-16">
          <PostForm post={post} />
        </div>
      ) : <Loader />}
    </>
  )
}

export default EditPost
