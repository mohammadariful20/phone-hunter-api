const loadPhones=async(inputText='samsung')=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    const data=await res.json();
    const phones=data.data
    displayPhones(phones)
    // console.log(inputText);
}
const displayPhones=phones=>{
    const divContainer=document.getElementById('phone-container');
    divContainer.innerHTML='';


    console.log(typeof phones.length);
    if (phones.length>26) {
      showAll()
    }
    phones=phones.slice(0,20)
    phones.forEach(phone => {
        // console.log(phone);
        const div=document.createElement('div')
        div.classList=`card w-full bg-base-100 shadow-xl my-4`;
        div.innerHTML=`
                    <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body text-center">
                      <h2 class="card-title mx-auto">${phone.phone_name}</h2>
                      <p class="mb-8">${phone.slug}</p>
                      <div class="card-actions justify-center">
                        <button class="btn bg-[#0D6EFD] w-44 h-12 rounded-lg">Show Details</button>
                      </div>
                    </div>`
        divContainer.appendChild(div)

    });
    loadingSpinner(false)
  }
  
  const searchButton=document.getElementById('search-phones')
  
  function search() {
    const inputSearch=document.getElementById('default-searchs');
    const inputValue=inputSearch.value
    
    loadingSpinner(true)
  loadPhones(inputValue)
}

searchButton.addEventListener('click',search)
// landing spaner 
const loadingSpinner=(isTrue)=>{
  const spiner=document.getElementById('loading-spinner');
  if (isTrue) {
    spiner.classList.remove('hidden')
  } else {
    spiner.classList.add('hidden')
  }
}
// show all 
function showAll() {
  const shallButton=document.getElementById('showAll');
  shallButton.classList.remove('hidden')
}


loadPhones()