import React, {useEffect, useState} from 'react';
import {apiHost} from "./utils/constants";

function App() {
  const [title, setTitle] = useState<string>('header');

  useEffect(() => {
    fetch(`${apiHost}`)
      .then(res => res.text())
      .then(str => setTitle(str))
  }, [])
  return (
    <div>
      <header>
        <h1>{title}</h1>
      </header>
    </div>
  );
}

export default App;
