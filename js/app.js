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

}

Store.prototype.render = function() {
    this.calcCustomersEachHour();
    this.calcCookiesEachHour();

    const table = document.getElementById('store-table');
    const tr = document.createElement('tr');

    let td = document.createElement('td');
    td.textContent = this.storeName;
    tr.appendChild(td);

    for (let i = 0; i < openingHours.length; i++) {
        td = document.createElement('td');
        td.textContent = `${this.cookiesEachHour[i]} cookies`;
        tr.appendChild(td);
    }

    td = document.createElement('td');
    td.textContent = this.totalCookies;
    tr.appendChild(td);

    table.appendChild(tr);
};

const storeTable = document.createElement('table');
storeTable.id = 'store-table';
container.appendChild(storeTable);

let tr = document.createElement('tr');
let th = document.createElement('th');
th.textContent = "Store";
tr.appendChild(th);

for (let i = 0; i < openingHours.length; i++) {
    th = document.createElement('th');
    th.textContent = openingHours[i];
    tr.appendChild(th);
}

th = document.createElement('th');
th.textContent = 'Daily Location Total';
tr.appendChild(th);

storeTable.appendChild(tr);

  

const stores = [
    new Store('Seatle', 23, 65, 6.3),
    new Store('Tokyo', 3, 25, 1.2),
    new Store('Dubai', 11, 38, 3.7),
    new Store('Paris', 20, 38, 2.3),
    new Store('Lima', 2, 16, 4.6),
];


for(let i = 0; i < stores.length; i++) {
    stores[i].render();
}

