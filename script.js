// Gemini API Configuration
const GEMINI_CONFIG = {
    API_KEY: 'AIzaSyCdQOv1k52sK3eIm-_xJz6RB7bdmtDqfAs',
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    MODEL: 'gemini-pro'
};

// CA Personality System Prompt
const CA_SYSTEM_PROMPT = `You are CaAi, a highly experienced Chartered Accountant with 30 years of expertise in financial planning, taxation, investment strategies, and business finance. Current date: July 2025.

EXPERTISE: You have deep knowledge in:
- Personal & Corporate Taxation (including 2025 tax changes)
- Investment Planning & Portfolio Management  
- Financial Planning & Wealth Management
- Business Finance & Accounting
- Risk Management & Insurance
- Estate Planning & Succession
- Regulatory Compliance & Auditing

COMMUNICATION STYLE:
- Concise yet comprehensive responses (2-4 sentences max)
- Professional but approachable tone
- Use relevant examples and analogies
- Provide actionable insights
- Be encouraging and supportive

RESPONSE FORMAT:
- Lead with key insight, follow with actionable advice
- Use emojis sparingly but effectively (1-2 per response max)
- For complex topics, offer to provide more detailed explanations
- Keep responses conversational and engaging

Remember: You're providing premium financial intelligence with the sophistication of three decades in practice.`;

// Global variables
let currentUser = null;
let incomeData = [];
let investmentData = [];
let portfolioChart = null;
let allocationChart = null;

// Enhanced Feature Details Data
const featureDetails = {
    'analytics': {
        title: 'Advanced Analytics Suite',
        content: `
            <div class="feature-detail">
                <h3>🔍 Predictive Financial Modeling</h3>
                <p>Our AI analyzes your spending patterns, income trends, and market conditions to predict future financial scenarios with 95% accuracy.</p>
                
                <h3>📊 Real-time Performance Tracking</h3>
                <p>Monitor your portfolio performance, expense ratios, and savings goals with live updates and intelligent alerts.</p>
                
                <h3>🎯 Smart Goal Planning</h3>
                <p>Set financial goals and receive AI-powered recommendations on optimal savings strategies, investment allocations, and timeline adjustments.</p>
                
                <h3>📈 Market Intelligence</h3>
                <p>Access institutional-grade market analysis, sector performance insights, and personalized investment opportunities.</p>
                
                <div class="feature-stats">
                    <div class="stat">
                        <strong>95%</strong>
                        <span>Prediction Accuracy</span>
                    </div>
                    <div class="stat">
                        <strong>Real-time</strong>
                        <span>Data Updates</span>
                    </div>
                    <div class="stat">
                        <strong>50+</strong>
                        <span>Analytics Models</span>
                    </div>
                </div>
            </div>
        `
    },
    'ai-advisor': {
        title: 'AI Financial Advisor',
        content: `
            <div class="feature-detail">
                <h3>🧠 30 Years of CA Experience</h3>
                <p>Our AI has been trained on three decades of financial expertise, tax law changes, and market patterns to provide institutional-level advice.</p>
                
                <h3>💬 24/7 Availability</h3>
                <p>Get instant answers to complex financial questions, tax optimization strategies, and investment recommendations anytime.</p>
                
                <h3>🎯 Personalized Strategies</h3>
                <p>Receive custom financial plans based on your unique situation, risk tolerance, and long-term goals.</p>
                
                <h3>📚 Continuous Learning</h3>
                <p>Our AI continuously updates its knowledge base with the latest tax laws, market trends, and financial best practices.</p>
                
                <div class="feature-showcase">
                    <h4>Sample Conversations:</h4>
                    <div class="conversation-example">
                        <div class="user-msg">"Should I contribute more to my 401k or pay down my mortgage?"</div>
                        <div class="ai-msg">"Based on your 4.2% mortgage rate and 22% tax bracket, maximizing your 401k contribution would save you $2,640 annually in taxes while your mortgage interest is only costing $1,890 after tax deduction. I'd recommend the 401k strategy."</div>
                    </div>
                </div>
            </div>
        `
    },
    'security': {
        title: 'Enterprise Security',
        content: `
            <div class="feature-detail">
                <h3>🔐 Bank-Grade Encryption</h3>
                <p>Your data is protected with AES-256 encryption, the same standard used by major financial institutions worldwide.</p>
                
                <h3>🛡️ Zero-Knowledge Architecture</h3>
                <p>We use zero-knowledge encryption, meaning even we cannot access your sensitive financial information.</p>
                
                <h3>🔑 Multi-Factor Authentication</h3>
                <p>Advanced MFA including biometric authentication, hardware keys, and time-based tokens for maximum security.</p>
                
                <h3>🕵️ Continuous Monitoring</h3>
                <p>AI-powered threat detection monitors for unusual activity and automatically protects against potential breaches.</p>
                
                <div class="security-badges">
                    <div class="badge">SOC 2 Type II</div>
                    <div class="badge">ISO 27001</div>
                    <div class="badge">GDPR Compliant</div>
                    <div class="badge">PCI DSS Level 1</div>
                </div>
            </div>
        `
    },
    'portfolio': {
        title: 'Portfolio Intelligence',
        content: `
            <div class="feature-detail">
                <h3>📊 Advanced Portfolio Analysis</h3>
                <p>Comprehensive analysis of your investment portfolio including risk assessment, diversification analysis, and performance attribution.</p>
                
                <h3>⚖️ Risk Management</h3>
                <p>AI-powered risk analysis helps you understand your portfolio's volatility and suggests optimal risk-adjusted returns.</p>
                
                <h3>🔄 Rebalancing Recommendations</h3>
                <p>Automatic suggestions for portfolio rebalancing based on your target allocation and market conditions.</p>
                
                <h3>🎯 Performance Optimization</h3>
                <p>Identify underperforming assets and receive data-driven recommendations for portfolio improvements.</p>
                
                <div class="portfolio-features">
                    <div class="feature-item">
                        <i class="fas fa-chart-line"></i>
                        <span>Performance Attribution Analysis</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-balance-scale"></i>
                        <span>Risk-Adjusted Returns</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-sync-alt"></i>
                        <span>Automated Rebalancing</span>
                    </div>
                    <div class="feature-item">
                        <i class="fas fa-shield-alt"></i>
                        <span>Downside Protection</span>
                    </div>
                </div>
            </div>
        `
    }
};

// Premium Starfield with subtle elegance
class PremiumStarfield {
    constructor() {
        this.canvas = document.getElementById('starfield-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.resize();
        this.createStars();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createStars() {
        this.stars = [];
        const starCount = Math.min(200, Math.floor((window.innerWidth * window.innerHeight) / 12000));
        
        for (let i = 0; i < starCount; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.6 + 0.2,
                twinkleSpeed: Math.random() * 0.01 + 0.005,
                layer: Math.floor(Math.random() * 3) + 1,
                baseOpacity: Math.random() * 0.4 + 0.1
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createStars();
        });
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach((star, index) => {
            // Subtle parallax effect
            const parallaxX = (this.mouseX - this.canvas.width / 2) * (star.layer * 0.0008);
            const parallaxY = (this.mouseY - this.canvas.height / 2) * (star.layer * 0.0008);
            
            // Minimal twinkle for elegance
            star.opacity = star.baseOpacity + Math.sin(Date.now() * star.twinkleSpeed + index) * 0.02;
            
            const finalX = star.x + parallaxX;
            const finalY = star.y + parallaxY;
            
            // Subtle glow effect
            const mouseDistance = Math.sqrt(
                Math.pow(this.mouseX - finalX, 2) + Math.pow(this.mouseY - finalY, 2)
            );
            const glowRadius = 100;
            const glowStrength = Math.max(0, 1 - (mouseDistance / glowRadius));
            
            this.ctx.save();
            this.ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
            this.ctx.shadowBlur = 4 + (glowStrength * 8);
            this.ctx.globalAlpha = Math.max(0.1, star.opacity + (glowStrength * 0.3));
            
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(finalX, finalY, star.size + (glowStrength * 0.5), 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Premium Dropdown functionality
class PremiumDropdown {
    constructor(element) {
        this.element = element;
        this.toggle = element.querySelector('.dropdown-toggle');
        this.menu = element.querySelector('.dropdown-menu');
        this.items = element.querySelectorAll('.dropdown-item');
        this.selectedText = element.querySelector('.selected-text');
        
        this.init();
    }
    
    init() {
        this.toggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        this.items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectItem(item);
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        const isOpen = this.menu.classList.contains('show');
        document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
            if (menu !== this.menu) {
                menu.classList.remove('show');
            }
        });
        
        if (isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.menu.classList.add('show');
        this.toggle.setAttribute('aria-expanded', 'true');
    }
    
    closeMenu() {
        this.menu.classList.remove('show');
        this.toggle.setAttribute('aria-expanded', 'false');
    }
    
    selectItem(item) {
        this.items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        const selectedText = item.textContent;
        this.selectedText.textContent = selectedText;
        this.element.dataset.value = item.dataset.value;
        
        this.closeMenu();
        
        this.element.dispatchEvent(new CustomEvent('dropdown-select', {
            detail: { value: item.dataset.value, text: selectedText }
        }));
    }
    
    getValue() {
        return this.element.dataset.value || null;
    }
    
    reset() {
        this.selectedText.textContent = 'Select option';
        this.element.dataset.value = '';
        this.items.forEach(item => item.classList.remove('active'));
    }
}

// Smart AI Chatbot with Gemini Integration
class SmartFinancialChatbot {
    constructor() {
        this.isCollapsed = false;
        this.messages = [];
        this.isTyping = false;
        this.conversationHistory = [];
        this.userFinancialProfile = {};
        this.init();
    }
    
    init() {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
        
        setTimeout(() => {
            this.addMessage("Welcome to your premium financial intelligence platform! I'm CaAi, your AI CA with 30 years of experience. How can I assist you with your financial strategy today? 💼", 'bot');
        }, 2000);
    }
    
    toggle() {
        const chatbot = document.getElementById('ai-chatbot');
        this.isCollapsed = !this.isCollapsed;
        chatbot.classList.toggle('collapsed', this.isCollapsed);
    }
    
    async sendMessage() {
        const input = document.getElementById('chat-input');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;
        
        this.addMessage(message, 'user');
        this.conversationHistory.push({ role: 'user', content: message });
        input.value = '';
        
        this.updateFinancialContextFromDashboard();
        this.showTypingIndicator();
        
        try {
            const response = await this.getGeminiResponse(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'bot');
            this.conversationHistory.push({ role: 'assistant', content: response });
            
            if (this.conversationHistory.length > 20) {
                this.conversationHistory = this.conversationHistory.slice(-20);
            }
        } catch (error) {
            this.hideTypingIndicator();
            console.error('Chatbot error:', error);
            const fallbackResponse = this.getFallbackResponse(message);
            this.addMessage(fallbackResponse, 'bot');
        }
    }
    
    updateFinancialContextFromDashboard() {
        try {
            const context = {
                totalIncome: incomeData.reduce((sum, income) => 
                    sum + this.calculateMonthlyAmount(income.amount, income.frequency), 0),
                incomeSourcesCount: incomeData.length,
                totalInvestments: investmentData.reduce((sum, inv) => 
                    sum + (inv.shares * inv.currentPrice), 0),
                investmentCount: investmentData.length,
                currentTab: window.dashboard?.currentTab || 'overview'
            };
            
            this.userFinancialProfile = context;
        } catch (error) {
            console.log('Could not update financial context:', error);
        }
    }
    
    calculateMonthlyAmount(amount, frequency) {
        const multipliers = {
            weekly: 4.33,
            'bi-weekly': 2.17,
            monthly: 1,
            quarterly: 0.33,
            annually: 0.083,
            'one-time': 0
        };
        return amount * (multipliers[frequency] || 1);
    }
    
    async getGeminiResponse(userMessage) {
        if (!GEMINI_CONFIG.API_KEY || GEMINI_CONFIG.API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
            throw new Error('Gemini API key not configured');
        }
        
        const conversationContext = this.conversationHistory
            .slice(-10)
            .map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`)
            .join('\n');
        
        const contextPrompt = this.userFinancialProfile.totalIncome > 0 ? 
            `\n\nUser's Financial Context:
- Monthly Income: $${this.userFinancialProfile.totalIncome?.toLocaleString() || 'Not specified'}
- Income Sources: ${this.userFinancialProfile.incomeSourcesCount || 0}
- Investment Portfolio: $${this.userFinancialProfile.totalInvestments?.toLocaleString() || 'Not specified'}
- Active Investments: ${this.userFinancialProfile.investmentCount || 0}
- Currently viewing: ${this.userFinancialProfile.currentTab || 'overview'} section

Use this context to provide personalized, premium financial advice.` : '';
        
        const prompt = `${CA_SYSTEM_PROMPT}${contextPrompt}

Previous conversation context:
${conversationContext}

Current user message: ${userMessage}

Respond as CaAi, the premium AI CA, with sophistication and expertise:`;
        
        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 200,
                stopSequences: []
            },
            safetySettings: [
                {
                    category: "HARM_CATEGORY_HARASSMENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_HATE_SPEECH", 
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                    threshold: "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        };
        
        const response = await fetch(`${GEMINI_CONFIG.API_URL}?key=${GEMINI_CONFIG.API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
            throw new Error('Invalid response format from Gemini API');
        }
        
        return data.candidates[0].content.parts[0].text.trim();
    }
    
    getFallbackResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('tax') || lowerMessage.includes('deduction')) {
            return "I'm temporarily experiencing connectivity issues, but here's a quick insight: Tax optimization is all about timing and documentation. Keep meticulous records and consider tax-loss harvesting strategies. Let me reconnect and provide more detailed guidance! 📊";
        } else if (lowerMessage.includes('invest') || lowerMessage.includes('stock') || lowerMessage.includes('portfolio')) {
            return "Investment wisdom coming your way once I resolve this technical hiccup! Quick tip: Diversification across asset classes and geographic regions remains the cornerstone of prudent portfolio management. Try asking again in a moment! 📈";
        } else if (lowerMessage.includes('budget') || lowerMessage.includes('save') || lowerMessage.includes('money')) {
            return "Smart budgeting is about intentional spending, not restriction. While I reconnect, remember: automate your savings first, then allocate discretionary spending. I'll be back with more detailed strategies shortly! 💡";
        } else {
            return "Even premium AI systems need a moment to recalibrate! I'm experiencing a brief connection issue, but I'll be back with sophisticated financial insights momentarily. Please try your question again! ⚡";
        }
    }
    
    showTypingIndicator() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.id = 'typing-indicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = '<i class="fas fa-brain"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = `
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(messageContent);
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    hideTypingIndicator() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    addMessage(content, type) {
        const messagesContainer = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = type === 'bot' ? '<i class="fas fa-brain"></i>' : '<i class="fas fa-user"></i>';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (type === 'bot') {
            messageContent.innerHTML = this.formatBotMessage(content);
        } else {
            messageContent.textContent = content;
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
    
    formatBotMessage(content) {
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code style="background: rgba(255,255,255,0.1); padding: 2px 4px; border-radius: 3px; font-family: monospace;">$1</code>')
            .replace(/\n/g, '<br>');
    }
    
    clearConversation() {
        this.conversationHistory = [];
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = '';
        
        setTimeout(() => {
            this.addMessage("Fresh start! Ready to provide premium financial intelligence. What's your strategic priority today? 🎯", 'bot');
        }, 500);
    }
}

// Dashboard functionality
class PremiumFinancialDashboard {
    constructor() {
        this.currentTab = 'overview';
        this.init();
    }
    
    init() {
        this.initTabNavigation();
        this.initDropdowns();
        this.initForms();
        this.loadSampleData();
        this.initCharts();
        this.applyPremiumEffects();
    }
    
    initTabNavigation() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const tabName = item.dataset.tab;
                this.switchTab(tabName);
            });
        });
    }
    
    switchTab(tabName) {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
        
        this.currentTab = tabName;
        this.onTabSwitch(tabName);
        
        setTimeout(() => this.applyPremiumEffects(), 100);
    }
    
    onTabSwitch(tabName) {
        switch (tabName) {
            case 'income':
                this.updateIncomeDisplay();
                break;
            case 'investments':
                this.updateInvestmentsDisplay();
                break;
        }
    }
    
    initDropdowns() {
        document.querySelectorAll('.custom-dropdown').forEach(dropdown => {
            new PremiumDropdown(dropdown);
        });
    }
    
    initForms() {
        const addIncomeForm = document.getElementById('add-income-form');
        if (addIncomeForm) {
            addIncomeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addIncome();
            });
        }
        
        const addInvestmentForm = document.getElementById('add-investment-form');
        if (addInvestmentForm) {
            addInvestmentForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addInvestment();
            });
        }
        
        const authForm = document.getElementById('auth-form');
        if (authForm) {
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleAuth();
            });
        }
    }
    
    loadSampleData() {
        incomeData = [
            {
                id: 1,
                name: 'Executive Salary',
                type: 'salary',
                amount: 8500,
                frequency: 'monthly',
                company: 'Fortune 500 Corp',
                startDate: '2023-01-01'
            },
            {
                id: 2,
                name: 'Consulting Revenue',
                type: 'freelance',
                amount: 2500,
                frequency: 'monthly',
                company: 'Premium Clients',
                startDate: '2023-03-15'
            },
            {
                id: 3,
                name: 'Investment Dividends',
                type: 'investment',
                amount: 1200,
                frequency: 'quarterly',
                company: 'Portfolio Holdings',
                startDate: '2023-01-01'
            },
            {
                id: 4,
                name: 'Premium Real Estate',
                type: 'rental',
                amount: 3200,
                frequency: 'monthly',
                company: 'Property Management',
                startDate: '2023-02-01'
            }
        ];
        
        investmentData = [
            {
                id: 1,
                symbol: 'AAPL',
                name: 'Apple Inc.',
                type: 'stock',
                shares: 150,
                purchasePrice: 145.30,
                currentPrice: 185.20,
                purchaseDate: '2023-01-15',
                broker: 'Premium Brokerage'
            },
            {
                id: 2,
                symbol: 'MSFT',
                name: 'Microsoft Corp.',
                type: 'stock',
                shares: 100,
                purchasePrice: 280.00,
                currentPrice: 325.80,
                purchaseDate: '2023-02-20',
                broker: 'Elite Trading'
            },
            {
                id: 3,
                symbol: 'SPY',
                name: 'SPDR S&P 500 ETF',
                type: 'etf',
                shares: 200,
                purchasePrice: 400.50,
                currentPrice: 455.15,
                purchaseDate: '2023-03-10',
                broker: 'Institutional Platform'
            }
        ];
        
        this.updateIncomeDisplay();
        this.updateInvestmentsDisplay();
        this.updateOverviewStats();
    }
    
    initCharts() {
        const portfolioCtx = document.getElementById('portfolio-chart');
        const allocationCtx = document.getElementById('allocation-chart');
        
        if (portfolioCtx) {
            portfolioChart = new Chart(portfolioCtx.getContext('2d'), {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Portfolio Value',
                        data: [45000, 47500, 51200, 49800, 54300, 58900],
                        borderColor: '#ffffff',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderWidth: 3,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#ffffff',
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    family: 'Inter',
                                    size: 12
                                }
                            }
                        },
                        y: {
                            display: true,
                            grid: {
                                color: 'rgba(255, 255, 255, 0.1)',
                                borderColor: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    family: 'Inter',
                                    size: 12
                                },
                                callback: function(value) {
                                    return '$' + (value / 1000) + 'k';
                                }
                            }
                        }
                    }
                }
            });
        }
        
        if (allocationCtx) {
            allocationChart = new Chart(allocationCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Stocks', 'Bonds', 'Real Estate', 'Cash'],
                    datasets: [{
                        data: [60, 25, 10, 5],
                        backgroundColor: [
                            '#ffffff',
                            '#8b949e',
                            '#6e7681',
                            '#484f58'
                        ],
                        borderColor: 'transparent',
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    cutout: '70%'
                }
            });
        }
        
        // Initialize other charts
        this.initExpensesChart();
    }
    
    initExpensesChart() {
        const expensesCtx = document.getElementById('expenses-chart');
        if (expensesCtx) {
            new Chart(expensesCtx.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Dining', 'Transport', 'Shopping', 'Utilities', 'Entertainment'],
                    datasets: [{
                        data: [35, 20, 18, 15, 12],
                        backgroundColor: [
                            '#ffffff',
                            '#d0d7de',
                            '#8b949e',
                            '#6e7681',
                            '#484f58'
                        ],
                        borderColor: 'transparent',
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: {
                                    family: 'Inter',
                                    size: 12
                                },
                                padding: 20
                            }
                        }
                    },
                    cutout: '65%'
                }
            });
        }
    }
    
    updateIncomeDisplay() {
        const container = document.getElementById('income-sources-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        incomeData.forEach(income => {
            const incomeCard = this.createIncomeCard(income);
            container.appendChild(incomeCard);
        });
        
        this.updateIncomeSummary();
    }
    
    updateInvestmentsDisplay() {
        const container = document.getElementById('investment-holdings-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        investmentData.forEach(investment => {
            const investmentCard = this.createInvestmentCard(investment);
            container.appendChild(investmentCard);
        });
        
        this.updateInvestmentSummary();
    }
    
    createIncomeCard(income) {
        const card = document.createElement('div');
        card.className = 'income-card premium-frost-glass floating-card';
        
        const iconClass = this.getIncomeIconClass(income.type);
        const monthlyAmount = this.calculateMonthlyAmount(income.amount, income.frequency);
        
        card.innerHTML = `
            <div class="income-info">
                <div class="income-icon premium-gradient">
                    <i class="fas fa-${iconClass}"></i>
                </div>
                <div class="income-details">
                    <div class="income-name">${income.name}</div>
                    <div class="income-company">${income.company || 'N/A'}</div>
                    <div class="income-frequency">${income.frequency}</div>
                </div>
            </div>
            <div class="income-amount premium-gradient-text">$${monthlyAmount.toLocaleString()}</div>
            <div class="income-actions">
                <button class="action-btn premium-frost-btn" onclick="dashboard.editIncome(${income.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn premium-frost-btn" onclick="dashboard.deleteIncome(${income.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return card;
    }
    
    createInvestmentCard(investment) {
        const card = document.createElement('div');
        card.className = 'investment-card premium-frost-glass floating-card';
        
        const totalValue = investment.shares * investment.currentPrice;
        const totalCost = investment.shares * investment.purchasePrice;
        const change = ((investment.currentPrice - investment.purchasePrice) / investment.purchasePrice * 100);
        const changeClass = change >= 0 ? 'positive' : 'negative';
        const changeSign = change >= 0 ? '+' : '';
        
        card.innerHTML = `
            <div class="investment-info">
                <div class="investment-symbol premium-gradient">${investment.symbol}</div>
                <div class="investment-details">
                    <div class="investment-name">${investment.name}</div>
                    <div class="investment-shares">${investment.shares} shares</div>
                </div>
            </div>
            <div class="investment-performance">
                <div class="current-price">$${investment.currentPrice.toFixed(2)}</div>
                <div class="price-change ${changeClass}">${changeSign}${change.toFixed(1)}%</div>
            </div>
            <div class="investment-value premium-gradient-text">$${totalValue.toLocaleString()}</div>
            <div class="investment-actions">
                <button class="action-btn premium-frost-btn" onclick="dashboard.editInvestment(${investment.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn premium-frost-btn" onclick="dashboard.deleteInvestment(${investment.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return card;
    }
    
    getIncomeIconClass(type) {
        const iconMap = {
            salary: 'briefcase',
            freelance: 'laptop-code',
            business: 'building',
            investment: 'chart-line',
            rental: 'home',
            other: 'dollar-sign'
        };
        return iconMap[type] || 'dollar-sign';
    }
    
    calculateMonthlyAmount(amount, frequency) {
        const multipliers = {
            weekly: 4.33,
            'bi-weekly': 2.17,
            monthly: 1,
            quarterly: 0.33,
            annually: 0.083,
            'one-time': 0
        };
        return amount * (multipliers[frequency] || 1);
    }
    
    updateIncomeSummary() {
        const totalMonthly = incomeData.reduce((sum, income) => 
            sum + this.calculateMonthlyAmount(income.amount, income.frequency), 0
        );
        
        const totalIncomeEl = document.getElementById('total-income');
        if (totalIncomeEl) {
            totalIncomeEl.textContent = `$${totalMonthly.toLocaleString()}`;
        }
    }
    
    updateInvestmentSummary() {
        const totalValue = investmentData.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
        
        const totalInvestmentsEl = document.getElementById('total-investments');
        if (totalInvestmentsEl) {
            totalInvestmentsEl.textContent = `$${totalValue.toLocaleString()}`;
        }
    }
    
    updateOverviewStats() {
        const totalIncome = incomeData.reduce((sum, income) => 
            sum + this.calculateMonthlyAmount(income.amount, income.frequency), 0
        );
        const totalInvestments = investmentData.reduce((sum, inv) => sum + (inv.shares * inv.currentPrice), 0);
        
        const totalIncomeEl = document.getElementById('total-income');
        const totalInvestmentsEl = document.getElementById('total-investments');
        
        if (totalIncomeEl) totalIncomeEl.textContent = `$${totalIncome.toLocaleString()}`;
        if (totalInvestmentsEl) totalInvestmentsEl.textContent = `$${totalInvestments.toLocaleString()}`;
    }
    
    addIncome() {
        this.showNotification('Income source added successfully!', 'success');
    }
    
    addInvestment() {
        this.showNotification('Investment added successfully!', 'success');
    }
    
    editIncome(id) {
        const income = incomeData.find(item => item.id === id);
        if (!income) return;
        
        this.showNotification(`Edit functionality for ${income.name} would be implemented here`, 'info');
    }
    
    editInvestment(id) {
        const investment = investmentData.find(item => item.id === id);
        if (!investment) return;
        
        this.showNotification(`Edit functionality for ${investment.symbol} would be implemented here`, 'info');
    }
    
    deleteIncome(id) {
        if (confirm('Are you sure you want to delete this income source?')) {
            incomeData = incomeData.filter(item => item.id !== id);
            this.updateIncomeDisplay();
            this.updateOverviewStats();
            this.showNotification('Income source deleted', 'success');
        }
    }
    
    deleteInvestment(id) {
        if (confirm('Are you sure you want to delete this investment?')) {
            investmentData = investmentData.filter(item => item.id !== id);
            this.updateInvestmentsDisplay();
            this.updateOverviewStats();
            this.showNotification('Investment deleted', 'success');
        }
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type} premium-frost-glass`;
        notification.style.cssText = `
            position: fixed;
            top: 24px;
            right: 24px;
            padding: 16px 24px;
            border-radius: 12px;
            color: var(--text-primary);
            font-weight: 500;
            font-size: 14px;
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            max-width: 400px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }
    
    handleAuth() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }
        
        currentUser = { email, name: email.split('@')[0] };
        this.showNotification('Welcome to your premium financial intelligence platform!', 'success');
        this.closeAuthModal();
        this.showDashboard();
    }
    
    showDashboard() {
        document.getElementById('landing-page').classList.remove('active');
        document.getElementById('dashboard-page').classList.add('active');
        
        setTimeout(() => this.applyPremiumEffects(), 200);
    }
    
    closeAuthModal() {
        document.getElementById('auth-modal').classList.remove('active');
    }
    
    applyPremiumEffects() {
        document.querySelectorAll('.premium-frost-glass, .floating-card').forEach(element => {
            if (!element.style.background || element.style.background === '') {
                element.style.background = 'rgba(13, 17, 23, 0.65)';
                element.style.backdropFilter = 'blur(40px)';
                element.style.webkitBackdropFilter = 'blur(40px)';
                element.style.border = '1px solid rgba(240, 246, 252, 0.12)';
                element.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 0 60px rgba(255, 255, 255, 0.02)';
            }
        });
        
        console.log('Premium frost effects applied successfully!');
    }
}

// Enhanced smooth tab transitions
function enhanceSmoothTabTransitions() {
    const menuItems = document.querySelectorAll('.smooth-tab');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(menuItem => {
                menuItem.classList.remove('active');
                menuItem.style.transform = 'translateX(0)';
            });
            
            this.classList.add('active');
            this.style.transform = 'translateX(8px)';
            
            const tabName = this.dataset.tab;
            const allTabs = document.querySelectorAll('.tab-content');
            const targetTab = document.getElementById(`${tabName}-tab`);
            
            allTabs.forEach(tab => {
                if (tab.classList.contains('active')) {
                    tab.style.animation = 'smoothTabOut 0.3s ease-in-out forwards';
                    setTimeout(() => {
                        tab.classList.remove('active');
                        tab.style.animation = '';
                    }, 300);
                }
            });
            
            setTimeout(() => {
                if (targetTab) {
                    targetTab.classList.add('active');
                    targetTab.style.animation = 'smoothTabTransition 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
                }
            }, 350);
        });
    });
}

// Navigation functions
function scrollToFeatures(event) {
    event.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
        featuresSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function showPricingInfo(event) {
    event.preventDefault();
    showInfoModal('Pricing Information', `
        <div class="info-content">
            <h3>🎉 Free for Beta Users</h3>
            <p>We're currently in beta and completely free for all users! Enjoy unlimited access to all premium features.</p>
            
            <h4>What's Included:</h4>
            <ul>
                <li>✅ Full AI Financial Advisor access</li>
                <li>✅ Advanced analytics and insights</li>
                <li>✅ Unlimited portfolio tracking</li>
                <li>✅ Real-time market data</li>
                <li>✅ Premium security features</li>
                <li>✅ 24/7 customer support</li>
            </ul>
            
            <h4>Future Pricing (Post-Beta):</h4>
            <div class="pricing-tiers">
                <div class="tier">
                    <strong>Personal</strong>
                    <span>$19/month</span>
                </div>
                <div class="tier">
                    <strong>Professional</strong>
                    <span>$49/month</span>
                </div>
                <div class="tier">
                    <strong>Enterprise</strong>
                    <span>Custom</span>
                </div>
            </div>
            
            <p><strong>Beta users will receive a 50% lifetime discount!</strong></p>
        </div>
    `);
}

function showAboutInfo(event) {
    event.preventDefault();
    showInfoModal('About CaAi', `
        <div class="info-content">
            <h3>🚀 The Future of Financial Intelligence</h3>
            <p>CaAi combines cutting-edge AI technology with decades of financial expertise to create the world's most advanced personal finance platform.</p>
            
            <h4>Our Mission:</h4>
            <p>To democratize access to institutional-grade financial intelligence, making sophisticated financial planning available to everyone.</p>
            
            <h4>Our Technology:</h4>
            <ul>
                <li>🧠 Advanced AI trained on 30 years of CA expertise</li>
                <li>🔒 Bank-grade security and encryption</li>
                <li>📊 Real-time market data and analytics</li>
                <li>🎯 Personalized recommendations and insights</li>
            </ul>
            
            <h4>Our Team:</h4>
            <p>Built by financial experts, data scientists, and AI researchers from top institutions including MIT, Stanford, and Goldman Sachs.</p>
        </div>
    `);
}

function showContactInfo(event) {
    event.preventDefault();
    showInfoModal('Contact & Support', `
        <div class="info-content">
            <h3>📞 24/7 Premium Support</h3>
            <p>Our expert support team is available around the clock to assist with any questions or issues.</p>
            
            <div class="contact-methods">
                <div class="contact-item">
                    <i class="fas fa-comments"></i>
                    <div>
                        <strong>Live Chat</strong>
                        <p>Instant support via in-app chat</p>
                        <span>Available 24/7</span>
                    </div>
                </div>
                
                <div class="contact-item">
                    <i class="fas fa-envelope"></i>
                    <div>
                        <strong>Email Support</strong>
                        <p>support@caai.finance</p>
                        <span>Response within 2 hours</span>
                    </div>
                </div>
                
                <div class="contact-item">
                    <i class="fas fa-phone"></i>
                    <div>
                        <strong>Phone Support</strong>
                        <p>+1 (555) CAAI-HELP</p>
                        <span>Mon-Fri 9AM-9PM EST</span>
                    </div>
                </div>
                
                <div class="contact-item">
                    <i class="fas fa-video"></i>
                    <div>
                        <strong>Video Consultation</strong>
                        <p>One-on-one financial planning sessions</p>
                        <span>Premium subscribers only</span>
                    </div>
                </div>
            </div>
            
            <h4>🏢 Business Inquiries:</h4>
            <p>For partnership, enterprise, or media inquiries:</p>
            <p>📧 business@caai.finance</p>
            <p>📱 LinkedIn: /company/caai-financial</p>
        </div>
    `);
}

function showInfoModal(title, content) {
    let modal = document.getElementById('info-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'info-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content premium-frost-glass large-modal">
                <div class="modal-header">
                    <h2 id="info-title" class="premium-gradient-text">${title}</h2>
                    <button class="modal-close premium-frost-btn" onclick="closeInfoModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="info-content">
                    ${content}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        document.getElementById('info-title').textContent = title;
        document.getElementById('info-content').innerHTML = content;
    }
    
    modal.classList.add('active');
}

function closeInfoModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function showFeatureDetails(featureKey) {
    const feature = featureDetails[featureKey];
    if (!feature) return;
    
    let modal = document.getElementById('feature-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'feature-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content premium-frost-glass large-modal">
                <div class="modal-header">
                    <h2 id="feature-title" class="premium-gradient-text">${feature.title}</h2>
                    <button class="modal-close premium-frost-btn" onclick="closeFeatureModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body" id="feature-content">
                    ${feature.content}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        document.getElementById('feature-title').textContent = feature.title;
        document.getElementById('feature-content').innerHTML = feature.content;
    }
    
    modal.classList.add('active');
}

function closeFeatureModal() {
    const modal = document.getElementById('feature-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function guestAccess() {
    const guestBtn = document.querySelector('.guest-btn');
    if (guestBtn) {
        guestBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            <span>Preparing Demo...</span>
            <small>Setting up your experience</small>
        `;
    }
    
    setTimeout(() => {
        currentUser = { 
            email: 'guest@demo.caai', 
            name: 'Guest User', 
            isGuest: true 
        };
        
        if (window.dashboard) {
            window.dashboard.showNotification('Welcome to CaAi! Exploring as guest with full demo access', 'success');
            window.dashboard.showDashboard();
        }
        
        closeAuthModal();
        closeInfoModal();
    }, 1500);
}

// Global functions
function showAuthModal(mode) {
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('auth-title');
    const submitBtn = document.getElementById('auth-submit');
    
    if (mode === 'signup') {
        title.textContent = 'Create Your Account';
        submitBtn.textContent = 'Create Account';
    } else {
        title.textContent = 'Welcome Back';
        submitBtn.textContent = 'Sign In';
    }
    
    modal.classList.add('active');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
}

function showAddIncomeModal() {
    document.getElementById('add-income-modal').classList.add('active');
}

function closeAddIncomeModal() {
    document.getElementById('add-income-modal').classList.remove('active');
}

function showAddInvestmentModal() {
    document.getElementById('add-investment-modal').classList.add('active');
}

function closeAddInvestmentModal() {
    document.getElementById('add-investment-modal').classList.remove('active');
}

function toggleChatbot() {
    if (window.chatbot) {
        window.chatbot.toggle();
    }
}

function sendMessage() {
    if (window.chatbot) {
        window.chatbot.sendMessage();
    }
}

function logout() {
    currentUser = null;
    document.getElementById('dashboard-page').classList.remove('active');
    document.getElementById('landing-page').classList.add('active');
    if (window.dashboard) {
        window.dashboard.showNotification('Successfully logged out', 'success');
    }
}

function googleAuth() {
    if (window.dashboard) {
        window.dashboard.showNotification('Google authentication integration coming soon!', 'info');
    }
}

// Enhanced styles injection
const enhancedFeatureStyles = `
@keyframes smoothTabOut {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-20px) scale(0.98);
    }
}

.typing-dots {
    display: flex;
    align-items: center;
    gap: 4px;
    height: 20px;
    padding: 8px;
}

.typing-dots span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    animation: typingBounce 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
    animation-delay: 0.2s;
}

.typing-dots span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes typingBounce {
    0%, 80%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    40% {
        opacity: 1;
        transform: scale(1);
    }
}

.info-content h3, .info-content h4 {
    color: var(--text-primary);
    margin: 1.5rem 0 1rem 0;
}

.info-content ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
}

.info-content li {
    margin: 0.5rem 0;
    color: var(--text-secondary);
}

.pricing-tiers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

.tier {
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.contact-methods {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.contact-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
}

.contact-item i {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-top: 0.5rem;
}

.contact-item strong {
    color: var(--text-primary);
    display: block;
    margin-bottom: 0.5rem;
}

.contact-item p {
    margin: 0;
    color: var(--text-secondary);
}

.contact-item span {
    font-size: 0.85rem;
    color: var(--text-muted);
}

.feature-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 2rem 0;
}

.feature-stats .stat {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.feature-stats .stat strong {
    display: block;
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 0.5rem;
}

.conversation-example {
    background: rgba(255, 255, 255, 0.03);
    padding: 1rem;
    border-radius: 8px;
    margin: 1rem 0;
}

.user-msg, .ai-msg {
    margin: 0.5rem 0;
    padding: 0.5rem;
    border-radius: 6px;
}

.user-msg {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
}

.ai-msg {
    background: rgba(50, 184, 205, 0.1);
    color: var(--text-secondary);
}

.security-badges {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin: 1rem 0;
}

.badge {
    background: linear-gradient(135deg, var(--gradient-primary));
    color: var(--primary-black);
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
}

.portfolio-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1.5rem 0;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

.feature-item i {
    color: var(--text-primary);
    font-size: 1.2rem;
}
`;

// Inject enhanced styles
const enhancedStyleSheet = document.createElement('style');
enhancedStyleSheet.textContent = enhancedFeatureStyles;
document.head.appendChild(enhancedStyleSheet);

// Enhanced initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    const starfield = new PremiumStarfield();
    const dashboard = new PremiumFinancialDashboard();
    const chatbot = new SmartFinancialChatbot();
    
    // Make globally accessible
    window.dashboard = dashboard;
    window.chatbot = chatbot;
    window.starfield = starfield;
    
    // Initialize enhanced smooth transitions
    enhanceSmoothTabTransitions();
    
    // Apply premium effects on load
    setTimeout(() => {
        dashboard.applyPremiumEffects();
    }, 1000);
    
    // Enhanced smooth scroll for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Enhanced floating animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.floating-card').forEach(card => {
        observer.observe(card);
    });
    
    // Premium loading effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('🎯 CaAi Premium Financial Assistant - Complete & Ready!');
});

// Enhanced window resize handling
window.addEventListener('resize', () => {
    if (portfolioChart) portfolioChart.resize();
    if (allocationChart) allocationChart.resize();
});

// Premium focus effects
document.addEventListener('focusin', (e) => {
    if (e.target.matches('.premium-input, .premium-frost-btn, .premium-gradient-btn')) {
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
        e.target.style.boxShadow = '0 8px 25px rgba(255, 255, 255, 0.15)';
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.matches('.premium-input, .premium-frost-btn, .premium-gradient-btn')) {
        e.target.style.transform = '';
        e.target.style.boxShadow = '';
    }
});

// Cleanup function
window.addEventListener('beforeunload', () => {
    if (window.starfield) {
        window.starfield.destroy();
    }
});
