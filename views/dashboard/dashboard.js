var elements;

async function sendData() {
  const condition = true;
  if (condition) {
    await fetch(`http://localhost:3000/user`)
      .then(response => response.json())
      .then(data => {
        // Aquí es donde el array elements
        elements = data;
      
      });
  } else {
    elements.push(0);
  }
    const user = elements.split(',')
  
    document.querySelector('.user').innerHTML = `
                 
    <h4>Alias: ${user[2]}</h4>
    <h4>Nivel de Juego: ${user[1]}</h4>
    <h4>Puntos: <strong class="alias">${user[0]}</strong></h4>
    

    `
}
sendData()
 




