import React from 'react'

export default function TopBar () {

    // Reload Page after clicking logo
    // let Toplogo = document.getElementsByClassName("headLogo");
    // console.log(Toplogo);
    // Toplogo.addEventListener("click", ()=>{
    // //     document.location.reload(true);
    // console.log("ok");
    // })

    return (
      <div className="topbar">
        <div className="topBarContent">
            <div className="headLogo"> Whatsapp<span>India</span></div>
            <div id="google_element"></div>
        </div>
      </div>

    );
}
