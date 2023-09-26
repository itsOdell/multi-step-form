const nextButtons = document.querySelectorAll(".next")
const backButtons = document.querySelectorAll(".back")
const stepContents = document.querySelectorAll("#content article");
const navSteps = document.querySelectorAll("#nav .step .step-number")
const step2Cards = document.querySelectorAll("#content #step-2 .option-container .option")
const step2Switch = document.querySelector("#content #step-2 .switch-container div");
const step3Addons = document.querySelectorAll("#step-3 .add-on")

const step1 = 0;
const step2 = 1;
const step3 = 2;
const step4 = 3;
    
const RESULT = {
    monthly: true,
    price: 0,
    addons: [],
    tier: "",
    tier_price: 0
}


nextButtons[step1].addEventListener("click", function(event) {
    event.preventDefault()
    let inputs = stepContents[step1].querySelectorAll("form input");
    let valid = true;
    for (let input = 0; input < inputs.length; input++) {
       if (inputs[input].value === "") {
        valid = false
        const invalidSpan = inputs[input].previousElementSibling.lastElementChild
        const currentInput = inputs[input]
        invalidSpan.classList.remove("hidden")
        currentInput.classList.add("input-error")
       }
    }
    if (valid) {
        goNextStep()
    }
});

nextButtons[step2].addEventListener("click", function(event) {
    goNextStep()
})

step2Switch.addEventListener("click", function(event) {
    const ball = step2Switch.querySelector(".ball")
    const monthly = step2Switch.querySelector(".monthly");
    const yearly = step2Switch.querySelector(".yearly");
    const optionTextMisc = document.querySelectorAll(".option-text-misc")
    ball.classList.toggle("ball-yearly");
    monthly.classList.toggle("active-switch")
    yearly.classList.toggle("active-switch")
    for (option of optionTextMisc) {
        option.classList.toggle("hidden")
    }
    RESULT["monthly"] = !RESULT["monthly"];
})

for (let i = 0; i < step2Cards.length; i++) {
    const clickedCard = step2Cards[i]
    clickedCard.addEventListener("click", function(event) {
        const priceSelector = clickedCard.querySelector(".option-text-bill");
        const price = parseInt(priceSelector.textContent.slice(1, priceSelector.textContent.indexOf("/")))
        RESULT.tier = clickedCard.querySelector(".option-text-text").textContent;
        RESULT.tier_price = Number(clickedCard.querySelector(".option-text-bill").textContent.slice(1, clickedCard.querySelector(".option-text-bill").textContent.indexOf("/"))) * (RESULT.monthly ? 1 : 10);
        if (clickedCard.classList.contains("card-selected")) {
            RESULT["price"] -= price;
        } else {
            RESULT["price"] += price
        }
        clickedCard.classList.toggle("card-selected")
    })
}


for (let i = 0; i < backButtons.length; i++) {
    backButtons[i].addEventListener("click", function(event) {
        goPreviousStep()
    })
}


for (let i = 0; i < step3Addons.length; i++) {
    const currentAddon = step3Addons[i];
    currentAddon.addEventListener("click", function(event) {
        const priceSelector = currentAddon.querySelector(".add-on-content span");
        const price = parseInt(priceSelector.textContent.slice(2, priceSelector.textContent.indexOf("/")))
        if (currentAddon.classList.contains("card-selected")) {
            RESULT.addons = RESULT.addons.filter(addon => addon.name != currentAddon.querySelector("strong").textContent)   
            RESULT["price"] -= price;
        } else {
            RESULT.addons.push({
                name: currentAddon.querySelector("strong").textContent,
                price
            })
            RESULT["price"] += price
        }
        console.log(RESULT)
        currentAddon.classList.toggle("card-selected")
        currentAddon.firstElementChild.checked = !currentAddon.firstElementChild.checked;
    })
}

nextButtons[step3].addEventListener("click", function(click) {
    stepContents[step4].querySelector(".lower").innerHTML = ""
    for (let addon of RESULT["addons"]) {
        let div = document.createElement("div");
        div.style = "display: flex;justify-content: space-between;align-items: center";
        let span = document.createElement("span");
        span.style = "color: hsl(231, 11%, 63%);font-size: 15px;font-weight:400;margin: 8px 0;"
        span.textContent = addon.name
        let price = document.createElement("p");
        price.style.color = "hsl(213, 96%, 18%)"
        price.textContent = `+$${addon.price}/mo`;
        div.appendChild(span)
        div.appendChild(price)
        console.log(div)
        stepContents[step4].querySelector(".lower").appendChild(div);
    }
    stepContents[step4].querySelector(".total h2").textContent = `+$${RESULT.price}/mo`
    stepContents[step4].querySelector(".upper-text p").textContent = `${RESULT.tier} (${RESULT.monthly ? "Monthly" : "Yearly"})`
    console.log(stepContents[step4].querySelector(".upper-text-price"))
    stepContents[step4].querySelector(".upper-text-price").textContent = `$${RESULT.tier_price}/${RESULT.monthly ? "mo" : "yr"}`
    goNextStep()
})