
window.onload = init

  function init() {
    const areaSliderParams = {
      rangeMin:  document.getElementById("area-range-min"),
      rangeMax: document.getElementById("area-range-max"),
      minVal: document.getElementById("area-min"),
      maxVal: document.getElementById("area-max"),
      sliderTrack: document.getElementById("area-slider-track"),
      rangeSliderMax: document.getElementById("area-range-min").max,
      rangeSliderMin: document.getElementById("area-range-min").min
    }

   const priceSliderParams = {
      rangeMin:  document.getElementById("price-range-min"),
      rangeMax: document.getElementById("price-range-max"),
      minVal: document.getElementById("price-min"),
      maxVal: document.getElementById("price-max"),
      sliderTrack: document.getElementById("price-slider-track"),
      rangeSliderMax: document.getElementById("price-range-min").max,
      rangeSliderMin: document.getElementById("price-range-min").min
    }
    setupCarousel()
    setupListeners(priceSliderParams, areaSliderParams)
  }

function setupCarousel() {
  // Carousel
let items = document.querySelectorAll('.staff .carousel .carousel-item')

items.forEach(element => {
    let next = element.nextElementSibling
    for (let i = 1; i < 4; i++) {
        if (!next) {
          next = items[0]
        }
        let cloneChild = next.cloneNode(true)
        element.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
  })
}

function setupListeners(priceSliderParams, areaSliderParams) {

  priceSliderParams.minVal.oninput = () => { validateField(priceSliderParams.minVal) }
  priceSliderParams.maxVal.oninput = () => { validateField(priceSliderParams.maxVal) }
  areaSliderParams.minVal.oninput = () => { validateField(areaSliderParams.minVal) }
  areaSliderParams.maxVal.oninput = () => { validateField(areaSliderParams.maxVal) }

  updateMin(areaSliderParams)
  updateMax(areaSliderParams)
  updateMin(priceSliderParams)
  updateMax(priceSliderParams)

  areaSliderParams.rangeMin.oninput = () => { updateMin(areaSliderParams) }

  areaSliderParams.rangeMax.oninput = () => { updateMax(areaSliderParams) }

  priceSliderParams.rangeMin.oninput = () => { updateMin(priceSliderParams) }

  priceSliderParams.rangeMax.oninput = () => { updateMax(priceSliderParams) }

}

// Text field validation
function validateField(textField) {
  const regex = new RegExp('^[0-9]*$')
  if (!regex.test(textField.value)){
    textField.value = textField.value.slice(0, -1)
  }
}
// Generic function to update the minimum value of the slider
function updateMin(params){
  let minGap = 0;

  const {
    rangeMin,
    rangeMax,
    minVal,
    sliderTrack,
    rangeSliderMax,
    rangeSliderMin
  } = params

  if(parseInt(rangeMax.value) - parseInt(rangeMin.value) <= minGap){
    rangeMin.value = parseInt(rangeMax.value) - minGap;
  }
  minVal.value = rangeMin.value;
  fillColor(sliderTrack, rangeSliderMax, rangeSliderMin, rangeMin, rangeMax);
}
// Generic function to update the maximum value of the slider
function updateMax(params){
  let minGap = 0;

  const {
    rangeMin,
    rangeMax,
    maxVal,
    sliderTrack,
    rangeSliderMax,
    rangeSliderMin
  } = params

  if(parseInt(rangeMax.value) - parseInt(rangeMin.value) <= minGap){
    rangeMax.value = parseInt(rangeMin.value) + minGap;
  }
  maxVal.value = rangeMax.value;
  fillColor(sliderTrack, rangeSliderMax, rangeSliderMin, rangeMin, rangeMax);
}
function fillColor(sliderTrack, rangeSliderMax, rangeSliderMin, rangeMin, rangeMax){

  const totalRange = rangeSliderMax - rangeSliderMin
  percent1 = ((rangeMin.value - rangeSliderMin) / totalRange ) * 100;
  percent2 = ((rangeMax.value - rangeSliderMin) / totalRange) * 100;
  sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #eb3751 ${percent1}% , #eb3751 ${percent2}%, #dadae5 ${percent2}%)`;
}
