document.addEventListener("DOMContentLoaded", function () {
  const opportunityForm = document.getElementById("opportunityForm");
  const companyNameInput = document.getElementById("companyName");
  const linkedinUrlInput = document.getElementById("linkedinUrl");
  const contactPersonInput = document.getElementById("contactPerson");
  const notesInput = document.getElementById("notes");
  const tagsInput = document.getElementById("tags");
  const noOpportunitiesMessage = document.getElementById("noOpportunities");
  const opportunityList = document.getElementById("opportunityList");
  const deleteBtn = document.querySelector(".delete-btn");

  let opportunities = [];

  const oppsFromLocalStorage = JSON.parse(
    localStorage.getItem("opportunities")
  );
  if (oppsFromLocalStorage) {
    opportunities = oppsFromLocalStorage;
    renderOpportunities();
  }

  linkedinUrlInput.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      linkedinUrlInput.value = tabs[0].url;
    });
  });

  opportunityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newOpportunity = {
      companyName: companyNameInput.value.trim(),
      linkedinUrl: linkedinUrlInput.value.trim(),
      contactPerson: contactPersonInput.value.trim(),
      notes: notesInput.value.trim(),
      tags: tagsInput.value.trim(),
    };

    opportunities.push(newOpportunity);
    localStorage.setItem("opportunities", JSON.stringify(opportunities));
    renderOpportunities();
    opportunityForm.reset();
  });

  deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    opportunities = [];
    renderOpportunities();
    opportunityList.innerHTML =
      "No opportunities saved yet. Start adding some above!";
  });

  function renderOpportunities() {
    opportunityList.innerHTML = "";

    const ul = document.createElement("ul");

    opportunities.forEach((opportunity) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${opportunity.companyName}</strong>`;

      const sublist = document.createElement("ul");

      const linkedinItem = document.createElement("li");
      linkedinItem.innerHTML = `LinkedIn: <a href="${opportunity.linkedinUrl}" target="_blank">${opportunity.linkedinUrl}</a>`;

      const contactItem = document.createElement("li");
      contactItem.textContent = `Contact: ${opportunity.contactPerson}`;

      const notesItem = document.createElement("li");
      notesItem.textContent = `Notes: ${opportunity.notes}`;

      const tagsItem = document.createElement("li");
      tagsItem.textContent = `Tags: ${opportunity.tags}`;

      sublist.append(linkedinItem, contactItem, notesItem, tagsItem);
      li.appendChild(sublist);
      ul.appendChild(li);
    });

    opportunityList.appendChild(ul);
  }
});
