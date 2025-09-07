export const createTitle = (parentElement) => {
  return {
    build: () => {},

    render: () => {
      fetch("/site/title")
        .then(response => response.json())
        .then(json => {
          let html = `
            <div style="background-color: ${json.color};" class="row">
              <div class="col">
                <img src="/assets/immages/${json.immage}" width="100" height="100" />
              </div>
              <div class="col" style="color:#FFFFFF">${json.title}</div>
            </div>
          `;

          parentElement.innerHTML = html;
        })
        .catch(err => console.error("Errore fetch:", err));
    }
  };
};
