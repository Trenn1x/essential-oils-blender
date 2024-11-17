// State Variables
let searchQuery = '';
let selectedBenefit = '';
let selectedBenefits = [];
let blendHistory = [];
let historyIndex = -1;
let isUpdatingHistory = false;

// Define the oils array
const oils = [
  { name: 'Lavender', benefits: ['Relaxation', 'Sleep Aid'], safety: 'Generally safe, dilute before use.' },
  { name: 'Peppermint', benefits: ['Energy Boost', 'Headache Relief'], safety: 'Avoid during pregnancy and breastfeeding.' },
  { name: 'Eucalyptus', benefits: ['Respiratory Health', 'Decongestant'], safety: 'May cause skin irritation; dilute properly.' },
  { name: 'Lemon', benefits: ['Detoxification', 'Mood Enhancement'], safety: 'Photosensitive; avoid sunlight after topical use.' },
  { name: 'Tea Tree', benefits: ['Antiseptic', 'Immune Support'], safety: 'Toxic if ingested; external use only.' },
  { name: 'Frankincense', benefits: ['Stress Relief', 'Immune Boost'], safety: 'Generally safe; dilute before use.' },
  { name: 'Chamomile', benefits: ['Relaxation', 'Skin Health'], safety: 'Avoid if allergic to ragweed.' },
  { name: 'Rosemary', benefits: ['Memory Improvement', 'Hair Growth'], safety: 'Avoid during pregnancy; may increase blood pressure.' },
  { name: 'Ylang Ylang', benefits: ['Stress Reduction', 'Aphrodisiac'], safety: 'May cause headaches or nausea in high concentrations.' },
  { name: 'Bergamot', benefits: ['Mood Lifting', 'Stress Reduction'], safety: 'Photosensitive; avoid sunlight after topical use.' },
  { name: 'Grapefruit', benefits: ['Energizing', 'Appetite Control'], safety: 'Photosensitive; avoid sunlight after topical use.' },
  { name: 'Sandalwood', benefits: ['Mental Clarity', 'Stress Relief'], safety: 'Generally safe; dilute before use.' },
  { name: 'Clary Sage', benefits: ['Hormone Balance', 'Stress Reduction'], safety: 'Avoid during pregnancy.' },
  { name: 'Geranium', benefits: ['Skin Health', 'Hormone Balance'], safety: 'Generally safe; may cause skin irritation if not diluted.' },
  { name: 'Patchouli', benefits: ['Mood Enhancement', 'Skin Health'], safety: 'Generally safe; dilute before use.' },
  { name: 'Lemongrass', benefits: ['Muscle Relief', 'Stress Reduction'], safety: 'May cause skin irritation; dilute properly.' },
  { name: 'Cedarwood', benefits: ['Stress Relief', 'Hair Growth'], safety: 'Avoid during pregnancy.' },
  { name: 'Juniper Berry', benefits: ['Detoxification', 'Skin Health'], safety: 'Avoid during pregnancy and kidney disease.' },
  { name: 'Cypress', benefits: ['Circulation Improvement', 'Muscle Relief'], safety: 'Avoid during pregnancy.' },
  { name: 'Neroli', benefits: ['Skin Regeneration', 'Stress Relief'], safety: 'Generally safe; dilute before use.' },
  { name: 'Jasmine', benefits: ['Aphrodisiac', 'Mood Lifting'], safety: 'Generally safe; dilute before use.' },
  { name: 'Cinnamon', benefits: ['Antimicrobial', 'Circulation Boost'], safety: 'Can cause skin irritation; use in low concentrations.' },
  { name: 'Ginger', benefits: ['Digestive Aid', 'Anti-Inflammatory'], safety: 'May cause skin irritation; dilute properly.' },
  { name: 'Rose', benefits: ['Mood Enhancement', 'Skin Health'], safety: 'Generally safe; dilute before use.' },
  { name: 'Myrrh', benefits: ['Skin Health', 'Immune Support'], safety: 'Avoid during pregnancy.' },
  { name: 'Basil', benefits: ['Mental Alertness', 'Muscle Relief'], safety: 'Avoid during pregnancy; may cause skin irritation.' },
  { name: 'Orange', benefits: ['Mood Enhancement', 'Immune Support'], safety: 'Photosensitive; avoid sunlight after topical use.' },
  { name: 'Spearmint', benefits: ['Digestive Aid', 'Mental Clarity'], safety: 'Generally safe; dilute before use.' },
  { name: 'Pine', benefits: ['Respiratory Health', 'Energy Boost'], safety: 'May cause skin irritation; dilute properly.' },
  { name: 'Black Pepper', benefits: ['Circulation Boost', 'Muscle Relief'], safety: 'Use in low concentrations; may cause skin irritation.' },
  { name: 'Helichrysum', benefits: ['Skin Regeneration', 'Anti-Inflammatory'], safety: 'Generally safe; dilute before use.' },
  { name: 'Lime', benefits: ['Antioxidant', 'Mood Lifting'], safety: 'Photosensitive; avoid sunlight after topical use.' },
  { name: 'Marjoram', benefits: ['Muscle Relaxation', 'Stress Relief'], safety: 'Avoid during pregnancy.' },
  { name: 'Thyme', benefits: ['Immune Support', 'Antimicrobial'], safety: 'Use in low concentrations; may cause skin irritation.' },
  { name: 'Vetiver', benefits: ['Grounding', 'Stress Reduction'], safety: 'Generally safe; dilute before use.' },
  { name: 'Wintergreen', benefits: ['Pain Relief', 'Anti-Inflammatory'], safety: 'Avoid during pregnancy; can be toxic if ingested.' },
  { name: 'Clove', benefits: ['Antimicrobial', 'Dental Health'], safety: 'Use in low concentrations; may cause skin irritation.' },
  { name: 'Oregano', benefits: ['Immune Support', 'Antimicrobial'], safety: 'Use in low concentrations; may cause skin irritation.' },
];

