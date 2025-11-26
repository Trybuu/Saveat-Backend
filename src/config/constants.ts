export const RECIPE_TAGS = [
  // 2. Kuchnia (Cuisine)
  'Italian', // Włoska
  'Polish', // Polska
  'Asian', // Azjatycka
  'Mexican', // Meksykańska
  'American', // Amerykańska
  'Mediterranean', // Śródziemnomorska
  'French', // Francuska

  // 3. Właściwości Dietetyczne (Dietary / Health)
  'Vegetarian', // Wegetariańskie
  'Vegan', // Wegańskie
  'GlutenFree', // Bezglutenowe
  'DairyFree', // Bezmleczne
  'LowCarb', // Niskowęglowodanowe
  'Keto', // Keto
  'HighProtein', // Wysokobiałkowe
  'Healthy', // Ogólnie zdrowe
  'SugarFree', // Bez cukru

  // 4. Czas i Trudność (Time / Difficulty)
  'Quick', // Szybkie (np. < 20 minut)
  'Easy', // Łatwe / dla początkujących
  'Advanced', // Zaawansowane
  'MakeAhead', // Do zrobienia z wyprzedzeniem

  // 5. Metody i Inne (Method / Miscellaneous)
  'Baking', // Wymaga pieczenia
  'Grill', // Grillowanie
  'OnePot', // Jednogarnkowe (minimum sprzątania)
  'BudgetFriendly', // Budżetowe / tanie
  'Spicy', // Pikantne
  'ComfortFood', // Jedzenie "pocieszające"
  'NoBake', // Bez pieczenia
]

export const MEAL_TYPES = [
  'Breakfast', // Śniadanie
  'Lunch', // Lunch / Obiad
  'Dinner', // Kolacja
  'Dessert', // Deser
  'Snack', // Przekąska
  'Appetizer', // Przystawka
  'Drink', // Napój
]

export const QUANTITY_UNITS = [
  'kg',
  'g',
  'l',
  'ml',
  'pc',
  'tsp',
  'tbsp',
  'slice',
  'clove',
  'stick',
  'pinch',
  'package',
  'can',
  'jar',
  'cup',
]

export const ADS_SECTIONS = [
  'HomeScreenBanner',
  'RecipeSidebar',
  'PantryFooter',
  'ArticleFeed',
  'SearchDropdown',
]

export const ADS_PRIORITIES = ['Premium', 'Standard', 'HouseAd']

export const APP_EVENT_TYPES = [
  'PAGE_VIEW', // Wyświetlenie dowolnego ekranu (standard)
  'LOGIN', // Zalogowanie
  'LOGOUT', // Wylogowanie
  'RECIPE_SEARCH', // Wyszukanie przepisu
  'RECIPE_VIEW', // Wyświetlenie detalu przepisu
  'SUPPLY_ADD', // Dodanie produktu do spiżarni
  'SUPPLY_REMOVE', // Usunięcie produktu ze spiżarni
  'ARTICLE_VIEW', // Wyświetlenie artykułu
  'APP_START', // Uruchomienie aplikacji
  'APP_BACKGROUND', // Przejście do tła
]

export const ARTICLE_CATEGORIES = [
  'Food and Kitchen',
  'Finance and Saving',
  'Zero Waste and Sustainability',
  'Lifestyle and Organization',
]

// AKTUALNIE NIE UŻYWANE
export const USER_ROLES = ['user', 'moderator', 'admin']
export const SUBSCRIPTION_PLANS = ['plus', 'ultimate']

export const PRODUCT_TYPES = [
  'Fruits', // Owoce (np. jabłka, banany)
  'Vegetables', // Warzywa (np. marchew, sałata)
  'Grains and Pasta', // Zboża i makarony (np. ryż, mąka, chleb)
  'Dairy', // Nabiał (np. mleko, ser, jogurt)
  'Meat', // Mięso (np. kurczak, wołowina)
  'Fish and Seafood', // Ryby i owoce morza (np. łosoś, krewetki)
  'Spices and Herbs', // Przyprawy i zioła (np. pieprz, bazylia)
  'Oils and Fats', // Oleje i tłuszcze (np. oliwa z oliwek, masło)
  'Sweets and Snacks', // Słodycze i przekąski (np. czekolada, chipsy)
  'Beverages', // Napoje (np. soki, woda, kawa)
  'Frozen Food', // Mrożonki
  'Canned Goods', // Konserwy
  'Other', // Inne / Nieskategoryzowane
]
