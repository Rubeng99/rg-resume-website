// Sample local data with Firebase image URL for Project Alpha
const sampleData = [
    {
      title: "Project Alpha",
      img: "https://firebasestorage.googleapis.com/v0/b/ruben-s-images.firebasestorage.app/o/bts-ani.avif?alt=media&token=4f35e5bf-0b55-4b10-9abe-b61a5d999e5b",
      alt: "BTS Ani image from Firebase",
      description: "A short description for Project Alpha",
      // Replace this link with a live URL (not the Firebase console URL) if you need a clickable link.
      link: "/projects.html"
    },
    {
        title: "Project Alpha",
        img: "https://firebasestorage.googleapis.com/v0/b/ruben-s-images.firebasestorage.app/o/Hike1.jpg?alt=media&token=4f35e5bf-0b55-4b10-9abe-b61a5d999e5b",
        alt: "BTS Ani image from Firebase",
        description: "A short description for Project Alpha",
        // Replace this link with a live URL (not the Firebase console URL) if you need a clickable link.
        link: "/interest.html"
      }
      ,{
        title: "Project Alpha",
        img: "https://firebasestorage.googleapis.com/v0/b/ruben-s-images.firebasestorage.app/o/lego-lightshow.gif?alt=media&token=4f35e5bf-0b55-4b10-9abe-b61a5d999e5b",
        alt: "BTS Ani image from Firebase",
        description: "A short description for Project Alpha",
        // Replace this link with a live URL (not the Firebase console URL) if you need a clickable link.
        link: "/courses.html"
      }
  ];
  
  // Save sampleData to localStorage if not already there
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify(sampleData));
  }
  
  const cardContainer = document.getElementById('card-container');
  const loadLocalButton = document.getElementById('loadLocal');
  const loadRemoteButton = document.getElementById('loadRemote');
  
  // Function to create a project-card from a data object
  function createProjectCard(data) {
    const card = document.createElement('project-card');
    card.setAttribute('title', data.title);
    card.setAttribute('img', data.img);
    card.setAttribute('alt', data.alt);
    card.setAttribute('description', data.description);
    card.setAttribute('link', data.link);
    return card;
  }
  
  // Function to render the cards in the DOM
  function renderCards(dataArray) {
    cardContainer.innerHTML = '';
    dataArray.forEach(project => {
      const card = createProjectCard(project);
      cardContainer.appendChild(card);
    });
  }
  
  // Load local data from localStorage
  function loadLocalData() {
    const localData = JSON.parse(localStorage.getItem('projects'));
    renderCards(localData);
  }
  
  function loadRemoteData() {
    fetch('https://my-json-server.typicode.com/rug005/demo/projects')
      .then(response => response.json())
      .then(data => {
        // data is expected to be an array of project objects
        renderCards(data);
      })
      .catch(error => console.error('Error fetching remote data:', error));
  }
  
  // Attach event listeners to the buttons
  loadLocalButton.addEventListener('click', loadLocalData);
  loadRemoteButton.addEventListener('click', loadRemoteData);
  