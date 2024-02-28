const loadPhones = async (inputText = "samsung", isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
  const data = await res.json();
  const phones = data.data
  displayPhones(phones, isShowAll)
  // console.log(inputText);
}
const displayPhones = (phones, isShowAll) => {
  const divContainer = document.getElementById('phone-container');
  divContainer.innerHTML = '';


  // console.log(typeof phones.length);
  if (phones.length >= 15) {
    shallButton.classList.remove('hidden')
  } else {
    shallButton.classList.add('hidden')
  }
  console.log(isShowAll);
  if (isShowAll !== true) {
    phones = phones.slice(0, 15)
  }
  phones.forEach(phone => {
    // console.log(phone);
    const div = document.createElement('div')
    div.classList = `card w-full bg-base-100 shadow-xl my-4`;
    div.innerHTML = `
                    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body text-center">
                      <h2 class="card-title mx-auto">${phone.brand}</h2>
                      <p class="mb-8">${phone.phone_name}</p>
                      <div class="card-actions justify-center">
                        <button onclick="datelisHandler('${phone.slug}')" class="btn bg-[#0D6EFD] w-44 h-12 rounded-lg">Show Details</button>
                      </div>
                    </div>`
    divContainer.appendChild(div)

  });
  loadingSpinner(false)
}

const searchButton = document.getElementById('search-phones')

function search(isShowAll) {
  const inputSearch = document.getElementById('default-searchs');
  const inputValue = inputSearch.value

  loadingSpinner(true)
  loadPhones(inputValue, isShowAll)
}

searchButton.addEventListener('click', search)
// landing spaner 
const loadingSpinner = (isTrue) => {
  const spiner = document.getElementById('loading-spinner');
  if (isTrue) {
    spiner.classList.remove('hidden')
  } else {
    spiner.classList.add('hidden')
  }
}
// show all button
const shallButton = document.getElementById('showAll');

// handele show all 
function handleShowAll(isShowAll) {
  search(true)
}
const detailsData = () => {
  const res = fetch()
}
// datelis handler
const datelisHandler = async (id) => {
  my_modal_3.showModal()
  console.log(id);
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()
  const phoneDetails = data.data
  //  console.log(phoneDetails);
  modalDetails(phoneDetails)
}

const modalDetails = (modalData) => {
  console.log(modalData);

  const modelContainer = document.getElementById("modal-container")
  const modalText = document.createElement('div')
  modalText.classList.add('gap-4')
  modalText.innerHTML = `
  <img src="${modalData.image}" alt="" class="mx-auto my-8">
  <h2 class="text-2xl my-4 text-center">${modalData.brand}</h2>
  <h4 class="font-bold text-black my-3">${modalData.name}</h4>
  <p><span class="text-black font-bold">Storage :</span>${modalData.mainFeatures?.storage}</p>
  <p><span class="text-black font-bold">Display Size :</span>${modalData.mainFeatures?.displaySize}</p>
  <p><span class="text-black font-bold">Chipset :</span>${modalData.mainFeatures?.chipSet}</p>
  <p><span class="text-black font-bold">Memory :</span>${modalData.mainFeatures?.memory}</p>
  <p><span class="text-black font-bold">Slug :</span>${modalData.slug}</p>
  <p><span class="text-black font-bold">Relese Date :</span>${modalData?.releaseDate}</p>
  <p><span class="text-black font-bold">Brand :</span>${modalData.brand}</p>
  <p><span class="text-black font-bold">Gps :</span>${modalData.others?.GPS}</p>

  `;

  modelContainer.appendChild(modalText)

}


loadPhones()
