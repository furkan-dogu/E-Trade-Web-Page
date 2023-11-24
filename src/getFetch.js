export const getFetch = async() =>{
    const url = "https://anthonyfs.pythonanywhere.com/api/products/"
    
    try {
      const res = await fetch(url)
      if(!res.ok){
        throw new Error (`There is sth wrong ${res.status}`) 
      }
      
        const data = await res.json()
        console.log(data);
        showData(data)
        showModal(data,data.id)
        
    } catch (error) {
      console.log(error);
    }
  }


  const showData = (products) =>{
    const productElem = document.getElementById("products")
    
    products.forEach(product => {
        

        const {title, description, category, category_id, image, price, quantity, id } = product

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
            <span>Price:</span><span>${price} $</span>
          </div>
          <div class="card-footer w-100 d-flex justify-content-center gap-3">
            <button class="btn btn-danger">Sepete Ekle</button>
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              See Details
            </button>
          </div>
        </div>
      </div>`

      showModal(products, id)

    });

}

const showModal = (products, id) => {
    console.log(id);
    const productModal = document.getElementById("exampleModal");

    // Use find instead of filter
    const product = products.find((product) => product.id == id);

    if (product) {
        const { title: title2, description: d, category: c, category_id: ci, image: i, price: p, quantity: q, id: id2 } = product;

        productModal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${title2}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div>
                            <img src="${i}" class="p-2" height="250px" alt="..." />
                        </div>
                        <p class="card-text line-clamp-3">${d}</p>
                        <span>Price:</span><span>${p} $</span>
                    </div>
                </div>
            </div>`;
    }
};