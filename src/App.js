import React from 'react'
import './App.css';
import Form from './Form';
import HeaderSection from './HeaderSection';
import DetailSection from './DetailSection';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div>
      <Provider store={store}>
      <HeaderSection/>
      <Form/>
     <DetailSection/>
      </Provider>
    </div>
  )
}

export default App
