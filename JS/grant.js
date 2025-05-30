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
    id: "dell-e7480",
    image: "/assets/images/dell-e7840-a.jpg",
    title: "Dell Latitude E7480",
    specs: 'Core i5, 256GB SSD, 4GB RAM, 14" Display',
    detailedSpecs: {
      processor: "Intel Core i5",
      storage: "256GB SSD",
      memory: "4GB RAM",
      display: '14" Display',
      brand: "Dell",
    },
  },
  {
    id: "dell-e7490",
    image: "/assets/images/dell-e7490.jpg",
    title: "Dell Latitude E7490",
    specs: 'Core i5 8th Gen, 256GB SSD, 8GB RAM, 14" FHD',
    detailedSpecs: {
      processor: "Intel Core i5 8th Gen",
      storage: "256GB SSD",
      memory: "8GB RAM",
      display: '14" FHD',
      brand: "Dell",
    },
  },
  {
    id: "hp-elitebook-840",
    image: "/assets/images/hp-elitea.jpg",
    title: "HP EliteBook 840 G5",
    specs: 'Core i5-8350U, 256GB SSD, 8GB RAM, 14" FHD',
    detailedSpecs: {
      processor: "Intel Core i5-8350U",
      storage: "256GB SSD",
      memory: "8GB RAM",
      display: '14" FHD',
      brand: "HP",
    },
  },
  {
    id: "hp-probook-430",
    image: "/assets/images/hp-probook.jpg",
    title: "HP ProBook 430 G6",
    specs: "Core i5-8265U, 256GB SSD, 8GB RAM, Windows 11 Pro",
    detailedSpecs: {
      processor: "Intel Core i5-8265U",
      storage: "256GB SSD",
      memory: "8GB RAM",
      os: "Windows 11 Pro",
      brand: "HP",
    },
  },
  {
    id: "macbook-air-m1",
    image: "/assets/images/mac.jpg",
    title: "MacBook Air M1 (2020)",
    specs: 'Apple M1 Chip, 256GB SSD, 8GB RAM, 13.3" Retina',
    detailedSpecs: {
      processor: "Apple M1 Chip",
      storage: "256GB SSD",
      memory: "8GB RAM",
      display: '13.3" Retina Display',
      brand: "Apple",
    },
  },
];

// Function to create laptop cards
function createLaptopCards() {
  const laptopGrid = document.getElementById("laptopGrid");

  if (!laptopGrid) {
    console.error("Laptop grid element not found!");
    return;
  }

  // Clear existing content
  laptopGrid.innerHTML = "";

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
              <div class="action-button" data-laptop-index="${index}" data-laptop-id="${laptop.id}">
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
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const laptopIndex = this.getAttribute("data-laptop-index");
      const laptopId = this.getAttribute("data-laptop-id");

      // Store the laptop data for retrieval on the details page
      const selectedLaptop = laptops[laptopIndex];

      // Store data in memory (since sessionStorage isn't available in Claude artifacts)
      window.selectedLaptopData = {
        index: laptopIndex,
        id: laptopId,
        laptop: selectedLaptop,
      };

      // Navigate to the laptop-details page
      window.location.href = "laptop-details.html?id=" + laptopId;
    });
  });
}

// Function to get laptop by ID
function getLaptopById(id) {
  return laptops.find((laptop) => laptop.id === id);
}

// Function to get laptop by index
function getLaptopByIndex(index) {
  return laptops[parseInt(index)];
}

// Export functions for use in other scripts
window.laptopStore = {
  laptops: laptops,
  getLaptopById: getLaptopById,
  getLaptopByIndex: getLaptopByIndex,
  createLaptopCards: createLaptopCards,
};

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  createLaptopCards();
});
