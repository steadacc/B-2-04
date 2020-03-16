const user_role_admin = {
  id: 1,
  username: 'admin@gmail.com',
  role: 'ROLE_ADMIN',
}
const user_role_user = {
  id: 2,
  username: 'user@gmail.com',
  role: 'ROLE_USER',
}

const { user_id_1, user_id_2, todos_user_id_1, todos_user_id_2, posts_user_id_1, posts_user_id_2, comments_post_id_1, comments_post_id_2} = require('./data_mock')

const mock = require('mock-require')

mock('../../src/microservices/auth', (token) => {
  if (token === 'admin') {
    return Promise.resolve(user_role_admin)
  }
  if (token === 'user') {
    return Promise.resolve(user_role_user)
  }
})

mock('../../src/microservices/user', (id) => {
  if (id == 1) {
    return Promise.resolve(user_id_1)
  }
  if (id == 2) {
    return Promise.resolve(user_id_2)
  }
  return Promise.reject({status: 404, message: 'not Found'})
})

mock('../../src/microservices/todos', (qs) => {
  if (qs.userId == 1) {
    return Promise.resolve(todos_user_id_1)
  }
  if (qs.userId == 2) {
    return Promise.resolve(todos_user_id_2)
  }

  return Promise.resolve([])
})

mock('../../src/microservices/posts', (qs) => {
  if (qs.userId == 1) {
    return Promise.resolve(posts_user_id_1)
  }
  if (qs.userId == 2) {
    return Promise.resolve(posts_user_id_2)
  }

  return Promise.resolve([])
})

mock('../../src/microservices/comments', (qs) => {
  if (qs.postId == 1) {
    return Promise.resolve(comments_post_id_1)
  }
  if (qs.postId == 2) {
    return Promise.resolve(comments_post_id_2)
  }

  return Promise.resolve([])
})

