async function BuildHtmlForGames(){
    const output = document.getElementById("api-output");
    output.innerHTML = "";
    output.classList.add("spinner");

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
                return `<div class='game-with-category' id='${game.id}'>
                <p class='border button-small'>${game.genre}</p>
                <a href='singleGame.html?id=${game.id}'>
                <img
                  src='${game.image.url}'
                  alt='${game.image.alt}'
                />
                </a>
              </div>`
            })
            return html;
        })
        .catch((err) => {
            return "Oops, we encountered a problem. Please try again later.";
        })

    output.innerHTML = res.join(" ");
    output.classList.remove("spinner");
    }
