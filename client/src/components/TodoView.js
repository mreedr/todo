import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Icon, Button, Card, Input, Form, TextArea } from 'semantic-ui-react'
import useApi from '../hooks/api'

const TodoView = ({ todo, onDelete, onSave, initialMode }) => {
  const jwtToken = useSelector(state => state.tokenReducer.jwtToken)
  const [mode, setMode] = useState(initialMode || 'view')
  const [title, setTitle] = useState(todo.title)
  const [body, setBody] = useState(todo.body)

  const [resDelete, reqDelete] = useApi()
  const [resSave, reqSave] = useApi()

  useEffect(() => {
    if (resDelete.data) onDelete()
  }, [resDelete.data, onDelete])

  useEffect(() => {
    if (resSave.data) onSave()
  }, [resSave.data, onSave])

  return (
    <Card>
      <Card.Content style={{ color: 'red' }}>
        <Card.Header>{mode === 'view' ? title : (
          <Input focus value={title} onChange={(e) => setTitle(e.target.value)}/>
        ) }</Card.Header>
        <Card.Description>{mode === 'view' ? body : (
          <Form> {/* TextArea must be wrapped in Form to render correctly */}
            <TextArea value={body} onChange={(e) => setBody(e.target.value)}/>
          </Form>
        )}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui three buttons'>
          <Button basic color='red' onClick={() => {
            reqDelete({
              method: 'delete',
              path: `http://localhost:3001/todos/${todo._id}?token=${jwtToken}`
            })
          }}>
            <Icon name="trash" />
          </Button>
          { mode === 'view' ? (
            <Button basic color='blue' onClick={() => setMode('edit')}>
              <Icon name="edit" />
            </Button>
          ) : (
            <Button basic color='green' onClick={() => {
              if (todo._id) {
                reqSave({
                  method: 'put',
                  path: `http://localhost:3001/todos/${todo._id}?token=${jwtToken}`,
                  body: {
                    title,
                    body
                  }
                })
              } else {
                reqSave({
                  method: 'post',
                  path: `http://localhost:3001/todos?token=${jwtToken}`,
                  body: {
                    title,
                    body
                  }
                })
              }
              setMode('view')
            }}>
              <Icon name="save" />
            </Button>
          )}

        </div>
      </Card.Content>
    </Card>
  )
}
export default TodoView
