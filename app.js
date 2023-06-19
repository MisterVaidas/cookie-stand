'use strict'

const container = document.getElementById("container");

const openingHours = ["6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

function randomNum(minCustPerHour, maxCustPerHour) {
    return Math.floor(Math.random() * (maxCustPerHour - minCustPerHour + 1) + minCustPerHour);
}

function Store(storeName, minCustPerHour, maxCustPerHour, avgPerCustomer) {
    this.storeName = storeName;
    this.minCustPerHour = minCustPerHour;
    this.maxCustPerHour = maxCustPerHour;
    this.avgPerCustomer = avgPerCustomer;
    this.customersEachHour = [];
    this.cookiesEachHour = [];
    this.totalCookies = 0;
    this.calcCustomersEachHour = function() {
        for (let i = 0; i < openingHours.length; i++) {
            this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour));
        }
    };

    this.calcCookiesEachHour = function () {
        for (let i = 0; i < openingHours.length; i++) {
            const oneHour = Math.ceil(this.customersEachHour[i] * this.avgPerCustomer);
            this.cookiesEachHour.push(oneHour);
            this.totalCookies += oneHour;
        }
    };

    this.render = function() {
        this.calcCustomersEachHour();
        this.calcCookiesEachHour();

        const article = document.createElement("article");
        container.appendChild(article);

        const h3 = document.createElement("h3");
        h3.textContent = this.storeName;
        article.appendChild(h3);

        const ul = document.createElement("ul");
        article.appendChild(ul);

        for (let i = 0; i < openingHours.length; i++) {
            const li = document.createElement("li");
            li.className = "sales-data"; //added this line for styles for sale data
            li.textContent = `${openingHours[i]}: ${this.cookiesEachHour[i]} cookies`;
            ul.appendChild(li);
        }
    };
}

const stores = [
    new Store('Seatle', 23, 65, 6.3),
    new Store('Tokyo', 3, 25, 1.2),
    new Store('Dubai', 11, 38, 3.7),
    new Store('Paris', 20, 38, 2.3),
    new Store('Lima', 2, 16, 4.6),
];

stores.forEach(store => store.render());

