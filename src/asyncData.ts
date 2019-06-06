export interface User {
  user: string
  likes: Item[]
  dislikes: Item[]
}

export interface Item {
  id: number
  item: string
}

const userList: User[] = [
  {
    user: 'sam',
    likes: [
      { id: 0, item: 'cars' },
      { id: 1, item: 'dogs' },
      { id: 2, item: 'Bruce Springsteen' },
      { id: 3, item: 'mowing the lawn' }
    ],
    dislikes: [
      { id: 0, item: 'vegetables' },
      { id: 1, item: 'income tax' },
      { id: 2, item: 'existential crises' }
    ]
  },
  {
    user: 'jane',
    likes: [{ id: 0, item: 'community gardens' }, { id: 1, item: 'tequila' }],
    dislikes: [
      { id: 0, item: 'plastic plants' },
      { id: 1, item: 'sunscreen' },
      { id: 2, item: 'people who wear mustaches unironically' }
    ]
  },
  {
    user: 'peter',
    likes: [
      { id: 0, item: 'annonymity' },
      {
        id: 1,
        item: 'talking about the differences between open source and libre software'
      },
      { id: 2, item: 'emacs' }
    ],
    dislikes: [
      { id: 0, item: 'vim' },
      { id: 1, item: 'hacking in movies' },
      { id: 2, item: 'his cat allergy' }
    ]
  },
  {
    user: 'patricia',
    likes: [
      { id: 0, item: 'red wine' },
      { id: 1, item: 'tall guys' },
      { id: 2, item: 'winter' },
      { id: 3, item: 'tattoos' }
    ],
    dislikes: [
      { id: 0, item: 'the word literally being used to mean figuratively' },
      { id: 1, item: 'pug dogs' },
      { id: 2, item: 'Peter Gabriel' }
    ]
  },
  {
    user: 'dave',
    likes: [{ id: 0, item: 'patricia' }],
    dislikes: [{ id: 0, item: "the fact that patricia doesn't like him back" }]
  },
  {
    user: 'emma',
    likes: [
      { id: 0, item: 'sundresses' },
      { id: 1, item: 'motorcycles' },
      { id: 2, item: 'programming in C' }
    ],
    dislikes: [
      { id: 0, item: 'segfaults' },
      { id: 1, item: 'flat tires' },
      { id: 2, item: 'monday mornings' }
    ]
  }
]

type Response = {
  status: number
}

export const fetchUsers = (): Promise<User[]> =>
  new Promise((res, rej) => setTimeout(res, 1000, userList))

export const deleteUserLike = (user: string, id: number): Promise<Response> =>
  new Promise((res, rej) => res({ status: 200 }))

export const deleteUserDislike = (user: string, id: number): Promise<Response> =>
  new Promise((res, rej) => res({ status: 200 }))

export const addUserLike = (user: string, item: string): Promise<User> =>
  new Promise((res, rej) => {
    const selectedUser: User = userList.find(i => i.user === user)
    selectedUser.likes = [...selectedUser.likes, { id: selectedUser.likes.length + 1, item }]
    return res(selectedUser)
  })

export const addUserDislike = (user: string, item: string): Promise<User> =>
  new Promise((res, rej) => {
    const selectedUser = userList.find(i => i.user === user)
    selectedUser.dislikes = [
      ...selectedUser.dislikes,
      { id: selectedUser.dislikes.length + 1, item }
    ]
    return res(selectedUser)
  })
