// Form Page


// const { data } = require("autoprefixer");
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function removeActiveLen() {
  const len1 = document.getElementById('length-35');
  const len2 = document.getElementById('length-50');
  const len3 = document.getElementById('length-70');
  const len4 = document.getElementById('length-100');
  allLenRadios = [len1,len2,len3,len4];
  allLenRadios.forEach(toggle);
}

// Update Picture and select length
var imageURL = 'img/1x5T.jpg';
var imageTITLE = '1x5T';
var ReplacementLength = '70';
function len35(event) {
  event.preventDefault();
  document.getElementById('layout').setAttribute('src', 'img/1x4.jpg');
  document.getElementById('layout-name').innerText = '1x4';
  imageURL = 'img/1x4.jpg';
  imageTITLE = '1x4';
  ReplacementLength = '50';
  document.getElementById('entrance-length-35').click();
  removeActiveLen();
  document.getElementById('length-35').classList.add('bg-fodsYellow');
}
function len50(event) {
  event.preventDefault();
  document.getElementById('layout').setAttribute('src', 'img/1x5T.jpg');
  document.getElementById('layout-name').innerText = '1x5T';
  document.getElementById('entrance-length-50').click();
  imageURL = 'img/1x5T.jpg';
  imageTITLE = '1x5T';
  ReplacementLength = '70';
  removeActiveLen();
  document.getElementById('length-50').classList.add('bg-fodsYellow');
}
function len70(event) {
  event.preventDefault();
  document.getElementById('layout').setAttribute('src', 'img/1x5T.jpg');
  document.getElementById('layout-name').innerText = '1x5T';
  imageURL = 'img/1x5T.jpg';
  imageTITLE = '1x5T';
  ReplacementLength = '70'
  document.getElementById('entrance-length-70').click();
  removeActiveLen();
  document.getElementById('length-70').classList.add('bg-fodsYellow');
}
function len100(event) {
  event.preventDefault();
  document.getElementById('layout').setAttribute('src', 'img/1x7T.jpg');
  document.getElementById('layout-name').innerText = '1x7T';
  imageURL = 'img/1x7T.jpg';
  imageTITLE = '1x7T';
  ReplacementLength = '100';
  document.getElementById('entrance-length-100').click();
  removeActiveLen()
  document.getElementById('length-100').classList.add('bg-fodsYellow');
}

function toggle(item, index) {
  if (item.classList.contains("bg-fodsYellow")) {
    item.classList.remove("bg-fodsYellow")
  }
  if (item.classList.contains("active")) {
    item.classList.remove("active")
  }
}

function removeActiveFreq() {
  const freq1 = document.getElementById('freq-Weekly');
  const freq2 = document.getElementById('freq-BiMonthly');
  const freq3 = document.getElementById('freq-Monthly');
  const freq4 = document.getElementById('freq-Quarterly');
  allFreqRadios = [freq1,freq2,freq3,freq4];
  allFreqRadios.forEach(toggle);
}

