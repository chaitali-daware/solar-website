function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('-translate-x-full');
    menu.classList.toggle('translate-x-0');
}

const chatbotBtn = document.getElementById('chatbot-btn'); 
const chatbotContainer = document.getElementById('chatbot-widget'); 
const closeChatbot = document.getElementById('close-chatbot');

chatbotBtn.addEventListener('click', () => { 
    chatbotContainer.classList.toggle('active'); 
    chatbotBtn.style.display = chatbotContainer.classList.contains('active') ? 'none' : 'flex'; 
});
    
closeChatbot.addEventListener('click', () => { 
    chatbotContainer.classList.remove('active'); 
    chatbotBtn.style.display = 'flex'; 
});

const slider = document.getElementById('comparison-slider'); const overlay = document.getElementById('comparison-overlay'); const container = document.getElementById('comparison-box');
let isDragging = false;
const moveSlider = (x) => { const rect = container.getBoundingClientRect(); let position = x - rect.left; position = Math.max(0, Math.min(position, rect.width)); const percentage = (position / rect.width) * 100; slider.style.left = percentage + '%'; overlay.style.width = percentage + '%'; };
slider.addEventListener('mousedown', () => isDragging = true); document.addEventListener('mouseup', () => isDragging = false); document.addEventListener('mousemove', (e) => { if(isDragging) moveSlider(e.clientX); });
slider.addEventListener('touchstart', () => isDragging = true); document.addEventListener('touchend', () => isDragging = false); document.addEventListener('touchmove', (e) => { if(isDragging) moveSlider(e.touches[0].clientX); });

// City Checker
function checkCity() {
    const input = document.getElementById('city-input').value.toLowerCase().trim();
    const resultDiv = document.getElementById('city-result');
    const availableCities = ['amravati', 'washim', 'yavatmal', 'buldhana', 'akola'];
    
    if (!input) { resultDiv.innerHTML = '<span class="text-red-500 text-sm">Please enter a city name</span>'; return; }
    
    const found = availableCities.some(city => city.includes(input) || input.includes(city));
    
    if (found) {
        resultDiv.innerHTML = '<span class="text-green-600 font-bold text-sm"><i class="fas fa-check-circle mr-2"></i>Great! We serve your city.</span>';
    } else {
        resultDiv.innerHTML = '<span class="text-yellow-600 font-bold text-sm"><i class="fas fa-clock mr-2"></i>Coming soon! Contact us.</span>';
    }
}

// Calculator Logic
const calcBtn = document.getElementById('calculate-btn');
const kwInput = document.getElementById('kw-input');
const resBox = document.getElementById('calc-results-box');
    
calcBtn.addEventListener('click', () => {
    const kw = parseFloat(kwInput.value);
    if(kw > 0) {
        const silverPrice = kw * 2500;
        const goldPrice = kw * 4000;
        const platinumPrice = kw * 6000;

        document.getElementById('res-silver').innerText = "₹" + silverPrice.toLocaleString('en-IN') + "/yr";
        document.getElementById('res-gold').innerText = "₹" + goldPrice.toLocaleString('en-IN') + "/yr";
        document.getElementById('res-platinum').innerText = "₹" + platinumPrice.toLocaleString('en-IN') + "/yr";
            
        resBox.classList.remove('hidden');
    } else {
        alert("Please enter a valid capacity (e.g., 5)");
    }
});

