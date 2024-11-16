// Sample list of essential oils
const oils = [
  { name: 'Lavender', benefits: ['Relaxation', 'Sleep Aid'] },
  { name: 'Peppermint', benefits: ['Energy Boost', 'Headache Relief'] },
  { name: 'Eucalyptus', benefits: ['Respiratory Health', 'Decongestant'] },
  // Add more oils as needed
];

const blend = [];

function init() {
  const appDiv = document.getElementById('app');
  appDiv.appendChild(createOilList());
  appDiv.appendChild(createBlendArea());
  createSaveButton();
  displaySavedBlends();
}

// Create list of oils
function createOilList() {
  const oilListDiv = document.createElement('div');
  oilListDiv.id = 'oil-list';

  oils.forEach((oil) => {
    const oilItem = document.createElement('div');
    oilItem.className = 'oil-item';
    oilItem.draggable = true;
    oilItem.innerText = oil.name;

    // Drag events
    oilItem.addEventListener('dragstart', handleDragStart);
    oilItem.addEventListener('click', () => {
      addOilToBlend(oil.name);
    });
    oilListDiv.appendChild(oilItem);
  });

  return oilListDiv;
}

// Create blend area
function createBlendArea() {
  const blendAreaDiv = document.createElement('div');
  blendAreaDiv.id = 'blend-area';
  blendAreaDiv.innerText = 'Drag oils here or tap on them to add to your blend';

  // Drag events
  blendAreaDiv.addEventListener('dragover', handleDragOver);
  blendAreaDiv.addEventListener('drop', handleDrop);

  return blendAreaDiv;
}

// Drag and drop handlers
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

// Add oil to blend
function addOilToBlend(oilName) {
  const existingOil = blend.find((item) => item.name === oilName);
  if (existingOil) {
    existingOil.ratio += 10;
  } else {
    blend.push({ name: oilName, ratio: 10 });
  }
  updateBlendDisplay();
}

// Update blend display
function updateBlendDisplay() {
  let blendDisplay = document.getElementById('blend-display');
  if (!blendDisplay) {
    blendDisplay = document.createElement('div');
    blendDisplay.id = 'blend-display';
    document.getElementById('app').appendChild(blendDisplay);
  }
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
    input.addEventListener('input', (e) => {
      oil.ratio = parseInt(e.target.value);
      ratioLabel.innerText = `${oil.ratio}%`;
      updateBenefitsDisplay();
    });

    const ratioLabel = document.createElement('span');
    ratioLabel.innerText = `${oil.ratio}%`;

    oilDiv.appendChild(label);
    oilDiv.appendChild(input);
    oilDiv.appendChild(ratioLabel);

    blendDisplay.appendChild(oilDiv);
  });
  updateBenefitsDisplay();
}

// Display potential benefits
function updateBenefitsDisplay() {
  let benefitsDisplay = document.getElementById('benefits-display');
  if (!benefitsDisplay) {
    benefitsDisplay = document.createElement('div');
    benefitsDisplay.id = 'benefits-display';
    document.getElementById('app').appendChild(benefitsDisplay);
  }
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

// Save blend
function createSaveButton() {
  const saveButton = document.createElement('button');
  saveButton.innerText = 'Save Blend';
  saveButton.addEventListener('click', saveBlend);
  document.getElementById('app').appendChild(saveButton);
}

function saveBlend() {
  const blendName = prompt('Enter a name for your blend:');
  if (blendName) {
    const savedBlends = JSON.parse(localStorage.getItem('savedBlends')) || {};
    savedBlends[blendName] = blend;
    localStorage.setItem('savedBlends', JSON.stringify(savedBlends));
    alert('Blend saved!');
    displaySavedBlends();
  }
}

// Display saved blends
function displaySavedBlends() {
  let savedBlendsDiv = document.getElementById('saved-blends');
  if (savedBlendsDiv) {
    savedBlendsDiv.innerHTML = '';
  } else {
    savedBlendsDiv = document.createElement('div');
    savedBlendsDiv.id = 'saved-blends';
    document.getElementById('app').appendChild(savedBlendsDiv);
  }
  savedBlendsDiv.innerHTML = '<h2>Saved Blends</h2>';
  const savedBlends = JSON.parse(localStorage.getItem('savedBlends')) || {};
  for (const [blendName, blendData] of Object.entries(savedBlends)) {
    const blendDiv = document.createElement('div');
    blendDiv.innerText = blendName;
    blendDiv.style.cursor = 'pointer';
    blendDiv.addEventListener('click', () => {
      blend.length = 0;
      blendData.forEach((oil) => blend.push({ ...oil }));
      updateBlendDisplay();
    });
    savedBlendsDiv.appendChild(blendDiv);
  }
}

window.onload = init;
