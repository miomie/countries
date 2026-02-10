const row = document.querySelector('.row')
const renderCards = (array) => {
    for(let i = 0; i < array.length; i ++){
        const name = array[i].name.official
        const langs = Object.values(array[i].languages)
        let langsString;
        if (langs.length == 0){
            langsString = ' -'
        } else {
            langsString = langs.join(', ')
        }
        const currency = Object.values(array[i].currencies)
        let currencyString;
        if (currency.length == 0){
            currencyString = ' -'
        } else {
            currencyString = currency.map(c => `${c.symbol} ${c.name}`).join(', ')
        }
        const region = array[i].region
        let population;
        if (array[i].population <= 100000) {
            population = (array[i].population / 1000).toFixed(2) + ' тыс'
        } else if (array[i].population == 0){
            population = ' -'
        } else {
            population = (array[i].population / 1000000).toFixed(2) + ' млн'
        }
        const flag = array[i].flags.svg
        row.insertAdjacentHTML('beforeend', `
            <div class="col">
                <div class="card h-100">
                    <img src="${flag}" class="card-img-top" alt="${name}">
                    <div class="card-body">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">${region}</p>
                        <p class="card-text">&#129499;&#8205;&#9794;&#65039;${population}</p>
                        <p class="card-text">&#128069;${langsString}</p>
                        <p class="card-text">&#128184;${currencyString}</p>
                    </div>
                </div>
            </div>
        `)
    }
}
fetch('https://restcountries.com/v3.1/all?fields=name,flags,region,languages,currencies,population')
    .then((response) => response.json())
    .then((array) => {
        renderCards(array)
})