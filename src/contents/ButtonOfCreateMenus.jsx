import * as React from 'react';
import {useState,useEffect,createContext,useContext} from "react";
import ReactDom from 'react-dom'
import axios from "axios";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { render } from 'react-dom';
import Autosuggest from 'react-autosuggest';


import '../styles/index.scss';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RangeSlider from 'react-bootstrap-range-slider';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";


import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@material-ui/core/Grid";
import Image from 'mui-image'
import Paper from '@material-ui/core/Paper' 
import Tooltip from '@mui/material/Tooltip';

import TextField from '@mui/material/TextField';

import { UseFoodNameDictContext, AllFoodArrayContext, LikeAndDislikeFoodNameDictContext, AllFoodNameDictContext, MachineContext, NutritionAndTimeContext, StapleContext, GenreContext, PeopleNumContext, MenuNumContext } from './context.js';

//　デフォルトデータ
import data from '../data/data.json';
import { removeAllListeners } from 'npm';

let defaultNutritions  = data.defaultNutritions;
let defaultTimeNames = data.defaultTimeNames;
let defaultNutritionsParams = data.defaultNutritionsParams;
let defaultTimeParams = data.defaultTimeParams;
let machineNames = data.machineNames;
let defaultMachine = data.defaultMachine;
let choose_category = data.choose_category

// postする時に必要なデータ

// 以下 TO DO

// var my_food = {
//   "like": [],
//   "dislike": []
// }

var want_food = {}

var staple = ""

var genre = ["korean","chinese"]

var people = 1

var count = 0

const ButtonOfCreateMenus=()=>{
    const [machine, setMachine] = useContext(MachineContext);
    const [ideal, setIdeal] = React.useContext(NutritionAndTimeContext);
    const [want_food, setUseFoodNameDict] = React.useContext(UseFoodNameDictContext);
    const [my_food, setMyFood] = React.useContext(LikeAndDislikeFoodNameDictContext);
    const [staple, setStaple] = React.useContext(StapleContext);
    const [genre, setGenre] = React.useContext(GenreContext);
    const [people, setPeople] = React.useContext(PeopleNumContext);
    const [count, setCount] = React.useContext(MenuNumContext);



    
    const createRequest=()=>{
      let menus = {}
      // setValue((val) => val.filter((text) => text !== "all"));
      // setGenre((genre)=>genre.filter((t)=> t!="all"));
      // console.log(genre)

      let requestBody = {
        "machine": machine,
        "ideal": ideal,
        "my_food": my_food,
        "want_food": want_food,
        "staple": staple,
        "genre": genre,
        "people": people,
        "count": count
      };
      CreateMenus(navigate,requestBody)
    }

    
    //CreateMenus(navigate)
    //画面遷移
    const navigate = useNavigate();
    return (
    <Button color="success" variant="contained" endIcon={<SendIcon />} onClick={() => {}}>
        献立を作成
    </Button>    
    );
    
}

// 
var pageTransition = false;

const CreateMenus = (navigate, requestBody) => {
  
  // const navigate = props.navigate
  // const requestBody = props.requestBody
// const [pageTransition ,setPageTransition] = useState(false);

  // useEffect(() => {
  //   if(pageTransition == true){
  //     console.log("遷移する")
  //       pageTransition = false;
  //        navigate("/result", {state: {'body':menus}})
  //      }else{
  //       console.log("遷移しない")
  //      }
  // }, [pageTransition]);

  
    let menus = {}

    // let requestBody = {
    //   "machine": machine,
    //   "ideal": ideal,
    //   "my_food": my_food,
    //   "want_food": want_food,
    //   "staple": staple,
    //   "genre": genre,
    //   "people": people,
    //   "count": count
    // };

    //新しい型
    // let requestBody = {
    //   "machine":machine,
    //   "ideal":ideal,
    //   "my_food":my_food,
    //   "want_food":useFoodNameDict,
    //   "staple":staple,
    //   "genre":genre,
    //   "people":people
    // };
    console.log(requestBody);


    // axiosで書き直す


    fetch('http://localhost:8000/menu', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({ 'Content-type' : 'application/json', 'Access-Control-Allow-Origin': '*' })
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      menus = data;
      // pageTransition = true;

      // setPageTransition(true);
      // 成功した時だけ
      if(menus["status"] == "Done"){
        navigate('/result', {state: {'body':menus}});
      }
    })

    

    // axios
    //   .post("http://localhost:8000/test", {
    //     body: JSON.stringify(requestBody),
    //     contentType: 'application/json', // リクエストの Content-Type
    //     dataType: "json", 
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   });
  }

  export default ButtonOfCreateMenus