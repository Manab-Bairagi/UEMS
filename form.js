function validateAndPreviewFile(input, previewId, maxSizeMB, allowedTypes) {
    const previewContainer = document.getElementById(previewId);
    previewContainer.innerHTML = ""; // Clear previous preview

    if (input.files && input.files[0]) {
        const file = input.files[0];
        const fileSizeMB = file.size / (1024 * 1024);
        const fileType = file.type;

        // Validate file size
        if (fileSizeMB > maxSizeMB) {
            alert(`File size should not exceed ${maxSizeMB} MB. Selected file is ${fileSizeMB.toFixed(2)} MB.`);
            input.value = ""; // Clear the file input
            return;
        }

        // Validate file type
        if (!allowedTypes.includes(fileType)) {
            alert(`Invalid file type. Allowed types are: ${allowedTypes.join(", ")}.`);
            input.value = ""; // Clear the file input
            return;
        }

        // Show preview
        if (fileType.startsWith("image/")) {
            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.alt = "Uploaded Image";
            img.className = "max-w-full h-auto rounded shadow-md mt-2";
            previewContainer.appendChild(img);
        } else {
            const fileName = document.createElement("p");
            fileName.textContent = `Uploaded File: ${file.name}`;
            fileName.className = "text-gray-700 mt-2";
            previewContainer.appendChild(fileName);
        }
    }
}

            document.addEventListener("DOMContentLoaded", () => {
        const courses = ["BTech", "MTech", "MSc"];
        const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4"];

        const courseSelect = document.getElementById("course");
        const semesterSelect = document.getElementById("semester");

        // Populate courses
        courses.forEach(course => {
            const option = document.createElement("option");
            option.value = course;
            option.textContent = course;
            courseSelect.appendChild(option);
        });

        // Populate semesters
        semesters.forEach(semester => {
            const option = document.createElement("option");
            option.value = semester;
            option.textContent = semester;
            semesterSelect.appendChild(option);
        });
    });

        document.addEventListener("DOMContentLoaded", () => {
            const form = document.querySelector("form");
            const saveButton = document.querySelector("button[type='button']");
            const inputs = form.querySelectorAll("input, select, textarea");

            // Save Button Functionality
            saveButton.addEventListener("click", () => {
                const formData = {};
                inputs.forEach(input => {
                    if (input.type === "file") return; // Skip file inputs
                    formData[input.name] = input.value || input.checked;
                });
                localStorage.setItem("registrationFormData", JSON.stringify(formData));
                alert("Form progress saved!");
            });

            // Load Saved Data on Page Load
            const savedData = localStorage.getItem("registrationFormData");
            if (savedData) {
                const formData = JSON.parse(savedData);
                inputs.forEach(input => {
                    if (input.name in formData) {
                        if (input.type === "checkbox") {
                            input.checked = formData[input.name];
                        } else {
                            input.value = formData[input.name];
                        }
                    }
                });
            }

            // Next Button Functionality
            form.addEventListener("submit", event => {
                //event.preventDefault();
                alert("Form submitted successfully!");
                // Optionally clear the saved data
                localStorage.removeItem("registrationFormData");
            });
        });