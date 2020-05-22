describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Juhana Viitamo',
      username: 'jviitamo',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })
  
  it('Login form is shown', function() {
    cy.contains('password')
    cy.contains('username')
  })
})

describe('Login',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Juhana Viitamo',
      username: 'jviitamo',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('succeeds with correct credentials', function() {
    cy.get('#username').type('jviitamo')
    cy.get('#password').type('salainen')
    cy.get('#login').click()
    cy.contains('log in succeed')
  })

  it('fails with wrong credentials', function() {
    cy.get('#username').type('jviitamo')
    cy.get('#password').type('väärä')
    cy.get('#login').click()
    cy.contains('wrong username or password')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Juhana Viitamo',
      username: 'jviitamo',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 
    cy.login( { username: 'jviitamo', password: 'salainen' } )
    cy.visit('http://localhost:3000')
  })

  it('A blog can be created', function() {
    cy.contains('new note').click()
    cy.get('#title').type('a note created by cypress')
    cy.get('#author').type('cypress')
    cy.get('#url').type('www.test.com')
    cy.contains('add').click()
    cy.contains('a new blog a note created by cypress by cypress was added')
    cy.get('.toggle').contains('a note created by cypress')
  })

  it('A blog can be liked', function() {
    cy.contains('new note').click()
    cy.get('#title').type('a note created by cypress')
    cy.get('#author').type('cypress')
    cy.get('#url').type('www.test.com')
    cy.contains('add').click()
    cy.contains('view').click()
    cy.contains('like').click()
    cy.get('#likes').contains('likes 1')
  })

  it('A blog can be deleted', function() {
    cy.contains('new note').click()
    cy.get('#title').type('a note created by cypress')
    cy.get('#author').type('cypress')
    cy.get('#url').type('www.test.com')
    cy.contains('add').click()
    cy.contains('view').click()
    cy.contains('delete').click()
    cy.contains('a note created by cypress was successfully deleted')
  })

  it('arranges blogs by likes', function() {
    cy.createBlog( { title: 'one', author: 'one', url: 'www.one.com' } )
    cy.createBlog( { title: 'two', author: 'two', url: 'www.two.com' } )
    cy.createBlog( { title: 'three', author: 'three', url: 'www.zero.com' } )

    cy.contains('one').parent().contains('view').click()
    cy.contains('two').parent().contains('view').click()
    cy.contains('three').parent().contains('view').click()


    cy.contains('likes 0')
      .contains('like').click()

    cy.contains('likes 0')
      .contains('like').click()
      .contains('like').click()

    cy.contains('likes 0')
      .contains('like').click()
      .contains('like').click()
      .contains('like').click()


    cy.contains('one').parent().contains('hide').click()
    cy.contains('two').parent().contains('hide').click()
    cy.contains('three').parent().contains('hide').click()
    cy.get('.toggle').then(blogs => {
      cy.wrap(blogs[0]).contains('view').click()
      cy.contains('likes 3')
      cy.wrap(blogs[1]).click()
      cy.contains('likes 2')
      cy.wrap(blogs[2]).click()
      cy.contains('likes 1')
    })

  })
})
