async function BuildHtmlForGames(){
    const url = "https://v2.api.noroff.dev/gamehub";

    document.getElementById("api-output").innerHTML = "spinner";

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
                <a href='gamepage.html?id=${game.id}'>
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
            document.getElementById("api-output").innerHTML = "Failed getting data: " + err;
            return;
        })

        document.getElementById("api-output").innerHTML = res.join(" ");
        }
