import { Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

const baseUrl = 'http://localhost:3000';

function App() {
  const [count, setCount] = useState(0);

  const callApi = async () => {
    // call /helloToy endpoint with axios
    const r = (await axios.get(`${baseUrl}/helloToy`)).data;
    console.log(r);
  };

  console.log('helo');

  return (
    <div className="App">
      <Button onClick={callApi}>hello world</Button>
      Hello toy is very cool person{' '}
    </div>
  );
}

export default App;
