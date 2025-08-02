# Componentes de Actividades

Este módulo contiene todos los componentes necesarios para mostrar y gestionar actividades en la aplicación React Native.

## Estructura

```
Activity/
├── ActivityScreen.js              # Pantalla principal de actividades
├── ActivityDetailScreen.js        # Pantalla de detalle de actividad
├── components/
│   ├── ActivityCard.js           # Tarjeta individual de actividad
│   ├── PaginationControls.js     # Controles de paginación
│   └── FilterControls.js         # Controles de filtros
└── index.js                      # Exportaciones
```

## Componentes

### ActivityScreen
Pantalla principal que muestra una lista paginada de actividades con filtros.

**Props:**
- `navigation`: Objeto de navegación de React Navigation
- `route`: Objeto de ruta con parámetros

**Características:**
- Paginado automático
- Filtros por sección y dificultad
- Pull-to-refresh
- Manejo de errores
- Carga diferida

### ActivityDetailScreen
Pantalla de detalle que muestra información completa de una actividad.

**Props:**
- `navigation`: Objeto de navegación
- `route.params.activityId`: ID de la actividad a mostrar

**Características:**
- Galería de imágenes con controles
- Información completa de la actividad
- Badges de dificultad
- Botones de acción

### ActivityCard
Componente de tarjeta para mostrar una actividad en la lista.

**Props:**
- `activity`: Objeto de actividad
- `onPress`: Función callback al presionar

**Características:**
- Imagen con placeholder
- Badge de dificultad
- Información de Xavicoints
- Sección y profesor

### PaginationControls
Controles de paginación con navegación intuitiva.

**Props:**
- `currentPage`: Página actual
- `totalPages`: Total de páginas
- `onPageChange`: Función callback para cambiar página
- `hasNextPage`: Si hay página siguiente
- `hasPrevPage`: Si hay página anterior

### FilterControls
Controles de filtros con modal de selección.

**Props:**
- `currentFilters`: Filtros actuales
- `onFilterChange`: Función callback para cambiar filtros

## Store (Zustand)

### useActivityStore
Store para manejar el estado de las actividades.

**Estado:**
```javascript
{
  activities: [],           // Lista de actividades
  currentActivity: null,    // Actividad actual
  loading: false,          // Estado de carga
  error: null,             // Error actual
  pagination: {            // Información de paginación
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
    pageSize: 10,
    hasNextPage: false,
    hasPrevPage: false
  },
  filters: {               // Filtros actuales
    section: null,
    difficulty: null
  }
}
```

**Acciones principales:**
- `fetchActivitiesByProfessor`: Obtener actividades por profesor
- `fetchAvailableActivitiesForStudent`: Obtener actividades disponibles para estudiante
- `fetchActivityById`: Obtener actividad por ID
- `setPage`: Cambiar página
- `setFilters`: Cambiar filtros
- `clearActivities`: Limpiar estado

## Servicios

### activityService.js
Servicios para comunicarse con la API de actividades.

**Funciones:**
- `getActivitiesByProfessor(professorId, page, pageSize, section)`
- `getAvailableActivitiesForStudent(studentId, page, limit, section)`
- `getActivityById(activityId)`
- `getAllActivities()`

## Uso

### 1. Importar componentes
```javascript
import { ActivityScreen, ActivityDetailScreen } from '../components/Activity';
```

### 2. Configurar navegación
```javascript
// En tu stack navigator
<Stack.Screen 
  name="Activities" 
  component={ActivityScreen}
  options={{ title: 'Actividades' }}
/>
<Stack.Screen 
  name="ActivityDetail" 
  component={ActivityDetailScreen}
  options={{ title: 'Detalle de Actividad' }}
/>
```

### 3. Usar el store
```javascript
import useActivityStore from '../store/activityStore';

const { activities, loading, fetchActivitiesByProfessor } = useActivityStore();
```

## Características

### ✅ Modularización
- Componentes reutilizables
- Separación de responsabilidades
- Store centralizado

### ✅ Paginado
- Navegación intuitiva
- Indicadores de página
- Botones anterior/siguiente

### ✅ Filtros
- Modal de filtros
- Filtros por sección y dificultad
- Indicadores de filtros activos

### ✅ UX/UI
- Diseño moderno y responsive
- Estados de carga y error
- Pull-to-refresh
- Placeholders para imágenes

### ✅ Gestión de Estado
- Zustand para estado global
- Persistencia de datos
- Manejo de errores

### ✅ API Integration
- Servicios modulares
- Manejo de respuestas
- URLs configurables

## Dependencias

- `zustand`: Gestión de estado
- `axios`: Peticiones HTTP
- `@react-native-async-storage/async-storage`: Persistencia
- `react-navigation`: Navegación

## Configuración

1. Asegúrate de tener las dependencias instaladas
2. Configura la URL base en `activityService.js`
3. Integra los componentes en tu navegación
4. Configura el store en tu app principal 