// Define suggested blends
const suggestedBlends = [
  {
    name: 'Relaxation Blend',
    oils: [
      { name: 'Lavender', ratio: 50 },
      { name: 'Chamomile', ratio: 30 },
      { name: 'Bergamot', ratio: 20 },
    ],
  },
  {
    name: 'Energy Boost Blend',
    oils: [
      { name: 'Peppermint', ratio: 40 },
      { name: 'Lemon', ratio: 30 },
      { name: 'Rosemary', ratio: 30 },
    ],
  },
  // Add more blends as desired
];

const blend = [];

function init() {
  const appDiv = document.getElementById('app');

  // Create search bar
  const searchBar = document.createElement('input');
  searchBar.type = 'text';
  searchBar.id = 'search-bar';
  searchBar.placeholder = 'Search oils...';
  searchBar.addEventListener('input', handleSearch);
  appDiv.appendChild(searchBar);

  // Create benefit filter dropdown
  const benefitFilter = document.createElement('select');
  benefitFilter.id = 'benefit-filter';
  benefitFilter.innerHTML = `<option value="">Filter by benefit</option>`;
  benefitFilter.addEventListener('change', handleBenefitFilter);

  // Populate the dropdown with benefits
  const allBenefits = [...new Set(oils.flatMap(oil => oil.benefits))];
  allBenefits.forEach(benefit => {
    const option = document.createElement('option');
    option.value = benefit;
    option.text = benefit;
    benefitFilter.appendChild(option);
  });
  appDiv.appendChild(benefitFilter);

  // Create benefit selection checkboxes
  const benefitSelectionDiv = document.createElement('div');
  benefitSelectionDiv.id = 'benefit-selection';

  const benefitHeading = document.createElement('h2');
  benefitHeading.innerText = 'Select Desired Benefits';
  benefitSelectionDiv.appendChild(benefitHeading);

  allBenefits.forEach(benefit => {
    const label = document.createElement('label');
    label.className = 'benefit-option';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = benefit;
    checkbox.addEventListener('change', handleBenefitSelection);

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(benefit));

    benefitSelectionDiv.appendChild(label);
  });
  appDiv.appendChild(benefitSelectionDiv);

  appDiv.appendChild(createOilList());

  // Create the blend container
  const blendContainer = document.createElement('div');
  blendContainer.id = 'blend-container';

  // Append the blend area to the blend container
  blendContainer.appendChild(createBlendArea());

  // Append the blend display (sliders) to the blend container
  const blendDisplay = document.createElement('div');
  blendDisplay.id = 'blend-display';
  blendContainer.appendChild(blendDisplay);

  // Append the total ratio display
  const totalRatioDisplay = document.createElement('div');
  totalRatioDisplay.id = 'total-ratio-display';
  blendContainer.appendChild(totalRatioDisplay);

  // Append the benefits display to the blend container
  const benefitsDisplay = document.createElement('div');
  benefitsDisplay.id = 'benefits-display';
  blendContainer.appendChild(benefitsDisplay);

  appDiv.appendChild(blendContainer);

  // Create Undo and Redo buttons
  const undoButton = document.createElement('button');
  undoButton.innerText = 'Undo';
  undoButton.addEventListener('click', undo);
  appDiv.appendChild(undoButton);

  const redoButton = document.createElement('button');
  redoButton.innerText = 'Redo';
  redoButton.addEventListener('click', redo);
  appDiv.appendChild(redoButton);

  // Create Save button
  createSaveButton();

  // Display suggested blends
  displaySuggestedBlends();

  // Display saved blends
  displaySavedBlends();

  // Initialize blend history
  saveBlendState();
}

