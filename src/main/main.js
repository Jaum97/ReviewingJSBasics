/*
const myPromise = function () {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users/jaum97');
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject('Request Error')
                }
            }
        }
    });
}

myPromise()
    .then(function (response) {
        console.log(response);

    })
    .catch(function (error) {
        console.warn(error);
    });
    */
/*
axios.get('https://api.github.com/users/jaum97')
 .then(function (response) {
     console.log(response.data.avatar_url);
 })
 .catch(function (error) {
     console.warn(error);
 });
 */
function checaIdade(idade) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            return idade > 17 ? resolve() : reject();
        }, 2000);
    });
}

checaIdade(17)
    .then(function () {
        console.log('maior que 18');
    })
    .catch(function () {
        console.log('menor que 18');
    });

function renderRepos(repositories) {
    while (searchul.firstChild) searchul.removeChild(searchul.firstChild)
    for (repo of repositories) {
        const reponli = document.createElement('li');
        const reponame = document.createTextNode(repo.name);
        reponli.appendChild(reponame);
        searchul.appendChild(reponli);
    }
}

function renderLoading(loading) {
    searchul.innerHTML = "";
    const textElement = document.createTextNode('loading...');
    const loadingElement = document.createElement('li');
    loadingElement.appendChild(textElement);
    searchul.appendChild(loadingElement);
}

function renderError(loading) {
    searchul.innerHTML = "";
    const textElement = document.createTextNode('Error!');
    const errorElement = document.createElement('li');
    errorElement.style.color = "#F00";
    errorElement.appendChild(textElement);
    searchul.appendChild(errorElement);
}

const app = document.querySelector('#app');
const searchul = document.createElement('ul');
const searchinput = document.createElement('input');
searchinput.name = 'nome';
searchinput.type = 'text';
searchinput.placeholder = 'search repo';
app.appendChild(searchinput);

const searchbutton = document.createElement('button');
const buttontext = document.createTextNode('search');
searchbutton.appendChild(buttontext);
searchbutton.onclick = function () {
    const usertosearch = searchinput.value;
    if (!usertosearch) return;

    renderLoading();

    axios.get('https://api.github.com/users/' + usertosearch + '/repos')
        .then(function (response) {
            renderRepos(response.data);
        })
        .catch(function (error) {
            renderError();
            console.log(error);
        });
}

app.appendChild(searchbutton);
app.appendChild(searchul);


