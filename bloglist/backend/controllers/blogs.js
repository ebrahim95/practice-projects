const blogsRouter = require('express').Router()
const JsonWebToken  = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')
const { SECRET }= require('../utils/config')

const findUserByToken = async (token) => {
  const decodedToken = JsonWebToken.verify(token, SECRET)
  const user = await User.findById(decodedToken.id)
  return user
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(201).json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  response.status(201).json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  let { title, author, url, likes } = request.body
  const user =  request.user
  if (!likes) {
    likes = 0
  }

  if (!url || !title) {
    response.status(400).end()
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = [...user.blogs, savedBlog._id]
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)
  const { comment } = request.body
  blog.comments = [...blog.comments, comment]

  const addedCommentBlog = await blog.save()
  response.status(201).json(addedCommentBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const user = await findUserByToken(request.token)
  const blogUser = await Blog.findById(id)
  if ((user.id.toString() === blogUser.user.toString())) {
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  } else {
    response.status(401).json({
      error: 'wrong user'
    })
  }


})

blogsRouter.put('/:id', async (request, response, next) => {
  const id = request.params.id
  const blog = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
      context: 'query'
    })

    response.json(updatedBlog)

  } catch (expection) {
    next(expection)
  }
}
)


module.exports = blogsRouter