import "../assets/styles/Dashboard.scss"
import GeneralOEE from "../components/GeneralOEE"
import { useState, useEffect } from 'react'
import axios from "axios"
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import BarChartIcon from '@mui/icons-material/BarChart'
import { OEECalculator } from "../functions"
import DeviceOEE from "../components/DeviceOEE"

function Dashboard() {


  const [listDevice, setListDevice] = useState(['DVC2852', 'DVC7958', 'DVC7984'])
  const [oeeScore, setOEEScore] = useState(0)
  const [oeeParameters, setOeeParameters] = useState([
    {
      label: 'Availability',
      score: 0
    },
    {
      label: 'Performance',
      score: 0
    },
    {
      label: 'Quality',
      score: 0
    },
  ])
  const [oeeSideStatistics, setOEESideStatistics] = useState([
    {
      icon: <PrecisionManufacturingIcon />,
      value: 0,
      unit: 'pcs'
    },
    {
      icon: <AccessTimeIcon />,
      value: 0,
      unit: ''
    },
    {
      icon: <BarChartIcon />,
      value: 0,
      unit: 'pcs/min'
    },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/generaloee');
        setOEEScore(OEECalculator(response.data.availability, response.data.quality, response.data.performance))
        setOeeParameters(
          [
            {
              label: 'Availability',
              score: response.data.availability
            },
            {
              label: 'Performance',
              score: response.data.performance
            },
            {
              label: 'Quality',
              score: response.data.quality
            }
          ]
        )
        setOEESideStatistics([
          {
            icon: <PrecisionManufacturingIcon />,
            value: response.data.producedProduct,
            unit: 'pcs'
          },
          {
            icon: <AccessTimeIcon />,
            value: response.data.workedTime,
            unit: ''
          },
          {
            icon: <BarChartIcon />,
            value: response.data.productPerMinute,
            unit: 'pcs/min'
          },
        ])
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const interval = setInterval(fetchData, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  
  const [deviceOEEData, setDeviceOEEData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const dataPromises = listDevice.map(async (deviceId) => {
        try {
          const response = await axios.get(`http://localhost:4000/deviceoee/${deviceId}`);
          const deviceData = response.data;
          return {...deviceData, deviceID: deviceId}
        } catch (error) {
          console.error(`Error fetching device OEE data for ${deviceId}:`, error);
          return null;
        }
      });

      const allData = await Promise.all(dataPromises);
      console.log(allData)
      const sortedAllData = allData.sort((a,b) => {
        const oeeScoreA = OEECalculator(a.availability, a.quality, a.performance)
        const oeeScoreB = OEECalculator(b.availability, b.quality, b.performance)
        return oeeScoreA - oeeScoreB
      })
      setDeviceOEEData(sortedAllData);
    };

    fetchData();

    const interval = setInterval(fetchData, 3000)
    
    return () => {clearInterval(interval)}

  }, []);

  return (
    <div className="Dashboard">
      <GeneralOEE oeescore={oeeScore} parameters={oeeParameters} sideParameters={oeeSideStatistics}/>
      <div className="devicesOEE">
        {
          deviceOEEData.map((data, index) => {
            return(
              <DeviceOEE keys={index} data={data}/>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dashboard