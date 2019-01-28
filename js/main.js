const $button = document.querySelector('#button');
const $resetButton = document.querySelector('#resetButton');
const $income = document.querySelector('#income');
const $output = document.querySelector('#output');
//input mask
var cleave = new Cleave('.income', {
  numeral: true,
  numeralThousandsGroupStyle: 'thousand'
});

//Calc Function
function titheCalc() {
  const tithePercent = 0.10;
  let value = $income.value.replace(/,/g, '')
  let roundNumber = Number(value)
  //$output.innerHTML = (roundNumber * tithePercent);
  let titheTotal = roundNumber * tithePercent
  $output.innerHTML = (titheTotal.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
};
// Reset Function
function resetInput() {
  $income.value = '';
  $output.innerHTML = ('')
};

// Fetch Bible API

async function getBible(book, chapter, verse) {
  const uri = `https://try.readme.io/https://api.scripture.api.bible/v1/bibles/de4e12af7f28f599-01/passages/${book}.${chapter}.${verse}?content-type=json`
  let h = new Headers();
  h.append('accept', 'application/json')
  h.append('api-key', 'ca2b23cb70ae4f58b953aa799df78b3d')
  h.append('content-type', 'application/json')

  let req = new Request(uri, {
    method: 'GET',
    headers: h,
    mode: 'cors',
    referrer: 'https://docs.api.bible/v1.0/reference',
    referrerPolicy: "no-referrer-when-downgrade",
    body: null
  })
  var verse
  await fetch(req)
    .then( (response) => {
      if(response.ok){
        return response.json()
      }
      else{
        throw new Error('BAD HTTP Stuff')
      }
    })
    .then( (jsonData) => {
      console.log(jsonData.data.content)
      let content = jsonData.data.content
      return content[0].items
    })
    .catch( (err) => {
      console.log('ERROR', err.message);
    })
}

const verseData = getBible('GEN', 1, 1)

//Button take input value
$button.addEventListener('click', titheCalc)
//reset button
$resetButton.addEventListener('click', resetInput)