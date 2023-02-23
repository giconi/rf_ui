import logo from './logo.svg';

//import {ResponsiveBar} from '@nivo/bar'
import { useState, useEffect, useRef } from 'react';
import barData from './barData.js'
import MyResponsiveBar from './nivoBar.js'
import MyResponsiveHeatMap from './nivoHeatMap.js'
import heatMapData from './heatData.js'
import { getBarDataColoured, getData, getHeatmapData } from './dbcalls'
import CountUp from 'react-countup';

function App() {


  //const counter = 0;
  /* Global Timer */

  const [counter, setCounter] = useState(0);
  const [datetime, setDateTime] = useState(new Date().toLocaleString())

  useEffect(() =>{
          // put hook here for start of run  
          setTimeout(()=>{
            setCounter(counter + 1)
            setDateTime(new Date().toLocaleString())
          }, 2000);
          

  },[counter]);

  
  const [selected, setSelected] = useState([]);
  const [bar1, setBar1] = useState([]);
  const [bar2, setBar2] = useState([]);
  const [bar3, setBar3] = useState([]);
  const [bar4, setBar4] = useState([]);

  const [bar5, setBar5] = useState([]);

  const [pnlDay, setPnlDay] = useState([]);
  const [deltaPortfolio, setDeltaPortfolio] = useState([]);
  const [vegaPortfolio, setVegaPortfolio] = useState([]);

  const [AssetChangeDay, setChangeDay] = useState([]);
  const [AssetPnlDay, setAssetPnlDay] = useState([]);
  const [AssetDeltaPortfolio, setAssetDeltaPortfolio] = useState([]);
  const [AssetVegaPortfolio, setAssetVegaPortfolio] = useState([]);

  const [dropDown, setDropDown] = useState([]);
  const [heatmap, setHeatMap] = useState([]);
  const [heatmapSelect, setHeatMapSelected] = useState([]);


  function handleSelectChange(event) {
    console.log(event.target.value)
    setSelected(event.target.value);
    firstUpdate.current = false;
  }

  const firstUpdate = useRef(true);


  /* Asset Level pct change */

  useEffect(() => {
    let mounted = true;
    if (firstUpdate.current) {
      return;
    }
    getData("select pct_change from asset_core where ticker='" + selected + "'").then((rez) => {
      if (mounted) {
        setChangeDay(rez.column_1);
      }
    })

    return () => mounted = false;

  }, [selected]);

  /* Asset Level PnL Day */

  useEffect(() => {
    let mounted = true;
    if (firstUpdate.current) {
      return;
    }
    getData("select ROUND(DECIMAL(IFNAN(0,sum(IFNAN(0,initial_spot)-IFNAN(0,current_spot))*1000)),2) from asset_core where ticker='" + selected + "'").then((rez) => {
      if (mounted) {
        setAssetPnlDay(rez.column_1);
      }
    })
    return () => mounted = false;

  }, [selected]);

  /* Asset Level Delta */


  useEffect(() => {
    let mounted = true;
    if (firstUpdate.current) {
      return;
    }
    getData("select ROUND(DECIMAL(sum(delta)),4) from trade_deltas where ticker='" + selected + "'").then((rez) => {
      if (mounted) {
        setAssetDeltaPortfolio(rez.column_1);
      }
    })
    return () => mounted = false;

  }, [selected]);

    /* Asset Level Vega */


  useEffect(() => {
    let mounted = true;
    if (firstUpdate.current) {
      return;
    }
    getData("select ROUND(DECIMAL(sum(vega)),0) from trade_vegas where ticker='" + selected + "'").then((rez) => {
      if (mounted) {
        setAssetVegaPortfolio(rez.column_1);
      }
    })
    return () => mounted = false;

  }, [selected]);

  /* Largest Absolute Vegas - Bar Chart - Portfolio */

  useEffect(() => {
    let mounted = true;
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    getBarDataColoured("select ROUND(DECIMAL(tte),4) as tte,ROUND(sum(vega)) from mhawkins_kinetica.trade_vegas where ticker='" + selected + "' group by 1 order by 1 asc").then((rez) => {
      if (mounted) {
        setBar5(rez);
      }
    })
    return () => mounted = false;

  }, [selected,counter]);

  /* Largest Absolute Vegas - Bar Chart - Portfolio */

  useEffect(() => {
    let mounted = true;
    getBarDataColoured("select ticker,ROUND(DECIMAL(abs(sum(vega)))) as vega from trade_vegas group by ticker order by 2 desc limit 6").then((rez) => {
      if (mounted) {
        setBar4(rez);
      }
    })
    return () => mounted = false;

  }, [counter]);

  /* Largest Absolute Deltas - Barc Chart - Portfolio */

  useEffect(() => {
    let mounted = true;
    getBarDataColoured("select ticker,ROUND(DECIMAL(abs(sum(delta)))) as delta from trade_deltas group by ticker order by 2 desc limit 6").then((rez) => {
      if (mounted) {
        setBar3(rez);
      }
    })
    return () => mounted = false;

  }, [counter]);

  /*  Worst by P&L - Bar Chart - Portfolio */


  useEffect(() => {
    let mounted = true;
    getBarDataColoured("select ticker,ROUND(DECIMAL((initial_spot-current_spot)*1000),0) as best_pnl from asset_core order by 2 asc limit 6").then((rez) => {
      if (mounted) {
        setBar2(rez);
      }
    })
    return () => mounted = false;

  }, [counter]);

  /*  Best by P&L - Bar Chart - Portfolio */

  useEffect(() => {
    let mounted = true;
    getBarDataColoured("select ticker,ROUND(DECIMAL((initial_spot-current_spot)*1000),0) as best_pnl from asset_core order by 2 desc limit 6").then((rez) => {
      if (mounted) {
        setBar1(rez);
      }
    })
    return () => mounted = false;

  }, [counter]);

  /* P&L - Portfolio */

  useEffect(() => {
    let mounted = true;
    getData("select ROUND(DECIMAL(sum(current_value-initial_value)*1000),2) as pnl from mhawkins_kinetica.trade_core").then((rez) => {
      if (mounted) {
        setPnlDay(rez.column_1);
      }
    })
    return () => mounted = false;

  }, [counter]);

  /* delta - Portfolio */

  useEffect(() => {
    let mounted = true;
    getData("select ROUND(DECIMAL(sum(delta)),2) from mhawkins_kinetica.trade_deltas").then((rez) => {
      if (mounted) {
        setDeltaPortfolio(rez.column_1);
      }
    })
    return () => mounted = false;

  }, [counter]);

  /* vega - Portfolio */

  useEffect(() => {
    let mounted = true;
    getData("select ROUND(DECIMAL(sum(vega)),0) from mhawkins_kinetica.trade_vegas").then((rez) => {
      if (mounted) {
        setVegaPortfolio(rez.column_1);
      }
    })
    return () => mounted = false;

  }, [counter]);

  /* DROP DOWN FOR TICKERS */

  useEffect(() => {
    let mounted = true;
    getData("select distinct(ticker) from mhawkins_kinetica.asset_core").then((rez) => {
      if (mounted) {
        setDropDown(rez.column_1);
      }
    })
    return () => mounted = false;

  }, [selected]);

  /* HEATMAP */

  useEffect(() => {
    let mounted = true;
    console.log('bb')
    console.log(selected)
    getHeatmapData("select \
    DECIMAL(strike), \
    ROUND(DECIMAL(if(isnan(TTE_A),null,TTE_A)),4) as \"10D\",\
    DECIMAL(if(isnan(TTE_B),null,TTE_B)) as \"1M\",\
    DECIMAL(if(isnan(TTE_C),null,TTE_C)) as \"2M\",\
    DECIMAL(if(isnan(TTE_D),null,TTE_D)) \"3M\",\
    DECIMAL(if(isnan(TTE_E),null,TTE_E)) as \"6M\",\
    DECIMAL(if(isnan(TTE_F),null,TTE_F)) \"1Y\",\
    DECIMAL(if(isnan(TTE_G),null,TTE_G)) as \"2Y\" from asset_vol_surface_std where ticker='"+ selected + "' order by 1 asc").then((rez) => {
      if (mounted) {
        setHeatMap(rez);
      }
    })
    return () => mounted = false;

  }, [selected]);

  /* DISPLAY TEMPLATE */

  return (
    <div className="App">

      <div class="text-white bg-sky-900">Riskfuel</div>

      <div class="p-10">

        <div class="pt-1.5 grid grid-cols-4 gap-4">

          <div class="col-span-1">
              <div class="border-0 text-4xl">{datetime}</div>              
          </div>
          <div class="col-span-1">
        
              <div class="border-0 text-4xl">Portfolio Metrics</div>  
</div>
              <div class="col-span-2 whitespace-pre-wrap"><span class="text-2xl">pnl (day)</span>      ${pnlDay}        <span class="text-2xl">delta</span>        {deltaPortfolio}          <span class="text-2xl">Vega</span>          {vegaPortfolio}</div>
              <div class="h-6"></div>
</div>

          <div class="pt-1.5 grid grid-cols-4 gap-4">
            <div class="col-span-2 content-center flex items-center justify-center"><div class="content-center text-2xl font-bold underline">Asset Overview</div></div>
            <div class="col-span-2 content-center flex items-center justify-center "><div class="content-center items-center justify-center border-0 text-2xl font-bold underline"><span>Asset Detail</span></div></div>
        

          <div class="col-span-1 h-96 border-black border-0 rounded-lg">

            

            <MyResponsiveBar title="Best Assets by P&L" data={bar1}></MyResponsiveBar></div>

          <div class="col-span-1 h-96 border-black border-0 rounded-lg">
            <MyResponsiveBar title="Worst Assets by P&L" data={bar2}></MyResponsiveBar></div>

            
            <div class="col-span-2 row-span-2 border-black border-0 rounded-lg">

            <div class="inline font-bold">Choose Asset →  </div>
            <select onChange={handleSelectChange}  id="underline_select" class="inline py-2.5 px-0 text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">  
            
            {dropDown.map((dropDown) => <option value={dropDown}>{dropDown}</option>)}
            </select>



<div>
<table class="pt-1.5">
  <tr>
    <td class="font-bold">
      Change (Day):
</td>
    <td>
      {AssetChangeDay}%
</td>
 
    <td class="font-bold">
      Delta:
</td>
    <td>
      {AssetDeltaPortfolio}
    </td>
 
    <td class="font-bold">
      P&L (Day):
</td>
    <td>
      {AssetPnlDay}
    </td>

    <td class="font-bold">
      Vega:
</td>
    <td>
      {AssetVegaPortfolio}
    </td>
  </tr>
</table>
</div>

<div class="border-black border-0 rounded-lg">

<MyResponsiveHeatMap title="" data={heatmap}></MyResponsiveHeatMap>
</div>

<div class="col-span-2  h-96 border-black border-0 rounded-lg">
            <MyResponsiveBar index="tte" title="Vega by Expiration" data={bar5} axisLeft="Vega"></MyResponsiveBar>
</div>



</div>

<div class="col-span-1 h-96 border-black border-0 rounded-lg pt-6">
<MyResponsiveBar title="Largest Absolute Deltas" data={bar3}></MyResponsiveBar>
</div>

<div class="col-span-1  h-96 border-black border-0 rounded-lg pt-6">

<MyResponsiveBar title="Largest Vegas" data={bar4}></MyResponsiveBar>
</div>

      </div>
      
    </div>
    <div class="col-span-2 content-center flex items-center justify-center"><div class="content-center">
      Riskfuel 2023</div></div>
    </div>


  );
}

export default App;
