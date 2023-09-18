import jobListing from "./data.json" assert { type: "json" };

const container = document.getElementById("container");

console.log(container);

const search = document.createElement("div");
search.className = "search";
container.appendChild(search);

const jobs = document.createElement("div");
jobs.className = "jobs";
container.appendChild(jobs);

const searchContent = document.createElement("div");
searchContent.className = "search-content";
search.appendChild(searchContent);

const clear = document.createElement("div");
clear.className = "clear";
search.appendChild(clear);

const clearButton = document.createElement("button");
clearButton.className = "clear-tag";
clearButton.textContent = "clear";
clear.appendChild(clearButton);

// -------------------------------------------------//

for (let i = 0; i < jobListing.length; i++) {
  const jobsBox = document.createElement("div");
  jobsBox.className = "jobs-box";
  jobs.appendChild(jobsBox);

  const columnLeft = document.createElement("div");
  columnLeft.className = "job column column--left";
  jobsBox.appendChild(columnLeft);

  const logo = document.createElement("img");
  logo.className = "jobs-img";
  logo.src = jobListing[i].logo;
  columnLeft.appendChild(logo);

  const jobInfo = document.createElement("div");
  jobInfo.className = "job-info";
  columnLeft.appendChild(jobInfo);

  const hot = document.createElement("div");
  hot.className = "hot";
  jobInfo.appendChild(hot);

  const jobCompany = document.createElement("span");
  jobCompany.className = "jobs-company";
  jobCompany.textContent = jobListing[i].company;
  hot.appendChild(jobCompany);

  if (jobListing[i].new === true) {
    const New = document.createElement("span");
    New.className = "new";
    hot.appendChild(New);
    New.textContent = "new!";
  }

  if (jobListing[i].featured === true) {
    const featured = document.createElement("span");
    featured.className = "featured";
    hot.appendChild(featured);
    featured.textContent = "featured";
  }

  const jobsTitle = document.createElement("span");
  jobsTitle.className = "jobs-title";
  jobsTitle.textContent = jobListing[i].position;
  jobInfo.appendChild(jobsTitle);

  const ul = document.createElement("ul");
  ul.className = "jobs-detail";
  jobInfo.appendChild(ul);

  const PostedAt = document.createElement("li");
  PostedAt.textContent = jobListing[i].postedAt;
  ul.appendChild(PostedAt);

  const Contract = document.createElement("li");
  Contract.textContent = jobListing[i].contract;
  ul.appendChild(Contract);

  const Location = document.createElement("li");
  Location.textContent = jobListing[i].location;
  ul.appendChild(Location);

  const columnRight = document.createElement("div");
  columnRight.className = "job column column--right";
  jobsBox.appendChild(columnRight);

  const tags = document.createElement("div");
  tags.className = "tags";
  columnRight.appendChild(tags);

  const role = document.createElement("span");
  role.className = "tag";
  tags.appendChild(role);
  role.textContent = jobListing[i].role;

  const level = document.createElement("span");
  level.className = "tag";
  tags.appendChild(level);
  level.textContent = jobListing[i].level;

  jobListing[i].languages.forEach((lang) => {
    const languages = document.createElement("span");
    languages.className = "tag";
    tags.appendChild(languages);
    languages.textContent = lang;
  });

  jobListing[i].tools.forEach((tool) => {
    const tools = document.createElement("span");
    tools.className = "tag";
    tags.appendChild(tools);
    tools.textContent = tool;
  });
}

const selectedTags = [];

document.querySelectorAll(".tag").forEach((tag) => {
  tag.addEventListener("click", function () {
    const clickedTag = tag.textContent;

    if (!selectedTags.includes(clickedTag)) {
      selectedTags.push(clickedTag);

      search.style.display = "flex";

      const closeTag = document.createElement("span");
      closeTag.className = "close-tag";
      closeTag.textContent = clickedTag;

      closeTag.addEventListener("click", function () {
        selectedTags.splice(selectedTags.indexOf(clickedTag), 1);
        searchContent.removeChild(closeTag);
      });
      searchContent.appendChild(closeTag);
    }
  });
});

function clearTags() {
  while (searchContent.firstChild) {
    searchContent.removeChild(searchContent.firstChild);
  }

  selectedTags.length = 0;
}

clearButton.addEventListener("click", clearTags);

// -----------------------------------//

function filterAndShowJobs(selectedTags) {
  const jobBoxes = document.querySelectorAll(".jobs-box");

  jobBoxes.forEach((jobBox) => {
    const jobTags = Array.from(jobBox.querySelectorAll(".tag"));
    const shouldShow = selectedTags.every((selectedTag) =>
      jobTags.some((jobTag) => jobTag.textContent === selectedTag)
    );
    jobBox.style.display = shouldShow ? "block" : "none";
  });
}

function addTagAndUpdateJobs(tag) {
  const selectedTags = Array.from(
    searchContent.querySelectorAll(".close-tag")
  ).map((closeTag) => closeTag.textContent);
  selectedTags.push(tag);
  const uniqueSelectedTags = [...new Set(selectedTags)];
  filterAndShowJobs(uniqueSelectedTags);
  refreshSearchContent(uniqueSelectedTags);
}

function removeTagAndUpdateJobs(tagToRemove) {
  const selectedTags = Array.from(
    searchContent.querySelectorAll(".close-tag")
  ).map((closeTag) => closeTag.textContent);
  const indexToRemove = selectedTags.indexOf(tagToRemove);
  if (indexToRemove !== -1) {
    selectedTags.splice(indexToRemove, 1);
    filterAndShowJobs(selectedTags);
    refreshSearchContent(selectedTags);
  }
}

function refreshSearchContent(selectedTags) {
  searchContent.innerHTML = "";
  selectedTags.forEach((tag) => {
    const closeTag = document.createElement("span");
    closeTag.className = "close-tag";
    closeTag.textContent = tag;
    searchContent.appendChild(closeTag);
  });
}

document.querySelectorAll(".tag").forEach((tag) => {
  tag.addEventListener("click", function () {
    const clickedTag = tag.textContent;
    addTagAndUpdateJobs(clickedTag);
  });
});

searchContent.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-tag")) {
    const tagToRemove = event.target.textContent;
    removeTagAndUpdateJobs(tagToRemove);
  }
});

function resetJobListing() {
  const jobBoxes = document.querySelectorAll(".jobs-box");
  jobBoxes.forEach((jobBox) => {
    jobBox.style.display = "block";
  });
  searchContent.innerHTML = "";
}

clearButton.addEventListener("click", function () {
  resetJobListing();
});

searchContent.addEventListener("click", function (event) {
  if (event.target.classList.contains("close-tag")) {
    const tagToRemove = event.target.textContent;
    removeTagAndUpdateJobs(tagToRemove);
  }
});
