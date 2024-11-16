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



const blend = [];

function init() {
  const appDiv = document.getElementById('app');
  appDiv.appendChild(createOilList());
  appDiv.appendChild(createBlendArea());
  createSaveButton();
  displaySavedBlends();
}

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

    // Add click event for mobile support
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
