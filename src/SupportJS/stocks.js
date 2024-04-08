
export function updatePrices() {
    const aapl = document.querySelector("#aapl");
    const meta = document.querySelector("#meta");
    const amzn = document.querySelector("#amzn");
    const goog = document.querySelector("#goog");
    const nflx = document.querySelector("#nflx");

    function getPrice(name, output) {
        fetch(`/api/stock/${name}`)
            .then(response => response.text())
            .then(response => {
                output.innerText = `${name.toUpperCase()}: ${response}`;
            })
            .catch(error => console.log("DID NOT WORK", error));
    }

    getPrice("aapl", aapl);
    getPrice("meta", meta);
    getPrice("goog", goog);
    getPrice("amzn", amzn);
    getPrice("nflx", nflx);
}
