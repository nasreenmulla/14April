import React, { Component } from 'react'
import Select from './pages/Select/Select'
import { BrowserRouter as Router ,Route, Routes} from 'react-router-dom';

export default class Allroutes extends Component {
  render() {
    return (
      <Routes>
        <Route exact path="/select" element={<Select/>}></Route>
      </Routes>
    )
  }
}
