# Sistema de Progreso de Logros

## Descripción General

El sistema de progreso de logros permite actualizar automáticamente el progreso de los usuarios cuando realizan acciones que pueden desbloquear logros. El sistema está diseñado para ser robusto, eficiente y fácil de mantener.

## Arquitectura del Sistema

### Componentes Principales

1. **achievementProgress.service.ts** - Servicio principal para manejar el progreso
2. **achievementProgress.controller.ts** - Controladores para endpoints REST
3. **achievementProgress.routes.ts** - Rutas de la API
4. **Integración automática** - Middleware en servicios existentes

### Tipos de Logros Soportados

- **activities_completed** - Actividades completadas
- **level_reached** - Nivel alcanzado
- **streak_days** - Racha de días consecutivos
- **coins_earned** - XaviCoins ganadas
- **perfect_scores** - Puntuaciones perfectas
- **math_topic** - Actividades de temas matemáticos específicos
- **ranking_position** - Posición en ranking

## Uso del Sistema

### 1. Actualización Automática

El sistema se actualiza automáticamente en los siguientes casos:

#### Al Aprobar Evidencias
```typescript
// Se ejecuta automáticamente en evidence.service.ts
// cuando una evidencia cambia a status 'approved'
```

#### Al Subir de Nivel
```typescript
// Se ejecuta automáticamente en level.service.ts
// cuando el usuario sube de nivel
```

### 2. Actualización Manual

#### Función Principal
```typescript
import { updateAchievementProgressFromAction } from './achievementProgress.service';

const unlockedAchievements = await updateAchievementProgressFromAction({
  userId: 123,
  activityType: 'math',
  mathTopic: 'algebra',
  xavicoinsEarned: 50,
  levelReached: 5,
  streakDays: 7,
  perfectScore: true,
  rankingPosition: 3
});
```

#### Funciones Específicas
```typescript
// Por actividad completada
await updateProgressFromActivity(userId, activityData);

// Por subida de nivel
await updateProgressFromLevelUp(userId, newLevel);

// Por racha de días
await updateProgressFromStreak(userId, streakDays);

// Por XaviCoins ganadas
await updateProgressFromCoins(userId, totalCoins);

// Por ranking
await updateProgressFromRanking(userId, rankingPosition);
```

### 3. Endpoints de la API

#### Actualizar Progreso por Actividad
```http
POST /api/achievements/progress/activity/:userId
Content-Type: application/json

{
  "activityType": "math",
  "mathTopic": "algebra",
  "perfectScore": true
}
```

#### Actualizar Progreso por Subida de Nivel
```http
POST /api/achievements/progress/level/:userId
Content-Type: application/json

{
  "newLevel": 5
}
```

#### Actualizar Progreso por Racha
```http
POST /api/achievements/progress/streak/:userId
Content-Type: application/json

{
  "streakDays": 7
}
```

#### Actualizar Progreso por XaviCoins
```http
POST /api/achievements/progress/coins/:userId
Content-Type: application/json

{
  "totalCoins": 150
}
```

#### Actualizar Progreso por Ranking
```http
POST /api/achievements/progress/ranking/:userId
Content-Type: application/json

{
  "rankingPosition": 3
}
```

#### Función Principal (Múltiples Acciones)
```http
POST /api/achievements/progress/action/:userId
Content-Type: application/json

{
  "activityType": "math",
  "mathTopic": "algebra",
  "xavicoinsEarned": 50,
  "levelReached": 5,
  "streakDays": 7,
  "perfectScore": true,
  "rankingPosition": 3
}
```

#### Forzar Actualización (Debugging)
```http
POST /api/achievements/progress/force-update/:userId
```

#### Obtener Progreso Detallado
```http
GET /api/achievements/progress/progress/:userId
```

## Integración con Servicios Existentes

### Evidencias (Evidence Service)
```typescript
// En updateEvidence()
if (evidenceData.status === 'approved' && previousStatus !== 'approved') {
  const unlockedAchievements = await updateAchievementProgressFromAction({
    userId: evidence.studentId,
    activityType: evidence.activity?.type,
    mathTopic: evidence.activity?.mathTopic,
    perfectScore: evidence.score === 100,
    xavicoinsEarned: evidence.activity?.xavicoints
  });
}
```

