import axios from 'axios'


const getBarDataColoured = async (az)  =>{
    console.log(az)
    return await axios.post("http://localhost:4000/barChartSingleColoured", { "sql": az})
    .then((rezo) => {
      //console.log("HERE")
      //console.log(rezo.data)
      return(rezo.data)
      //setBar1(response.data);
    });
}

const getData = async (az)  =>{
    console.log(az)
    return await axios.post("http://localhost:4000/getData", { "sql": az})
    .then((rezo) => {
      //console.log("HERE")
      //console.log(rezo.data)
      return(rezo.data)
      //setBar1(response.data);
    });
}

const getHeatmapData = async (az)  =>{
    console.log(az)
    return await axios.post("http://localhost:4000/getHeatMapData", { "sql": az})
    .then((rezo) => {
      //console.log("HERE")
      //console.log(rezo.data)
      return(rezo.data)
      //setBar1(response.data);
    });
}

export {getBarDataColoured,getData,getHeatmapData}