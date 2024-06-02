async function BuildHtmlForGames(){
    const output = document.getElementById("api-output");
    output.innerHTML = "";
    output.classList.add("spinner");

    const genre = new URLSearchParams(window.location.search).get("genre");

    const url = "https://v2.api.noroff.dev/gamehub";
    var res = await fetch(url)
        .then((res) => {
            if (!res.ok)
            {
                return 'Error';
            }

            return res.json();
        })
        .then((games) => {
            var html =
            games.data.map((game) => 
            {
                if (genre !== null && genre !== "" && game.genre !== genre) return;
                
                return `<div class='game-with-category' id='${game.id}'>
                <a href="games.html?genre=${game.genre}">
                <div class="game-with-category hero-flex flex-horizontal">
                <p class="border button-small button-white">${game.genre}</p>
              </div>
                <a href='singleGame.html?id=${game.id}'>
                <img
                  src='${game.image.url}'
                  alt='${game.image.alt}'
                />
                </a>
              </div>
              
              </a>`
            })
            return html;
        })
        .catch((err) => {
            return "Oops, we encountered a problem. Please try again later.";
        })

    output.innerHTML = res.join(" ");
    output.classList.remove("spinner");
    }
