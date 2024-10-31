// Variáveis para armazenar as respostas do usuário
let formData = {
    name: "",
    email: "",
    site: "",
    siteId: "",
    supportType: "",
    additionalInfo: {}
};

// Funções para navegação e exibição de páginas
function goToPage(page) {
    document.querySelectorAll('.form-page').forEach((pageElement) => {
        pageElement.classList.remove('active');
    });

    if (page === 3 && formData.supportType === "production") {
        handleProductionForm();
    } else if (page === 3 && formData.supportType === "dashboard") {
        handleDashboardForm();
    } else if (page === 3 && formData.supportType === "newTool") {
        handleNewToolForm();
    } else if (page === 3 && formData.supportType === "userAccess") {
        handleUserAccessForm();
    } else if (page === 4) {
        document.getElementById('finalPage').classList.add('active');
    } else {
        document.getElementById('page' + page).classList.add('active');
    }
}

function handleSupportType() {
    const supportType = document.getElementById('supportType').value;
    formData.supportType = supportType;
}

function handleProductionForm() {
    const page3 = document.getElementById('page3');
    page3.innerHTML = `
        <label>Which tool is having issues?</label>
        <select id="tool" required>
            <option value="Streaming API">Streaming API</option>
            <option value="Find">Find</option>
            <option value="RecsForPlacements">RecsForPlacements</option>
            <option value="Engage">Engage</option>
        </select>

        <label>This solution:</label>
        <select id="solutionStatus" onchange="handleSpecificCase()" required>
            <option value="100% errors">100% errors</option>
            <option value="specific case">Specific case</option>
        </select>

        <div id="specificCaseDiv"></div>
        <button type="button" class="next-btn" onclick="goToPage(4)">Next</button>
    `;
    page3.classList.add('active');
}

function handleSpecificCase() {
    const solutionStatus = document.getElementById('solutionStatus').value;
    const specificCaseDiv = document.getElementById('specificCaseDiv');
    
    if (solutionStatus === "specific case") {
        const tool = document.getElementById('tool').value;
        if (tool === "Find") {
            specificCaseDiv.innerHTML = `
                <label>Which query is causing issues?</label>
                <input type="text" id="query" placeholder="Query details" required>

                <label>Are there filters applied?</label>
                <input type="text" id="filters" placeholder="Filter details" required>

                <label>Is the user logged in?</label>
                <select id="userLoggedIn" required>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            `;
        } else {
            specificCaseDiv.innerHTML = `
                <label>Specify the issue</label>
                <input type="text" id="specificIssue" placeholder="Issue details" required>
            `;
        }
    } else {
        specificCaseDiv.innerHTML = "";
    }
}

function handleDashboardForm() {
    const page3 = document.getElementById('page3');
    page3.innerHTML = `
        <label>Which solution?</label>
        <select id="dashboardSolution" required>
            <option value="engage">Engage</option>
            <option value="recommend">Recommend</option>
            <option value="find">Find</option>
        </select>

        <label>Which rule is not working?</label>
        <input type="text" id="rule" placeholder="Rule details" required>

        <label>Which products/banners should appear?</label>
        <input type="text" id="products" placeholder="Product IDs, Content IDs, or links" required>

        <label>Which channel should display this?</label>
        <input type="text" id="channel" placeholder="Channel details" required>

        <label>Any other information you'd like to add?</label>
        <textarea id="additionalInfo" placeholder="Additional details"></textarea>
        <button type="button" class="next-btn" onclick="goToPage(4)">Next</button>
    `;
    page3.classList.add('active');
}

function handleNewToolForm() {
    const page3 = document.getElementById('page3');
    page3.innerHTML = `
        <label>Which tool would you like to request?</label>
        <input type="text" id="newToolName" placeholder="Tool name" required>

        <label>What is the use case for this tool?</label>
        <textarea id="useCase" placeholder="Describe the use case" required></textarea>

        <label>What benefits will this tool bring?</label>
        <textarea id="benefits" placeholder="Benefits of the tool" required></textarea>

        <label>How urgently do you need this?</label>
        <select id="urgency" required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
        </select>
        <button type="button" class="next-btn" onclick="goToPage(4)">Next</button>
    `;
    page3.classList.add('active');
}

function handleUserAccessForm() {
    const page3 = document.getElementById('page3');
    page3.innerHTML = `
        <label>User First Name</label>
        <input type="text" id="firstName" placeholder="First Name" required>

        <label>User Last Name</label>
        <input type="text" id="lastName" placeholder="Last Name" required>

        <label>User Email</label>
        <input type="email" id="userEmail" placeholder="User Email" required>

        <label>What access does the user need?</label>
        <select id="access" multiple required>
            <option value="Reports">Reports</option>
            <option value="Recommend Rules">Recommend Rules</option>
            <option value="Engage Rules">Engage Rules</option>
        </select>
        <button type="button" class="next-btn" onclick="goToPage(4)">Next</button>
    `;
    page3.classList.add('active');
}

