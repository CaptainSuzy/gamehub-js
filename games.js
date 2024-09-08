async function BuildHtmlForGames(){
    const output = document.getElementById("api-output");
    output.innerHTML = "";
    output.classList.add("spinner");

    const tag = new URLSearchParams(window.location.search).get("tag");

    const url = "https://candybandy.no/wp-json/wc/v3/products";
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
                if (tag !== null && tag !== "" && game.tag !== tag) return;
                
                let altText = game.image.alt;
                if (game.image.alt === null || game.image.alt === "")
                
                  {
                  altText = "Picture of " + game.title;
                }

                return `<div class='game-with-category' id='${game.id}'>
                <a href="games.html?tag=${game.tag}">
                <div class="game-with-category hero-flex flex-horizontal">
                <p class="border button-small button-white">${game.tag}</p>
              </div>
                <a href='singleGame.html?id=${game.id}'>
                <img
                  src='${game.image.url}'
                  alt='${altText}'
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