// AI Diagnosis Logic
function runAIDiagnosis() {
    const kw = parseFloat(document.getElementById('ai-kw').value);
    const months = parseInt(document.getElementById('ai-last-cleaned').value);
    const issue = document.getElementById('ai-issue').value;

    if (!kw || kw <= 0) {
        alert("Please enter a valid System Capacity.");
        return;
    }

    // Professional Calculation Logic
    // Avg generation in India: ~4.5 units/kW/day
    // Avg Electricity Rate: ₹6 per unit (Commercial/Residential average)
    // Efficiency Loss Logic: scaled for realistic high impact
    
    let efficiencyLoss = 0;
    let severity = "Low";

    // Calculate base efficiency loss based on months
    if (months === 1) efficiencyLoss = 0.10; // 10%
    else if (months === 3) efficiencyLoss = 0.20; // 20%
    else if (months === 6) efficiencyLoss = 0.35; // 35%
    else if (months >= 12) efficiencyLoss = 0.50; // 50%

    // Add specific issue impact
    if (issue === 'dust') efficiencyLoss += 0.05;
    if (issue === 'output') efficiencyLoss += 0.10;
    if (issue === 'shade') efficiencyLoss += 0.15;
    if (issue === 'error') efficiencyLoss += 0.25;

    // Cap at 60%
    if (efficiencyLoss > 0.60) efficiencyLoss = 0.60;

    // Calculate Monthly Financial Loss (Standardized)
    // Formula: kW * 4.5 hrs * 30 days * ₹6 rate * efficiencyLoss
    const monthlyLoss = kw * 4.5 * 30 * 6 * efficiencyLoss;
    const yearlyLoss = monthlyLoss * 12;
    
    // Determine Severity Text
    if (yearlyLoss > 10000) severity = "Critical";
    else if (yearlyLoss > 5000) severity = "High";
    else severity = "Moderate";

    const resultHtml = `
        <div class="text-left">
            <div class="flex items-center justify-between mb-3 border-b pb-2">
                <span class="text-gray-600 font-medium text-sm">Efficiency Loss:</span>
                <span class="text-red-600 font-bold text-lg">${(efficiencyLoss * 100).toFixed(0)}%</span>
            </div>
            <div class="flex items-center justify-between mb-3 border-b pb-2">
                <span class="text-gray-600 font-medium text-sm">Monthly Loss:</span>
                <span class="text-orange-600 font-bold text-lg">₹${monthlyLoss.toFixed(0)}</span>
            </div>
            <div class="flex items-center justify-between mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
                <span class="text-red-800 font-bold text-sm">Estimated Yearly Loss:</span>
                <span class="text-red-600 font-extrabold text-xl">₹${yearlyLoss.toFixed(0)}</span>
            </div>
            <div class="text-center mt-4">
                <span class="inline-block bg-${severity === 'Critical' ? 'red' : 'yellow'}-100 text-${severity === 'Critical' ? 'red' : 'yellow'}-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                    ⚠️ ${severity} Risk Detected
                </span>
                <p class="text-xs text-gray-500 mb-3">Dust accumulation causes permanent module degradation over time.</p>
                <a href="#contact" class="inline-block w-full bg-teal-600 text-white text-sm py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors">
                    Request Cleaning Quote
                </a>
            </div>
        </div>
    `;

    document.getElementById('ai-result-content').innerHTML = resultHtml;
}

