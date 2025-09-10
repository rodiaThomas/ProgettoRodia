export const createCarusel = (parentElement) => {
  return {
    build: () => {},
    render: () => {
      fetch("/site/carusel")
        .then(r => r.json())
        .then(json => {
          const origImgs = Array.isArray(json.immages) ? json.immages.slice() : [];

          if (origImgs.length === 0) {
            parentElement.innerHTML = "<p>Nessuna immagine disponibile</p>";
            return;
          }

  
          const visible = 3;

          
          let imgs = origImgs.slice();
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
              /* wrapper full-viewport (esce dal container) */
              #${id} {
                width: 100vw;
                margin-left: calc(50% - 50vw);
                margin-right: calc(50% - 50vw);
                overflow: hidden;
                position: relative;
                --gap: 16px; /* gap tra le slide, modificabile */
                box-sizing: border-box;
                user-select: none;
              }

              #${id} .cc-track {
                display: flex;
                gap: var(--gap);
                padding: 0;
                box-sizing: border-box;
                align-items: center;
                transition: transform 600ms ease;
                will-change: transform;
              }

              #${id} .cc-slide {
                flex: 0 0 auto; /* larghezza fissata via JS */
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
              }

              #${id} .cc-inner {
                width: 100%;
                border-radius: 12px;
                overflow: hidden;
                background: #f5f5f5;
                display: flex;
                justify-content: center;
                align-items: center;
                aspect-ratio: 16 / 9; /* regola l'altezza; puoi cambiare */
              }

              #${id} img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
              }

              /* mobile (opzionale): se vuoi 1 immagine su schermi piccoli, commenta/disattiva
                 oppure gestiscilo lato JS per ricostruire con visible diverso */
              @media (max-width: 520px) {
                #${id} { --gap: 8px; }
              }
            </style>
          `;

          parentElement.innerHTML = html;

          
          const wrapper = parentElement.querySelector(`#${id}`);
          const track = wrapper.querySelector(".cc-track");

          
          const origSlides = Array.from(track.children);
          const originalsCount = origSlides.length; 

         
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

          let currentIndex = visible; 
          let slideAdvance = 0; 
          const gapPx = parseFloat(getComputedStyle(track).gap) || 16;

          
          const computeSizes = () => {
            const containerWidth = wrapper.clientWidth; 
           
            const available = containerWidth - gapPx * (visible - 1);
            const slideWidth = available / visible;
            Array.from(track.children).forEach(slide => {
              slide.style.width = `${slideWidth}px`;
            });
            slideAdvance = slideWidth + gapPx;
           
            track.style.transition = "none";
            track.style.transform = `translateX(-${currentIndex * slideAdvance}px)`;
           
            void track.offsetWidth;
            track.style.transition = "transform 600ms ease";
          };

          
          computeSizes();

          
          window.addEventListener("resize", () => {
            computeSizes();
          });

          
          track.style.transform = `translateX(-${currentIndex * slideAdvance}px)`;

         
          const intervalMs = 2500;
          const timer = setInterval(() => {
            currentIndex++;
            track.style.transform = `translateX(-${currentIndex * slideAdvance}px)`;
          }, intervalMs);

         
          track.addEventListener("transitionend", () => {
           
            if (currentIndex >= visible + originalsCount) {
              track.style.transition = "none";
              currentIndex = visible;
              track.style.transform = `translateX(-${currentIndex * slideAdvance}px)`;
              void track.offsetWidth; 
              track.style.transition = "transform 600ms ease";
            }
           
            if (currentIndex < visible) {
              track.style.transition = "none";
              currentIndex = visible + originalsCount - 1;
              track.style.transform = `translateX(-${currentIndex * slideAdvance}px)`;
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
