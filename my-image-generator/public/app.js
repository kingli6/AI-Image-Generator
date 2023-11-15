// WARNING: do not upload your API key onto GITHUB. It can remain in your git commit history as well!
// this is purely for personal use!
const submitIcon = document.querySelector('#submit-icon');
console.log('submitIcon:', submitIcon); // Add this line
const inputElement = document.querySelector('input');
const imageSection = document.querySelector('.images-section');

//
//
const getImages = async () => {
  console.log('getImages function called');
  const prompt = inputElement.value;
  const n = 1;
  const size = '1024x1024';

  try {
    console.log('Before fetch');
    const response = await fetch('/api/getImages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, n, size }),
    });
    console.log('After fetch');
    console.log('Fetch response:', response); // Add this line

    if (!response.ok) {
      // If the response status is not okay, handle the error
      console.error('Error:', response.statusText);
      return;
    }

    const data = await response.json();
    console.log('Fetch response:', data);

    // If data exists
    data?.data?.forEach((imageObject) => {
      // creating div element for each object
      const imageContainer = document.createElement('div');
      imageContainer.classList.add('image-container'); // adding class

      // adding an img element inside the div
      const imageElement = document.createElement('img');
      imageElement.setAttribute('src', imageObject.url);
      imageContainer.append(imageElement); // putting in the img element in the div
      imageSection.append(imageContainer); // putting the div in the section with class images-section
    });
  } catch (error) {
    console.error('Error:', error);
    // Log the entire response body for better debugging
    const responseBody = await response.text();
    console.log('Response body:', responseBody);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

console.log('submitIcon:', submitIcon); // Add this line

submitIcon.addEventListener('click', () => {
  console.log('Submit button clicked'); // Add this line
  getImages();
});
