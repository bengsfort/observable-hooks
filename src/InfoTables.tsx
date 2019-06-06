import * as React from 'react'

import { TableContainer, LikesContainer, ListItem, ListHeader, AddPopup } from './styledComponents'
import { USER_STORE } from './index'
import {
  User,
  Item,
  addUserLike,
  addUserDislike,
  deleteUserLike,
  deleteUserDislike
} from './asyncData'

const addLike = (user: string, text: string) =>
  addUserLike(user, text).then((updatedUser: User) =>
    USER_STORE.setAtomicValue<User>('users', user, () => updatedUser)
  )

const deleteLike = (user: string, id: number) =>
  deleteUserLike(user, id).then(({ status }: { status: number }) =>
    USER_STORE.setAtomicValue<User>('users', user, (storedUser: User) => {
      if (status !== 200) {
        return storedUser
      }
      return {
        ...storedUser,
        likes: storedUser.likes.filter(like => like.id !== id)
      }
    })
  )

const addDislike = (user: string, text: string) =>
  addUserDislike(user, text).then(updatedUser =>
    USER_STORE.setAtomicValue('users', user, () => updatedUser)
  )

const deleteDislike = (user: string, id: number) =>
  deleteUserDislike(user, id).then(({ status }) =>
    USER_STORE.setAtomicValue<User>('users', user, targetUser => {
      if (status !== 200) {
        return targetUser
      }
      return {
        ...targetUser,
        dislikes: targetUser.dislikes.filter(dislike => dislike.id !== id)
      }
    })
  )
const LikesList = () => {
  const user = USER_STORE.getValue<User>('selectedUser')
  const [isOpen, setIsOpen] = React.useState(false)
  const [text, setText] = React.useState('')
  const toggleModal = () => setIsOpen(!isOpen)

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
          handleSubmit={() => addLike(user.user, text)}
          closeModal={toggleModal}
          text={text}
        />
        {user.likes.map(like => (
          <ListItem open={isOpen} key={like.item + like.id}>
            {like.item}
            <i className="material-icons" onClick={() => deleteLike(user.user, like.id)}>
              delete
            </i>
          </ListItem>
        ))}
      </LikesContainer>
    </>
  )
}

const DislikesList = () => {
  const user = USER_STORE.getValue<User>('selectedUser')
  const [isOpen, setIsOpen] = React.useState(false)
  const [text, setText] = React.useState('')
  const toggleModal = () => setIsOpen(!isOpen)
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
          handleSubmit={() => addDislike(user.user, text)}
          closeModal={toggleModal}
          text={text}
        />
        {user.dislikes.map(dislike => (
          <ListItem open={isOpen} key={dislike.item + dislike.id}>
            {dislike.item}
            <i className="material-icons" onClick={() => deleteDislike(user.user, dislike.id)}>
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
