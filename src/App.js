import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import jsonData from './logs.json'
import Card from './components/card'
import './App.css'

const App = () => {
  const [URL] = useState(process.env.REACT_APP_URL)
  const [baseId] = useState(process.env.REACT_APP_BASE_ID)
  const [API_KEY] = useState(process.env.REACT_APP_API_KEY)
  const [config] = useState({
    headers: {Authorization: `Bearer ${API_KEY}`}
  })
  const [users, setUsers] = useState([])
  const [logs, setLogs] = useState({})

  useEffect(() => getUsers(), [])

  const getUsers = () => {
    axios.get(`${URL}/${baseId}/Users?maxRecords=10`, config)
      .then(({data : {records}}) => {
        setUsers(records)
        generateGraphData()
      })
  }

  const generateGraphData = () => {
    var obj = {}
    jsonData.forEach(e => {
      var impression = 0
      var conversion = 0

      if (e.type === 'impression') {
        impression =  1
      } else {
        conversion = 1
      }

      if(obj[e.user_id] === undefined) {  
        obj[e.user_id] = {
          revenue: e.revenue,
          impression: impression,
          conversion: conversion,
        }
        obj[e.user_id].graph = {[e.time.split(' ')[0]]: e.revenue}
      } else {
        obj[e.user_id].revenue = obj[e.user_id].revenue + e.revenue
        obj[e.user_id].impression = obj[e.user_id].impression+1
        obj[e.user_id].conversion = obj[e.user_id].conversion+1

        if(obj[e.user_id][e.time.split(' ')[0]] === undefined) {
          obj[e.user_id].graph = {[e.time.split(' ')[0]]: e.revenue, ...obj[e.user_id].graph}
        } else {
          obj[e.user_id].graph[e.time.split(' ')[0]] = obj[e.user_id][e.time.split(' ')[0]] + e.revenue
        }
      }
    })
    setLogs(obj)
  }

  return <div className='home'>
    {users?.length>0 && <>
        <div className='grid'>{
          users.map((e, index) => <Card key={index+''} data={e} log={logs[e.fields.Id]}></Card>)}</div>
      </>
    }
  </div>
}

export default App
