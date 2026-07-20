# Reto Lógico: Detección de Solapamiento de Solicitudes

## Objetivo

Detectar conflictos entre solicitudes que pertenecen al mismo recurso y cuyas fechas de inicio y fin se solapan.

---

## Enfoque

La solución se desarrolla en cinco pasos:

1. Agrupar las solicitudes por `resourceId`.
2. Ordenar cada grupo por `startDate`.
3. Comparar cada solicitud únicamente con las siguientes del mismo recurso.
4. Si una solicitud comienza después de que termina la actual, se detienen las comparaciones para esa solicitud (`break`).
5. Registrar cada conflicto encontrado.

---

## ¿Por qué este enfoque?

Agrupar por recurso evita comparar solicitudes que nunca podrían entrar en conflicto.

Ordenar por fecha permite detectar rápidamente cuándo ya no es posible que existan más solapamientos, reduciendo comparaciones innecesarias y mejorando la eficiencia del algoritmo.

Además, se priorizó una solución clara y fácil de mantener, sin sacrificar la correcta detección de conflictos.

---

## Complejidad

### Agrupación

O(n)

### Ordenamiento

O(n log n)

### Comparación

En el peor caso:

O(n²)

Sin embargo, gracias al ordenamiento y al uso del `break`, en escenarios comunes se realizan menos comparaciones que una solución que compara todas las solicitudes entre sí.

---

## Ejemplo

### Solicitud 1

01 Jul -------- 05 Jul

### Solicitud 2

03 Jul -------- 06 Jul

Resultado:

Conflicto detectado.

---

### Solicitud 3

10 Jul -------- 12 Jul

No existe conflicto con las solicitudes anteriores.

---

## Decisiones tomadas

- Se comparan únicamente solicitudes pertenecientes al mismo recurso.
- Se ordenan las solicitudes para reducir comparaciones innecesarias.
- Se utiliza una implementación sencilla, legible y fácil de mantener.
- Se devuelve una lista con todos los conflictos detectados, incluyendo las dos solicitudes involucradas.