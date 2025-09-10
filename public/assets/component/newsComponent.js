
export const createNews = (parentElement) => {
  
  const slugify = (text) =>
    text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");

  
  const showPageFromHash = () => {
    const hash = (location.hash || "#pagina1").substring(1); 
    
    document.querySelectorAll(".page").forEach((p) => (p.style.display = "none"));

    const target = document.getElementById(hash);
    if (target) {
      target.style.display = "block";
      
      try { target.scrollIntoView({ behavior: "smooth", block: "start" }); } catch (e) {}
    } else {
      
      const home = document.getElementById("pagina1");
      if (home) home.style.display = "block";
    }
  };


  if (!window.__showPageFromHashRegistered) {
    window.__showPageFromHash = showPageFromHash;
    window.addEventListener("hashchange", showPageFromHash);
    window.__showPageFromHashRegistered = true;
  } else {
    
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

            
            html += `
              <div class="row mb-2">
                <a href="#${pageId}" class="text-white text-decoration-none"><button type="button" class="btn btn-dark">
                  ${news.title}
                </button></a>
              </div>
            `;

            
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
              const container = document.getElementById("container");
if (container) {
  container.insertAdjacentHTML("beforeend", pageHtml);
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

          
          window.__showPageFromHash && window.__showPageFromHash();
        })
        .catch((err) => console.error("Errore fetch:", err));
    },
  };
};
