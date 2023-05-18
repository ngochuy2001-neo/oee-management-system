import { Doughnut } from "react-chartjs-2"
import { useState, useEffect } from "react"
import axios from "axios";
import { OEECalculator, statisticColor } from "../functions";
import 'chart.js/auto'
import {Chart, ArcElement, Tooltip, Legend} from "chart.js"

function GeneralOEE() {

  Chart.register(ArcElement, Tooltip, Legend)
  
  const [generalOEEData, setGeneralOEEData] = useState()
  const [oeeScore, setOEEScore] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/generaloee');
        setGeneralOEEData(response.data)
        setOEEScore(OEECalculator(response.data.availability, response.data.quality, response.data.performance))
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const [doughnutChartDataset, setDoughnutChartDataset] = useState(
    {
      labels: ['GeneralOEE'],
      datasets: [
        {
          label: 'General OEE Score',
          data: [oeeScore, 100 - oeeScore],
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
            data: [oeeScore, 100 - oeeScore],
            backgroundColor: [statisticColor(oeeScore)[0], statisticColor(oeeScore)[1]]
          }
        ]
      }
    )) 
  }, [oeeScore])

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
    </div>
  )
}

export default GeneralOEE