async function BuildHtmlForGame() {
    const id = new URLSearchParams(window.location.search).get("id");
    const url = "https://v2.api.noroff.dev/gamehub/" + id;

    document.getElementById("api-output").innerHTML = "spinner";

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
                <p>Description: ${game.description}</p>
                <p>Genre: ${game.genre}</p>
                <p>Released: ${game.released}</p>
                <p>Age rarting: ${game.ageRating}</p>
              </div>
              
              <section>
              <a href='checkoutPage.html?id=${game.id}'>
                <div class="hero-flex flex-horizontal">
                  <p class="border hero-gamepage-text-button button-white">
                    Add to cart
                  </p>
                </div>
              </a>
            </section>`

        })
        .catch((err) => {
            return "Failed getting data: " + err;
        })

    document.getElementById("api-output").innerHTML = res;
    document.getElementById("api-output")
    }
