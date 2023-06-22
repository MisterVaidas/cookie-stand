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
    this.staffEachHour = []; // added this line for second table
    this.calcCustomersEachHour = function() {
        const controlCurve = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
        for (let i = 0; i < openingHours.length; i++) {
            let baseCustomers = randomNum(this.minCustPerHour, this.maxCustPerHour);
            let adjustedCustomers = Math.round(baseCustomers * controlCurve[i]);
            this.customersEachHour.push(adjustedCustomers);
        }
    };

    this.calcCookiesEachHour = function () {
        for (let i = 0; i < openingHours.length; i++) {
            const oneHour = Math.ceil(this.customersEachHour[i] * this.avgPerCustomer);
            this.cookiesEachHour.push(oneHour);
            this.totalCookies += oneHour;
        }
    };

    this.calcStaffEachHour = function() {
        for (let i = 0; i < openingHours.length; i++) {
            // Minimum of 2 staff memebrs at all times
            let staff = Math.max(2, Math.ceil(this.customersEachHour[i] / 20));
            this.staffEachHour.push(staff);
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

Store.prototype.renderStaffing = function() {
    this.calcCustomersEachHour();
    this.calcStaffEachHour();

    const table = document.getElementById('staff-table');
    const tr = document.createElement('tr');

    let td = document.createElement('td');
    td.textContent = this.storeName;
    tr.appendChild(td);
    console.log(td);

    let totalStaff = 0;
    for (let i = 0; i < openingHours.length; i++) {
        td = document.createElement('td');
        td.textContent = this.staffEachHour[i];
        tr.appendChild(td);
        totalStaff += this.staffEachHour[i];
    }

    td = document.createElement('td');
    td.textContent = totalStaff;
    tr.appendChild(td);

    table.appendChild(tr);
    console.log(table);
};

  

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

// Creating staffing table

const staffTable = document.createElement('table');
staffTable.id = 'staff-table';
container.appendChild(staffTable);
console.log(staffTable);

// Adding table headers

tr = document.createElement('tr');
th = document.createElement('th');
th.textContent = 'Store';
tr.appendChild(th);
console.log(th);

for (let i = 0; i < openingHours.length; i++) {
    th = document.createElement('th');
    th.textContent = openingHours[i];
    tr.appendChild(th);
}

th = document.createElement('th');
th.textContent = 'Total';
tr.appendChild(th);
console.log(th);

staffTable.appendChild(tr);

// Adding staffing data to the table

for (let i = 0; i < stores.length; i++) {
    stores[i].renderStaffing();
}

