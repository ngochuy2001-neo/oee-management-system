import { useState, useEffect } from "react"
import axios from "axios"
import { OEECalculator, statisticColor } from "../functions";
import { Doughnut } from "react-chartjs-2";
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BarChartIcon from '@mui/icons-material/BarChart'

function DeviceOEE( {data} ) {
  
  const {availability, quality, performance, workedTime, producedProduct, deviceID, productPerMinute} = data
  const [deviceOEEScore, setDeviceOEEScore] = useState(OEECalculator(availability, quality, performance))
  const [doughnutData, setDoughnutData] = useState({
    labels: ['Device OEE'],
    datasets: [
      {
        label: 'Device OEE',
        data: [deviceOEEScore, 100 - deviceOEEScore],
        backgroundColor: [statisticColor(deviceOEEScore)[0], statisticColor(deviceOEEScore)[1]]
      }
    ]
  })

  useEffect(() => {
    setDeviceOEEScore(OEECalculator(availability, quality, performance))
  }, [availability, quality, performance])

  useEffect(() => {
    setDoughnutData({
      labels: ['Device OEE'],
      datasets: [
        {
          label: 'Device OEE',
          data: [deviceOEEScore, 100 - deviceOEEScore],
          backgroundColor: [statisticColor(deviceOEEScore)[0], statisticColor(deviceOEEScore)[1]]
        }
      ]
    })
  }, [deviceOEEScore])

  const options = {
    cutout: 65,
    plugins: {
      legend:{
        display: false
      }
    }
  }
  
  const textCenter = {
    id: 'textCenter',
    beforeDatasetsDraw(chart, args, pluginOptions){
      const { ctx, data } = chart;
      
      const xCenter = chart.getDatasetMeta(0).data[0].x
      const yCenter = chart.getDatasetMeta(0).data[0].y
      ctx.save()
      ctx.font = 'bolder 40px sans-serif'
      ctx.fillStyle = 'black'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${data.datasets[0].data[0]}%`, xCenter, yCenter)
    }
  }

  return(
    <div className="DeviceOEE">
      <div className="deviceOEEHeader" style={{backgroundColor: statisticColor(deviceOEEScore)[0]}}>{deviceID}</div>
      <div className="deviceOEEDetail">
        <div className="deviceOEEParameterDoughnut">
          <Doughnut data={doughnutData} options={options} plugins={[textCenter]}/>          
        </div>
        <div className="deviceOEEParameters">
          <div className="deviceOEEParameter">
            <PrecisionManufacturingIcon />
            <div className="deviceOEEParameterValue">{producedProduct}</div>
          </div>
          <div className="deviceOEEParameter">
            <AccessTimeIcon />
            <div className="deviceOEEParameterValue">{workedTime}</div>
          </div>
          <div className="deviceOEEParameter">
            <BarChartIcon />
            <div className="deviceOEEParameterValue">{productPerMinute}</div>
          </div>
        </div>
      </div>
      <div className="deviceOEESideDetail">
        <div className="deviceOEESideStat">
          <div className="statName">Availability</div>
          <div className="valueBar">
            <div className="valueProcess" style={{width: `${availability}%`, backgroundColor: statisticColor(availability)[0]}}></div>
          </div>
        </div>
        <div className="deviceOEESideStat">
          <div className="statName">Qualtiy</div>
          <div className="valueBar">
            <div className="valueProcess" style={{width: `${quality}%`, backgroundColor: statisticColor(quality)[0]}}></div>
          </div>
        </div>
        <div className="deviceOEESideStat">
          <div className="statName">Performance</div>
          <div className="valueBar">
            <div className="valueProcess" style={{width: `${performance}%`, backgroundColor: statisticColor(performance)[0]}}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceOEE 