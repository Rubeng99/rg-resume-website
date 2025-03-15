class ProjectCard extends HTMLElement {
    constructor() {
      super();
      // Attach a shadow root
      this.attachShadow({ mode: 'open' });
    }
  
    // Specify observed attributes if you want to react to changes
    static get observedAttributes() {
      return ['title', 'img', 'alt', 'description', 'link'];
    }
  
    // Respond to attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
      if (oldValue !== newValue) {
        this.render();
      }
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
      // Read attributes or provide defaults, using let for variables we'll override
      let title = this.getAttribute('title') || 'Project Title';
      let imgSrc = this.getAttribute('img') || 'https://via.placeholder.com/300';
      let imgAlt = this.getAttribute('alt') || 'Project image';
      let description = this.getAttribute('description') || 'A short description of the project.';
      let link = this.getAttribute('link') || '#';
  
      // Override for "Post 1" to use a local image from the Images folder
      if (title === "Post 1") {
        title = "Project's Page";
        imgSrc = "Images/bts-ani.avif"; // Ensure the Images folder is correctly placed relative to your HTML file.
        imgAlt = "Project's page";
        description = "My Project Page";
        link = "projects.html";
    }
      if (title === "Post 2") {
        title = "Interest Page";
        imgSrc = "Images/Hike1.jpg"; // Ensure the Images folder is correctly placed relative to your HTML file.
        imgAlt = "Interest";
        description = "My interest";
        link = "interest.html";
      }
      if (title === "Post 3") {
        title = "Courses";
        imgSrc = "Images/lego-lightshow.gif"; // Ensure the Images folder is correctly placed relative to your HTML file.
        imgAlt = "Courses Page";
        description = "The course's I've taken";
        link = "courses.html";
      }
  
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            margin: 1rem;
            border: var(--card-border, 1px solid #ddd);
            border-radius: var(--card-border-radius, 8px);
            overflow: hidden;
            box-shadow: var(--card-shadow, 0 2px 5px rgba(0,0,0,0.1));
            background: var(--card-bg, #fff);
            transition: transform 0.2s;
          }
          :host(:hover) {
            transform: scale(1.02);
          }
          .card-content {
            padding: 1rem;
          }
          h2 {
            margin-top: 0;
            color: var(--card-title-color, #333);
          }
          p {
            color: var(--card-text-color, #666);
          }
          a {
            color: var(--card-link-color, #1e90ff);
            text-decoration: none;
          }
        </style>
        <div class="card-content">
          <h2>${title}</h2>
          <picture>
            <img src="${imgSrc}" alt="${imgAlt}" style="width:100%; display:block;">
          </picture>
          <p>${description}</p>
          <a href="${link}" target="_blank">Link</a>
        </div>
      `;
    }
  }
  
  // Register the custom element
  customElements.define('project-card', ProjectCard);
  