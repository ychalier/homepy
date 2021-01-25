function parseForm() {
    let data = [];
    document.querySelectorAll(".group").forEach((groupDom, i) => {
        let group = {
            "separator": groupDom.querySelector(".group__separator").checked,
            "links": []
        }
        groupDom.querySelectorAll(".group__link").forEach((linkDom, j) => {
            group["links"].push({
                "name": linkDom.querySelector(".group__link__name").value,
                "type": linkDom.querySelector(".group__link__type input:checked").value,
                "url": linkDom.querySelector(".group__link__url").value
            });
        });
        data.push(group);
    });
    return JSON.stringify(data);
}

function moveGroup(direction, button) {
    let group = button.parentNode.parentNode;
    let groupList = group.parentNode;
    if (direction == -1 && group.previousElementSibling) {
        groupList.insertBefore(group, group.previousElementSibling);
    } else if (direction == 1 && group.nextElementSibling) {
        groupList.insertBefore(group, group.nextElementSibling.nextElementSibling);
    }
}

function addLink(button) {
    console.log(button);
    let groupLinks = button.parentNode.parentNode.querySelector(".group__links");
    let previousName = "type-" + Math.floor(Math.random() * 100000) + "-0";
    if (groupLinks.querySelector(".group__link:last-child .group__link__type input")) {
        previousName = groupLinks.querySelector(".group__link:last-child .group__link__type input").getAttribute("name");
    }
    let newName = previousName.split("-")[0] + "-" + previousName.split("-")[1] + "-" + (parseInt(previousName.split("-")[2]) + 1);
    let template = document.getElementById("link_template");
    let clone = document.importNode(template.content, true);
    console.log(previousName);
    clone.querySelectorAll(".group__link__type input").forEach((item, i) => {
        item.setAttribute("name", newName);
    });
    groupLinks.appendChild(clone);
}

function deleteGroup(button) {
    let group = button.parentNode.parentNode;
    let groupList = group.parentNode;
    groupList.removeChild(group);
}

function deleteLink(button) {
    let link = button.parentNode;
    let linkList = link.parentNode;
    linkList.removeChild(link);
}

function addGroup() {
    let groups = document.querySelector(".groups");
    let template = document.getElementById("group_template");
    let clone = document.importNode(template.content, true);
    addLink(clone.querySelector(".group-header button"));
    groups.appendChild(clone);
    window.scrollTo(0, document.body.scrollHeight);
}

function saveForm() {
    let form = document.querySelector("form");
    form.querySelector("input[name='json']").value = parseForm();
    form.submit();
}