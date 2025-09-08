// createNews.js (sostituisci il tuo createNews con questo)
export const createNews = (parentElement) => {
  // helper per creare slug sicuri (per id)
  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  // funzione che mostra la pagina corrispondente all'hash (o pagina1 di default)
  const showPageFromHash = () => {
    const hash = (location.hash || "#pagina1").substring(1); // "pagina1" se non c'è hash
    // nascondi tutte le pagine
    document.querySelectorAll(".page").forEach((p) => (p.style.display = "none"));

    const target = document.getElementById(hash);
    if (target) {
      target.style.display = "block";
      // scroll opzionale per portare la pagina in vista
      try { target.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
    } else {
      // fallback: mostra #pagina1 se esiste
      const home = document.getElementById("pagina1");
      if (home) home.style.display = "block";
    }
  };

  // espongo la funzione sul window in modo che sia riutilizzabile e controllo la registrazione dell'evento
  if (!window.__showPageFromHashRegistered) {
    window.__showPageFromHash = showPageFromHash;
    window.addEventListener("hashchange", showPageFromHash);
    window.__showPageFromHashRegistered = true;
  } else {
    // aggiorno il riferimento alla funzione nel caso venga ridefinita
    window.__showPageFromHash = showPageFromHash;
  }

  return {
    build: () => {},

    render: () => {
      fetch("/site/news")
        .then((response) => response.json())
        .then((json) => {
          console.info("Notizie ricevute:", json);

          let html = `<div>`;
          for (let i = 0; i < 5 && i < json.length; i++) {
            const news = json[i];
            const pageId = slugify(news.title);

            // Bottone che porta alla pagina (usa href="#pageId")
            html += `
              <div class="row mb-2">
                <a href="#${pageId}" class="text-white text-decoration-none"><button type="button" class="btn btn-dark">
                  ${news.title}
                </button></a>
              </div>
            `;

            // se la pagina non esiste già nel DOM, genero l'HTML e lo inserisco PRIMA di #endpage
            if (!document.getElementById(pageId)) {
              const pageHtml = `
                <div class="page" id="${pageId}" style="display:none;">
                  <div class="container mt-4">
                    <h2>${news.title}</h2>
                    <p><strong>Data:</strong> ${news.Start || "N/A"}</p>
                    <div class="news-content">
                      ${news.text || "<em>Contenuto non disponibile</em>"}
                    </div>
                    
                  </div>
                </div>
              `;
              const endpage = document.getElementById("endpage");
              if (endpage) {
                endpage.insertAdjacentHTML("beforebegin", pageHtml);
              } else {
                
                document.body.insertAdjacentHTML("beforeend", pageHtml);
              }
            }
          }
          html += `</div>`;

        
          parentElement.innerHTML = html;

         
          parentElement.querySelectorAll("a[href^='#']").forEach((link) => {
            link.addEventListener("click", (e) => {
           
            });
          });

          // importante: chiama subito la funzione per gestire l'hash corrente (se l'utente ha già un # nell'url)
          window.__showPageFromHash && window.__showPageFromHash();
        })
        .catch((err) => console.error("Errore fetch:", err));
    },
  };
};
