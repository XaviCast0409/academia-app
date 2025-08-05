# Integración del Sistema de Activity con Logros

## Descripción

Este documento describe los cambios realizados para integrar el sistema de Activity con el sistema de logros, permitiendo que las actividades actualicen automáticamente el progreso de los logros cuando se aprueban evidencias.

## Cambios Realizados

### 1. **Modelo Activity** (`back/src/models/Activity.ts`)

El modelo ya incluía el campo `mathTopic` necesario para el sistema de logros:

```typescript
mathTopic?: "aritmetica" | "algebra" | "geometria" | "trigonometria" | "razonamiento_matematico";
```

### 2. **Servicio Activity** (`back/src/modules/Activity/activity.service.ts`)

#### Cambios en `createActivity`:
- ✅ Validación mejorada de campos requeridos
- ✅ Validación del campo `mathTopic` con valores permitidos
- ✅ Eliminación de la dependencia del sistema de logros anterior

#### Cambios en `updateActivity`:
- ✅ Validación mejorada de campos requeridos
- ✅ Validación del campo `mathTopic` con valores permitidos

#### Cambios en `changeEvidenceStatusAndAddXavicoints`:
- ✅ Integración con el nuevo sistema de logros
- ✅ Uso de `updateAchievementProgressFromAction` en lugar del sistema anterior
- ✅ Manejo de errores mejorado para no afectar la aprobación de evidencias
- ✅ Logging detallado de logros desbloqueados

```typescript
// Actualizar progreso de logros usando el nuevo sistema
try {
  const { updateAchievementProgressFromAction } = require('../achievement/achievementProgress.service');
  
  const activityData = {
    activityType: activity.difficulty || 'general',
    mathTopic: activity.mathTopic,
    perfectScore: false,
    xavicoinsEarned: activity.xavicoints
  };

  const unlockedAchievements = await updateAchievementProgressFromAction({
    userId: student.id,
    ...activityData
  });

  console.log(`✅ Logros actualizados: ${unlockedAchievements.length} desbloqueados`);
} catch (err) {
  console.error('❌ Error actualizando progreso de logros:', err);
}
```

### 3. **Controlador Activity** (`back/src/modules/Activity/activity.controller.ts`)

#### Cambios en `createActivityController`:
- ✅ Inclusión del campo `mathTopic` en la creación de actividades
- ✅ Manejo completo de todos los campos del modelo

#### Cambios en `updateActivityController`:
- ✅ Inclusión del campo `mathTopic` en la actualización de actividades
- ✅ Manejo completo de todos los campos del modelo

## Tipos de Logros Soportados

### 1. **Logros de Actividades Completadas**
- **Primer Paso**: Completar 1 actividad (10 xavicoins)
- **Estudiante Activo**: Completar 5 actividades (25 xavicoins)
- **Dedicado**: Completar 10 actividades (50 xavicoins)
- **Incansable**: Completar 25 actividades (100 xavicoins)
- **Maestro**: Completar 50 actividades (200 xavicoins)

### 2. **Logros de Temas Matemáticos**
- **Aritmética Básica**: Completar actividades de aritmética
- **Álgebra Intermedia**: Completar actividades de álgebra
- **Geometría Avanzada**: Completar actividades de geometría
- **Trigonometría**: Completar actividades de trigonometría
- **Razonamiento Matemático**: Completar actividades de razonamiento

### 3. **Logros de XaviCoins**
- **Primer Colector**: Ganar 50 xavicoins (25 xavicoins)
- **Ahorrador**: Ganar 100 xavicoins (50 xavicoins)
- **Inversionista**: Ganar 250 xavicoins (100 xavicoins)
- **Magnate**: Ganar 500 xavicoins (200 xavicoins)

## Flujo de Integración

1. **Creación de Actividad**: El profesor crea una actividad con `mathTopic`
2. **Evidencia Aprobada**: Cuando se aprueba una evidencia:
   - Se actualizan las estadísticas del usuario
   - Se añaden xavicoins
   - Se actualiza el nivel
   - **Se actualizan automáticamente los logros**

3. **Logros Desbloqueados**: El sistema verifica y actualiza:
   - Logros de actividades completadas
   - Logros de temas matemáticos específicos
   - Logros de xavicoins ganados

## Endpoints Disponibles

### Crear Actividad
```
POST /api/activities
{
  "title": "Actividad de Álgebra",
  "description": "Resolver ecuaciones lineales",
  "xavicoints": 25,
  "images": ["image1.jpg"],
  "professorId": 1,
  "difficulty": "intermediate",
  "section": "A",
  "mathTopic": "algebra"
}
```

### Aprobar Evidencia
```
POST /api/activities/change/evidence/{activityId}
{
  "evidenceId": 1,
  "status": "approved"
}
```

### Debug de Logros
```
GET /api/achievements/progress/debug/{userId}
```

## Scripts de Prueba

### `test-activity-achievements.js`
Script completo para probar la integración:
- Verificar estado inicial
- Crear actividad de prueba
- Simular aprobación de evidencia
- Verificar logros actualizados

### Uso:
```bash
node test-activity-achievements.js
```

## Validaciones

### Campos Requeridos para Crear Actividad:
- `title`: Título de la actividad
- `description`: Descripción de la actividad
- `xavicoints`: Puntos a ganar
- `professorId`: ID del profesor

### Valores Permitidos para `mathTopic`:
- `aritmetica`
- `algebra`
- `geometria`
- `trigonometria`
- `razonamiento_matematico`

### Valores Permitidos para `difficulty`:
- `beginner`
- `intermediate`
- `advanced`
- `expert`

## Logging

El sistema incluye logging detallado para debugging:

```
🎯 Actualizando logros para actividad completada por usuario 1
✅ Logros actualizados exitosamente para usuario 1: 2 logros desbloqueados
🏆 Logros desbloqueados por actividad completada:
   - Primer Paso: Completar tu primera actividad
   - Aritmética Básica: Completar actividades de aritmética
```

## Manejo de Errores

- Los errores en el sistema de logros **no afectan** la aprobación de evidencias
- Se registran errores pero no se lanzan excepciones
- El sistema continúa funcionando normalmente

## Próximos Pasos

1. **Pruebas en Producción**: Verificar que funciona correctamente con datos reales
2. **Optimización**: Revisar performance con grandes volúmenes de datos
3. **Métricas**: Implementar tracking de logros desbloqueados
4. **Notificaciones**: Agregar notificaciones en tiempo real de logros desbloqueados 