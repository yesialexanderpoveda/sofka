function enviadodato() {
  const condition = true;
  const elements = [];

  if (condition) {
    fetch(`http://localhost:3000/user`)
      .then(response => response.json())
      .then(data => {
        // Aquí es donde el array elements
        // Está procesado
        elements.push(data)
        console.log(data);
      });
  } else {
    elements.push(0);
  }

  // Se ejecuta inmediatamente
  console.log(elements);
}
enviadodato()