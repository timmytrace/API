document.addEventListener('DOMContentLoaded', function() {
  // Fetch upcoming movie titles
  const url = 'https://moviesdatabase.p.rapidapi.com/titles/x/upcoming';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a0d3ce0781msh54ad4e28320a2b1p15aa08jsn5d4c130a9e86',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  async function fetchData() {
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      displayData(result);
    } catch (error) {
      console.error(error);
    }
  }

  function displayData(data) {
    const resultDiv = document.getElementById('result');

    if (data && data.results && data.results.length > 0) {
      const upcomingTitles = data.results;
      // Clear the existing content
      resultDiv.innerHTML = '';

      // Process the upcoming titles data
      upcomingTitles.forEach(title => {
        const titleId = title.id;
        const primaryImageUrl = title.primaryImage ? title.primaryImage.url : 'No image available';
        const titleType = title.titleType.text;
        const titleText = title.titleText.text;
        const originalTitleText = title.originalTitleText.text;
        const releaseYear = title.releaseYear.year;
        const releaseDate = `${title.releaseDate.month}/${title.releaseDate.day}/${title.releaseDate.year}`;

        // Create title element
        const titleElement = document.createElement('div');
        titleElement.classList.add('title');

        // Create and append title details
        const titleIdElement = document.createElement('p');
        titleIdElement.textContent = `Title ID: ${titleId}`;
        titleElement.appendChild(titleIdElement);

        // Create and append primary image
        const primaryImageElement = document.createElement('img');
        primaryImageElement.src = primaryImageUrl;
        primaryImageElement.alt = 'Primary Image';
        titleElement.appendChild(primaryImageElement);

        const titleTypeElement = document.createElement('p');
        titleTypeElement.textContent = `Title Type: ${titleType}`;
        titleElement.appendChild(titleTypeElement);

        const titleTextElement = document.createElement('p');
        titleTextElement.textContent = `Title Text: ${titleText}`;
        titleElement.appendChild(titleTextElement);

        const originalTitleTextElement = document.createElement('p');
        originalTitleTextElement.textContent = `Original Title Text: ${originalTitleText}`;
        titleElement.appendChild(originalTitleTextElement);

        const releaseYearElement = document.createElement('p');
        releaseYearElement.textContent = `Release Year: ${releaseYear}`;
        titleElement.appendChild(releaseYearElement);

        const releaseDateElement = document.createElement('p');
        releaseDateElement.textContent = `Release Date: ${releaseDate}`;
        titleElement.appendChild(releaseDateElement);

        // Append title element to the result div
        resultDiv.appendChild(titleElement);
      });
    }
  }

  fetchData();
});

