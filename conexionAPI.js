const apiURL = "https://randomuser.me/api/?results=8&nat=mx";

const data = async function (apiURL) {
    try {
        const data = await fetch(apiURL);
        const response = await data.json();
        localStorage.setItem("staff",JSON.stringify(response))
    } catch (error) {
        console.log(error)
    }
};

data()

const staff = JSON.parse(localStorage.getItem("staff")).results;
// console.log(staff)

let principal = document.querySelector(".staff");

let cardHTML ="";

function card (person) {
    return `
    <div class="card border-0 text-bg-success" style="width: 22rem;">
        <img src=${person.picture.large} class="card-img-top rounded-circle border border-4 mt-3" alt="foto de perfil" style="width: 12rem; align-self:center;">
        <div class="card-body">
            <h5 class="card-title text-center">${person.name.first} ${person.name.last}</h5>
        </div>
        <ul class="list-group list-group-flush border border-success">
            <li class="list-group-item">Celular: <a href="tel:${person.cell}">${person.cell}</a></li>
            <li class="list-group-item">Email: <a href="mailto:${person.email}">${person.email}</a></li>
            <li class="list-group-item">Teléfono: <a href="tel:${person.phone}">${person.phone}</a></li>
        </ul>
    </div>
    `
}

staff.map(person => cardHTML += card(person))

principal.innerHTML = cardHTML;
// console.log(principal)

