// Form Page
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


function showMessage() {
  formArea = document.getElementById("formArea");
  successMsgAttending = document.getElementById("successMsgAttending");
  successMsgNotAttending = document.getElementById("successMsgNotAttending");

  if (formObject.attending == "yes") {
    formArea.classList.add("hidden");
    successMsgAttending.classList.remove("hidden");
  } else if (formObject.attending == "no") {
    formArea.classList.add("hidden");
    successMsgNotAttending.classList.remove("hidden");
  }

}

function validateFields() {
  
  formArea = document.getElementById("formArea");
  nameArea = document.getElementById("namefield");
  emailArea = document.getElementById("emailfield");
  attendingArea = document.getElementById("attendingBoxes");
  allergiesArea = document.getElementById("allergiesfield");

  if (formObject.name.length == 0) {
    nameArea.classList.add("error");
    nameMsg.classList.remove("hidden");
  }
  if (validateEmail(formObject.email) == false) {
    emailArea.classList.add("error");
    emailMsg.classList.remove("hidden");
  }
  if (formObject.attending == undefined) {
    attendingArea.classList.add("error");
    attendingMsg.classList.remove("hidden");
  }

  if (formObject.name.length != 0 && validateEmail(formObject.email) && formObject.attending != undefined) {
    if (attendingArea.classList.contains("error")) {
      attendingArea.classList.remove("error");
      nameMsg.classList.add("hidden");
    }
    if (emailArea.classList.contains("error")) {
      emailArea.classList.remove("error");
      emailMsg.classList.add("hidden");
    }
    if (nameArea.classList.contains("error")) {
      nameArea.classList.remove("error");
      attendingMsg.classList.add("hidden");
    }
    return true
  } else {
    return false
  }
}



function submitForm() {
  const calculatorSubmit = document.getElementById('form-submit-btn');
  calculatorSubmit.addEventListener('click', () => async (e) => {
    e.preventDefault();
    console.log("check this part")
    fetch('/.netlify/functions/google-spreadsheet-fn', {
      method: 'POST',
      body: new FormData(calculatorSubmit)
    })
        .then((res) => res.json());
        //.then(log)
        //.then(console.log(log))
        //.catch(error);
    })
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
    formData = new FormData(document.getElementById('rsvp-form'));
    
    formObject = {};
    formData.forEach(function(value, key){
      formObject[key] = value;
    });

    console.log(formObject);
    formComplete = validateFields(formObject);

    if (formComplete) {
      submitForm();
    } else {
      console.log("something wrong with form.")
    }


    if (checked) {
      formObject["attending"] = 'yes'
    } else {
      formObject["attending"] = 'no'
    }
    

    localStorage.setItem('formString', JSON.stringify(formObject));


    // console.log(formObject)
    if (validateFields()) {
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
      console.log("Sending to API...")
      fetch('/.netlify/functions/google-spreadsheet-fn', {
        method: 'POST',
        body: bodyData,
      })
        .then((res) => res.json());
        //.then(log)
        // .then(console.log(log))
        //.catch(error);
        showMessage();
    } else {
      console.log(formObject)
      const inputField = document.getElementById('emailAddress');
      inputField.addEventListener('click', (event) => {
        inputField.classList.remove('bg-error');
      });
    }
  });
    
  
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
