import { useImperativeHandle, useState } from 'react'
import { useEffect } from 'react'
import { Upgrade } from './components/Upgrade'

export function App() {

  const purchases = [
    {
    "id": 1,
    "name": "cookie maker",
    "cost": 10,
    "increase": 1
  },
  {
      "id": 2,
      "name": "cookie machine",
      "cost": 50,
      "increase": 5
  },
  {
      "id": 3,
      "name": "cookie robot",
      "cost": 100,
      "increase": 10
  },
  {
      "id": 10,
      "name": "cookie factory",
      "cost": 20000,
      "increase": 2000
  }]

  const [cookies, setCookies] = useState(parseInt(localStorage.getItem("NumberOfCookies") , 10) || 0)
  const [cps, setCPS] = useState(parseInt(localStorage.getItem("CookiesPerSecond") , 10) || 0)
  const [bakeryName, setBakeryName] = useState(localStorage.getItem("BakeryName") || "Mama's Little Bakery (Chicago, Illinois)")
  let [data, setData] = useState(purchases);


  function updateCookies (){
    setCookies(cookies + 1)
  }

  
  function updateCPS (increase, cost){
    if(cookies >= cost){
      setCPS(cps + increase)
    setCookies(cookies - cost)
    } 
  }


  function revealUpgradeIfEnoughCookies(cost){
    if(cookies >= cost){
        return "clickable"
    } else {
        return "unclickable"
    }
  }


  function showSaveNameButton(){
    let show = document.getElementById("bakerySaveButton")
    show.className = "bakerySaveButtonShow"
  }


  function hideSaveNameButton(){
    let hide = document.getElementById("bakerySaveButton")
    hide.className = "bakerySaveButtonHide"

    let name = document.getElementById("bakeryName").value
    console.log(name)
    saveToLocalStorage("BakeryName", name)
  }


  function saveToLocalStorage(name, value){
    localStorage.setItem(name, value);
  }

  
  function useAPI(){
    if(document.getElementById("apiCheckbox").checked === true){
      data = fetchCookieClickerData()
    } else{
      data = setData(purchases)
    }
  }


  async function fetchCookieClickerData(){
    const response = await fetch(
        "https://cookie-upgrade-api.vercel.app/api/upgrades"
      )
    const data = await response.json()
    return setData(data)
  }


  function deleteLocalStorage(){
    setCookies(0)
    setCPS(0)
    localStorage.clear();
  }

  function showClickMe(){
    let label = document.getElementById("imageLabel")
    label.className = "imageLabelShow"
  }

  function hideClickMe(){
    let label = document.getElementById("imageLabel")
    label.className = "imageLabelHide"
  }


// *******************************************************************************************
  useEffect( () => {

    saveToLocalStorage("CookiesPerSecond", cps)
    saveToLocalStorage("NumberOfCookies", cookies)
  
    const myInterval = setInterval( () =>{  
      setCookies( (currentCookies) => currentCookies + cps)
    }, 1000)
    
    return () => {
      clearInterval(myInterval)
    }
    
  }, [cps, cookies, data])
  

  return (
    <> 
      <h1>Cookie Clicker</h1>
      
      <input type="text" defaultValue={bakeryName} id='bakeryName' onChange={showSaveNameButton}/>
      
      <button id='bakerySaveButton' className='bakerySaveButtonHide' onClick={hideSaveNameButton}>Save</button>
      
      <p>
          Use API: <input id="apiCheckbox" type="checkbox" onChange={useAPI}/>
      </p>

      <p>
          <button onClick={deleteLocalStorage}>Delete local variables</button>
      </p>

      <p>Cookies: {cookies}</p>
      
      <p>Cookies Per Second: {cps}</p>
      <div>
        <img src="https://orteil.dashnet.org/cookieclicker/img/icon.png" alt="a cookie" onClick={updateCookies} onMouseOver={showClickMe} onMouseOut={hideClickMe} id='image' className='image'/>
        <div id='imageLabel' className='imageLabelHide'>Click for cookies</div>
      </div>
      
      <p>Buy upgrades to increase Cookies Per Second:</p>
      { data.map( (purchase) => {
         return (

            <div key={`p${purchase.id}`} onClick={() => updateCPS(purchase.increase, purchase.cost)} className={revealUpgradeIfEnoughCookies(purchase.cost)}  >
              <Upgrade name={purchase.name} />   
            </div>

          )} 
      )}
          
    </>
  )
}