function createOilList(oilsToDisplay = oils) {
  const oilListDiv = document.createElement('div');
  oilListDiv.id = 'oil-list';

  oilsToDisplay.forEach((oil) => {
    const oilItem = document.createElement('div');
    oilItem.className = 'oil-item';
    oilItem.draggable = true;
    oilItem.innerText = oil.name;

    // Drag events
    oilItem.addEventListener('dragstart', handleDragStart);

    // Click event for mobile support
    oilItem.addEventListener('click', () => {
      addOilToBlend(oil.name);
    });

    // Show safety info on hover or click
    oilItem.addEventListener('dblclick', () => {
      showSafetyInfo(oil.name);
    });

    oilListDiv.appendChild(oilItem);
  });

  return oilListDiv;
}

function updateOilList(oilsToDisplay) {
  const oilListDiv = document.getElementById('oil-list');
  oilListDiv.innerHTML = '';
  oilsToDisplay.forEach((oil) => {
    const oilItem = document.createElement('div');
    oilItem.className = 'oil-item';
    oilItem.draggable = true;
    oilItem.innerText = oil.name;

    // Drag events
    oilItem.addEventListener('dragstart', handleDragStart);

    // Click event for mobile support
    oilItem.addEventListener('click', () => {
      addOilToBlend(oil.name);
    });

    // Show safety info on hover or click
    oilItem.addEventListener('dblclick', () => {
      showSafetyInfo(oil.name);
    });

    oilListDiv.appendChild(oilItem);
  });
}

function filterAndUpdateOilList() {
  let filteredOils = oils;

  if (searchQuery) {
    filteredOils = filteredOils.filter(oil =>
      oil.name.toLowerCase().includes(searchQuery)
    );
  }

  if (selectedBenefit) {
    filteredOils = filteredOils.filter(oil =>
      oil.benefits.includes(selectedBenefit)
    );
  }

  if (selectedBenefits.length > 0) {
    filteredOils = filteredOils.filter(oil =>
      selectedBenefits.every(benefit => oil.benefits.includes(benefit))
    );
  }

  updateOilList(filteredOils);
}

