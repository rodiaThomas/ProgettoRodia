export const createInfo = (parentElement) => {
  return {
    build: () => {},

    render: () => {
      fetch("/site/info")
        .then(response => response.json())
        .then(json => {
          let html = `
            <div >${json.info}
            </div>
          `;

          parentElement.innerHTML = html;
        })
        .catch(err => console.error("Errore fetch:", err));
    }
  };
};
