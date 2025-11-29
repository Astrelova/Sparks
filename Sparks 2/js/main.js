// Основной JavaScript файл для функциональности сайта

// Данные для демонстрации поиска людей
const demoUsers = [
    { id: 1, name: "Анна Иванова", age: 28, interests: ["книги", "йога", "кофе"] },
    { id: 2, name: "Петр Сидоров", age: 32, interests: ["футбол", "автомобили", "рыбалка"] },
    { id: 3, name: "Мария Петрова", age: 25, interests: ["рисование", "путешествия", "фотография"] },
    { id: 4, name: "Алексей Козлов", age: 30, interests: ["гитара", "вино", "горные лыжи"] },
    { id: 5, name: "Елена Смирнова", age: 29, interests: ["танцы", "кулинария", "театр"] }
];

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена, инициализируем функциональность...');
    setupSearchFunctionality();
});

// Настройка функциональности поиска
function setupSearchFunctionality() {
    console.log('Настраиваем поиск людей...');
    
    const searchPeopleBtn = document.getElementById('searchPeopleBtn');
    const closeSearchSidebar = document.getElementById('closeSearchSidebar');
    const searchSidebar = document.getElementById('searchSidebar');
    const peopleSearchInput = document.getElementById('peopleSearchInput');
    
    // Проверяем, есть ли элементы на странице
    if (!searchPeopleBtn) {
        console.log('Кнопка поиска людей не найдена');
        return;
    }
    
    if (!searchSidebar) {
        console.log('Боковая панель поиска не найдена');
        return;
    }
    
    console.log('Все элементы поиска найдены, настраиваем события...');
    
    // Обработчик клика по кнопке поиска
    searchPeopleBtn.addEventListener('click', function(event) {
        console.log('Клик по кнопке поиска людей');
        event.preventDefault();
        event.stopPropagation();
        
        searchSidebar.classList.add('active');
        console.log('Боковая панель открыта');
        
        // Фокусируемся на поле ввода
        if (peopleSearchInput) {
            setTimeout(() => {
                peopleSearchInput.focus();
            }, 300);
        }
    });
    
    // Закрытие боковой панели
    if (closeSearchSidebar) {
        closeSearchSidebar.addEventListener('click', function() {
            console.log('Закрытие боковой панели');
            searchSidebar.classList.remove('active');
        });
    }
    
    // Закрытие при клике вне панели
    document.addEventListener('click', function(event) {
        if (searchSidebar.classList.contains('active') && 
            !searchSidebar.contains(event.target) && 
            event.target !== searchPeopleBtn) {
            console.log('Клик вне панели, закрываем');
            searchSidebar.classList.remove('active');
        }
    });
    
    // Поиск при вводе текста
    if (peopleSearchInput) {
        peopleSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim();
            console.log('Поиск:', searchTerm);
            performPeopleSearch(searchTerm);
        });
        
        // Также поиск при нажатии Enter
        peopleSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                console.log('Поиск по Enter:', searchTerm);
                performPeopleSearch(searchTerm);
            }
        });
    }
    
    // Предотвращаем закрытие при клике внутри панели
    if (searchSidebar) {
        searchSidebar.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
}

// Выполнение поиска людей
function performPeopleSearch(searchTerm) {
    const searchResults = document.getElementById('searchResults');
    
    if (!searchResults) {
        console.log('Контейнер результатов поиска не найден');
        return;
    }
    
    // Очищаем предыдущие результаты
    searchResults.innerHTML = '';
    
    // Если поисковый запрос пустой - показываем сообщение
    if (!searchTerm) {
        searchResults.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Начните вводить ФИО для поиска</p>';
        return;
    }
    
    // Фильтруем пользователей по введенному тексту
    const filteredUsers = demoUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    console.log('Найдено пользователей:', filteredUsers.length);
    
    // Показываем результаты или сообщение об отсутствии результатов
    if (filteredUsers.length === 0) {
        searchResults.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 20px;">Никого не найдено</p>';
    } else {
        // Создаем элементы для каждого найденного пользователя
        filteredUsers.forEach(user => {
            const userElement = document.createElement('div');
            userElement.className = 'search-result-item';
            userElement.innerHTML = `
                <h4 style="margin: 0 0 5px 0; color: var(--text-primary);">${user.name}</h4>
                <p style="margin: 0 0 5px 0; color: var(--text-secondary); font-size: 0.9rem;">${user.age} лет</p>
                <p style="margin: 0; color: var(--text-secondary); font-size: 0.8rem;">Интересы: ${user.interests.join(', ')}</p>
            `;
            
            // Добавляем обработчик клика для перехода к профилю
            userElement.addEventListener('click', function() {
                console.log('Переход к профилю:', user.name);
                window.location.href = `profile.html?user=${user.id}`;
            });
            
            searchResults.appendChild(userElement);
        });
    }
}