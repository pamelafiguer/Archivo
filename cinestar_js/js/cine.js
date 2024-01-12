
const getCine = async() => {
    const id = new URLSearchParams( window.location.search ).get('id')

    const data1 = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`);
    const data2 = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/tarifas`);
    const data3 = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/peliculas`)

    if( data1.status == 200) {
        const cine = await data1.json()
        let htmlCine = `
        <h2>${cine.RazonSocial}</h2>
        
        <div class="cine-info">
          <div class="cine-info datos">
             <p>${cine.Direccion} - ${cine.Detalle}</p>
             <p>Teléfono: ${cine.Telefonos} anexo 865</p>
             <br/>
            </div>
        </div>`
    
        document.getElementById('contenido-interno').innerHTML = htmlCine

        if ( data2.status == 200 ) {
            const tarifas = await data2.json()
            let htmlTarifa = ` <div class="cine-info">
            <div class="tabla">`
            tarifas.forEach(tarifa => {
                htmlTarifa += 
                `
                  
                           <div class="fila">
								<div class="celda-titulo">${tarifa.DiasSemana}</div>
                                
								<div class="celda">${tarifa.Precio}</div>
                             <div class="fila-par">
							</div>
						</div> `
            });
            htmlTarifa += `
            <div class="aviso">
							<p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
						</div>
					</div>
					<img src="img/cine/${cine.id}.2.jpg"/>
                    `
            document.getElementById('contenido-interno').innerHTML += htmlTarifa

            if ( data3.status == 200 ) {
                const Horario = await data3.json()
                let htmlHorario = `  <div class="cine-info peliculas">
                <div class="tabla">
                    <div class="fila-a">
                        <div class="celda-cabecera">Películas</div>
                        <div class="celda-cabecera">Horarios</div>
                    </div>`
                Horario.forEach(hora => {
                    htmlHorario += 
                    `
                    <div class="fila-impar">
                            <div class="celda-titulo">${hora.Titulo}</div>
                            <div class="celda">${hora.Horarios}</div>
                            <div class="fila-impar">
                            </div> 
                        </div>`
                });
                htmlHorario += `
                
                <br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
                <img style="float:left;margin-top:-4%" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
					<span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
						Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
						<br/><br/>
						Visitános y diviértete con nosotros. 
						<br/><br/>
						<b>CINESTAR</b>, siempre pensando en tí. 
                        
					</span>
                    
                    `
                document.getElementById('contenido-interno').innerHTML += htmlHorario
            }
        }       
   }
}

getCine()

            