function handleSearch(e) {
  searchQuery = e.target.value.toLowerCase();
  filterAndUpdateOilList();
}

function handleBenefitFilter(e) {
  selectedBenefit = e.target.value;
  filterAndUpdateOilList();
}

function handleBenefitSelection(e) {
  const benefit = e.target.value;
  if (e.target.checked) {
    selectedBenefits.push(benefit);
  } else {
    selectedBenefits = selectedBenefits.filter(b => b !== benefit);
  }
  filterAndUpdateOilList();
}

function createBlendArea() {
  const blendAreaDiv = document.createElement('div');
  blendAreaDiv.id = 'blend-area';
  blendAreaDiv.innerText = 'Drag oils here or tap on them to add to your blend';

  // Drag events
  blendAreaDiv.addEventListener('dragover', handleDragOver);
  blendAreaDiv.addEventListener('drop', handleDrop);

  return blendAreaDiv;
}

function clearSelection() {
  const oilItems = document.querySelectorAll('.oil-item.selected');
  oilItems.forEach((item) => {
    item.classList.remove('selected');
  });
}


function loadBlend(savedBlend) {
  blend.length = 0; // Clear current blend
  savedBlend.forEach((oil) => blend.push({ ...oil }));
  clearSelection(); // Clear previous selection
  savedBlend.forEach((oil) => {
    const oilItems = document.querySelectorAll('.oil-item');
    oilItems.forEach((item) => {
      if (item.innerText === oil.name) {
        item.classList.add('selected');
      }
    });
  });
  updateBlendDisplay();
  saveBlendState();
}


let draggedOil = null;

