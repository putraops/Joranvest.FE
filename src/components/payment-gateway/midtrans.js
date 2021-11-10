import React, { useState, useEffect } from 'react';

function Membership() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js'; 
    //change this according to your client-key
    const myMidtransClientKey = 'SB-Mid-client-w7QtpoJYMNe_-JVb'; 
   
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
   
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);

  var payButton = document.getElementById('pay-button');

  /* For example trigger on button clicked, or any time you need */
  payButton.addEventListener('click', function() {
    /* in this case, the snap token is retrieved from the Input Field */
    //var snapToken = document.getElementById('snap-token').value;
    //snap.pay(snapToken);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* <button onClick={() => setCount(count + 1)}> */}
      <button id="pay-button">
        Click me
      </button>
    </div>
  );
}