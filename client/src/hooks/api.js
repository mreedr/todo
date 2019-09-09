import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

/*
useApi is a custom react hook used to make api requests

setReq({
  method: 'get',
  path: '/lh',
  body: {

  },
  dispatch: { type: '' } // payload will always be the data retured from the request.
})
*/
const useApi = () => {
  const [data, setData] = useState()
  const [req, setReq] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setIsError] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!req) return

    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await axios[req.method](req.path, req.body)
        if (req.dispatch) {
          dispatch({ type: req.dispatch.type, payload: result.data })
        }
        setData(result.data)
      } catch (error) {
        setIsError(error)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [req, dispatch])

  return [{ data, isLoading, error }, setReq]
}

export default useApi
