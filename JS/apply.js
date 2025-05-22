// Form validation and navigation
document.addEventListener("DOMContentLoaded", function () {
  // Get all forms
  const personalForm = document.getElementById("personalForm");
  const techForm = document.getElementById("techForm");
  const scholarshipForm = document.getElementById("scholarshipForm");
  const motivationForm = document.getElementById("motivationForm");
  const marketingForm = document.getElementById("marketingForm");

  // Back buttons
  const backButtons = document.querySelectorAll(".back-btn");

  // Form validation functions
  function validatePersonalForm() {
    let valid = true;

    // Validate name
    const fullName = document.getElementById("fullName");
    if (!fullName.value.trim()) {
      fullName.classList.add("error");
      valid = false;
    } else {
      fullName.classList.remove("error");
    }

    // Validate email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      email.classList.add("error");
      valid = false;
    } else {
      email.classList.remove("error");
    }

    // Validate x/twitter
    const twitter = document.getElementById("x");
    if (!twitter.value.trim()) {
      twitter.classList.add("error");
      valid = false;
    } else {
      twitter.classList.remove("error");
    }

  // Validate Instagram
    const instagram = document.getElementById("instagram");
    if (!instagram.value.trim()) {
      instagram.classList.add("error");
      valid = false;
    } else {
      instagram.classList.remove("error");
    }
    // Validate Linkedin
    const linkedin = document.getElementById("linkedIn");
    if (!linkedin.value.trim()) {
      linkedin.classList.add("error");
      valid = false;
    } else {
      linkedin.classList.remove("error");
    }

    return valid;
  }

  function validateTechForm() {
    let valid = true;

    // Validate radio buttons
    const newToTechOptions = document.querySelectorAll(
      'input[name="newToTech"]'
    );
    let newToTechSelected = false;

    newToTechOptions.forEach((option) => {
      if (option.checked) {
        newToTechSelected = true;
      }
    });

    if (!newToTechSelected) {
      valid = false;
    }

    // Validate passion textarea
    const passion = document.getElementById("passion");
    if (!passion.value.trim()) {
      passion.classList.add("error");
      valid = false;
    } else {
      passion.classList.remove("error");
    }

    // Validate challenge textarea
    const challenge = document.getElementById("challenge");
    if (!challenge.value.trim()) {
      challenge.classList.add("error");
      valid = false;
    } else {
      challenge.classList.remove("error");
    }

    return valid;
  }

  function validateScholarshipForm() {
    let valid = true;

    // Validate scholarship type
    const scholarshipType = document.getElementById("scholarshipType");
    if (!scholarshipType.value) {
      scholarshipType.classList.add("error");
      valid = false;
    } else {
      scholarshipType.classList.remove("error");
    }

    // Validate radio buttons
    const incomeShareOptions = document.querySelectorAll(
      'input[name="incomeShare"]'
    );
    let incomeShareSelected = false;

    incomeShareOptions.forEach((option) => {
      if (option.checked) {
        incomeShareSelected = true;
      }
    });

    if (!incomeShareSelected) {
      valid = false;
    }

    // At least one checkbox should be selected
    const financialSituationOptions = document.querySelectorAll(
      'input[name="financialSituation"]'
    );
    let situationSelected = false;

    financialSituationOptions.forEach((option) => {
      if (option.checked) {
        situationSelected = true;
      }
    });

    if (!situationSelected) {
      valid = false;
    }

    return valid;
  }

  function validateMotivationForm() {
    let valid = true;

    // Validate help with tech
    const helpWithTech = document.getElementById("helpWithTech");
    if (!helpWithTech.value.trim()) {
      helpWithTech.classList.add("error");
      valid = false;
    } else {
      helpWithTech.classList.remove("error");
    }

    // Validate tech dream
    const techDream = document.getElementById("techDream");
    if (!techDream.value.trim()) {
      techDream.classList.add("error");
      valid = false;
    } else {
      techDream.classList.remove("error");
    }

    return valid;
  }

  function validateMarketingForm() {
    let valid = true;

    // Validate discovery source
    const discoverySourceOptions = document.querySelectorAll(
      'input[name="discoverySource"]'
    );
    let sourceSelected = false;

    discoverySourceOptions.forEach((option) => {
      if (option.checked) {
        sourceSelected = true;
      }
    });

    if (!sourceSelected) {
      valid = false;
    }

    return valid;
  }

  // Navigation functions
  function goToStep(stepNumber) {
    // Hide all form steps
    const formSteps = document.querySelectorAll(".form-step");
    formSteps.forEach((step) => {
      step.classList.remove("active");
    });

    // Show the selected step
    document.getElementById("step" + stepNumber).classList.add("active");
  }

  function showSuccessPage() {
    // Hide all form steps
    const formSteps = document.querySelectorAll(".form-step");
    formSteps.forEach((step) => {
      step.classList.remove("active");
    });

    // Show success page
    document.getElementById("success").classList.add("active");
  }

  // Form submissions
  personalForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validatePersonalForm()) {
      goToStep(2);
    }
  });

  techForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateTechForm()) {
      goToStep(3);
    }
  });

  scholarshipForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateScholarshipForm()) {
      goToStep(4);
    }
  });

  motivationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (validateMotivationForm()) {
      goToStep(5);
    }
  });

  marketingForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateMarketingForm()) return;

    // Collect all data
    const data = {
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      x: document.getElementById("x").value,
      newToTech: document.querySelector("input[name='newToTech']:checked")?.value,
      techStack: document.getElementById("techStack").value,
      passion: document.getElementById("passion").value,
      challenge: document.getElementById("challenge").value,
      scholarshipType: document.getElementById("scholarshipType").value,
      incomeShare: document.querySelector("input[name='incomeShare']:checked")?.value,
      financialSituation: document.querySelector("input[name='financialSituation']:checked")?.value,
      helpWithTech: document.getElementById("helpWithTech").value,
      techDream: document.getElementById("techDream").value,
      personalJourney: document.getElementById("personalJourney").value,
      discoverySource: document.querySelector("input[name='discoverySource']:checked")?.value,
    };

    fetch("backend/submit_application.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.text())
      .then((response) => {
        alert("Application submitted successfully!");
        showSuccessPage(); // Show success page after successful submission
      })
      .catch((error) => {
        console.error("Error submitting:", error);
        alert("Submission failed.");
      });
  });


  // Back button functionality
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const stepToGoBack = this.getAttribute("data-step");
      goToStep(stepToGoBack);
    });
  });

  // Close application button
  document.querySelector(".close-btn").addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to close this application? All progress will be lost."
      )
    ) {
      window.location.href = "/";
    }
  });

  // Add input validation listeners
  const allInputs = document.querySelectorAll(".form-control");
  allInputs.forEach((input) => {
    input.addEventListener("input", function () {
      if (this.classList.contains("error")) {
        if (this.value.trim()) {
          this.classList.remove("error");
        }
      }
    });
  });
});
