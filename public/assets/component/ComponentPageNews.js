export const createInformation = (parentElement) => {
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
    const hash = (location.hash || "").substring(1); 
    document.querySelectorAll(".page").forEach((p) => (p.style.display = "none"));

    if (hash) {
      const target = document.getElementById(hash);
      if (target) {
        target.style.display = "block";
        try {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        } catch (e) {}
      }
    }
  };

  
  if (!window.__infoShowPageFromHashRegistered) {
    window.addEventListener("hashchange", showPageFromHash);
    window.__infoShowPageFromHashRegistered = true;
  }

  return {
    build: () => {},

    render: () => {
      fetch("/site/news")
        .then((response) => response.json())
        .then((json) => {
          let html = `<div class="news-list">`;

          json.forEach((news) => {
            const pageId = slugify(news.title);
           console.info()
           if(news.text.length<180){
            html += `
             <a href="#${pageId}" style="color: black; text-decoration: none;"> <div class="row mb-3">
                
                  <h1>${news.title}</h1>
                
                <h6>${news.Start || ""}</h6>
                <p>${news.text || ""}</p>
              </div></a>
              <hr>
            `;
            }else{
                let string_fin="";
                for(let i = 0 ; i< 180 ;i++){
                    string_fin+=news.text[i];
                }
                string_fin+=" ...";
                html += `
              <a href="#${pageId}" style="color: black; text-decoration: none;"> <div class="row mb-3">
               
                  <h1>${news.title}</h1>
                
                <h6>${news.Start || ""}</h6>
                <p>${string_fin || ""}</p>
              </div>
              </a>
              <hr>`;
            }
            
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
          });

          html += `</div>`;
          parentElement.innerHTML = html;

        
          showPageFromHash();
        })
        .catch((err) => console.error("Errore fetch:", err));
    },
  };
};
