console.log("journey")
const searchInput = document.getElementById("journeySearch");

if(searchInput){
    const cards = document.querySelectorAll('.learning-card');

    searchInput.addEventListener("input", function(){
        const searchText = searchInput.value.toLowerCase().trim();
        cards.forEach(function(card){
            const topic = card.textContent.toLowerCase();

            const matches = topic.includes(searchText);

            card.parentElement.style.display = matches ? "" : "none";

        })
    })
}