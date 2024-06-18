import './App.css';
import Header from './layouts/Header';
import { useEffect, useState } from 'react';
import Nav from './layouts/Nav';
import Contents from './layouts/Contents';

function App() {
  return (
    <>
      <Header/>
        <Contents/>
      <Nav/>
    </>
  );
}

export default App;
