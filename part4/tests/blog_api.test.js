const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/blog')

const api = supertest(app)

const blogs = [ { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7, __v: 0 }, { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 }, { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 }, { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 }, { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 }, { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(blogs)
})


test('returned blogs are correct', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        
    expect(res.body.length).toEqual(blogs.length)
})

test('id exists', async () => {
    const res = await api 
        .get('/api/blogs')

    expect(res.body[0].id).toBeDefined    
})

test('post works', async () => {
    const newBlog = {
        title: 'testblog',
        author: 'juhana viitamo',
        url: 'github',
        likes: 2
    }

    const old = await api 
        .get('/api/blogs')

    await api
        .post('/api/blogs')
        .send(newBlog)
    
    const NEW = await api 
        .get('/api/blogs')

    expect(NEW.body.length).toBe(old.body.length + 1)
})

test('url and title missing', async () => {
    const newBlog = {
        title: 'testblog',
        likes: 2
    }

    await api 
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
})

test('delete works', async () => {
    const old = await api 
        .get('/api/blogs')

    await api 
        .delete(`/api/blogs/${old.body[0].id}`)
        .expect(204)
    
    const NEW = await api 
        .get('/api/blogs')

    expect(old.body).toHaveLength(NEW.body.length + 1)

})

test('edit works', async () => {

    const newBlog = new Note ({
        title: 'testblog',
        author: 'juhana viitamo',
        url: 'github',
        likes: 2
    })
    const old = await api   
        .get('/api/blogs')


    await api 
        .put(`/api/blogs/${old.body[0].id}`)
        .send(newBlog)

    const NEW = await api   
        .get('/api/blogs')

    console.log(NEW)
    expect(NEW.body[0].title).toBe('testblog')
})

afterAll(() => {
    mongoose.connection.close()
})