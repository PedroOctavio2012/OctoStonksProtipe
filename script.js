/* =========================================
   OCTO STONKS
   Simulador Financeiro Acadêmico
========================================= */


/* =========================================
   RENDA DA LAURA
========================================= */

const income = 900;


/* =========================================
   SITUAÇÃO ORIGINAL
========================================= */

const originalData = {

    expenses: 1260,

    economy: 0,

    categories: [

        {
            icon: "🍔",
            name: "Alimentação",
            value: 250
        },

        {
            icon: "🏋️",
            name: "Academia",
            value: 160
        },

        {
            icon: "💅",
            name: "Beleza",
            value: 450
        },

        {
            icon: "🥐",
            name: "Padaria",
            value: 300
        },

        {
            icon: "🍪",
            name: "Outros",
            value: 100
        }

    ],

    transactions: [

        {
            icon: "💰",
            name: "Salário",
            date: "01/10/2026",
            value: 900
        },

        {
            icon: "🍔",
            name: "Lanches",
            date: "Durante a semana",
            value: -50
        },

        {
            icon: "🏋️",
            name: "Academia",
            date: "Mensalidade",
            value: -160
        },

        {
            icon: "🥐",
            name: "Padaria",
            date: "Estimativa mensal",
            value: -300
        },

        {
            icon: "💅",
            name: "Salão e unhas",
            date: "Estimativa mensal",
            value: -750
        }

    ]

};


/* =========================================
   SITUAÇÃO APÓS OS CORTES
========================================= */

const reducedData = {

    expenses: 700,

    economy: 560,

    categories: [

        {
            icon: "🍔",
            name: "Alimentação",
            value: 120
        },

        {
            icon: "🏋️",
            name: "Academia",
            value: 160
        },

        {
            icon: "💅",
            name: "Beleza",
            value: 200
        },

        {
            icon: "🥐",
            name: "Padaria",
            value: 120
        },

        {
            icon: "🍪",
            name: "Outros",
            value: 100
        }

    ],

    transactions: [

        {
            icon: "💰",
            name: "Salário",
            date: "01/10/2026",
            value: 900
        },

        {
            icon: "🍔",
            name: "Alimentação",
            date: "Após reorganização",
            value: -120
        },

        {
            icon: "🏋️",
            name: "Academia",
            date: "Mensalidade",
            value: -160
        },

        {
            icon: "🥐",
            name: "Padaria",
            date: "Após reorganização",
            value: -120
        },

        {
            icon: "💅",
            name: "Beleza",
            date: "Após reorganização",
            value: -200
        },

        {
            icon: "🍪",
            name: "Outros",
            date: "Após reorganização",
            value: -100
        }

    ]

};


/* =========================================
   CARTEIRA FICTÍCIA
========================================= */

const portfolio = [

    {
        icon: "🏦",

        name: "CDB pós-fixado",

        ticker: "100% CDI",

        allocation: 50,

        amount: 600,

        description:
            "Renda fixa usada como referência para estabilidade."
    },


    {
        icon: "🏢",

        name: "Kinea Rendimentos",

        ticker: "KNCR11",

        allocation: 15,

        amount: 180,

        description:
            "FII de papel presente no IFIX."
    },


    {
        icon: "🏭",

        name: "BTG Logística",

        ticker: "BTLG11",

        allocation: 10,

        amount: 120,

        description:
            "FII de logística presente no IFIX."
    },


    {
        icon: "🛍️",

        name: "XP Malls",

        ticker: "XPML11",

        allocation: 10,

        amount: 120,

        description:
            "FII ligado ao segmento de shopping centers."
    },


    {
        icon: "💧",

        name: "Reserva simulada",

        ticker: "LIQUIDEZ",

        allocation: 15,

        amount: 180,

        description:
            "Valor mantido disponível para objetivos de curto prazo."
    }

];


/* =========================================
   ELEMENTOS
========================================= */

const balanceElement =
    document.getElementById("balance");

const balanceStatus =
    document.getElementById("balanceStatus");

const incomeElement =
    document.getElementById("income");

const expensesElement =
    document.getElementById("expenses");

const expenseStatus =
    document.getElementById("expenseStatus");

const resultElement =
    document.getElementById("result");

const economyElement =
    document.getElementById("economy");

const transactionsElement =
    document.getElementById("transactions");

const categoriesElement =
    document.getElementById("categories");

const financialTip =
    document.getElementById("financialTip");

const toggleButton =
    document.getElementById("toggleScenarioBtn");

const description =
    document.getElementById("description");

const savingRange =
    document.getElementById("savingRange");

const savingValue =
    document.getElementById("savingValue");

const scenarioResult =
    document.getElementById("scenarioResult");

const portfolioSection =
    document.getElementById("portfolioSection");

const portfolioCards =
    document.getElementById("portfolioCards");

const portfolioTotal =
    document.getElementById("portfolioTotal");

const portfolioReturn =
    document.getElementById("portfolioReturn");


/* =========================================
   FORMATAÇÃO
========================================= */

