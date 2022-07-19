const options = {
  rootMargin: "20%",
  threshold: 1.0
}

const observer = new IntersectionObserver(paginateFromLocalStorage, options);

observer.observe(document.querySelector(".scroll-guard"));

function paginateFromLocalStorage(entries) {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
     console.log("huray");
    }
  })
}
