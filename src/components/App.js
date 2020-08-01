import React, {useState, useEffect} from 'react';
import SearchAppBar from './Headers/SearchAppBar';
import CustomTab from './Tab/CustomTab';
import { Route, Switch, Redirect } from "react-router-dom";
const axios = require('axios');

export const HistoryContext = React.createContext();
export const PayloadContext = React.createContext();

function App() {
  const [history, setHistory] = useState(null);
  const [payload, setPayload] = useState(null);
  useEffect(()=>{
    if (!history) {
      axios.get('https://api.spacexdata.com/v3/history')
      .then(function (response) {
        setHistory(response.data.map((obj)=>{
          obj.event_date_utc = String(new Date(Date.parse(obj.event_date_utc)+ obj.event_date_unix))
          return obj
      }))
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    if (!payload) {
      axios.get('https://api.spacexdata.com/v3/payloads')
      .then(function (response) {
        setPayload(response.data.map((obj)=>{
          obj.customers = obj.customers.join(',')
          obj.norad_id = obj.norad_id.join(',')
          obj.reused = String(obj.reused)
          return obj
          }))
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  },[history,payload])

  return (
    <>
    <PayloadContext.Provider value={{ payload, setPayload }}>
      <HistoryContext.Provider value={{ history, setHistory }}>
        <SearchAppBar />
          <Switch>
            <Redirect exact from="/" to="/home/history" />
            <Route exact path="/home/:page?" render={props => <CustomTab {...props} />} />
          </Switch>
      </HistoryContext.Provider>
    </PayloadContext.Provider>
    </>
  );
}

export default App;
