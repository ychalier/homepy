let groups = document.querySelectorAll(".group");
for(let i = 0; i < groups.length; i++) {
    let children = groups[i].querySelectorAll("a");
    for(let j=1; j < children.length; j++) {
        let separator = document.createElement("span");
        separator.innerHTML = "\\";
        separator.className = "hide";
        groups[i].insertBefore(separator, children[j]);
    }
    let period = document.createElement("span");
    period.innerHTML = ".";
    period.className = "hide";
    groups[i].appendChild(period);
}
