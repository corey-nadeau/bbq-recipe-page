document.addEventListener("DOMContentLoaded", function() {
    const recipeInput = document.getElementById("recipeInput");
    const saveButton = document.getElementById("saveButton");
    const versionList = document.getElementById("versionList");
  
    saveButton.addEventListener("click", function() {
      const recipe = recipeInput.value.trim();
      if (recipe !== "") {
        const versionItem = document.createElement("div");
        versionItem.textContent = recipe;
        versionItem.classList.add("bg-gray-200", "p-2", "rounded", "mb-2");
  
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-1", "px-2", "rounded", "focus:outline-none", "focus:shadow-outline", "ml-2");
        deleteButton.addEventListener("click", function() {
          versionItem.remove();
          deleteRecipeVersion(recipe);
        });
  
        versionItem.appendChild(deleteButton);
        versionList.prepend(versionItem);
        recipeInput.value = "";
  
        saveRecipeVersion(recipe);
      }
    });
  
    loadRecipeVersions();
  
    function saveRecipeVersion(recipe) {
      let versions = [];
      if (localStorage.getItem("recipeVersions")) {
        versions = JSON.parse(localStorage.getItem("recipeVersions"));
      }
      versions.unshift(recipe);
      localStorage.setItem("recipeVersions", JSON.stringify(versions));
    }
  
    function loadRecipeVersions() {
      if (localStorage.getItem("recipeVersions")) {
        const versions = JSON.parse(localStorage.getItem("recipeVersions"));
        versions.forEach(function(recipe) {
          const versionItem = document.createElement("div");
          versionItem.textContent = recipe;
          versionItem.classList.add("bg-gray-200", "p-2", "rounded", "mb-2");
  
          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.classList.add("bg-red-500", "hover:bg-red-700", "text-white", "font-bold", "py-1", "px-2", "rounded", "focus:outline-none", "focus:shadow-outline", "ml-2");
          deleteButton.addEventListener("click", function() {
            versionItem.remove();
            deleteRecipeVersion(recipe);
          });
  
          versionItem.appendChild(deleteButton);
          versionList.appendChild(versionItem);
        });
      }
    }
  
    function deleteRecipeVersion(recipe) {
      if (localStorage.getItem("recipeVersions")) {
        const versions = JSON.parse(localStorage.getItem("recipeVersions"));
        const index = versions.indexOf(recipe);
        if (index > -1) {
          versions.splice(index, 1);
          localStorage.setItem("recipeVersions", JSON.stringify(versions));
        }
      }
    }
  });
  