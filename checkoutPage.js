async function BuildHtmlForGame() {
    const output = document.getElementById("api-output");
    output.innerHTML = "";
    output.classList.add("spinner");

    const id = new URLSearchParams(window.location.search).get("id");
    const url = "https://v2.api.noroff.dev/gamehub/" + id;


    var res = await fetch(url)
        .then((res) => {
            if (!res.ok)
            {
                return 'Error while fetching data';
            }

            return res.json();
        })
        .then((res) => {


            const game = res.data;
            let priceInfo = game.price;
            if (game.onSale)
                priceInfo = `<strike>${game.price}</strike> <strong>On sale! ${game.discountedPrice}</strong>`;

                return `<div class='game-details' id='${game.id}'>

            
                <section class="hero-flex">
                <img
                  src='${game.image.url}'
                  alt='${game.image.alt}'
                /> 
              </section>

                <h1>Title: ${game.title}</h1>
                <h2>Price: ${priceInfo}</h2>
              </div>`
        })
        .catch((err) => {
            return "Oops, we encountered a problem. Please try again later.";
        })

    output.innerHTML = res;
    output.classList.remove("spinner");
    }