function getNavStep(stage) {
    const base = document.querySelector("#nav .step:has(.step-number-active)")
    if (stage === "current") {
        return base.firstElementChild
    } else if (stage === "next") {
        return base.nextElementSibling.firstElementChild
    } else if (stage === "previous") {
        return base.previousElementSibling.firstElementChild
    }
}

function getContentStep(stage) {
    const base = document.querySelector("#content > article:not(.hidden)")
    if (stage === "current") {
        return base
    } else if (stage === "next") {
        return base.nextElementSibling
    } else if (stage === "previous") {
        return base.previousElementSibling
    }
}

function makeActive(element, bool) {
    if (bool) element.classList.add("step-number-acive");
    else element.classList.remove("step-number-active");
}

function makeHidden(element, bool) {
    if (bool) element.classList.add("hidden");
    else element.classList.remove("hidden");
}

function goNextStep() {
    getNavStep("next").classList.add("step-number-active");
    getNavStep("current").classList.remove("step-number-active");
    getContentStep("next").classList.remove("hidden");
    getContentStep("current").classList.add("hidden");
}

function goPreviousStep() {
    getContentStep("previous").classList.remove("hidden");
    getContentStep("next").classList.add("hidden")
    getNavStep("previous").classList.add("step-number-active");
    getNavStep("next").classList.remove("step-number-active")
}