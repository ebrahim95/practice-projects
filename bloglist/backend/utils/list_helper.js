// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  if (blogs.length === 0) {
    return 0
  }

  const blogLikes = blogs.map(blog => blog.likes)
  return blogLikes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const blogLikes = Math.max(...blogs.map(blog => blog.likes))
  const favoriteBlog = blogs.find(blog => blog.likes === blogLikes)
  const formattedfavBlog = {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
  return formattedfavBlog
}

const mostBlogs = (blogs) => {
  const authorNames = blogs.map(blog => blog.author)
  const count = {}
  for (const obj of blogs) {
    if (authorNames.includes(obj.author)) {
      if (!(obj.author in count)) {
        count[obj.author] = 0
      }
      count[obj.author] += 1
    }
  }

  const countKeys = Object.keys(count)
  const countValues = Object.values(count)
  const authorName = countKeys[countValues.indexOf(Math.max(...countValues))]

  return {
    author: authorName,
    blogs: count[authorName]
  }
}


const mostLikes = (blogs) => {
  const authorNames = blogs.map(blog => blog.author)
  const count = {}
  for (const obj of blogs) {
    if (authorNames.includes(obj.author)) {
      if (!(obj.author in count)) {
        count[obj.author] = 0
      }
      count[obj.author] += obj.likes
    }
  }

  const countKeys = Object.keys(count)
  const countValues = Object.values(count)
  const authorName = countKeys[countValues.indexOf(Math.max(...countValues))]
  return {
    author: authorName,
    likes: count[authorName]
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}


