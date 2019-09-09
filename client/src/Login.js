import React, { useState, useEffect } from 'react' // eslint-disable-line no-unused-vars
import { Form, Button, Message } from 'semantic-ui-react'
import styled from 'styled-components'
import useApi from './hooks/api'
import Loading from './components/Loading'

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [{ data, isLoading, error }, setReq] = useApi()

  // after network has returned and nothing else is loading then route to todos page
  useEffect(() => {
    if (data && !isLoading) {
      props.history.push('/')
    }
  }, [data, isLoading, props.history])

  return isLoading ? <Loading /> : (
    <PageContainer>
      <Form style={{ width: '20em' }} onSubmit={async (e) => {
        setReq({
          method: 'post',
          path: 'http://localhost:3001/login',
          body: {
            username,
            password
          },
          dispatch: {
            type: 'SET_TOKEN'
          }
        })
        e.preventDefault()
      }}>
        <Form.Field onChange={(e) => setUsername(e.target.value)}>
          <label>Username</label>
          <input placeholder='Username' />
        </Form.Field>
        <Form.Field onChange={(e) => setPassword(e.target.value)}>
          <label>Password</label>
          <input placeholder='Last Name' />
        </Form.Field>
        <Button primary type="submit">Submit</Button>
      </Form>
      {error && (<Message
        error
        header='Login Failed'
        content='Username or password is incorrect'
      />)}
    </PageContainer>
  )
}

export default Login
