(()=>{"use strict";const e=(()=>{async function e(e){const o=`https://api.weatherapi.com/v1/forecast.json?key=c877832b46004c6e9e1224325232707&q=${e}&days=8&aqi=no&alerts=no`,t=await fetch(o,{mode:"cors"});if(!t.ok)throw new Error("Town does not exist or other error occurred");return await t.json()}return{getHourlyForecast:async function(o){try{let t;const c=await e(o),n=c.forecast.forecastday[0].hour,r=c.forecast.forecastday[1].hour,s=parseInt(c.location.localtime.split(" ")[1].slice(0,2));if(s<16)t=n.slice(s+1,s+9);else{const e=n.slice(s+1),o=r.slice(0,8-e.length);t=e.concat(o)}return console.log(c),console.log(s),console.log(t),t}catch(e){document.querySelector("#no").textContent="This town does not exist!"}},getWeeklyForecast:async function(o){try{const t=(await e(o)).forecast.forecastday.slice(1);console.log(t)}catch(e){document.querySelector("#no").textContent="This town does not exist!"}}}})(),o=document.querySelector("button"),t=document.querySelector("input");o.addEventListener("click",(()=>{e.getHourlyForecast(t.value),e.getWeeklyForecast(t.value)})),window.onload=function(){e.getHourlyForecast("London"),e.getWeeklyForecast("London")}})();