# VotacionesEurovision

# Eurovision Votaciones

Este proyecto permite organizar votaciones para el concurso de Eurovision dentro de un hogar. Consta de un frontend en Angular para la interacción del usuario y un backend en Flask para gestionar las votaciones y mostrar estadísticas.

## 🚀 Requisitos

Antes de empezar, asegúrate de tener instalados los siguientes programas:

- **Node.js** (v18 o superior recomendado)
- **Angular CLI**: `npm install -g @angular/cli`
- **Python 3.x**
- **pip** 

---

## 🧱 Estructura del proyecto

/Frontend
└── Angular aplicación (interfaz de usuario)


/Backend
└── Backend en Flask (API para gestionar votaciones)



---

## 🔥 Instrucciones de instalación

### 1. Clona el repositorio

```bash
git clone https://github.com//GermanNasello/VotacionesEurovision
cd VotacionesEurovision
```
2. Configuración del Backend (Flask)
🔹 Instalar dependencias

Dirígete a la carpeta /Backend y usa pip para instalar las dependencias necesarias:

```bash
cd Backend
pip install -r requirements.txt
```
  
🔹 Ejecutar el servidor Flask

Una vez que las dependencias estén instaladas, puedes ejecutar el backend con:
```bash
python app.py
```
Esto iniciará el servidor en http://0.0.0.0:8080, accesible en tu red local. Desde cualquier dispositivo de tu red, puedes acceder a la API en:


3. Configuración del Frontend (Angular)
🔹 Instalar dependencias

Dirígete a la carpeta /Frontend y usa npm para instalar las dependencias necesarias:
```bash
cd Frontend
npm install
```
🔹 Ejecutar el servidor Angular

Para ejecutar la aplicación Angular, usa el siguiente comando:
```bash
ng serve --host 0.0.0.0
```
