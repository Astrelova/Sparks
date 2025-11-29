// JavaScript для функциональности ИИ поиска

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Инициализируем ИИ поиск...');
    setupAISearchEvents();
});

// Настройка обработчиков событий ИИ поиска
function setupAISearchEvents() {
    const aiSearchForm = document.getElementById('aiSearchForm');
    
    if (aiSearchForm) {
        aiSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            performAISearch();
        });
    }
}

// Выполнение ИИ поиска
function performAISearch() {
    console.log('Запускаем ИИ поиск...');
    
    // Собираем данные из формы
    const searchData = {
        recipientName: document.getElementById('recipientName').value.trim(),
        recipientAge: parseInt(document.getElementById('recipientAge').value),
        recipientGender: document.getElementById('recipientGender').value,
        budget: parseInt(document.getElementById('budget').value),
        interests: document.getElementById('interests').value.trim(),
        occasion: document.getElementById('occasion').value,
        additionalInfo: document.getElementById('additionalInfo').value.trim()
    };
    
    // Проверяем обязательные поля
    if (!searchData.recipientName || !searchData.recipientAge || !searchData.recipientGender || 
        !searchData.budget || !searchData.interests || !searchData.occasion) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Показываем индикатор загрузки
    showLoadingIndicator();
    
    // Имитируем запрос к ИИ (в реальном приложении здесь будет API вызов)
    setTimeout(() => {
        const results = generateAIResults(searchData);
        displayAIResults(results);
        hideLoadingIndicator();
    }, 2000);
    
    console.log('Данные для ИИ поиска:', searchData);
}

// Показ индикатора загрузки
function showLoadingIndicator() {
    const resultsDiv = document.getElementById('aiResults');
    resultsDiv.style.display = 'block';
    resultsDiv.innerHTML = `
        <div style="text-align: center; padding: 40px;">
            <i class="fas fa-robot" style="font-size: 48px; color: var(--primary-color); margin-bottom: 20px;"></i>
            <h3>ИИ ищет идеальные подарки...</h3>
            <p>Анализируем интересы и предпочтения...</p>
            <div class="loading-spinner" style="width: 40px; height: 40px; border: 4px solid var(--border-color); border-top: 4px solid var(--primary-color); border-radius: 50%; animation: spin 1s linear infinite; margin: 20px auto;"></div>
        </div>
    `;
    
    // Добавляем CSS анимацию
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Скрытие индикатора загрузки
function hideLoadingIndicator() {
    // Стиль уже добавлен, просто очищаем содержимое
}

// Генерация результатов ИИ (имитация)
function generateAIResults(searchData) {
    // Базовые рекомендации в зависимости от пола и возраста
    let baseRecommendations = [];
    
    if (searchData.recipientGender === 'female') {
        baseRecommendations = [
            {
                name: "Подарочный набор косметики",
                price: Math.min(searchData.budget, 3000),
                category: "уход",
                reason: "Идеально подходит по возрасту и интересам в уходе за собой",
                description: "Набор качественной косметики от проверенных брендов"
            },
            {
                name: "Книга по интересам",
                price: Math.min(searchData.budget, 1500),
                category: "книги",
                reason: "Соответствует указанным увлечениям",
                description: "Популярная книга в выбранной тематике"
            }
        ];
    } else {
        baseRecommendations = [
            {
                name: "Гаджет или аксессуар",
                price: Math.min(searchData.budget, 4000),
                category: "техника",
                reason: "Подходит для современного мужчины",
                description: "Полезный гаджет для повседневного использования"
            },
            {
                name: "Набор для хобби",
                price: Math.min(searchData.budget, 2500),
                category: "хобби",
                reason: "Отлично сочетается с увлечениями",
                description: "Все необходимое для любимого занятия"
            }
        ];
    }
    
    // Добавляем персонализированные рекомендации на основе интересов
    const interests = searchData.interests.toLowerCase();
    
    if (interests.includes('спорт') || interests.includes('фитнес')) {
        baseRecommendations.push({
            name: "Спортивный инвентарь",
            price: Math.min(searchData.budget, 3500),
            category: "спорт",
            reason: "Идеально для активного человека",
            description: "Качественный спортивный инвентарь для тренировок"
        });
    }
    
    if (interests.includes('кулинария') || interests.includes('готовка')) {
        baseRecommendations.push({
            name: "Кухонный гаджет",
            price: Math.min(searchData.budget, 2800),
            category: "кухня",
            reason: "Практичный подарок для любителя готовить",
            description: "Умное устройство для кухни"
        });
    }
    
    if (interests.includes('путешествия') || interests.includes('туризм')) {
        baseRecommendations.push({
            name: "Дорожный аксессуар",
            price: Math.min(searchData.budget, 2200),
            category: "путешествия",
            reason: "Пригодится в поездках",
            description: "Стильный и практичный аксессуар для путешественника"
        });
    }
    
    // Добавляем подарок по поводу
    switch (searchData.occasion) {
        case 'birthday':
            baseRecommendations.push({
                name: "Праздничный набор",
                price: Math.min(searchData.budget, 2000),
                category: "праздник",
                reason: "Создает праздничное настроение",
                description: "Набор для создания праздничной атмосферы"
            });
            break;
        case 'anniversary':
            baseRecommendations.push({
                name: "Романтический подарок",
                price: Math.min(searchData.budget, 4000),
                category: "романтика",
                reason: "Идеально для годовщины",
                description: "Элегантный и запоминающийся подарок"
            });
            break;
    }
    
    return baseRecommendations.slice(0, 4); // Возвращаем до 4 рекомендаций
}

// Отображение результатов ИИ поиска
function displayAIResults(results) {
    const resultsDiv = document.getElementById('aiResults');
    const resultsList = document.getElementById('resultsList');
    
    resultsDiv.style.display = 'block';
    
    if (results.length === 0) {
        resultsList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--text-secondary);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px;"></i>
                <h3>Ничего не найдено</h3>
                <p>Попробуйте изменить критерии поиска</p>
            </div>
        `;
        return;
    }
    
    resultsList.innerHTML = results.map((result, index) => `
        <div class="result-item">
            <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 15px;">
                <h4 style="margin: 0; color: var(--text-primary);">${result.name}</h4>
                <span style="background: var(--primary-color); color: white; padding: 4px 12px; border-radius: 15px; font-size: 0.9rem;">
                    ${result.price.toLocaleString()} руб.
                </span>
            </div>
            <p style="color: var(--text-secondary); margin-bottom: 10px;">${result.description}</p>
            <div style="display: flex; gap: 15px; font-size: 0.9rem;">
                <span style="background: var(--border-color); padding: 4px 8px; border-radius: 6px;">${result.category}</span>
                <span style="color: var(--primary-color);">
                    <i class="fas fa-lightbulb"></i> ${result.reason}
                </span>
            </div>
            <button class="order-btn" style="margin-top: 15px; padding: 10px 20px;" onclick="saveRecommendation(${index})">
                <i class="fas fa-heart"></i> Сохранить в виш-лист
            </button>
        </div>
    `).join('');
    
    console.log('Отображено результатов ИИ:', results.length);
}

// Сохранение рекомендации в виш-лист
function saveRecommendation(resultIndex) {
    // В реальном приложении здесь будет логика сохранения
    alert('Рекомендация сохранена в ваш виш-лист!');
    console.log('Сохранена рекомендация с индексом:', resultIndex);
}