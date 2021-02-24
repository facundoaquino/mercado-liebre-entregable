/*---------------------- get products on input search whit datalist ---------------------*/

const searchInput = document.getElementById("searchInput");
const datalist = document.getElementById("products");
const getProducts = async (keyword) => {
  const response = await fetch(`/searchproducts?keyword=${keyword}`);

  const data = await response.json();
  datalist.innerHTML = "";
  data.forEach((title) => {
    const option = `<option class='products__option' value=${title}>`;
    datalist.insertAdjacentHTML("beforeend", option);
  });
};

searchInput.addEventListener("input", (e) => {
  getProducts(e.target.value);
});

/*---------------------- responsive menu ---------------------*/

const button = document.querySelector('.btn-toggle-navbar')
const menu = document.querySelector('.main-navbar')
console.log(button);

button.addEventListener('click',()=>{

  menu.classList.toggle('show')
})