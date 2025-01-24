const templates = {
    drake: 'drake.png',
    boyfriend: 'boyfriend.png',
    doge: 'dodge.png',
  };
  
  const canvas = document.getElementById('memeCanvas');
  const ctx = canvas.getContext('2d');
  
  const templateSelect = document.getElementById('templateSelect');
  const imageUpload = document.getElementById('imageUpload');
  const topTextInput = document.getElementById('topText');
  const bottomTextInput = document.getElementById('bottomText');
  const textColorInput = document.getElementById('textColor');
  const strokeColorInput = document.getElementById('strokeColor');
  const generateButton = document.getElementById('generateButton');

  
  let currentImage = new Image();
  
  // Load default template
  function loadTemplate(template) {
    const imagePath = templates[template];
    if (imagePath) {
      currentImage.src = imagePath; // Ensure the path is correct
    } else {
      alert('Template not found!');
    }
  }
  
  // Generate the meme
  function generateMeme() {
    const topText = topTextInput.value.toUpperCase();
    const bottomText = bottomTextInput.value.toUpperCase();
    const textColor = textColorInput.value;
    const strokeColor = strokeColorInput.value;
  
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
  
    // Set text styles
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 4;
    ctx.font = `${Math.floor(canvas.width / 12)}px Impact`;
    ctx.textAlign = 'center';
  
    // Draw top text
    ctx.textBaseline = 'top';
    ctx.strokeText(topText, canvas.width / 2, 10);
    ctx.fillText(topText, canvas.width / 2, 10);
  
    // Draw bottom text
    ctx.textBaseline = 'bottom';
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 10);
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 10);
  
    // Enable download button
    downloadLink.href = canvas.toDataURL('image/png');
    downloadButton.disabled = false;
    downloadButton.removeAttribute('disabled');
  }

  document.addEventListener('DOMContentLoaded', () => {
    loadTemplate('drake'); // Default to the "Drake" template
  });
  
  
  // Event Listeners
  templateSelect.addEventListener('change', () => {
    const selectedTemplate = templateSelect.value;
    if (selectedTemplate === 'custom') {
      imageUpload.style.display = 'inline'; // Show file upload input
    } else {
      imageUpload.style.display = 'none'; // Hide file upload input
      loadTemplate(selectedTemplate); // Load selected template
    }
  });
  
  
  imageUpload.addEventListener('change', () => {
    const file = imageUpload.files[0];
    if (file) {
      currentImage.src = URL.createObjectURL(file);
    }
  });

  currentImage.onload = () => {
    console.log('Image loaded successfully:', currentImage.src);
    generateMeme();
  };
  
  currentImage.onerror = () => {
    console.error('Error loading image:', currentImage.src);
  };
  
  
  currentImage.onload = () => {
    generateMeme();
  };

  generateButton.addEventListener('click', generateMeme);
  