function handleDragStart(e) {
  draggedOil = e.target.innerText;
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDrop(e) {
  e.preventDefault();
  if (draggedOil) {
    addOilToBlend(draggedOil);
    draggedOil = null;
  }
}

function addOilToBlend(oilName) {
  const existingOil = blend.find((item) => item.name === oilName);
  if (existingOil) {
    existingOil.ratio += 10;
    if (existingOil.ratio > 100) {
      existingOil.ratio = 100;
    }
  } else {
    blend.push({ name: oilName, ratio: 10 });
  }

  // Add selected class to the oil item
  const oilItems = document.querySelectorAll('.oil-item');
  oilItems.forEach((item) => {
    if (item.innerText === oilName) {
      item.classList.add('selected');
    }
  });

  updateBlendDisplay();
  saveBlendState();
}

function removeOilFromBlend(oilName) {
  const index = blend.findIndex((oil) => oil.name === oilName);
  if (index !== -1) {
    blend.splice(index, 1);
    updateBlendDisplay();
    saveBlendState();
  }
}


function updateBlendDisplay() {
  const blendDisplay = document.getElementById('blend-display');
  blendDisplay.innerHTML = '';

  blend.forEach((oil) => {
    const oilDiv = document.createElement('div');

    const label = document.createElement('label');
    label.innerText = `${oil.name}: `;

    const input = document.createElement('input');
    input.type = 'range';
    input.min = 0;
    input.max = 100;
    input.value = oil.ratio;

    const ratioLabel = document.createElement('span');
    ratioLabel.innerText = `${oil.ratio}%`;

    input.addEventListener('input', (e) => {
      oil.ratio = parseInt(e.target.value);
      ratioLabel.innerText = `${oil.ratio}%`;
      updateTotalRatioDisplay();
      updateBenefitsDisplay();
      saveBlendState();
    });

    // Remove Button
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'small-button remove-button';
    removeButton.addEventListener('click', () => {
      removeOilFromBlend(oil.name);
    });

    oilDiv.appendChild(label);
    oilDiv.appendChild(input);
    oilDiv.appendChild(ratioLabel);
    oilDiv.appendChild(removeButton);

    blendDisplay.appendChild(oilDiv);
  });

  updateTotalRatioDisplay();
  updateBenefitsDisplay();
  updateSelectionState();
}


function updateTotalRatioDisplay() {
  const totalRatioDisplay = document.getElementById('total-ratio-display');
  const totalRatio = blend.reduce((sum, oil) => sum + oil.ratio, 0);
  totalRatioDisplay.innerText = `Total Ratio: ${totalRatio}%`;
}

function updateBenefitsDisplay() {
  const benefitsDisplay = document.getElementById('benefits-display');
  const combinedBenefits = [];
  blend.forEach((oil) => {
    const oilData = oils.find((o) => o.name === oil.name);
    if (oilData && oilData.benefits) {
      combinedBenefits.push(...oilData.benefits);
    }
  });
  const uniqueBenefits = [...new Set(combinedBenefits)];
  benefitsDisplay.innerText = `Potential Benefits: ${uniqueBenefits.join(', ')}`;
}

function createSaveButton() {
  const appDiv = document.getElementById('app');
  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save Blend';
  saveButton.addEventListener('click', saveBlend);
  appDiv.appendChild(saveButton);
}

function saveBlend() {
  const totalRatio = blend.reduce((sum, oil) => sum + oil.ratio, 0);
  if (totalRatio === 0) {
    alert('Your blend is empty. Please add oils to your blend.');
    return;
  }
  if (totalRatio !== 100) {
    const confirmNormalize = confirm(`The total ratio is ${totalRatio}%. Do you want to normalize the ratios to sum to 100%?`);
    if (confirmNormalize) {
      blend.forEach((oil) => {
        oil.ratio = (oil.ratio / totalRatio) * 100;
      });
      updateBlendDisplay(); // Update sliders to show normalized values
    } else {
      alert('Please adjust the ratios so that the total sums to 100% before saving.');
      return;
    }
  }
  const blendName = prompt('Enter a name for your blend:');
  if (blendName) {
    const blendData = {
      name: blendName,
      oils: blend
    };
    // Retrieve existing blends from localStorage
    let savedBlends = JSON.parse(localStorage.getItem('blends')) || {};
    // Save the new blend
    savedBlends[blendName] = blendData;
    localStorage.setItem('blends', JSON.stringify(savedBlends));
    alert('Blend saved locally!');
    displaySavedBlends();
  }
}

function updateSelectionState() {
  const oilItems = document.querySelectorAll('.oil-item');
  oilItems.forEach((item) => {
    const oilName = item.innerText;
    const isInBlend = blend.some((oil) => oil.name === oilName);
    if (isInBlend) {
      item.classList.add('selected');
    } else {
      item.classList.remove('selected');
    }
  });
}



function displaySavedBlends() {
  let savedBlendsDiv = document.getElementById('saved-blends');
  const appDiv = document.getElementById('app');

  // Remove the existing savedBlendsDiv if it exists
  if (savedBlendsDiv) {
    savedBlendsDiv.innerHTML = '';
    savedBlendsDiv.parentNode.removeChild(savedBlendsDiv);
  } else {
    savedBlendsDiv = document.createElement('div');
    savedBlendsDiv.id = 'saved-blends';
  }

  // Append the savedBlendsDiv to the appDiv after all other elements
  appDiv.appendChild(savedBlendsDiv);

  // Now populate the savedBlendsDiv
  const heading = document.createElement('h2');
  heading.innerText = 'Saved Blends';
  savedBlendsDiv.appendChild(heading);

  // Fetch blends from localStorage
  const savedBlends = JSON.parse(localStorage.getItem('blends')) || {};
  const blendNames = Object.keys(savedBlends);

  if (blendNames.length > 0) {
    blendNames.forEach((blendName) => {
      const blendDiv = document.createElement('div');
      blendDiv.className = 'saved-blend-item';

      const blendNameDiv = document.createElement('span');
      blendNameDiv.innerText = blendName;
      blendNameDiv.style.cursor = 'pointer';
      blendNameDiv.addEventListener('click', () => {
        loadBlend(savedBlends[blendName].oils);
      });

      // Edit button
      const editButton = document.createElement('button');
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', (e) => {
        e.stopPropagation();
        editBlend(blendName);
      });

      // Delete button
      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteBlend(blendName);
      });

      blendDiv.appendChild(blendNameDiv);
      blendDiv.appendChild(editButton);
      blendDiv.appendChild(deleteButton);

      savedBlendsDiv.appendChild(blendDiv);
    });
  } else {
    const noBlendsMsg = document.createElement('p');
    noBlendsMsg.innerText = 'No blends saved.';
    savedBlendsDiv.appendChild(noBlendsMsg);
  }
}

