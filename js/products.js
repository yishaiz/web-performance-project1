async function loadProducts() {
  const response = await fetch('https://fakestoreapi.com/products');
  const products = await response.json();
  displayProducts(products);
}

function displayProducts(products) {
  // Find the container where products will be displayed
  const container = document.querySelector('#all-products .container');

  // Iterate over each product and create the HTML structure safely
  products.forEach((product) => {
    // Create the main product div
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    // Create the product picture div
    const pictureDiv = document.createElement('div');
    pictureDiv.classList.add('product-picture');
    const img = document.createElement('img');
    img.src = product.image;
    img.alt = `product: ${product.title}`;
    img.width = 250;
    img.loading = 'lazy';

    pictureDiv.appendChild(img);

    // Create the product info div
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('product-info');

    const category = document.createElement('p');
    category.classList.add('categories');
    category.textContent = product.category;

    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = product.title;

    const price = document.createElement('p');
    price.classList.add('price');
    const priceSpan = document.createElement('span');
    priceSpan.textContent = `US$ ${product.price}`;
    price.appendChild(priceSpan);

    const button = document.createElement('button');
    button.textContent = 'Add to bag';

    // Append elements to the product info div
    infoDiv.appendChild(category);
    infoDiv.appendChild(title);
    infoDiv.appendChild(price);
    infoDiv.appendChild(button);

    // Append picture and info divs to the main product element
    productElement.appendChild(pictureDiv);
    productElement.appendChild(infoDiv);

    // Append the new product element to the container
    container.appendChild(productElement);
  });
}

window.onload = () => {
  let status = 'idle';
  let productSection = document.querySelector('#all-products');
  //   console.log(productSection.getBoundingClientRect().top);

  window.onscroll = () => {
    let position =
      productSection.getBoundingClientRect().top -
      (window.scrollY + window.innerHeight);
    // console.log(position);

    if (status == 'idle' && position <= 0) {
      status = 'fetching';
      loadProducts();

      // Simulate heavy operation. It could be a complex price calculation.
      for (let i = 0; i < 10000000; i++) {
        const temp = Math.sqrt(i) * Math.sqrt(i);
      }
    }
  };
};
