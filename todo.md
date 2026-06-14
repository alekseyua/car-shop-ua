src/
│
├── app/                         # Инициализация приложения
│   ├── providers/
│   │   ├── router/
│   │   ├── query-client/
│   │   ├── theme/
│   │   └── store/
│   │
│   ├── styles/
│   ├── App.tsx
│   └── main.tsx
│
├── pages/                       # Страницы
│   ├── catalog-page/
│   ├── product-page/
│   ├── search-page/
│   └── not-found/
│
├── widgets/                     # Большие композиционные блоки
│   ├── sidebar-catalog/
│   ├── catalog-items-table/
│   ├── product-filters/
│   ├── product-grid/
│   └── header/
│
├── features/                    # Пользовательские действия
│   ├── select-catalog-group/
│   │   ├── ui/
│   │   │   ├── catalog-group-list.tsx
│   │   │   ├── catalog-group-item.tsx
│   │   │   └── catalog-group-sidebar.tsx
│   │   │
│   │   ├── model/
│   │   │   ├── types.ts
│   │   │   ├── store.ts               # Zustand / Redux
│   │   │   ├── selectors.ts
│   │   │   └── hooks/
│   │   │       ├── use-catalog-group.ts
│   │   │       └── use-active-group.ts
│   │   │
│   │   ├── api/
│   │   │   ├── get-catalog-groups.ts
│   │   │   └── dto.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── map-groups.ts
│   │   │   └── normalize-groups.ts
│   │   │
│   │   ├── config/
│   │   │   └── constants.ts
│   │   │
│   │   └── index.ts
│   │
│   ├── search-product/
│   ├── add-to-cart/
│   ├── change-language/
│   └── auth/
│
├── entities/                    # Бизнес сущности
│   ├── catalog/
│   │   ├── api/
│   │   │   └── catalog.api.ts
│   │   │
│   │   ├── model/
│   │   │   ├── catalog.store.ts
│   │   │   ├── catalog.types.ts
│   │   │   ├── use-catalog.ts
│   │   │   └── selectors.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── map-catalog.ts
│   │   │   └── build-tree.ts
│   │   │
│   │   ├── ui/
│   │   │   ├── catalog-list.tsx
│   │   │   ├── catalog-item.tsx
│   │   │   └── catalog-tree.tsx
│   │   │
│   │   └── index.ts
│   │
│   ├── product/
│   │   ├── api/
│   │   ├── model/
│   │   ├── lib/
│   │   ├── ui/
│   │   └── index.ts
│   │
│   └── car/
│       ├── api/
│       ├── model/
│       ├── ui/
│       └── index.ts
│
├── shared/                      # Переиспользуемая инфраструктура
│   ├── api/
│   │   ├── axios.ts
│   │   ├── interceptors.ts
│   │   └── types.ts
│   │
│   ├── ui/
│   │   ├── button/
│   │   ├── input/
│   │   ├── modal/
│   │   ├── loader/
│   │   └── table/
│   │
│   ├── hooks/
│   │   ├── use-debounce.ts
│   │   ├── use-modal.ts
│   │   └── use-pagination.ts
│   │
│   ├── lib/
│   │   ├── format-price.ts
│   │   ├── build-query.ts
│   │   ├── delay.ts
│   │   └── constants.ts
│   │
│   ├── config/
│   │   ├── env.ts
│   │   └── routes.ts
│   │
│   ├── types/
│   │   └── common.ts
│   │
│   └── assets/
│
└── processes/                   # Большие сценарии (редко нужны)
    └── checkout/

app
  ↓
widgets
  ↓
features
  ↓
entities
  ↓
shared

https://img2.ad.ua/imgs/tcd/0257_pic/MA-33121_1.JPG?46154166
https://img2.ad.ua/imgs/tcd-pic/0257_pic/MA-33121_1.JPG?46154166
https://img2.ad.ua/imgs/tcd-pic/0257_pic/MA-33121_1.JPG?46154166