function money(value) {

    return value.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


function formattedResult(value) {

    if (value < 0) {

        return `−${money(
            Math.abs(value)
        )}`;

    }

    return `+${money(value)}`;

}


/* =========================================
   EXTRATO
========================================= */

function renderTransactions(data) {

    transactionsElement.innerHTML = "";


    data.transactions.forEach(
        transaction => {

            const element =
                document.createElement("div");


            element.className =
                "transaction";


            const valueClass =
                transaction.value < 0
                    ? "negative"
                    : "positive";


            const sign =
                transaction.value < 0
                    ? "−"
                    : "+";


            element.innerHTML = `

                <div class="transaction-icon">
                    ${transaction.icon}
                </div>

                <div class="transaction-info">

                    <strong>
                        ${transaction.name}
                    </strong>

                    <small>
                        ${transaction.date}
                    </small>

                </div>

                <div
                    class="transaction-value ${valueClass}"
                >

                    ${sign}${money(
                        Math.abs(
                            transaction.value
                        )
                    )}

                </div>

            `;


            transactionsElement.appendChild(
                element
            );

        }
    );

}


/* =========================================
   CATEGORIAS
========================================= */

function renderCategories(data) {

    categoriesElement.innerHTML = "";


    data.categories.forEach(
        category => {

            const element =
                document.createElement("div");


            element.innerHTML = `

                <span>
                    ${category.icon}
                    ${category.name}
                </span>

                <strong>
                    ${money(category.value)}
                </strong>

            `;


            categoriesElement.appendChild(
                element
            );

        }
    );


    const total =
        document.createElement("div");


    total.className =
        "total-row";


    total.innerHTML = `

        <span>
            Total
        </span>

        <strong>
            ${money(data.expenses)}
        </strong>

    `;


    categoriesElement.appendChild(
        total
    );

}


/* =========================================
   CARTEIRA
========================================= */

function renderPortfolio() {

    portfolioCards.innerHTML = "";


    const total =
        portfolio.reduce(
            (sum, item) =>
                sum + item.amount,
            0
        );


    portfolioTotal.textContent =
        money(total);


    /*
       Esta rentabilidade é propositalmente
       fictícia e serve apenas para a atividade.
    */

    const simulatedGrowth =
        42.60;


    portfolioReturn.textContent =
        `Crescimento simulado no período:
        +${money(simulatedGrowth)}`;


    portfolio.forEach(
        item => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "investment-card";


            card.innerHTML = `

                <div class="investment-icon">
                    ${item.icon}
                </div>

                <h3>
                    ${item.name}
                </h3>

                <div class="ticker">
                    ${item.ticker}
                </div>

                <div class="allocation-number">
                    ${item.allocation}%
                </div>

                <strong>
                    ${money(item.amount)}
                </strong>

                <br>

                <small>
                    ${item.description}
                </small>

            `;


            portfolioCards.appendChild(
                card
            );

        }
    );

}


/* =========================================
   DASHBOARD
========================================= */

function updateDashboard(
    data,
    reduced
) {

    const result =
        income - data.expenses;


    incomeElement.textContent =
        money(income);


    expensesElement.textContent =
        money(data.expenses);


    resultElement.textContent =
        formattedResult(result);


    balanceElement.textContent =
        formattedResult(result);


    economyElement.textContent =
        money(data.economy);


    if (result < 0) {

        balanceStatus.textContent =
            "Despesas maiores que a receita";

        expenseStatus.textContent =
            "Acima da receita";

    } else {

        balanceStatus.textContent =
            "Situação financeira positiva";

        expenseStatus.textContent =
            "Dentro da receita";

    }


    /* =========================
       ESTADO APÓS OS CORTES
    ========================= */

    if (reduced) {

        financialTip.innerHTML = `

            <strong>
                ✨ Resultado da reorganização:
            </strong>

            Laura reduziu suas despesas em

            <strong>
                ${money(data.economy)}
            </strong>

            e agora termina o mês com saldo positivo de

            <strong>
                ${money(result)}
            </strong>.

        `;


        description.textContent =
            "Laura reorganizou suas despesas, reduziu gastos não essenciais e passou a terminar o mês no positivo.";


        /* MOSTRA A CARTEIRA */

        portfolioSection
            .classList
            .remove("hidden");

    }


    /* =========================
       ESTADO ORIGINAL
    ========================= */

    else {

        financialTip.innerHTML = `

            <strong>
                💡 Insight financeiro:
            </strong>

            Laura está gastando mais do que recebe.
            É necessário reorganizar suas prioridades.

        `;


        description.textContent =
            "Organize seu dinheiro, acompanhe seus gastos e descubra como pequenas decisões podem mudar seu futuro financeiro.";


        /* ESCONDE A CARTEIRA */

        portfolioSection
            .classList
            .add("hidden");

    }


    renderTransactions(data);

    renderCategories(data);

}


/* =========================================
   ESTADO INICIAL
========================================= */

let reducedMode = false;


updateDashboard(
    originalData,
    false
);


renderPortfolio();


/* =========================================
   BOTÃO PRINCIPAL
========================================= */

toggleButton.addEventListener(
    "click",
    () => {

        reducedMode =
            !reducedMode;


        if (reducedMode) {

            updateDashboard(
                reducedData,
                true
            );


            toggleButton.textContent =
                "↩ Voltar à situação inicial";


            toggleButton
                .classList
                .add("reduced-active");

        }


        else {

            updateDashboard(
                originalData,
                false
            );


            toggleButton.textContent =
                "✨ Ver situação após os cortes";


            toggleButton
                .classList
                .remove("reduced-active");

        }


        updateScenario();

    }
);


/* =========================================
   SIMULADOR
========================================= */

function updateScenario() {

    const saving =
        Number(
            savingRange.value
        );


    const currentExpenses =
        reducedMode
            ? reducedData.expenses
            : originalData.expenses;


    const newResult =
        income -
        currentExpenses +
        saving;


    savingValue.textContent =
        money(saving);


    scenarioResult.textContent =
        formattedResult(
            newResult
        );

}


savingRange.addEventListener(
    "input",
    updateScenario
);


updateScenario();
