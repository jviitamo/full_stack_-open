const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    
    const blogs =  await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))

})


blogsRouter.post('/', async (request, response) => {
    const body = request.body

    if (!body.url || !body.title) {
        return response.status(400).json({
            error: 'missing author or url'
        })
    }

    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        console.log(user)

        if (body.title === undefined || body.url === undefined){
            return response.status(400).json({error: 'title or url missing'})
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })
  

        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
    } catch (expection) {
        response.status(401).json({error: "something went wrong"})
    }
})


blogsRouter.delete('/:id', async (req, res) => {

    const blog = await Blog.findById(req.params.id)
    console.log(blog)


    try {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        if (!req.token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)


        console.log(user)

        if (blog.user.toString() === user.id.toString()) { 
            const blog = await Blog.findByIdAndRemove(req.params.id)
            return res.status(204).json(blog.toJSON())
        } else {
            return res.status(401).json({error: "token does not match"})    
        }
    } catch (expection) {
        return res.status(401).json({error: "something went wrong"})
    }
})

blogsRouter.put('/:id', async (req, res) => {
    const body = req.body

    const newPerson = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const saved = await Blog.findByIdAndUpdate(req.params.id, newPerson)
    res.status(200).json(saved.toJSON)
})

module.exports = blogsRouter