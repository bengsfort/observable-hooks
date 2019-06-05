import * as React from 'react'

import { TableContainer, LikesContainer, ListItem, ListHeader, AddPopup } from './styledComponents'
import { USER_STORE } from './index.tsx'
import { addUserLike, addUserDislike, deleteUserLike, deleteUserDislike } from './asyncData.ts'

const addLike = (user, text) =>
  addUserLike(user.user, text).then(updatedUser =>
    USER_STORE.setAtomicValue('users', users => {
      const targetUser = users.find(listUser => Object.is(listUser, user))
      return users.map(listUser => (listUser === targetUser ? updatedUser : listUser))
    })
  )

const deleteLike = (user, text) =>
  deleteUserLike(user.user, text).then(updatedUser =>
    USER_STORE.setAtomicValue('users', users => {
      const targetUser = users.find(listUser => Object.is(listUser, user))
      return users.map(listUser => (listUser === targetUser ? updatedUser : listUser))
    })
  )

const addDislike = (user, text) =>
  addUserDislike(user.user, text).then(updatedUser =>
    USER_STORE.setAtomicValue('users', users => {
      const targetUser = users.find(listUser => Object.is(listUser, user))
      return users.map(listUser => (listUser === targetUser ? updatedUser : listUser))
    })
  )

const deleteDislike = (user, text) =>
  deleteUserDislike(user.user, text).then(updatedUser =>
    USER_STORE.setAtomicValue('users', users => {
      const targetUser = users.find(listUser => Object.is(listUser, user))
      return users.map(listUser => (listUser === targetUser ? updatedUser : listUser))
    })
  )
const LikesList = () => {
  const user = USER_STORE.getValue('selectedUser')
  const [isOpen, setIsOpen] = React.useState(false)
  const [text, setText] = React.useState('')
  const toggleModal = React.useCallback(
    () => {
      setIsOpen(!isOpen)
    },
    [isOpen]
  )
  return (
    <>
      <ListHeader>
        <h3 style={{ margin: 0 }}>Likes</h3>
        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={toggleModal}>
          add
        </i>
      </ListHeader>
      <LikesContainer style={{ marginBottom: 20 }}>
        <AddPopup
          open={isOpen}
          onChange={setText}
          handleSubmit={() => addLike(user, text)}
          closeModal={toggleModal}
          text={text}
        />
        {user.likes.map(like => (
          <ListItem open={isOpen} key={like.item + like.id}>
            {like.item}
            <i className="material-icons" onClick={() => deleteLike(user, like)}>
              delete
            </i>
          </ListItem>
        ))}
      </LikesContainer>
    </>
  )
}

const DislikesList = () => {
  const user = USER_STORE.getValue('selectedUser')
  const [isOpen, setIsOpen] = React.useState(false)
  const [text, setText] = React.useState('')
  const toggleModal = React.useCallback(
    () => {
      setIsOpen(!isOpen)
    },
    [isOpen]
  )
  return (
    <>
      <ListHeader>
        <h3 style={{ margin: 0 }}>Dislikes</h3>
        <i className="material-icons" style={{ cursor: 'pointer' }} onClick={toggleModal}>
          add
        </i>
      </ListHeader>
      <LikesContainer>
        <AddPopup
          open={isOpen}
          onChange={setText}
          handleSubmit={() => addDislike(user, text)}
          closeModal={toggleModal}
          text={text}
        />
        {user.dislikes.map(dislike => (
          <ListItem open={isOpen} key={dislike.item + dislike.id}>
            {dislike.item}
            <i className="material-icons" onClick={() => deleteDislike(user.user, dislike)}>
              delete
            </i>
          </ListItem>
        ))}
      </LikesContainer>
    </>
  )
}

export const InfoTables = () => {
  return (
    <TableContainer>
      <LikesList />
      <DislikesList />
    </TableContainer>
  )
}
