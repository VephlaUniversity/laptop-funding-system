document.addEventListener("DOMContentLoaded", function () {
  // Sample data for dummy users
  const dummyUsers = [
    { email: "ade@gmail.com", name: "John Adeleke", status: "success" },
    { email: "medi@yahoo.com", name: "Medi Johnson", status: "review" },
    { email: "michael@hotmail.com", name: "Michael Brown", status: "rejected" },
    { email: "tobs@gmail.com", name: "Tobs Miller", status: "success" },
    { email: "danile@outlook.com", name: "Daniel Oba", status: "rejected" },
    { email: "lucy@yahoo.com", name: "Lucy Davis", status: "review" },
  ];

  // Function to find user by email
  function findUserByEmail(email) {
    return (
      dummyUsers.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      ) || null
    );
  }

  // Initialize testimonial slider
  initializeTestimonialSlider();

  // Check if we're on the index page with the form
  const checkStatusForm = document.getElementById("checkStatusForm");
  if (checkStatusForm) {
    checkStatusForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = document.getElementById("email");
      const email = emailInput.value.trim();

      if (email) {
        // Find user data
        const userData = findUserByEmail(email);

        // Store user data in session storage
        if (userData) {
          sessionStorage.setItem("userData", JSON.stringify(userData));
        } else {
          // If email not found in dummy data, create a random status
          const statuses = ["success", "review", "rejected"];
          const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];
          const userName = email.split("@")[0].replace(/[^a-zA-Z]/g, " ");
          const formattedName = userName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

          sessionStorage.setItem(
            "userData",
            JSON.stringify({
              email: email,
              name: formattedName,
              status: randomStatus,
            })
          );
        }

        // Redirect to status page
        window.location.href = "check-status";
      }
    });
  }

  // Status page functionality
  const loadingSection = document.getElementById("loading");
  if (loadingSection) {
    const successSection = document.getElementById("success");
    const reviewSection = document.getElementById("review");
    const rejectedSection = document.getElementById("rejected");

    console.log("On status page, initializing");

    // Get the stored user data
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    console.log("Retrieved userData from session storage:", userData);

    // If no user data, redirect back to index
    if (!userData) {
      console.warn("No user data found, redirecting to index");
      window.location.href = "/";
      return;
    }

    // Create animated loading progress bar
    const progressBar = document.getElementById("loadingProgressBar");
    const loadingPercentage = document.getElementById("loadingPercentage");

    let progress = 0;
    const loadingTime = 3000; // 3 seconds total loading time
    const interval = 30; // Update every 30ms
    const steps = loadingTime / interval;
    const increment = 100 / steps;

    // Set initial width of progress bar
    if (progressBar) {
      progressBar.style.width = "0%";
    }

    const loadingInterval = setInterval(function () {
      progress += increment;
      const currentProgress = Math.min(Math.round(progress), 100);

      // Update progress bar width
      if (progressBar) {
        progressBar.style.width = `${currentProgress}%`;
      }

      if (loadingPercentage) {
        loadingPercentage.textContent = `${currentProgress}%`;
      }

      if (progress >= 100) {
        clearInterval(loadingInterval);

        // Show the appropriate status section
        loadingSection.classList.remove("active");

        // Display the appropriate section based on user status
        if (userData.status === "success") {
          successSection.classList.add("active");
          // Update user name in success section
          const userNameElement = document.getElementById("userName");
          if (userNameElement) {
            userNameElement.textContent = userData.name;
          }
        } else if (userData.status === "review") {
          reviewSection.classList.add("active");
        } else {
          rejectedSection.classList.add("active");
        }
      }
    }, interval);
  }

  // Function to initialize testimonial slider
  function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".dot");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    if (!testimonials.length || !dots.length) return;

    let currentSlide = 0;
    const totalSlides = testimonials.length;

    // Function to update visible slide
    function showSlide(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial) => {
        testimonial.style.display = "none";
      });

      // Remove active class from all dots
      dots.forEach((dot) => {
        dot.classList.remove("active");
      });

      // Show current testimonial and activate current dot
      testimonials[index].style.display = "block";
      dots[index].classList.add("active");

      // Update current slide index
      currentSlide = index;

      // Update button states (optional)
      prevBtn.disabled = currentSlide === 0;
      nextBtn.disabled = currentSlide === totalSlides - 1;
    }

    // Initialize first slide
    showSlide(0);

    // Add event listeners to navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        if (currentSlide > 0) {
          showSlide(currentSlide - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        if (currentSlide < totalSlides - 1) {
          showSlide(currentSlide + 1);
        }
      });
    }

    // Add event listeners to dots
    dots.forEach((dot, index) => {
      dot.addEventListener("click", function () {
        showSlide(index);
      });
    });
  }
});