// FAQ Logic - RESTORED TO 15 QUESTIONS
const faqData = [
  {
    id: 1,
    question: "What is Solaroft?",
    answer: "Solaroft is a technology-driven solar services company that focuses on solar installation, AMC (Annual Maintenance Contracts), performance optimization, monitoring, and lifecycle management of solar power plants for homes and businesses."
  },
  {
    id: 2,
    question: "What services does Solaroft offer?",
    answer: "Solaroft provides end-to-end solar support, including: Solar system installation (Residential & Commercial), Annual Maintenance Contracts (AMC), Regular cleaning and preventive maintenance, Performance monitoring and optimization, Fault detection and troubleshooting, Electrical safety checks and system audits, and Dedicated CRM-based support."
  },
  {
    id: 3,
    question: "What is a Solar AMC and why is it important?",
    answer: "A Solar AMC ensures your solar plant is clean, efficient, safe, and performing at its peak throughout the year. Without proper maintenance, solar plants can lose 10–30% performance due to dust, wiring issues, inverter faults, or unnoticed failures."
  },
  {
    id: 4,
    question: "How often does Solaroft clean solar panels?",
    answer: "Cleaning frequency depends on your plan and location: Typically once every 15–30 days. High-dust areas may require more frequent cleaning. We use soft brushes, liquid soap, and high-pressure jet cleaning to avoid panel damage."
  },
  {
    id: 5,
    question: "Will cleaning increase my solar generation?",
    answer: "Yes. Regular professional cleaning can improve generation by 10–25%, especially in dusty or industrial areas. Clean panels absorb more sunlight and operate more efficiently."
  },
  {
    id: 6,
    question: "Does Solaroft use water efficiently?",
    answer: "Yes. We follow water-optimized cleaning SOPs, using controlled-pressure jets and efficient methods to minimize water usage while ensuring effective cleaning."
  },
  {
    id: 7,
    question: "How does Solaroft monitor my solar plant?",
    answer: "Solaroft uses a CRM and monitoring system to: Track service schedules, Log cleaning and maintenance activities, Monitor performance trends, Raise alerts for faults or underperformance, and Maintain a complete service history for your plant."
  },
  {
    id: 8,
    question: "What kind of faults does Solaroft check?",
    answer: "We perform routine checks for: Inverter errors and shutdowns, Loose or damaged wiring, Earthing and surge protection issues, Panel hotspots or physical damage, and Generation mismatch and losses."
  },
  {
    id: 9,
    question: "Do you provide emergency support?",
    answer: "Yes. Solaroft offers priority and fast-response support based on your AMC plan, ensuring quick resolution of critical issues to reduce downtime."
  },
  {
    id: 10,
    question: "Is Solaroft suitable for small rooftop plants?",
    answer: "Absolutely. We support 1 kW to multi-megawatt plants, including: Homes, Shops, Offices, Factories, Institutions and housing societies."
  },
  {
    id: 11,
    question: "Can I take only AMC without installation?",
    answer: "Yes. Solaroft provides AMC and maintenance services even if your solar plant was installed by another vendor."
  },
  {
    id: 12,
    question: "How are Solaroft AMC plans structured?",
    answer: "Our AMC plans are designed in tiers (such as Silver, Gold, and Premium) based on: Plant capacity, Cleaning frequency, Monitoring level, Response time, and Additional safety and optimization services."
  },
  {
    id: 13,
    question: "Will Solaroft help reduce my electricity bill?",
    answer: "Yes. By maintaining optimal performance and reducing generation losses, Solaroft helps you maximize solar output, leading to lower grid dependency and reduced electricity bills."
  },
  {
    id: 14,
    question: "How can I contact Solaroft?",
    answer: "You can contact us via: Website contact form, Phone or WhatsApp support, and Dedicated CRM ticket system (for AMC customers)."
  },
  {
    id: 15,
    question: "Why choose Solaroft over local cleaners?",
    answer: "Unlike untrained cleaners, Solaroft offers: Trained technical teams, Standard operating procedures (SOPs), Safety-first approach, and Performance-focused maintenance."
  }
];

let openFaqId = null;

function createFaqBox(faq) {
  const box = document.createElement('div');
  box.className = 'faq-box';
  box.dataset.id = faq.id;
      
  box.innerHTML = `
    <div style="display: flex; align-items: start; justify-content: space-between; gap: 12px;">
      <div style="display: flex; align-items: start; gap: 12px; flex: 1; min-width: 0;">
        <div class="faq-number">${faq.id}</div>
        <h3 class="faq-question">${faq.question}</h3>
      </div>
      <svg class="chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
    <div class="faq-answer">
      <p>${faq.answer}</p>
    </div>
  `;

  box.addEventListener('click', () => toggleFaq(faq.id, box));
  return box;
}

function toggleFaq(id, clickedBox) {
  const boxes = document.querySelectorAll('.faq-box');
      
  boxes.forEach(box => {
    const boxId = parseInt(box.dataset.id);
    const answer = box.querySelector('.faq-answer');
    const chevron = box.querySelector('.chevron');
        
    if (boxId === id) {
      if (openFaqId === id) {
        answer.classList.remove('open');
        chevron.classList.remove('rotated');
        box.style.border = '2px solid #bfdbfe';
        openFaqId = null;
      } else {
        answer.classList.add('open');
        chevron.classList.add('rotated');
        box.style.border = '2px solid #0284c7';
        openFaqId = id;
      }
    } else {
      answer.classList.remove('open');
      chevron.classList.remove('rotated');
      box.style.border = '2px solid #bfdbfe';
    }
  });
}

function renderFaqs() {
  const container = document.getElementById('faq-grid');
  faqData.forEach(faq => {
    container.appendChild(createFaqBox(faq));
  });
}

renderFaqs();


