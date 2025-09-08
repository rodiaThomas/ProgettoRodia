/*import { createPage } from './createPageComponent.js';*/

export const createNavbar = (parentElement) => {
  return {
    build: () => {},

    render: () => {
      fetch("/site/navbar")
        .then(response => response.json())
        .then(menuItems => {
            
          let html = `
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
              <div class="container-fluid">
                <a class="navbar-brand" href="#pagina1">Home</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          `;

          menuItems.forEach(item => {
            if (item.titles && item.titles.length > 0) {
              // Dropdown
              html += `
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../assets/immages/${item.immage}" alt="${item.title}" width="20" height="20"> ${item.title}
                  </a>
                  <ul class="dropdown-menu">
                    ${item.titles.map(subTitle => `<li><a class="dropdown-item" href="#${subTitle}" data-page-id="${subTitle}">${subTitle}</a></li>`).join('')}
                  </ul>
                </li>
              `;
            } else {
              // Bottone normale
              html += `
                <li class="nav-item">
                  <a class="nav-link" href="#${item.title}" data-page-id="${item.title}">
                    <img src="../assets/immages/${item.immage}" alt="${item.title}" width="20" height="20"> ${item.title}
                  </a>
                </li>
              `;
            }
          });

          html += `
                  </ul>
                </div>
              </div>
            </nav>
          `;

          parentElement.innerHTML = html;
/*
          // Event listener per creare pagine dinamiche al click
          parentElement.querySelectorAll('a[data-page-id]').forEach(link => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              const pageId = e.currentTarget.dataset.pageId;
              createPage(pageId);
            });
          });*/
        })
        .catch(err => console.error("Errore fetch:", err));
    }
  };
};
