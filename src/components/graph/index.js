import {
  Chart,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'

Chart.register(
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
)

const Graph = ({xAxis, yAxis}) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [options] = useState({
    plugins: {legend: { display: false }},
    scales: {
      y: {
        title: { display: false },
        display: false
      },
      x: { display: false }
    }
  })
  const [details] = useState({
    labels: xAxis,
    datasets: [{ data: yAxis, fill: false }]
  })

  useEffect(() => formatDate(), [])

  const formatDate = () => {
    let start = xAxis[0].split('-')
    let end = xAxis[xAxis.length-1].split('-')

    setStartDate((+start[2])+'/'+(+start[1]))
    setEndDate((+end[2])+'/'+(+end[1]))
  }

  return <>
    <Line options={options} data={details} />
    <span className='text-center'>
      Conversions {startDate} - {endDate}
    </span>
  </>
}

export default Graph