function editBlend(blendName) {
  const savedBlends = JSON.parse(localStorage.getItem('blends')) || {};
  const blendToEdit = savedBlends[blendName];

  if (blendToEdit) {
    blend.length = 0; // Clear current blend
    blendToEdit.oils.forEach((oil) => blend.push({ ...oil }));
    updateBlendDisplay();

    // Remove the old blend to avoid duplication
    delete savedBlends[blendName];
    localStorage.setItem('blends', JSON.stringify(savedBlends));
    displaySavedBlends();
    saveBlendState();
  } else {
    alert('Blend not found.');
  }
}

function deleteBlend(blendName) {
  if (confirm(`Are you sure you want to delete the blend "${blendName}"?`)) {
    const savedBlends = JSON.parse(localStorage.getItem('blends')) || {};
    delete savedBlends[blendName];
    localStorage.setItem('blends', JSON.stringify(savedBlends));
    displaySavedBlends();
  }
}

function displaySuggestedBlends() {
  const appDiv = document.getElementById('app');
  const suggestedBlendsDiv = document.createElement('div');
  suggestedBlendsDiv.id = 'suggested-blends';

  const heading = document.createElement('h2');
  heading.innerText = 'Suggested Blends';
  suggestedBlendsDiv.appendChild(heading);

  suggestedBlends.forEach((blend) => {
    const blendDiv = document.createElement('div');
    blendDiv.className = 'suggested-blend-item';
    blendDiv.innerText = blend.name;
    blendDiv.addEventListener('click', () => {
      loadBlend(blend.oils);
    });
    suggestedBlendsDiv.appendChild(blendDiv);
  });

  appDiv.appendChild(suggestedBlendsDiv);
}

function saveBlendState() {
  if (isUpdatingHistory) return;

  // Remove any redo history
  blendHistory = blendHistory.slice(0, historyIndex + 1);

  // Save a deep copy of the current blend
  const blendCopy = JSON.parse(JSON.stringify(blend));
  blendHistory.push(blendCopy);
  historyIndex++;
}

function undo() {
  if (historyIndex > 0) {
    historyIndex--;
    isUpdatingHistory = true;
    blend.length = 0;
    blendHistory[historyIndex].forEach(oil => blend.push({ ...oil }));
    updateBlendDisplay();
    isUpdatingHistory = false;
  }
}

function redo() {
  if (historyIndex < blendHistory.length - 1) {
    historyIndex++;
    isUpdatingHistory = true;
    blend.length = 0;
    blendHistory[historyIndex].forEach(oil => blend.push({ ...oil }));
    updateBlendDisplay();
    isUpdatingHistory = false;
  }
}

function showSafetyInfo(oilName) {
  const oil = oils.find(o => o.name === oilName);
  if (oil) {
    const modal = document.getElementById('safety-modal');
    const modalOilName = document.getElementById('modal-oil-name');
    const modalSafetyInfo = document.getElementById('modal-safety-info');
    const closeButton = document.querySelector('.close-button');

    modalOilName.innerText = oil.name;
    modalSafetyInfo.innerText = oil.safety;
    modal.style.display = 'block';

    // Close the modal when the close button is clicked
    closeButton.onclick = function() {
      modal.style.display = 'none';
    };

    // Close the modal when the user clicks outside the modal content
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  }
}


// Initialize the app
window.onload = init;