function freqWeekly(event) {
  event.preventDefault();
  document.getElementById('refresh-frequency-weekly').click();
  removeActiveFreq();
  document.getElementById('freq-Weekly').classList.add('bg-fodsYellow');
}
function freqBiMonthly(event) {
  event.preventDefault();
  document.getElementById('refresh-frequency-bimonthly').click();
  removeActiveFreq();
  document.getElementById('freq-BiMonthly').classList.add('bg-fodsYellow');
}
function freqMonthly(event) {
  event.preventDefault();
  document.getElementById('refresh-frequency-monthly').click();
  removeActiveFreq();
  document.getElementById('freq-Monthly').classList.add('bg-fodsYellow');
}
function freqQuarterly(event) {
  event.preventDefault();
  document.getElementById('refresh-frequency-quarterly').click();
  removeActiveFreq();
  document.getElementById('freq-Quarterly').classList.add('bg-fodsYellow');
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validateEmailSimple(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
  }


function showEmailConfirm(email) {
  const emailConfirm = document.getElementById('email-confirm');
  emailConfirm.innerText = ('Sending email to ' + email);
  const emailToggle = document.getElementById('email-confirm-toggle');
  emailToggle.classList.remove('hidden');

}
function hideEmailConfirm() {
  const emailToggle = document.getElementById('email-confirm-toggle');
  emailToggle.classList.add('hidden');
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

// Start Get Prev
function loadPrev() {
    // console.log('calling getPrev')
    getPrev().then((res) => {
      // console.log('calling calculate')
      calculate(id, false, res)
    })
}


window.onload = function() {

  var id = new URLSearchParams(window.location.search).get('id');
  // If looking at previous calculation
  if (id) {
  // Get previous calculation
  // console.log('calling loadPrev')
    loadPrev()
  }


  
  window.addEventListener('keydown',function(e){
    if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){
      if(e.target.nodeName=='INPUT'&&e.target.type=='text'){
        e.preventDefault();
            const formFields = document.getElementById('form-submit-btn');
            formFields.click();
            return false;
      }
    }
  },true);
  


  const clearButton = document.getElementById('clear-results');
  clearButton.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.setItem('formString', '');
    hideEmailConfirm();
    clearForm();
  });

  const sendBtn = document.getElementById('sendBtn');
  sendBtn.addEventListener('click', (event) => {
    event.preventDefault();
    sendEmail();
  });

  const formFields = document.getElementById('form-submit-btn');
  formFields.addEventListener('click', (event) => {
    event.preventDefault();
    guid = uuidv4();
    const inputField = document.getElementById('emailAddress');
    inputField.classList.remove('bg-error');
    var formData = new FormData(document.getElementById('calculator-form'));
    
    var formObject = {};
    formData.forEach(function(value, key){
      formObject[key] = value;
    });

    localStorage.setItem('formString', JSON.stringify(formObject));


    // console.log(formObject)
    if (formObject.hp_emailaddress == 'dschrute@dundermifflin.com') {
      if (validateEmail(formObject.email_address)) {
        //console.log(formObject.email_address)
        
      
        // Add calculation to sheet
        fetch('/.netlify/functions/google-spreadsheet-fn', {
          method: 'POST',
          body: JSON.stringify({
            "GUID": guid,
            "Entrance Length": formObject["entrance_length"],
            "Installation Cost": formObject["installation_cost"],
            "Refresh Cost": formObject["refresh_cost"],
            "Refresh Frequency": formObject["refresh_frequency"],
            "Remediation Cost": formObject["remediation_cost"],
            "Removal Cost": formObject["removal_cost"],
            "Project Length": formObject["project_length"],
            "Email": formObject["email_address"]
          })
        })
          .then((res) => res.json());
          //.then(log)
          // .then(console.log(log))
          //.catch(error);
        
        // Update Results Page
        calculate(guid, true);
      } else {
        const inputField = document.getElementById('emailAddress');
        inputField.classList.add('bg-error');
        inputField.addEventListener('click', (event) => {
          inputField.classList.remove('bg-error');
        });
      }
    } else {
      window.open("./formsubmit.php")
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

function goToResults() {
  const formView = document.getElementById('calculator-form');
  const resultsView = document.getElementById('results');
  if (formView.classList.contains("visible")) {
    formView.classList.remove("visible");
    formView.classList.add("hidden");
  }
  if (resultsView.classList.contains("hidden")) {
    resultsView.classList.remove("hidden");
    resultsView.classList.add("visible");
  }

}
function goToCalculator() {
  const formView = document.getElementById('calculator-form');
  const resultsView = document.getElementById('results');
  if (resultsView.classList.contains("visible")) {
    resultsView.classList.remove("visible");
    resultsView.classList.add("hidden");
  }
  if (formView.classList.contains("hidden")) {
    formView.classList.remove("hidden");
    formView.classList.add("visible");
  }
}
function clearForm() {
  localStorage.setItem('formString', '');
  pushState({}, 'Back to Calculator', '/');
  goToCalculator();
  
}
function updateTables(calculatedData) {
  var dollar = Intl.NumberFormat('en-US');
  document.getElementById('roi').innerText = calculatedData.roi;
  document.getElementById('savings-yr3').innerText = '$' + dollar.format(calculatedData.savings3yr);
  document.getElementById('savings-yr5').innerText = '$' + dollar.format(calculatedData.savings5yr);
  document.getElementById('savings-yr10').innerText = '$' + dollar.format(calculatedData.savings10yr);

  document.getElementById('savings-1-3yr').innerText = '$' + dollar.format(calculatedData.savings_1_3yr);
  document.getElementById('savings-1-5yr').innerText = '$' + dollar.format(calculatedData.savings_1_5yr);
  document.getElementById('savings-1-10yr').innerText = '$' + dollar.format(calculatedData.savings_1_10yr);
  document.getElementById('savings-3-3yr').innerText = '$' + dollar.format(calculatedData.savings_3_3yr);
  document.getElementById('savings-3-5yr').innerText = '$' + dollar.format(calculatedData.savings_3_5yr);
  document.getElementById('savings-3-10yr').innerText = '$' + dollar.format(calculatedData.savings_3_10yr);
  document.getElementById('savings-5-3yr').innerText = '$' + dollar.format(calculatedData.savings_5_3yr);
  document.getElementById('savings-5-5yr').innerText = '$' + dollar.format(calculatedData.savings_5_5yr);
  document.getElementById('savings-5-10yr').innerText = '$' + dollar.format(calculatedData.savings_5_10yr);
  document.getElementById('savings-10-3yr').innerText = '$' + dollar.format(calculatedData.savings_10_3yr);
  document.getElementById('savings-10-5yr').innerText = '$' + dollar.format(calculatedData.savings_10_5yr);
  document.getElementById('savings-10-10yr').innerText = '$' + dollar.format(calculatedData.savings_10_10yr);
}

function calculate(guid, isNew, prevData={}) {
  var refresh_frequency = 2;
  var fodsCost;
  var imgURL;

  // console.log('Calculating')
  goToResults();
  pushState({}, 'Calculation Results', `./?id=${guid}`);
  if (isNew == true) {
    var data = getData();
    // console.log('new Data')
  } else {
    // console.log('prev Data')
    var data = {
      'entrance_length': prevData["Entrance Length"],
      'installation_cost': prevData["Installation Cost"],
      'project_length': prevData["Project Length"],
      'refresh_cost': prevData["Refresh Cost"],
      'refresh_frequency': prevData["Refresh Frequency"],
      'remediation_cost': prevData["Remediation Cost"],
      'removal_cost': prevData["Removal Cost"],
      'entrance_length': prevData['Entrance Length'],
    }
  }



  switch (data.entrance_length) {
    case '35':
      fodsCost = 10400;
      imageTITLE = '1x4';
      imageURL = 'img/1x4.jpg';
      ReplacementLength = '50';
      break
    case '50':
      fodsCost = 15600;
      imageURL = '1x5T';
      imageURL = 'img/1x4.jpg';
      ReplacementLength = '70';
      break
    case '70':
      fodsCost = 15600;
      imageURL = '1x5T';
      imageURL = 'img/1x4.jpg';
      ReplacementLength = '70';
      break
    case '100':
      fodsCost = 20800; 
      imageURL = '1x7T';
      imageURL = 'img/1x4.jpg';
      ReplacementLength = '100';
      break
  }

  switch (data.refresh_frequency) {
    case 'weekly':
      refresh_frequency = 4;
      break
    case 'bimonthly':
      refresh_frequency = 2;
      break
    case 'monthly':
      refresh_frequency = 1;
      break
    case 'quarterly':
      refresh_frequency = (1/3);
      break
  }

  
  
  var totalRefreshCost = data.refresh_cost * refresh_frequency * data.project_length;
  
  //console.log('data.entrance_length: ' + data.entrance_length);
  //console.log("data.installation_cost: " + data.installation_cost);
  //console.log("data.refresh_frequency: " + data.refresh_frequency);
  //console.log("refresh_frequency: " + refresh_frequency);
  //console.log("data.refresh_cost: " + data.refresh_cost);
  //console.log("data.removal_cost: " + data.removal_cost);
  //console.log("data.remediation_cost: " + data.remediation_cost);
  //console.log("data.project_length: " + data.project_length);
  
  //console.log("totalRefreshCost: " + totalRefreshCost);
  var rockCost = parseInt(data.installation_cost) + parseInt(data.removal_cost) + parseInt(data.remediation_cost) + parseFloat(totalRefreshCost);
  // console.log("rockCost: " + rockCost);
  if (data.project_length > 0) {
    var monthlyRockCost = rockCost/data.project_length;
  } else {
    var monthlyRockCost = rockCost
  }
  
  //console.log("monthlyRockCost: " + monthlyRockCost);
  //console.log("fodsCost: " + fodsCost);
  var fodsROI = fodsCost/monthlyRockCost;
  //console.log("roi: " + Math.round(fodsROI));

  // Update Results View
  var moveCost = (parseInt(data.installation_cost) + parseInt(data.removal_cost) + parseInt(data.remediation_cost));
  var annualRockCost = monthlyRockCost * 12;
  var savings3yr = (annualRockCost * 3) - fodsCost;
  var savings5yr = (annualRockCost * 5) - fodsCost;
  var savings10yr = (annualRockCost * 10) - fodsCost;
  var savings_1_3yr = (( 3 ) * (parseInt(moveCost)) + (parseInt(annualRockCost * 3)) - parseInt(fodsCost));
  var savings_1_5yr = (( 5 ) * (parseInt(moveCost)) + ((annualRockCost * 5) - fodsCost));
  var savings_1_10yr = (( 10 ) * (parseInt(moveCost)) + ((annualRockCost * 10) - fodsCost));
  var savings_3_3yr = (( 9 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_3_5yr = (( 15 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_3_10yr = (( 30 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_5_3yr = (( 15 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_5_5yr = (( 25 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_5_10yr = (( 50 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_10_3yr = (( 30 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_10_5yr = (( 50 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));
  var savings_10_10yr = (( 100 ) * (parseInt(moveCost)) + ((annualRockCost * 3) - fodsCost));




  

  var calculatedData = {
    'imageURL': imageURL,
    'imageTITLE': imageTITLE,
    'ReplacementLength': ReplacementLength,
    'email_address': data.email_address,
    'roi': Math.round(fodsROI),
    'savings3yr': savings3yr,
    'savings5yr': savings5yr,
    'savings10yr': savings10yr,
    'savings_1_3yr': savings_1_3yr,
    'savings_1_5yr': savings_1_5yr,
    'savings_1_10yr': savings_1_10yr,
    'savings_3_3yr': savings_3_3yr,
    'savings_3_5yr': savings_3_5yr,
    'savings_3_10yr': savings_3_10yr,
    'savings_5_3yr': savings_5_3yr,
    'savings_5_5yr': savings_5_5yr,
    'savings_5_10yr': savings_5_10yr,
    'savings_10_3yr': savings_10_3yr,
    'savings_10_5yr': savings_10_5yr,
    'savings_10_10yr': savings_10_10yr
  }
  //console.log("printing calculatedData variable")
  //console.log(calculatedData)
  // Update Fields
  updateTables(calculatedData);
  localStorage.setItem('lastCalculation', JSON.stringify(calculatedData));

}

// Send Email
function sendEmail() {
  calcDataString = localStorage.getItem("lastCalculation");
  //console.log(calcDataString)
  var data = JSON.parse(calcDataString)
  fetch('/.netlify/functions/ses-send-fn', {
    method: 'POST',
    body: calcDataString
  })
      .then((res) => res.json());
      //.then(log)
      // .then(console.log(log))
      //.catch(error);
  showEmailConfirm(data.email_address);
}