// Exibe o resumo dos dados na tela final
function displayFormSummary() {
    formData.name = document.getElementById('name').value;
    formData.email = document.getElementById('email').value;
    formData.site = document.getElementById('site').value;
    formData.siteId = document.getElementById('siteId').value;
    formData.fileUpload = document.getElementById('fileUpload').files[0];

    let summaryHtml = `<h3>Summary of Your Submission</h3>`;
    summaryHtml += `<p><strong>Name:</strong> ${formData.name}</p>`;
    summaryHtml += `<p><strong>Email:</strong> ${formData.email}</p>`;
    summaryHtml += `<p><strong>Site:</strong> ${formData.site}</p>`;
    summaryHtml += `<p><strong>Site ID:</strong> ${formData.siteId}</p>`;
    summaryHtml += `<p><strong>Support Type:</strong> ${formData.supportType}</p>`;

    if (formData.supportType === "production") {
        summaryHtml += `<p><strong>Tool:</strong> ${document.getElementById('tool').value}</p>`;
        summaryHtml += `<p><strong>Solution Status:</strong> ${document.getElementById('solutionStatus').value}</p>`;
    } else if (formData.supportType === "dashboard") {
        summaryHtml += `<p><strong>Dashboard Solution:</strong> ${document.getElementById('dashboardSolution').value}</p>`;
        summaryHtml += `<p><strong>Rule:</strong> ${document.getElementById('rule').value}</p>`;
    } else if (formData.supportType === "newTool") {
        summaryHtml += `<p><strong>Tool Name:</strong> ${document.getElementById('newToolName').value}</p>`;
    } else if (formData.supportType === "userAccess") {
        summaryHtml += `<p><strong>User First Name:</strong> ${document.getElementById('firstName').value}</p>`;
    }

    document.getElementById('formSummary').innerHTML = summaryHtml;
}
// Gather all form data and display it in the summary
function submitForm() {
    // Retrieve basic information
    formData.name = document.getElementById('name').value;
    formData.email = document.getElementById('email').value;
    formData.site = document.getElementById('site').value;
    formData.siteId = document.getElementById('siteId').value;

    // Retrieve additional information based on selected support type
    if (formData.supportType === "production") {
        formData.additionalInfo.tool = document.getElementById('tool').value;
        formData.additionalInfo.solutionStatus = document.getElementById('solutionStatus').value;
        if (formData.additionalInfo.solutionStatus === "specific case") {
            formData.additionalInfo.query = document.getElementById('query') ? document.getElementById('query').value : "";
            formData.additionalInfo.filters = document.getElementById('filters') ? document.getElementById('filters').value : "";
            formData.additionalInfo.userLoggedIn = document.getElementById('userLoggedIn') ? document.getElementById('userLoggedIn').value : "";
        }
    } else if (formData.supportType === "dashboard") {
        formData.additionalInfo.dashboardSolution = document.getElementById('dashboardSolution').value;
        formData.additionalInfo.rule = document.getElementById('rule').value;
        formData.additionalInfo.products = document.getElementById('products').value;
        formData.additionalInfo.channel = document.getElementById('channel').value;
        formData.additionalInfo.additionalInfo = document.getElementById('additionalInfo').value;
    } else if (formData.supportType === "newTool") {
        formData.additionalInfo.newToolName = document.getElementById('newToolName').value;
        formData.additionalInfo.useCase = document.getElementById('useCase').value;
        formData.additionalInfo.benefits = document.getElementById('benefits').value;
        formData.additionalInfo.urgency = document.getElementById('urgency').value;
    } else if (formData.supportType === "userAccess") {
        formData.additionalInfo.firstName = document.getElementById('firstName').value;
        formData.additionalInfo.lastName = document.getElementById('lastName').value;
        formData.additionalInfo.userEmail = document.getElementById('userEmail').value;
        formData.additionalInfo.access = Array.from(document.getElementById('access').selectedOptions).map(option => option.value);
    }

    // Display the summary
    displayFormSummary();
}

// Update the final page to show the form data summary
function displayFormSummary() {
    let summaryHtml = `<h3>Summary of Your Submission</h3>`;
    summaryHtml += `<p><strong>Name:</strong> ${formData.name}</p>`;
    summaryHtml += `<p><strong>Email:</strong> ${formData.email}</p>`;
    summaryHtml += `<p><strong>Site:</strong> ${formData.site}</p>`;
    summaryHtml += `<p><strong>Site ID:</strong> ${formData.siteId}</p>`;
    summaryHtml += `<p><strong>Support Type:</strong> ${formData.supportType}</p>`;

    // Add additional info based on support type
    for (const [key, value] of Object.entries(formData.additionalInfo)) {
        summaryHtml += `<p><strong>${key}:</strong> ${value}</p>`;
    }

    document.getElementById('formSummary').innerHTML = summaryHtml;
}

// Make sure to call the submitForm function on the final page button
document.getElementById('submitButton').onclick = submitForm;