### Nivel (Level Service)
```typescript
// En addExperience()
if (newLevel > currentLevel) {
  const unlockedAchievements = await updateProgressFromLevelUp(userId, newLevel);
}
```

## Logros Actuales en el Sistema

### Logros de Progreso
- **Primer Paso**: Completar tu primera actividad (1 actividad)

### Logros de Matemáticas
- **Sumador**: Completar 10 actividades de aritmética
- **Algebrista**: Completar 10 actividades de álgebra
- **Geómetra**: Completar 10 actividades de geometría
- **Trigonometrista**: Completar 10 actividades de trigonometría
- **Razonador**: Completar 10 actividades de razonamiento matemático

## Funciones de Debugging

### Forzar Actualización de Todos los Logros
```typescript
import { forceUpdateAllUserAchievements } from './achievementProgress.service';

const results = await forceUpdateAllUserAchievements(userId);
// Retorna: { updated: number, unlocked: number, errors: number }
```

### Obtener Progreso Detallado
```typescript
// Endpoint GET /api/achievements/progress/progress/:userId
// Retorna resumen y lista completa de logros del usuario
```

## Logs y Monitoreo

El sistema incluye logs detallados para monitoreo:

```bash
🎯 Actualizando progreso por actividad para usuario 123
📈 Progreso actualizado: Primer Paso (0 → 1/1)
🎉 ¡LOGRO DESBLOQUEADO! Primer Paso - Progreso: 0 → 1/1
🎯 Usuario 123 subió al nivel 5: 2 logros desbloqueados
🏆 Logros desbloqueados por subida de nivel:
  - Nivel 5: Alcanzar el nivel 5
  - Experto: Alcanzar el nivel 10
```

## Manejo de Errores

El sistema está diseñado para ser resiliente:

1. **Errores no críticos**: Los errores en la actualización de logros no afectan las operaciones principales
2. **Logs detallados**: Todos los errores se registran para debugging
3. **Transacciones**: Las actualizaciones de logros no interfieren con las transacciones principales

## Mejores Prácticas

1. **Llamar después de operaciones exitosas**: Actualizar logros solo después de confirmar que la acción fue exitosa
2. **Usar la función principal**: `updateAchievementProgressFromAction` es la función más completa
3. **Manejar errores**: Siempre envolver las llamadas en try-catch
4. **Monitorear logs**: Revisar logs para detectar problemas o inconsistencias
5. **Testing**: Usar `forceUpdateAllUserAchievements` para testing y debugging

## Extensibilidad

Para agregar nuevos tipos de logros:

1. **Agregar al enum**: Añadir el nuevo tipo en `Achievement.ts`
2. **Implementar lógica**: Agregar la lógica en `calculateProgressForAchievement()`
3. **Crear función específica**: Si es necesario, crear una función específica
4. **Actualizar documentación**: Actualizar esta documentación

## Ejemplos de Uso

### Ejemplo 1: Actividad Completada
```typescript
// Cuando un usuario completa una actividad de álgebra
await updateAchievementProgressFromAction({
  userId: 123,
  activityType: 'math',
  mathTopic: 'algebra',
  perfectScore: true,
  xavicoinsEarned: 25
});
```

### Ejemplo 2: Subida de Nivel
```typescript
// Cuando un usuario sube al nivel 5
await updateProgressFromLevelUp(123, 5);
```

### Ejemplo 3: Racha de 7 Días
```typescript
// Cuando un usuario mantiene una racha de 7 días
await updateProgressFromStreak(123, 7);
```

### Ejemplo 4: Múltiples Acciones
```typescript
// Cuando un usuario completa una actividad y sube de nivel
await updateAchievementProgressFromAction({
  userId: 123,
  activityType: 'math',
  mathTopic: 'geometria',
  levelReached: 6,
  xavicoinsEarned: 100
});
``` 