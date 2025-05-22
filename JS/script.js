// FAQ Accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  item.addEventListener("click", () => {
    // Close all other items
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });

    // Toggle current item
    item.classList.toggle("active");
  });
});

// Optional: Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const testimonials = [
    {
      text: "This scholarship has really been a God sent in this time that I’ve been wanting to have a tech skill, UI/UX to be precise, but have not really had the funding to make this possible until DevTobs came to the rescue. Thanks DevTobs.",
      name: "Okwuo Judith",
      handle: "@JudithOkwuo",
      avatar: "../assets/images/Judith.png",
      rightImage: "assets/images/1.png",
    },
    {
      text: "Without this scholarship I never would have taken the bold step of switching to the Tech community and pursuing a Data Analytics career. Getting the scholarship immediately presented a pathway for me to get a laptop and it has also opened me up to resources, materials, and more scholarships for me to learn and earn. Thank you, and God bless you Dev. Tobs.",
      name: "Oluwaseyi Kolawole",
      handle: "@Analytics_KOMA",
      avatar: "../assets/images/Oluwaseyi.png",
      rightImage: "assets/images/2.png",
    },
    {
      text: "This scholarship is a big blessing to my life. It gave me hope and strength to believe in myself again and now I’m rooting for myself now more than ever before because I do not want to disappoint Dev.tobs, who believed in me, and the people that gave me life. I intend to make full use of this opportunity, God willing.",
      name: "Omogiate Praise Uromwen",
      handle: "@OmogiatePraise",
      avatar: "../assets/images/Omogiate.png",
      rightImage: "assets/images/3.png",
    },
  ];

  let currentSlide = 0;
  const slidesContainer = document.getElementById("slidesContainer");
  const dotsContainer = document.getElementById("dotsContainer");
  const prevButton = document.getElementById("prevButton");
  const nextButton = document.getElementById("nextButton");
  let interval;

  // Create HTML for all slides
  function createSlides() {
    testimonials.forEach((testimonial, index) => {
      const slide = document.createElement("div");
      slide.className = "slider-wrapper";
      slide.style.display = index === currentSlide ? "flex" : "none";

      slide.innerHTML = `
              <div class="left-content">
                  <span class="quotes"> <img src="assets/images/quote.png"> </span>
                  <div class="rating">
                      <span class="star">★</span>
                      <span class="star">★</span>
                      <span class="star">★</span>
                      <span class="star">★</span>
                      <span class="star">★</span>
                  </div>
                  <div class="testimonial">
                      ${testimonial.text}
                  </div>
                  <div class="user">
                      <div class="user-img">
                          <img src="${testimonial.avatar}" alt="${testimonial.name}">
                      </div>
                      <div class="user-info">
                          <h3>${testimonial.name}</h3>
                          <p>${testimonial.handle}</p>
                      </div>
                  </div>
              </div>
              <div class="right-content">
                  <div class="right-image">
                      <img src="${testimonial.rightImage}" alt="DevTobs' beneficiaries we are proud to showcase">
                  </div>
              </div>
          `;

      slidesContainer.appendChild(slide);
    });
  }

  // Create dots for navigation
  function createDots() {
    testimonials.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = `dot ${index === currentSlide ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  // Go to a specific slide
  function goToSlide(index) {
    const slides = slidesContainer.children;
    const dots = dotsContainer.children;

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      dots[i].classList.remove("active");
    }

    // Show the active slide
    slides[index].style.display = "flex";
    dots[index].classList.add("active");
    currentSlide = index;

    // Reset the interval
    clearInterval(interval);
    startInterval();
  }

  // Go to next slide
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= testimonials.length) {
      nextIndex = 0;
    }
    goToSlide(nextIndex);
  }

  // Go to previous slide
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = testimonials.length - 1;
    }
    goToSlide(prevIndex);
  }

  // Start the auto-sliding interval
  function startInterval() {
    interval = setInterval(nextSlide, 5000);
  }

  // Initialize slider
  createSlides();
  createDots();
  startInterval();

  // Add event listeners to buttons
  nextButton.addEventListener("click", nextSlide);
  prevButton.addEventListener("click", prevSlide);
});
