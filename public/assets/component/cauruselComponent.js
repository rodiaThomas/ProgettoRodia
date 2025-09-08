/*export const createCarusel = (parentElement) => {
  return {
    build: () => {},

    render: () => {
      fetch("/site/carusel")
        .then(response => response.json())
        .then(json => {
          let html = `
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">`;
            console.info(json.immages)
            for(let i=0;i<json.immages.length;i++){
                if(i===0){
                    html+=`
            <div class="carousel-item active">
            <img src="../assets/immages/${json.immages[i]}" class="d-block w-50" alt="...">
            </div>`;
                }else{
                      html+=`
            <div class="carousel-item ">
            <img src="../assets/immages/${json.immages[i]}" class="d-block w-50" alt="...">
            </div>`;
                }
            }
            html+=`
        </div>
        </div>
          `;

          parentElement.innerHTML = html;
        })
        .catch(err => console.error("Errore fetch:", err));
    }
  };
};
*/export const createCarusel = (parentElement) => {
  return {
    build: () => {},
    render: () => {
      fetch("/site/carusel")
        .then(r => r.json())
        .then(json => {
          let imgs = Array.isArray(json.immages) ? json.immages.slice() : [];

          const visible = 3; // quante immagini visibili
          if (imgs.length === 0) {
            parentElement.innerHTML = "<p>Nessuna immagine disponibile</p>";
            return;
          }
          while (imgs.length < visible) {
            imgs = imgs.concat(imgs.slice(0, visible - imgs.length));
          }

          const id = "customCarousel";
          let html = `
            <div id="${id}" class="cc-wrapper">
              <div class="cc-track">`;

          imgs.forEach(src => {
            html += `
              <div class="cc-slide">
                <div class="cc-inner">
                  <img src="../assets/immages/${src}" alt="">
                </div>
              </div>`;
          });

          html += `
              </div>
            </div>

            <style>
              #${id} {
                width: 100%;
                overflow: hidden;
                position: relative;
                --visible: ${visible};
                --gap: 16px; /* spazio tra immagini */
              }

              #${id} .cc-track {
                display: flex;
                transition: transform 600ms ease;
                will-change: transform;
                gap: var(--gap);              /* spazio uniforme */
                padding: 0 var(--gap);        /* compensazione ai bordi */
                box-sizing: border-box;
              }

              #${id} .cc-slide {
                flex: 0 0 calc((100% - (var(--gap) * (var(--visible) - 1))) / var(--visible));
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
              }

              #${id} .cc-inner {
                width: 100%;
                border-radius: 12px;  /* curvatura bordi */
                overflow: hidden;
                background: #f5f5f5;  /* sfondo neutro */
                display: flex;
                justify-content: center;
                align-items: center;
              }

              #${id} img {
                width: 100%;
                height: auto;
                object-fit: contain; /* adatta senza tagliare */
              }

              @media (max-width: 768px) {
                #${id} { --visible: 1; }
              }
            </style>
          `;

          parentElement.innerHTML = html;

          // --- logica autoplay ---
          const wrapper = parentElement.querySelector(`#${id}`);
          const track = wrapper.querySelector(".cc-track");

          const origSlides = Array.from(track.children);
          const clonesBefore = [];
          const clonesAfter = [];
          for (let i = 0; i < visible; i++) {
            const beforeClone = origSlides[origSlides.length - visible + i].cloneNode(true);
            clonesBefore.push(beforeClone);
            const afterClone = origSlides[i].cloneNode(true);
            clonesAfter.push(afterClone);
          }
          clonesBefore.forEach(n => track.insertBefore(n, track.firstChild));
          clonesAfter.forEach(n => track.appendChild(n));

          const totalSlides = track.children.length;
          const originalsCount = origSlides.length;

          let currentIndex = visible;
          const getTranslatePct = (index) => (index * 100) / totalSlides;

          track.style.transition = "none";
          track.style.transform = `translateX(-${getTranslatePct(currentIndex)}%)`;
          void track.offsetWidth;
          track.style.transition = "transform 600ms ease";

          const intervalMs = 2500;
          setInterval(() => {
            currentIndex++;
            track.style.transform = `translateX(-${getTranslatePct(currentIndex)}%)`;
          }, intervalMs);

          track.addEventListener("transitionend", () => {
            if (currentIndex >= visible + originalsCount) {
              track.style.transition = "none";
              currentIndex = visible;
              track.style.transform = `translateX(-${getTranslatePct(currentIndex)}%)`;
              void track.offsetWidth;
              track.style.transition = "transform 600ms ease";
            }
            if (currentIndex < visible) {
              track.style.transition = "none";
              currentIndex = visible + originalsCount - 1;
              track.style.transform = `translateX(-${getTranslatePct(currentIndex)}%)`;
              void track.offsetWidth;
              track.style.transition = "transform 600ms ease";
            }
          });
        })
        .catch(err => {
          console.error("Errore fetch:", err);
          parentElement.innerHTML = "<p>Errore nel caricamento del carosello</p>";
        });
    }
  };
};
