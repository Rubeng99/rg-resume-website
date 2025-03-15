// Define the Custom Element
class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --card-bg: #fff;
                    --text-color: #333;
                    --border-radius: 10px;
                    --padding: 15px;
                    --shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    display: block;
                    background: var(--card-bg);
                    color: var(--text-color);
                    border-radius: var(--border-radius);
                    padding: var(--padding);
                    box-shadow: var(--shadow);
                    width: 300px;
                    margin: 10px;
                    font-family: Arial, sans-serif;
                }
                h2 {
                    font-size: 1.5em;
                    margin: 0 0 10px;
                }
                picture img {
                    max-width: 100%;
                    border-radius: var(--border-radius);
                }
                p {
                    font-size: 1em;
                    margin: 10px 0;
                }
                a {
                    display: inline-block;
                    color: #007bff;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
            <h2></h2>
            <picture>
                <img src="" alt="">
            </picture>
            <p></p>
            <a href="#" target="_blank">Read More</a>
        `;
    }

    set data(value) {
        this.shadowRoot.querySelector('h2').textContent = value.title;
        this.shadowRoot.querySelector('img').src = value.image;
        this.shadowRoot.querySelector('img').alt = value.title;
        this.shadowRoot.querySelector('p').textContent = value.description;
        this.shadowRoot.querySelector('a').href = value.link;
    }
}
customElements.define('project-card', ProjectCard);

async function fetchRemoteData() {
    try {
        const response = await fetch('https://my-json-server.typicode.com/rug005/demo/projects');
        const data = await response.json();

        // Transform data to fit project-card format
        const formattedData = data.map(item => ({
            title: item.title,
            image: '/Images/arduino.avif', // Placeholder image
            description: 'Sample project description', // Placeholder description
            link: 'https://example.com' // Placeholder link
        }));

        localStorage.setItem('projects', JSON.stringify(formattedData));
        displayProjects(formattedData);
    } catch (error) {
        console.error('Error fetching remote data:', error);
    }
}


function loadLocalData() {
    const localData = JSON.parse(localStorage.getItem('projects')) || [];
    displayProjects(localData);
}

function displayProjects(projects) {
    const container = document.getElementById('project-container');
    container.innerHTML = '';
    projects.forEach(project => {
        const card = document.createElement('project-card');
        card.data = project;
        container.appendChild(card);
    });
}

// Event Listeners for Buttons
document.getElementById('load-local').addEventListener('click', loadLocalData);
document.getElementById('load-remote').addEventListener('click', fetchRemoteData);
