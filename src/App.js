import './App.css';
import React,{useState,useEffect} from 'react';
import current_date from './current_data.json';
import vaccine_dates from './vaccine_dates.json';
import moment from 'moment';
import { PieChart } from 'react-minimal-pie-chart';



function App() {
  useEffect (() => { 
    numberOfVac(people,date)
  }, [])
  //NOTE
  //path handeling was an issue, and i could not resolve this issue in due time
  // const getData=()=>{
  //   fetch(vaccine_dates
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       console.log(response)
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //       setPeople(myJson)
  //     });
  // }


  const [date,setDate]=useState(current_date.current_date);
  const [people, setPeople] = useState(vaccine_dates);
  
  function decDate(){
    const currentDate=moment(date);
    currentDate.subtract(1, 'days');
    //moment().format('MMMM Do YYYY, h:mm:ss a')
    setDate(currentDate.format('YYYY-MM-DD'));
    numberOfVac(people,date);
  }

  function incDate(){
    const currentDate=moment(date);
    currentDate.add(1, 'days');
    //moment().format('MMMM Do YYYY, h:mm:ss a')
    setDate(currentDate.format('YYYY-MM-DD'));
    numberOfVac(people,date);
  }

  const [vaccinated,setVac]=useState();

  function numberOfVac(list,date){

    const vaccinated=list.filter(item=> moment(date).isSameOrAfter(item['vaccination_date']))
    const number=vaccinated.length;
    setVac(number);
  }
  
  
  ///numberOfVac(people,date)

  return (
    <div className='App-header'>
      <div><button onClick={decDate} > - </button>
      &nbsp;&nbsp;&nbsp;&nbsp;{date}&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={incDate}> + </button>
      </div>
      <p>{vaccinated} out of {people.length} people have been vaccinated</p>
      <PieChart style={{
        transform:'translateX(39vw)',
      }} radius='50' viewBoxSize = '[50,50]'
        data={[
          { title: 'Vaccination Done', value: vaccinated, color: 'green' },
          { title: 'vaccination Pending', value: people.length-vaccinated, color: '#e22908' },
        ]}
      />
      <table>
        <th>Name</th>
        <th>Vaccination Status</th>
        {people.map(item => (
          <tr >
            <td>{item['person_name']}</td>
            <td style={{
            color: moment(date).isSameOrAfter(item['vaccination_date']) ? 'green' : 'red'
          }}>{moment(date).isSameOrAfter(item['vaccination_date']) ? 'Vaccine Done' : 'Vaccine Pending'}</td>
          </tr>
      
        ))}
      </table>
    </div>    
    
  );
}

export default App;
