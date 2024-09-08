async function BuildHtmlForGame() {
    const output = document.getElementById("api-output");
    output.innerHTML = "";
    output.classList.add("spinner");

    const id = new URLSearchParams(window.location.search).get("id");
    const url = "https://candybandy.no/wp-json/wc/v3/products" + id;


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
            
            let altText = game.image.alt;
            if (game.image.alt === null || game.image.alt === "")
                
              {
              altText = "Picture of " + game.name;
            }

                return `<div class='game-details' id='${game.id}'>

            
                <section class="hero-flex">
                <img
                  src='${game.image.url}'
                  alt='${altText}'
                /> 
              </section>

                <h1>Title: ${game.name}</h1>
                <h2>Price: ${priceInfo}</h2>
                <p>Description: ${game.description}</p>
                <p>Genre: ${game.tag}</p>
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
            </section>
            
            <div class="line"></div>

            <section>
            <a href="games.html?genre=${game.tag}">
            <div class="game-with-category hero-flex flex-horizontal">
              <p class="border button-small button-white">${game.tag}</p>
            </div>
          </a>
          </section>  
            `

        })
        .catch((err) => {
            return "Oops, we encountered a problem. Please try again later.";
        })

    output.innerHTML = res;
    output.classList.remove("spinner");
    }
