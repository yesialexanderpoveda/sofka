// RENDERIZANDO EL METODO GET

var elements;

document.querySelector('.easier').addEventListener('click', async (e) => {

  console.log(e, 'hicimos click');

  allData = elements.split('.').map((ele, index) => {

    if (index !== 5) {

      if (index < 1) {
        element = ele.split(',')
        document.querySelector('.ask').innerHTML += `
      <div class="test">
      <div> 
      <h4>¿${element[1]}?</h4>
      <ul>
      <li><input type="radio" name="${index}" value="1" /> ${element[2]}</li>
      <li><input type="radio" name="${index}" value="2" /> ${element[3]}</li>
      <li><input type="radio" name="${index}" value="3" /> ${element[4]}</li>
      <li><input type="radio" name="${index}" value="4" /> ${element[5]}</li>
      <li><input type="radio" name="${index}" value="5" /> ${element[6]}</li>
     
      </ul>
      </div> 
      </div>    
       
       `

      } else {
        element = ele.split(',')

        document.querySelector('.ask').innerHTML += `
   
     <div class="test">
   <div> 
   <h4>¿${element[2]}?</h4>
   <ul>
   <li><input type="radio" name="${index}" value="1" /> ${element[3]}</li>
   <li><input type="radio" name="${index}" value="2" /> ${element[4]}</li>
   <li><input type="radio" name="${index}" value="3" /> ${element[5]}</li>
   <li><input type="radio" name="${index}" value="4" /> ${element[6]}</li>
   <li><input type="radio" name="${index}" value="5" /> ${element[7]}</li>
  
   </ul>
   </div> 
   </div> 
     
    `

        if (index == 4) {

          document.querySelector('.ask').innerHTML += `
      
      <button class="validate" style="margin: 10px;">VALIDAR</button>
      `
        }

      }
    }
   
    
  });

  // VALIDATE DATA

  let valueData = document.querySelector('.validate')
  
  if(valueData){

    let cont = 1;

    valueData.addEventListener('click', (e)=>{

      let radios = document.getElementsByTagName('input');
  
      for (let i = 0; i < radios.length; i++) {
          if (radios[i].type === 'radio' && radios[i].checked) {

              // get value, set checked flag or do whatever you need to
              if (radios[i].value == 5) console.log(cont++)     
          
            }
      }
      
      
      if(cont > 3){
        postData()
         console.log('pasaste a otro nivel');
        }
    })

  
  
  }


})


//METOD GET

async function getData() {
  const condition = true;
  if (condition) {
    await fetch(`http://localhost:3000/game`)
      .then(response => response.json())
      .then(data => {
        // Aquí es donde el array elements
        elements = data;
      });
  } else {
    elements.push(0);
  }

}
getData()



//METODO POST

async function postData(){

  //ElEMENT OF dashboard.js

  
   let idcategory = document.querySelector(".alias").textContent

   data ={
     idcategory: `${idcategory}` 
   }

  
  const condition = true;

  if(condition){
 await fetch(`http://localhost:3000/update`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }) 

  }else{

   

  }
  
}
