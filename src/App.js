import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'

function App() {

  const [response, setResponse] = useState("")
  const [football, setFootball] = useState([]);

  useEffect(()=> {
    fetch('http://localhost:8080/api/test')
    .then(res => res.text()).then(result => {setResponse(result)})

    
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'football-prediction-api.p.rapidapi.com'
      }
    };
    
    fetch('https://football-prediction-api.p.rapidapi.com/api/v2/predictions?market=classic&iso_date=2018-12-01&federation=UEFA', options)
      .then(response => response.json())
      .then(resp => setFootball(resp.data))
      .catch(err => console.error(err));
  
  },[]) 


  console.log(response);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
     
        <a
          className="App-link"
          href="http://localhost:3000/"
          target="_blank"
          rel="noopener noreferrer"
        >
         {response}
        </a>
        {football.map((x) => <div key={x.id}> <h3>{x.home_team} vs {x.away_team}</h3><p>Results {x.result}</p></div>)}
      </header>
    </div>
  );
}

export default App;
