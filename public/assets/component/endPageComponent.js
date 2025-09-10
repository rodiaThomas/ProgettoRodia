export const createEndPage = (parentElement) => {
  return {
    build: () => {},

    render: () => {
      
          let html = `
            <div style="background-color: black;" class="container-fluid">
  <div class="row">
             <div class="row"></div>
                <div class="col">
         <div class="row">
           <div class="col">
             <p style="color: white"></p>
           </div>
           <div class="col">
             <p style="color: white"></p>
           </div>
           <div class="col"></div>
         </div>
         <div class="row">
           <div class="col">
             <p style="color: white">Creato da:</p>
           </div>
           <div class="col">
             <p style="color: white">Thomas Rodia </p>
           </div>
           
         </div>
         <div class="row">
           <div class="col">
             <p style="color: white">Iniziato il: </p>
           </div>
           <div class="col">
             <p style="color: white">7/9/2025</p>
           </div>
           
         </div>
         <div class="row">
           <div class="col">
             <p style="color: white">Ultimo aggiornamento il: </p>
           </div>
           <div class="col">
             <p style="color: white">7/9/2025</p>
           </div>
          
         </div>
         <div class="row">
            <div class="col">
              <p style="color: white">Documentazione </p>
            </div>
            <div class="col">
              <p style="color: white"><a href="../documentation/doc/indexDocum.html">Link alla documentazone</a></p>
            </div>
           
          </div>
         <div class="row">
           <div class="col">
             <p style="color: white">© 2025 TestRodia </p>
           </div>
         </div>

              </div>
              <div class="col" >
              <div class="row"><p style="color: white"></p></div>
               <div class="card text-bg-dark mb-3" style="max-width: 540px;">
           <div class="row g-0">
             <div class="col-md-4">
               <img src="./assets/immages/git.png" class="img-fluid rounded-start" alt="...">
             </div>
             <div class="col-md-8">
               <div class="card-body">
                 <h5 class="card-title">Repository GitHub</h5>
                 <p class="card-text">Questo progetto è stato sviluppato utilizzando un repository Git Hub pubblico a cui potrai accede</p>
                 <a href="https://github.com/rodiaThomas/ProgettoRodia" ><button class="btn btn-light" >Vai alla repository</button></a>
               </div>
             </div>
           </div>
         </div>
         </div>
            </div>
            </div>
          `;

          parentElement.innerHTML = html;
    
    }
  };
};
