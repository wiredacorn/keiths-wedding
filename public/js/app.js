// Form Page
checked = true
// Click radio buttons.
function attendingYes(event) {
  event.preventDefault();
  document.getElementById('attendingYesBtn').click();
  //console.log('Attending')
  checked = true
  document.getElementById('attendingNo').classList.remove('checked')
  document.getElementById('attendingYes').classList.add('checked')
}
function attendingNo(event) {
  event.preventDefault();
  document.getElementById('attendingNoBtn').click();
  //console.log('Not Attending')
  checked = false
  document.getElementById('attendingYes').classList.remove('checked')
  document.getElementById('attendingNo').classList.add('checked')
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateEmailSimple(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
  }

var id = new URLSearchParams(window.location.search).get('id');
async function getJSON() {
  return fetch(`/.netlify/functions/google-spreadsheet-fn/${id}`)
    .then((res) => res.json())
    .then((resJ) => {return resJ})
}
async function getPrev() {
  const json = await this.getJSON();  // command waits until completion
  //console.log(json);
  pData = json           // hello is now available
  return json
}

window.onload = function() {
  console.log("onload function running")
  // Pressing enter key clicks the submit button.
  window.addEventListener('keydown',function(e){
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
      if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
        e.preventDefault();
            const submitButton = document.getElementById('rsvp-btn');
            submitButton.click();
            return false;
      }
    }
  },true);

  const submitButton = document.getElementById('rsvp-btn');
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    const inputField = document.getElementById('emailAddress');
    var formData = new FormData(document.getElementById('rsvp-form'));
    
    var formObject = {};
    formData.forEach(function(value, key){
      formObject[key] = value;
    });
    if (checked) {
      formObject["attending"] = 'yes'
    } else {
      formObject["attending"] = 'no'
    }
    

    localStorage.setItem('formString', JSON.stringify(formObject));


    // console.log(formObject)
    if (validateEmail(formObject.email_address)) {
      //console.log(formObject.email_address)
      bodyData = JSON.stringify({
        "Name": formObject["name"],
        "Email": formObject["email"],
        "Attending": formObject["attending"],
        "Allergies": formObject["allergies"],
      })
      console.log(formObject)
      console.log(bodyData)
      // Add RSVP to sheet
      fetch('/.netlify/functions/google-spreadsheet-fn', {
        method: 'POST',
        body: bodyData,
      })
        .then((res) => res.json());
        //.then(log)
        // .then(console.log(log))
        //.catch(error);
      
      // Update Results Page
      calculate(guid, true);
    } else {
      console.log(formObject)
      const inputField = document.getElementById('emailAddress');
      inputField.classList.add('bg-error');
      inputField.addEventListener('click', (event) => {
        inputField.classList.remove('bg-error');
      });
    }
  });
    
  const calculatorSubmit = document.getElementById('form-submit-btn');
  calculatorSubmit.addEventListener('click', () => async (e) => {
    e.preventDefault();
    fetch('/.netlify/functions/google-spreadsheet-fn', {
      method: 'POST',
      body: new FormData(calculatorSubmit)
    })
        .then((res) => res.json());
        //.then(log)
        //.then(console.log(log))
        //.catch(error);
    })
};


// Results Page

function pushState(state, title, url) {
  history.pushState(state, title, url)
}

function getData() {
  calcData = localStorage.getItem("formString");
  calcDataObj = JSON.parse(calcData);
  return calcDataObj; 
}
