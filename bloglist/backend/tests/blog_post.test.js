const list_helper = require('../utils/list_helper')
const { zeroBlogList, oneBlogList, multipleBlogList } = require('./blog_post_helper')


test('dummy test', () => {
  const blogs = []

  const result = list_helper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list has no blog, equals the likes of that', () => {
    const result = list_helper.totalLikes(zeroBlogList)
    expect(result).toBe(0)
  })

  test('when list has one blog, equals the likes of that', () => {
    const result = list_helper.totalLikes(oneBlogList)
    expect(result).toBe(7)
  })

  test('when list has multiple blogs, equals the likes of that', () => {
    const result = list_helper.totalLikes(multipleBlogList)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('blog with most likes is', () => {
    const result = list_helper.favoriteBlog(multipleBlogList)

    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})

describe('most blogs', () => {
  test('when author has the most blogs, equal the number of that', () => {
    const result = list_helper.mostBlogs(multipleBlogList)
    expect(result).toEqual({
      author:'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  test('when author has the most blogs, equal the number of that', () => {
    const result = list_helper.mostLikes(multipleBlogList)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})