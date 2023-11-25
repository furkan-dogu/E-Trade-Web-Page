const btnDivs = document.getElementById("btns");
const productDivs = document.getElementById("products");
const searchInput = document.getElementById("searchInput");
const categoryTitle = document.getElementById("category");
const modalBody = document.querySelector(".modal-body");
const canvasDiv = document.getElementById("canvas")

let products = [];
let baskets = [];

const btnColors = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "danger",
  "light",
  "dark",
];

productDivs.innerHTML = ""

const getProducts = async () => {
  const res = await fetch("https://anthonyfs.pythonanywhere.com/api/products/");
  const data = await res.json();
  // console.log(data);
  products = data;
  category();
  displayProducts(products);
};

getProducts();

const category = () => {
  // console.log(products);
  // const categoryArr = products.map(item => item.category)
  // console.log(categoryArr);
  //+ 1.yol
  // let categoryArr = ["All"]  //- "All" sonradan ekledi
  // products.forEach(item => {
  //     if (!categoryArr.includes(item.category)) {
  //         categoryArr.push(item.category)
  //     }
  // })
  // console.log(categoryArr);

  //! 2.yol
  // const categoryArr = products.reduce((acc, item) => {
  //     if(!acc.includes(item.category)) {
  //         acc.push(item.category)
  //     }
  //     return acc
  // }, ["All"])
  // console.log(categoryArr);

  //? 3.yol
  const categoryArr = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];
  //# içerisinde tekrar edenleri siler. unique yapar
  // console.log(categoryArr);

  categoryArr.forEach((category, i) => {
    //% butonları oluşturduk
    const btn = document.createElement("button");
    btn.innerText = category.toUpperCase();
    btn.classList.add("btn", `btn-${btnColors[i]}`);
    btnDivs.appendChild(btn);
  });
};

function displayProducts(arr) {
  //= Ürünleri getirdik
  productDivs.innerHTML = "";
  arr.forEach((item) => {
    const { id, title, description, price, image } = item;
    const productDiv = document.createElement("div");
    productDiv.classList.add("col");
    productDiv.setAttribute("id", id);
    productDiv.innerHTML = `
        <div class="card">
            <img src="${image}" class="p-2" height="250px" alt="...">
            <div class="card-body">
                <h5 class="card-title line-clamp-1">${title}</h5>
                <p class="card-text line-clamp-2">${description}</p>
            </div>
            <div class="card-footer w-100 fw-bold d-flex justify-content-between gap-3">
            <span>Price:</span><span>${price} $</span>
                
            </div>
            <div class="card-footer w-100 d-flex justify-content-center gap-3">
                <button class="btn btn-danger">
                Sepete Ekle
                </button>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                See Details
                </button>
            </div>
        </div>
    `;

    productDivs.appendChild(productDiv);

    productDiv.addEventListener("click", (e) => {
      //* sepete ekle butonu
      if (e.target.classList.contains("btn-danger")) {
        addToCart(item);
      } else if (e.target.classList.contains("btn-primary")) {
        showModal(item);
      }
    });
  });
}

canvasDiv.innerHTML = ""

function addToCart(product) {
  canvasDiv.innerHTML = ""
  //& sepete ürünü ekleme
  // console.log(product);
  if (baskets.some((item) => item.title === product.title)) {
    baskets = baskets.map((item) => {
      //% sepette aynı ürün varsa sadece sayıyı arttır
      return item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
  } else {
    baskets.push(product);
    document.getElementById("sepet").innerText++ //+ sepetim kısmındaki yazı
  }
  // console.log(baskets);
  
  addCanvas()
}

function addCanvas() {
  baskets.forEach((item) => { //% sepete eklenen ürünün sepette göründüğü kısım

    const { title, quantity, price, image} = item
    canvasDiv.innerHTML += `
    <div class="card mb-3" style="max-width: 540px">
    <div class="row g-0">
      <div class="col-md-4 my-auto">
        <img src="${image}" class="img-fluid rounded-start" alt="..." />
      </div>
      <div class="col-md-8 ">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <div class="d-flex align-items-center gap-2" role="button">
            <i class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"></i><span
              class="fw-bold">${quantity}</span><i
              class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"></i>
          </div>
          <p class="card-text">Total : ${price} x ${quantity}</p>
          <button class="btn btn-danger">Remove</button>
        </div>
      </div>
    </div>
  </div>
    `
  })
}

canvasDiv.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("fa-plus") || target.classList.contains("fa-minus")) {
      const cardBody = target.closest(".card-body");
      const quantityElement = cardBody.querySelector(".fw-bold");
      const currentQuantity = Number(quantityElement.innerText);

      if (target.classList.contains("fa-plus")) {
          quantityElement.innerText = currentQuantity + 1;
      } else if (target.classList.contains("fa-minus") && currentQuantity > 1) {
          quantityElement.innerText = currentQuantity - 1;
      }
  }
});


function showModal(product){
    fetch(`https://anthonyfs.pythonanywhere.com/api/products/${product.id}`)
    .then((res) => res.json())
    .then((res) => {
      modalBody.innerHTML = `<div class="text-center">
            <img src="${res.image}" class="p-2" height="250px" alt="...">
            <h5 class="card-title">${res.title}</h5>
            <p class="card-text">${res.description}</p>
            <p class="card-text">Fiyat: ${res.price} $</p>
            </div>
            `;
    });
  // const {image,title,description,price} = product
  // modalBody.innerHTML = `<div class="text-center">
  // <img src="${image}" class="p-2" height="250px" alt="...">
  // <h5 class="card-title">${title}</h5>
  // <p class="card-text">${description}</p>
  // <p class="card-text">Fiyat: ${price} $</p>
  // </div>
  // `;
}

btnDivs.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    //! yukarıdaki butonlara tıklayınca category yazısında adı çıkıyor
    const selectedCategory = e.target.innerText.toLowerCase();
    categoryTitle.innerText = selectedCategory.toUpperCase();

    const value = searchInput.value;

    // const filteredProducts =
    //   selectedCategory === "all"
    //     ? products
    //     : products.filter(
    //         (item) =>
    //           item.category.toLowerCase() === selectedCategory &&
    //           item.title.toLowerCase().includes(value.toLowerCase())
    //       ); //? o kategorideki ürünler ekrana geldi ve search kısmında bulunduğumuz kategoride aramayı ayarladık

    const filteredProducts= filtered(selectedCategory,value);
    displayProducts(filteredProducts);
  }
});

searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase()
    const selectedCategory = categoryTitle.innerText.toLowerCase() //*güncel kategoriyi yakalamak için
    const filteredProducts = filtered(selectedCategory,value)
    displayProducts(filteredProducts)
})


function filtered(selectedCategory, value) {
  const newArr = selectedCategory.toLowerCase() === "all"
      ? products.filter(
          (item) =>
              item.title.toLowerCase().includes(value.toLowerCase())
      )
      : products.filter(
          (item) =>
              item.category.toLowerCase() === selectedCategory &&
              item.title.toLowerCase().includes(value.toLowerCase())
      );
  return newArr;
}







