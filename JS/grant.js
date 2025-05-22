document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".testimonial-slider");
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  const testimonialCount = testimonials.length;

  // Function to update the slider position
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active dot
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-index"));
      updateSlider();
    });
  });

  // Event listener for previous button
  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + testimonialCount) % testimonialCount;
    updateSlider();
  });

  // Event listener for next button
  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % testimonialCount;
    updateSlider();
  });

  // Auto slide (optional)
  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonialCount;
    updateSlider();
  }, 5000); // Change slide every 5 seconds

  // Pause auto slide on hover
  slider.addEventListener("mouseenter", () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % testimonialCount;
      updateSlider();
    }, 5000);
  });

  // Swipe functionality for mobile devices
  let startX;
  let endX;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      // Swipe left
      currentIndex = (currentIndex + 1) % testimonialCount;
      updateSlider();
    } else if (endX - startX > 50) {
      // Swipe right
      currentIndex = (currentIndex - 1 + testimonialCount) % testimonialCount;
      updateSlider();
    }
  });

  // Initialize slider
  updateSlider();
});

const laptops = [
  {
    image: "/assets/images/laptop1.png",
    title: "HP ProBook 11 X360- TOUCH",
    specs: "256GB SSD/4GB RAM-Intel CELERON QUAD CORE",
  },
  {
    image: "/assets/images/laptop2.png",
    title: "HP ProBook 11 X360- TOUCH",
    specs: "256GB SSD/4GB RAM-Intel CELERON QUAD CORE",
  },
  {
    image: "/assets/images/laptop2.png",
    title: "HP ProBook 11 X360- TOUCH",
    specs: "256GB SSD/4GB RAM-Intel CELERON QUAD CORE",
  },
  {
    image: "/assets/images/laptop2.png",
    title: "HP ProBook 11 X360- TOUCH",
    specs: "256GB SSD/4GB RAM-Intel CELERON QUAD CORE",
  },
  {
    image: "/assets/images/laptop1.png",
    title: "HP ProBook 11 X360- TOUCH",
    specs: "256GB SSD/4GB RAM-Intel CELERON QUAD CORE",
  },
  {
    image: "/assets/images/laptop2.png",
    title: "HP ProBook 11 X360- TOUCH",
    specs: "256GB SSD/4GB RAM-Intel CELERON QUAD CORE",
  },
];

// Function to create laptop cards
function createLaptopCards() {
  const laptopGrid = document.getElementById("laptopGrid");

  laptops.forEach((laptop, index) => {
    const card = document.createElement("div");
    card.className = "laptop-card";

    card.innerHTML = `
          <div class="laptop-image-container">
              <img src="${laptop.image}" alt="${laptop.title}" class="laptop-image">
          </div>
          <div class="laptop-info">
              <h3 class="laptop-title">${laptop.title}</h3>
              <p class="laptop-specs">${laptop.specs}</p>
              <div class="action-button" data-laptop-index="${index}">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M20.5 22H3.5" stroke="#1B8C44" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 3.5L5 17.5" stroke="#1B8C44" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M19 13.77V3.5H8.73" stroke="#1B8C44" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
              </div>
          </div>
      `;

    laptopGrid.appendChild(card);
  });

  // Add click event listeners to all action buttons
  const actionButtons = document.querySelectorAll(".action-button");
  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const laptopIndex = this.getAttribute("data-laptop-index");
      // Store the selected laptop index in localStorage to retrieve it on the details page
      localStorage.setItem("selectedLaptopIndex", laptopIndex);
      // Navigate to the laptop-details page
      window.location.href = "laptop-details";
    });
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  createLaptopCards();
});
