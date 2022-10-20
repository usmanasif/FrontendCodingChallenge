import { useEffect, useState } from 'react'
import './index.css'

const Card = ({ data, log }) => {
  const [color, setColor] = useState('')
  const [xAxis, setXAxis] = useState([])
  const [yAxis, setYAxis] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16)
    setColor('#' + n.slice(0, 6))

    setXAxis(Object.keys(log.graph).sort((a,b) => new Date(b.date) - new Date(a.date)))
    setYAxis(Object.values(log.graph))
    setLoading(false)
  }, [])

  return <div className='card'>
    <div className='profile'>
      <div className='avatar' style={{backgroundColor: color}}>
        {data.fields.avatar && <img src={data.fields.avatar} />}
        <div className='initial'>{!data.fields.avatar && data.fields.Name[0]}</div>
      </div>
      <div className='info'>
        <div className='name'>
          {data.fields.Name}
        </div>
        <div className='occupation'>
          {data.fields.occupation}
        </div>
      </div>
    </div>
    <div className='data'>
      <div className='graph'></div>
      <div className='logs'>
        <div className='numbers'>
          <p className='impressions'>{log.impression.toLocaleString()}</p>
          <span className='heading'>impressions</span>
        </div>
        <div className='numbers'>
          <p className='impressions conversions'>{log.conversion.toLocaleString()}</p>
          <span className='heading'>conversions</span>
        </div>
        <h4 className='total'>${Math.floor(log.revenue).toLocaleString()}</h4>
      </div>
    </div>
  </div>
}

export default Card
