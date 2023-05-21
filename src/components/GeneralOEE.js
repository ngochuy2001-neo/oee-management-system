import { Doughnut } from "react-chartjs-2"
import { useState, useEffect } from "react"
import { statisticColor } from "../functions";
import 'chart.js/auto'
import {Chart, ArcElement, Tooltip, Legend} from "chart.js"

function GeneralOEE({ oeescore, parameters, sideParameters }) {

  Chart.register(ArcElement, Tooltip, Legend)
  
  const [doughnutChartDataset, setDoughnutChartDataset] = useState(
    {
      labels: ['GeneralOEE'],
      datasets: [
        {
          label: 'General OEE Score',
          data: [oeescore, 100 - oeescore],
          backgroundColor: ['#0cb504', '#5e5e5e'],
          borderWidth: 1
        }
      ]
    }
  )

  useEffect(() => {
    setDoughnutChartDataset((prevDataset) => (
      {
        ...prevDataset,
        datasets:[
          {
            ...prevDataset.datasets[0],
            data: [oeescore, 100 - oeescore],
            backgroundColor: [statisticColor(oeescore)[0], statisticColor(oeescore)[1]]
          }
        ]
      }
    )) 
  }, [oeescore])

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
  
  const options = {
    cutout: 75,
    plugins:{
      legend:{
        display: false
      }
    }
  }

  return(
    <div className="GeneralOEE">
      <div className="GeneralOEEScoreChart">
        <Doughnut data = {doughnutChartDataset} options={options} plugins={[textCenter]}/>
      </div>
      <div className="OEEParameters">
        {
          parameters.map((data, index) => {
            return(
              <div className="OEEParameter">
                <p className="parameterName">{data.label}<span>:</span></p>
                <div className="OEEParameterBar" style={{backgroundColor: statisticColor(data.score)[1]}}>
                  <div className="OEEParameterLoad" style={{width: `${data.score}%`, backgroundColor: statisticColor(data.score)[0]}}></div>
                </div>
                <div className="OEEParameterNumber" style={{color: statisticColor(data.score)[0]}}>
                  {data.score}%
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="OEESideStatistics">
        {
          sideParameters.map((data, index) => {
            return(
              <div className="OEESideStatistic">
                {data.icon}
                <p style={{marginTop: "10px"}}>{data.value} {data.unit}</p>
              </div>
            )
          })
        }
      </div>
      <div className="OEESidestatistic"></div>
    </div>
  )
}

export default GeneralOEE