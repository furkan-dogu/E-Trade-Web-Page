let data;
let newData = []
export const getFetch = async () => {
  const url = "https://anthonyfs.pythonanywhere.com/api/products/";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`There is sth wrong ${res.status}`);
    }
    data = await res.json();
    // console.log(data);
    showData(data);
    newData = data;
    // console.log(newData);
  } catch (error) {
    console.log(error);
  }
};
const showData = (products) => {
  const productElem = document.getElementById("products");
  productElem.innerHTML="";
  products.forEach(product => {
    const { title, description, image, price, id } = product;
    productElem.innerHTML += `<div class="col">
      <div class="card">
        <img
          src="${image}"
          class="p-2"
          height="250px"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title line-clamp-1">${title}</h5>
          <p class="card-text line-clamp-3">${description}</p>
        </div>
        <div
          class="card-footer w-100 fw-bold d-flex justify-content-between gap-3"
        >
          <span>Price:</span><span class="fiyat">${price} $</span>
        </div>
        <div class="card-footer w-100 d-flex justify-content-center gap-3">
          <button class="btn btn-danger">Sepete Ekle</button>
          <button
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-id="${id}"
          >
            See Details
          </button>
        </div>
      </div>
    </div>`;
  });

  const modal = document.querySelector("#exampleModal");
  modal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget;
    const productId = button.getAttribute("data-id");
    const product = getProductId(productId);
    if (product) {
      getModal(product);
    } else {
      console.error("Product not found for id:", productId);
    }
  });
};


const getProductId = (id) => {
  return data.find(product => product.id === parseInt(id));
};

const getModal = (product) => {
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");
  if (product) {
    const { title, image, description, price } = product;
    modalTitle.textContent = title;
    modalBody.innerHTML = `
      <div class="text-center">
        <img src="${image}" class="p-2" height="250px" alt="...">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${description}</p>
        <p class="card-text">Fiyat: ${price} ₺</p>
      </div>
    `;
  } else {
    console.error("Product is undefined or does not contain expected properties");
  }
};
document.addEventListener("DOMContentLoaded", async () => {
  await getFetch();
});

const electronicsBtn = document.getElementById("electronics")
const homeBtn = document.getElementById("home")
const sportsBtn = document.getElementById("sports")
const clothingBtn = document.getElementById("clothing")
const shopBtn = document.getElementById("shop")
const allBtn = document.getElementById("all")

electronicsBtn.addEventListener("click", ()=>{
  let category = "Electronics";
  getCategorize(category)
})
sportsBtn.addEventListener("click", ()=>{
  let category = "Sports";
  getCategorize(category)
})
homeBtn.addEventListener("click", ()=>{
  let category = "Home";
  getCategorize(category)
})
clothingBtn.addEventListener("click", ()=>{
  let category = "clothing";
  getCategorize(category)
})
shopBtn.addEventListener("click", ()=>{
  let category = "shop";
  getCategorize(category)
})
allBtn.addEventListener("click", ()=>{
  showData(data)
})


const getCategorize = (categoryBtn) =>{



  const productElem = document.getElementById("products");
  console.log(newData);
  productElem.innerHTML="";
  newData.forEach(product => {
    
    let { title, description, image, price, category_id, id, category } = product;
   

    if(categoryBtn.toLowerCase() === category.toLowerCase()){

     
     console.log("kategoriden gelen",category_id);
     
              productElem.innerHTML += `<div class="col">
              <div class="card">
                <img
                  src="${image}"
                  class="p-2"
                  height="250px"
                  alt="..."
                />
                <div class="card-body">
                  <h5 class="card-title line-clamp-1">${title}</h5>
                  <p class="card-text line-clamp-3">${description}</p>
                </div>
                <div
                  class="card-footer w-100 fw-bold d-flex justify-content-between gap-3"
                >
                  <span>Price:</span><span class="fiyat">${price} $</span>
                </div>
                <div class="card-footer w-100 d-flex justify-content-center gap-3">
                  <button class="btn btn-danger">Sepete Ekle</button>
                  <button
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-id="${id}"
                  >
                    See Details
                  </button>
                </div>
              </div>
            </div>`;


            }

    })
}


// const sepeteEkle = document.getElementById("sepeteEkle")
const productElem = document.getElementById("products");

productElem.addEventListener("click", (e)=>{
  // console.log(e.target);
  let gelenCard = e.target.closest(".card")
  // console.log(gelenCard);
  takeCanvas(gelenCard)
  arttir()
})

const takeCanvas = (gelenCard) => {
  const canvasCardEkle = document.querySelector(".canvasCardEkle")
  const cardTitle =  gelenCard.querySelector(".card-title").textContent
  const imgUrl = gelenCard.querySelector("img").getAttribute("src")
  const fiyat = gelenCard.querySelector(".fiyat").textContent
  // const miktar =  gelenCard.querySelector(".miktar").textContent
  // console.log(miktar);

  canvasCardEkle.innerHTML += `
  <div class="card mb-3" style="max-width: 540px">
  <div class="row g-0">
    <div class="col-md-4 my-auto">
      <img src="${imgUrl}" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${cardTitle}</h5>
        <div class="d-flex align-items-center gap-2" role="button">
          <i class="fa-solid fa-minus border rounded-circle bg-danger text-white p-2"></i><span
            class="fw-bold miktar">1</span><i
            class="fa-solid fa-plus border bg-danger text-white rounded-circle p-2"></i>
        </div>
        <p class="card-text">Total : ${fiyat} x </p>
        <button class="btn btn-danger">Remove</button>
      </div>
    </div>
  </div>
</div>
  `

}

const arttir = () => {
  
}