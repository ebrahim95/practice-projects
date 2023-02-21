const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')
const { usersInDB } = require('./user_api_helper')
const api = supertest(app)


describe('addition of a new user', () => {
  test('return statuscode 400 if the password is not of min length', async () => {

    const usersAtStart = await usersInDB()
    const new_user = {
      username: 'jam',
      name: 'james',
      password: 'ja'
    }

    const result = await api
      .post('/api/users')
      .send(new_user)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    expect(result.body.error).toContain('password needs to be a minimum length of 3')

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('return statuscode 400 if the username is not of min length', async () => {

    const usersAtStart = await usersInDB()

    const new_user = {
      username: 'ja',
      name: 'james',
      password: 'jam'
    }

    const result = await api
      .post('/api/users')
      .send(new_user)
      .expect(400)
      .expect('Content-Type', /application\/json/)


    expect(result.body.error).toContain('username needs to be a minimum length of 3')

    const usersAtEnd = await usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)

  }, 1000000)

})
