document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const form = document.getElementById("squareFootageForm");

    const shapeSelect = document.getElementById("shapeSelect");
    const measurementUnit = document.getElementById("measurementUnit");

    const rectangleInputs = document.getElementById("rectangleInputs");
    const squareInputs = document.getElementById("squareInputs");
    const circleInputs = document.getElementById("circleInputs");

    const lengthInput = document.getElementById("lengthInput");
    const widthInput = document.getElementById("widthInput");
    const sideInput = document.getElementById("sideInput");
    const radiusInput = document.getElementById("radiusInput");

    const lengthUnit = document.getElementById("lengthUnit");
    const widthUnit = document.getElementById("widthUnit");
    const sideUnit = document.getElementById("sideUnit");
    const radiusUnit = document.getElementById("radiusUnit");

    const lengthError = document.getElementById("lengthError");
    const widthError = document.getElementById("widthError");
    const sideError = document.getElementById("sideError");
    const radiusError = document.getElementById("radiusError");

    const areaNameInput = document.getElementById("areaNameInput");

    const calculatorResult =
        document.getElementById("calculatorResult");

    const squareFeetResult =
        document.getElementById("squareFeetResult");

    const primaryResultUnit =
        document.getElementById("primaryResultUnit");

    const squareFeetValue =
        document.getElementById("squareFeetValue");

    const squareMetersValue =
        document.getElementById("squareMetersValue");

    const squareYardsValue =
        document.getElementById("squareYardsValue");

    const squareInchesValue =
        document.getElementById("squareInchesValue");

    const addAreaButton =
        document.getElementById("addAreaButton");

    const roomListSection =
        document.getElementById("roomListSection");

    const roomList =
        document.getElementById("roomList");

    const roomCount =
        document.getElementById("roomCount");

    const grandTotalValue =
        document.getElementById("grandTotalValue");

    const mobileMenuToggle =
        document.getElementById("mobileMenuToggle");

    const mainNavigation =
        document.getElementById("mainNavigation");

    const currentYear =
        document.getElementById("currentYear");


    // =====================================================
    // VARIABLES
    // =====================================================

    let currentCalculation = null;
    let savedAreas = [];


    // =====================================================
    // UNIT CONVERSION
    // =====================================================

    const unitToFeet = {
        feet: 1,
        meters: 3.280839895,
        inches: 1 / 12,
        yards: 3
    };


    const unitLabels = {
        feet: "ft",
        meters: "m",
        inches: "in",
        yards: "yd"
    };


    // =====================================================
    // FORMAT NUMBER
    // =====================================================

    function formatNumber(number) {

        return Number(number).toLocaleString(
            "en-US",
            {
                maximumFractionDigits: 2
            }
        );
    }


    // =====================================================
    // UPDATE UNIT LABELS
    // =====================================================

    function updateUnitLabels() {

        const unit = measurementUnit.value;

        const label = unitLabels[unit];

        lengthUnit.textContent = label;
        widthUnit.textContent = label;
        sideUnit.textContent = label;
        radiusUnit.textContent = label;
    }


    // =====================================================
    // SHOW / HIDE INPUTS BASED ON SHAPE
    // =====================================================

    function updateShapeInputs() {

        const shape = shapeSelect.value;


        // Hide everything first

        rectangleInputs.hidden = true;
        squareInputs.hidden = true;
        circleInputs.hidden = true;


        // Clear old errors

        clearErrors();


        // Rectangle

        if (shape === "rectangle") {

            rectangleInputs.hidden = false;

            lengthInput.required = true;
            widthInput.required = true;

            sideInput.required = false;
            radiusInput.required = false;
        }


        // Square

        else if (shape === "square") {

            squareInputs.hidden = false;

            sideInput.required = true;

            lengthInput.required = false;
            widthInput.required = false;
            radiusInput.required = false;
        }


        // Triangle

        else if (shape === "triangle") {

            rectangleInputs.hidden = false;

            const lengthLabel =
                rectangleInputs.querySelector(
                    'label[for="lengthInput"]'
                );

            const widthLabel =
                rectangleInputs.querySelector(
                    'label[for="widthInput"]'
                );


            if (lengthLabel) {

                lengthLabel.childNodes[0].textContent =
                    "Base";
            }


            if (widthLabel) {

                widthLabel.childNodes[0].textContent =
                    "Height";
            }


            lengthInput.placeholder =
                "Enter base";

            widthInput.placeholder =
                "Enter height";


            lengthInput.required = true;
            widthInput.required = true;

            sideInput.required = false;
            radiusInput.required = false;
        }


        // Circle

        else if (shape === "circle") {

            circleInputs.hidden = false;

            radiusInput.required = true;

            lengthInput.required = false;
            widthInput.required = false;
            sideInput.required = false;
        }


        // Restore rectangle labels

        if (shape !== "triangle") {

            const lengthLabel =
                rectangleInputs.querySelector(
                    'label[for="lengthInput"]'
                );

            const widthLabel =
                rectangleInputs.querySelector(
                    'label[for="widthInput"]'
                );


            if (lengthLabel) {

                lengthLabel.childNodes[0].textContent =
                    "Length";
            }


            if (widthLabel) {

                widthLabel.childNodes[0].textContent =
                    "Width";
            }


            lengthInput.placeholder =
                "Enter length";

            widthInput.placeholder =
                "Enter width";
        }


        updateUnitLabels();
    }


    // =====================================================
    // ERROR HANDLING
    // =====================================================

    function clearErrors() {

        const inputs = [
            lengthInput,
            widthInput,
            sideInput,
            radiusInput
        ];


        const errors = [
            lengthError,
            widthError,
            sideError,
            radiusError
        ];


        inputs.forEach(input => {

            input.classList.remove(
                "input-invalid"
            );
        });


        errors.forEach(error => {

            error.textContent = "";
        });
    }


    function showError(
        input,
        errorElement,
        message
    ) {

        input.classList.add(
            "input-invalid"
        );

        errorElement.textContent =
            message;
    }


    // =====================================================
    // GET POSITIVE NUMBER
    // =====================================================

    function getPositiveNumber(
        input,
        errorElement,
        label
    ) {

        const value =
            parseFloat(input.value);


        if (input.value.trim() === "") {

            showError(
                input,
                errorElement,
                `${label} is required.`
            );

            return null;
        }


        if (!Number.isFinite(value)) {

            showError(
                input,
                errorElement,
                `Please enter a valid ${label.toLowerCase()}.`
            );

            return null;
        }


        if (value <= 0) {

            showError(
                input,
                errorElement,
                `${label} must be greater than 0.`
            );

            return null;
        }


        return value;
    }


    // =====================================================
    // CALCULATE AREA
    // =====================================================

    function calculateArea() {

        clearErrors();

        const shape =
            shapeSelect.value;

        const unit =
            measurementUnit.value;

        let area = null;


        // RECTANGLE

        if (shape === "rectangle") {

            const length =
                getPositiveNumber(
                    lengthInput,
                    lengthError,
                    "Length"
                );


            const width =
                getPositiveNumber(
                    widthInput,
                    widthError,
                    "Width"
                );


            if (
                length === null ||
                width === null
            ) {

                return null;
            }


            area =
                length * width;
        }


        // SQUARE

        else if (shape === "square") {

            const side =
                getPositiveNumber(
                    sideInput,
                    sideError,
                    "Side length"
                );


            if (side === null) {

                return null;
            }


            area =
                side * side;
        }


        // TRIANGLE

        else if (shape === "triangle") {

            const base =
                getPositiveNumber(
                    lengthInput,
                    lengthError,
                    "Base"
                );


            const height =
                getPositiveNumber(
                    widthInput,
                    widthError,
                    "Height"
                );


            if (
                base === null ||
                height === null
            ) {

                return null;
            }


            area =
                (base * height) / 2;
        }


        // CIRCLE

        else if (shape === "circle") {

            const radius =
                getPositiveNumber(
                    radiusInput,
                    radiusError,
                    "Radius"
                );


            if (radius === null) {

                return null;
            }


            area =
                Math.PI *
                radius *
                radius;
        }


        // =================================================
        // CONVERT TO SQUARE FEET
        // =================================================

        const sideToFeet =
            unitToFeet[unit];


        const squareFeet =
            area *
            sideToFeet *
            sideToFeet;


        const squareMeters =
            squareFeet *
            0.09290304;


        const squareYards =
            squareFeet / 9;


        const squareInches =
            squareFeet * 144;


        return {
            shape,
            unit,
            originalArea: area,
            squareFeet,
            squareMeters,
            squareYards,
            squareInches
        };
    }


    // =====================================================
    // DISPLAY RESULT
    // =====================================================

    function displayResult(result) {

        if (!result) {
            return;
        }


        currentCalculation =
            result;


        squareFeetResult.textContent =
            formatNumber(
                result.squareFeet
            );


        primaryResultUnit.textContent =
            "sq ft";


        squareFeetValue.textContent =
            `${formatNumber(result.squareFeet)} sq ft`;


        squareMetersValue.textContent =
            `${formatNumber(result.squareMeters)} m²`;


        squareYardsValue.textContent =
            `${formatNumber(result.squareYards)} sq yd`;


        squareInchesValue.textContent =
            `${formatNumber(result.squareInches)} sq in`;


        calculatorResult.classList.add(
            "result-visible"
        );


        calculatorResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });
    }


    // =====================================================
    // FORM SUBMIT
    // =====================================================

    form.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const result =
                calculateArea();


            if (result) {

                displayResult(
                    result
                );
            }
        }
    );


    // =====================================================
    // QUICK PICK BUTTONS
    // =====================================================

    const quickValueButtons =
        document.querySelectorAll(
            ".quick-value"
        );


    quickValueButtons.forEach(
        function(button) {

            button.addEventListener(
                "click",
                function() {

                    const targetId =
                        button.dataset.target;

                    const value =
                        button.dataset.value;


                    const input =
                        document.getElementById(
                            targetId
                        );


                    if (!input) {
                        return;
                    }


                    // Set selected value

                    input.value =
                        value;


                    // Remove active state
                    // from buttons for same field

                    quickValueButtons.forEach(
                        function(otherButton) {

                            if (
                                otherButton.dataset.target ===
                                targetId
                            ) {

                                otherButton.classList.remove(
                                    "active"
                                );
                            }
                        }
                    );


                    // Highlight selected button

                    button.classList.add(
                        "active"
                    );


                    // Remove error

                    const errorMap = {
                        lengthInput: lengthError,
                        widthInput: widthError,
                        sideInput: sideError,
                        radiusInput: radiusError
                    };


                    if (
                        errorMap[targetId]
                    ) {

                        input.classList.remove(
                            "input-invalid"
                        );

                        errorMap[targetId].textContent =
                            "";
                    }


                    input.focus();
                }
            );
        }
    );


    // =====================================================
    // ADD AREA
    // =====================================================

    addAreaButton.addEventListener(
        "click",
        function() {

            const result =
                calculateArea();


            if (!result) {
                return;
            }


            const customName =
                areaNameInput.value.trim();


            const shapeName =
                result.shape.charAt(0).toUpperCase() +
                result.shape.slice(1);


            const areaName =
                customName ||
                `${shapeName} ${savedAreas.length + 1}`;


            savedAreas.push({
                name: areaName,
                shape: result.shape,
                squareFeet: result.squareFeet
            });


            renderSavedAreas();


            areaNameInput.value = "";

            roomListSection.hidden = false;
        }
    );


    // =====================================================
    // RENDER SAVED AREAS
    // =====================================================

    function renderSavedAreas() {

        roomList.innerHTML = "";


        let total = 0;


        savedAreas.forEach(
            function(area, index) {

                total += area.squareFeet;


                const item =
                    document.createElement(
                        "div"
                    );


                item.className =
                    "room-list-item";


                item.innerHTML = `
                    <div class="room-item-info">

                        <strong>
                            ${escapeHTML(area.name)}
                        </strong>

                        <span>
                            ${escapeHTML(area.shape)}
                        </span>

                    </div>

                    <div class="room-item-value">
                        ${formatNumber(area.squareFeet)} sq ft
                    </div>

                    <button
                        type="button"
                        class="room-delete-button"
                        data-index="${index}"
                    >
                        Remove
                    </button>
                `;


                roomList.appendChild(
                    item
                );
            }
        );


        roomCount.textContent =
            `${savedAreas.length} ${
                savedAreas.length === 1
                    ? "area"
                    : "areas"
            }`;


        grandTotalValue.textContent =
            `${formatNumber(total)} sq ft`;


        roomListSection.hidden =
            savedAreas.length === 0;
    }


    // =====================================================
    // REMOVE SAVED AREA
    // =====================================================

    roomList.addEventListener(
        "click",
        function(event) {

            const button =
                event.target.closest(
                    ".room-delete-button"
                );


            if (!button) {
                return;
            }


            const index =
                Number(
                    button.dataset.index
                );


            savedAreas.splice(
                index,
                1
            );


            renderSavedAreas();
        }
    );


    // =====================================================
    // SAFE HTML
    // =====================================================

    function escapeHTML(value) {

        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    // =====================================================
    // RESET
    // =====================================================

    form.addEventListener(
        "reset",
        function() {

            setTimeout(
                function() {

                    clearErrors();

                    currentCalculation =
                        null;


                    calculatorResult.classList.remove(
                        "result-visible"
                    );


                    squareFeetResult.textContent =
                        "0";


                    primaryResultUnit.textContent =
                        "sq ft";


                    squareFeetValue.textContent =
                        "0 sq ft";


                    squareMetersValue.textContent =
                        "0 m²";


                    squareYardsValue.textContent =
                        "0 sq yd";


                    squareInchesValue.textContent =
                        "0 sq in";


                    savedAreas = [];


                    renderSavedAreas();


                    // Remove Quick Pick selection

                    quickValueButtons.forEach(
                        function(button) {

                            button.classList.remove(
                                "active"
                            );
                        }
                    );


                    updateShapeInputs();

                },
                0
            );
        }
    );


    // =====================================================
    // SHAPE CHANGE
    // =====================================================

    shapeSelect.addEventListener(
        "change",
        function() {

            // Remove Quick Pick states
            quickValueButtons.forEach(
                function(button) {

                    button.classList.remove(
                        "active"
                    );
                }
            );


            updateShapeInputs();
        }
    );


    // =====================================================
    // UNIT CHANGE
    // =====================================================

    measurementUnit.addEventListener(
        "change",
        function() {

            updateUnitLabels();
        }
    );


    // =====================================================
    // REMOVE ERROR WHEN USER TYPES
    // =====================================================

    [
        lengthInput,
        widthInput,
        sideInput,
        radiusInput
    ].forEach(
        function(input) {

            input.addEventListener(
                "input",
                function() {

                    input.classList.remove(
                        "input-invalid"
                    );


                    const errorMap = {

                        lengthInput:
                            lengthError,

                        widthInput:
                            widthError,

                        sideInput:
                            sideError,

                        radiusInput:
                            radiusError
                    };


                    if (
                        errorMap[input.id]
                    ) {

                        errorMap[input.id].textContent =
                            "";
                    }


                    // Remove quick-pick
                    // active state when
                    // user manually changes value

                    quickValueButtons.forEach(
                        function(button) {

                            if (
                                button.dataset.target ===
                                input.id
                            ) {

                                button.classList.remove(
                                    "active"
                                );
                            }
                        }
                    );
                }
            );
        }
    );


    // =====================================================
    // MOBILE NAVIGATION
    // =====================================================

    mobileMenuToggle.addEventListener(
        "click",
        function() {

            const isOpen =
                mainNavigation.classList.toggle(
                    "navigation-open"
                );


            mobileMenuToggle.setAttribute(
                "aria-expanded",
                isOpen
                    ? "true"
                    : "false"
            );


            mobileMenuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );
        }
    );


    // Close mobile menu after clicking link

    mainNavigation
        .querySelectorAll("a")
        .forEach(
            function(link) {

                link.addEventListener(
                    "click",
                    function() {

                        mainNavigation.classList.remove(
                            "navigation-open"
                        );


                        mobileMenuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );


                        mobileMenuToggle.setAttribute(
                            "aria-label",
                            "Open navigation menu"
                        );
                    }
                );
            }
        );


    // =====================================================
    // CURRENT YEAR
    // =====================================================

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }


    // =====================================================
    // INITIAL STATE
    // =====================================================

    updateShapeInputs();

    updateUnitLabels();

    renderSavedAreas();

});