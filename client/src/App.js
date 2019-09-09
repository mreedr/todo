import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import Loading from './components/Loading'
import TodoView from './components/TodoView'
import useApi from './hooks/api'
import hocAuth from './components/hoc-auth'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

const App = () => {
  const jwtToken = useSelector(state => state.tokenReducer.jwtToken)
  const [shouldDisplayCreateTodoForm, reqDisplayCreateTodoForm] = useState(null)
  const [rerunRetrieve, reqRerunRetreive] = useState(false)
  const [resGetTodos, reqGetTodos] = useApi()

  // request all todoes on mount and anytime we add a new one
  useEffect(() => {
    reqRerunRetreive(false)
    reqGetTodos({
      method: 'get',
      path: `http://localhost:3001/todos?token=${jwtToken}`
    })
  }, [rerunRetrieve, jwtToken, reqGetTodos])

  return resGetTodos.isLoading ? <Loading /> : (
    <Container>
      <Button style={{ maxHeight: '25vh' }} primary onClick={() => reqDisplayCreateTodoForm(true)}>add a todo</Button>
      {resGetTodos.error && <p>{JSON.stringify(resGetTodos.error)}</p>}
      <div>
        {shouldDisplayCreateTodoForm && (
          <TodoView todo={{ title: 'title', body: 'content...' }} initialMode="edit" onDelete={() => {
            reqRerunRetreive(true)
          }} onSave={() => {
            reqDisplayCreateTodoForm(false)
            reqRerunRetreive(true)
          }} />
        )}
        {resGetTodos.data && resGetTodos.data.map((todo) => (
          <TodoView key={todo._id} todo={todo} onDelete={() => {
            reqRerunRetreive(true)
          }} onSave={() => {
            reqDisplayCreateTodoForm(false)
            reqRerunRetreive(true)
          }}/>
        ))}
      </div>
    </Container>
  )
}

export default hocAuth(App)
