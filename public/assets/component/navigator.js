const hide = (elements) => {
    elements.forEach((element) => {
       element.classList.add("hidden");
       element.classList.remove("visible");
    });
 }
 
 const show = (element) => {
    element.classList.add("visible");
    element.classList.remove("hidden");   
 }
 export const createNavigator = (initialParentElement) => {
   let parentElement = initialParentElement;
   let pages = Array.from(parentElement.querySelectorAll(".page"));

   const render = () => {
       const url = new URL(document.location.href);
       const pageName = url.hash.replace("#", "");
       const selected = pages.find((page) => page.id === pageName) || pages[0];

       hide(pages);
       show(selected);
   };

   const update = (newParentElement) => {
       parentElement = newParentElement;
       pages = Array.from(parentElement.querySelectorAll(".page"));
       render(); 
   };

   window.addEventListener('popstate', render);
   render();

   return { update };
};
