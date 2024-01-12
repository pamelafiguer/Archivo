const getResultados = async() => {
    const id = new URLSearchParams( window.location.search ).get('id')
    const ubigeos = id.split('/')
    
    const bNacional = ubigeos[0] == 'Nacional'

    const data = await fetch(`https://oaemdl.es/onpe_sweb_php/participacion/${id}`)
    if (data.status == 200) {
        const data_resultados = await data.json()

        let totales = document.getElementById('participacion_totales')

       let aAmbito = [ [ "Departamento", "Provincia", "Distrito"], ["Continente", "Pais", "Ciudad"] ]
       let ambito = `Ámbito: ${ubigeos[0]}`
       if ( ubigeos.length > 1 ) ambito += `<br/>${aAmbito[ bNacional ? 0 : 1  ][0]} : ${ubigeos[1]}`
       if ( ubigeos.length > 2 ) ambito += `<br/>${aAmbito[ bNacional ? 0 : 1  ][1]} : ${ubigeos[2]}`
       if ( ubigeos.length > 3 ) ambito += `<br/>${aAmbito[ bNacional ? 0 : 1  ][2]} : ${ubigeos[3]}`
       document.getElementById('ambito').innerHTML = ambito

       if ( ubigeos.length > 3 ) {
        data_resultados = []
        document.getElementById('detallado').innerHTML = ""
        return
       }
    

    let resultados = `
          <tr class="titulo_tabla">
            <td>${ aAmbito[ bNacional ? 0 : 1 ][ubigeos.length - 1].toUpperCase() }</td>
            <td>TOTAL ASISTENTES</td>
            <td>% TOTAL ASISTENTES</td>
            <td>TOTAL AUSENTES</td>
            <td>% TOTAL AUSENTES</td>
            <td>ELECTORES HÁBILES</td>
          </tr>
        `
    data_resultados.forEach(data_row => {
       resultados += `
       <tr onclick="location.href='./participacion_total.html?id=${id}/${data_row.DPD}'
       "onmouseover="this.style.cursor ="pointer"; this.style.color = "grey" 
       "onmouseout="this.style.color = "black", style="cursor: pointer; color: black;">
   
      <td>${data_row.DPD}</td>
      <td>${data_row.TV}</td>
      <td>${data_row.PTV}</td>
      <td>${data_row.TA}</td>
      <td>${data_row.PTA}</td>
      <td>${data_row.EH}</td>
     </tr>
     `
    });
    resultados += `
           <tr>
           <td>TOTALES</td>
            <td>17,953,367</td>
             <td>81.543%</td>
             <td>4,063,663</td>
             <td>18.457%</td>
             <td>22,017,030</td>
          </tr>

       ` 
      document.getElementById('resultados').innerHTML = resultados


    }
    
}

getResultados()
