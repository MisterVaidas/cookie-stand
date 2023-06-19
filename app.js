'use strict'

const container = document.getElementById("container");

const openingHours = ["6am", "7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm"];

function randomNum(minCustPerHour, maxCustPerHour) {
    return Math.floor(Math.random() * (maxCustPerHour - minCustPerHour + 1) + minCustPerHour);
}

const store1 = {
    storeName: "Seatle",
    minCustPerHour: 23,
    maxCustPerHour: 65,
    avgPerCustomer: 6.3,
    customersEachHour: [],
    cookiesEachHour: [],
    totalCookies: 0,
    calcCustomersEachHour: function () {
        for (let i = 0; i < openingHours.length; i++) {
            this.customersEachHour.push(randomNum(this.minCustPerHour, this.maxCustPerHour));
        }
    },

    calcCookiesEachHour: function () {
        for (let i = 0; i < openingHours.length; i++) {
            const oneHour = Math.ceil(this.customersEachHour[i] * this.avgPerCustomer);
            this.cookiesEachHour.push(oneHour);
            this.totalCookies += oneHour;
        }
    },

    render: function() {

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
            li.textContent = `${openingHours[i]}: ${this.cookiesEachHour[i]} cookies`;
            ul.appendChild(li);
        }
    },
};

store1.render();
