chrome.storage.local.get("techStack", (result) => {
  const techs = result.techStack || [];
  const list = document.getElementById("tech-list");

  if (techs.length) {
    list.innerHTML = "";
    techs.forEach((tech) => {
      const li = document.createElement("li");
      li.textContent = tech;
      list.appendChild(li);
    });
  } else {
    list.textContent = "No technologies detected.";
  }
});
