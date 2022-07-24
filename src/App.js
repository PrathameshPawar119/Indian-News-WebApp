import './App.css';
import React, {useState} from 'react'
// import LoadingBar from "react-top-loading-bar";


import Navbar from './components/Navbar';
import News from './components/News';
import RightToolBar from './components/RightToolBar';
import TopBar from './components/TopBar';


export default function App() {

  const apiKey = "bcbfb4ec43124733b641b070bf181828";
  const [SearchTxt, setSearchTxt] = useState("");
  

    return (
      <>
        <div className="home_content">
        <TopBar />
        <Navbar country={"in"} apiKey={apiKey} pageSize={10} setSearchTxt = {setSearchTxt}/>
        <News  country={"in"}  apiKey={apiKey}  pageSize={10} SearchTxt={SearchTxt}/>
        </div>
          
        <RightToolBar />
      </>
    );
}

// " |7c14e0735b9744a8b2bfe7ccd34e4b18