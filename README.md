# 🎮 Ruleta de Juegos de Steam

Una aplicación web interactiva que te ayuda a decidir qué juego jugar de tu biblioteca de Steam mediante una ruleta animada.

[Ruleta de Steam ](https://ruleta-steam.vercel.app/)
## 🚀 Características

- ✅ Ruleta animada con tus juegos de Steam
- ✅ Interfaz intuitiva y responsive
- ✅ Visualización de hasta 20 juegos en la ruleta
- ✅ Animación suave de giro
- ✅ Botón directo para abrir el juego en Steam
- ✅ Lista completa de tu biblioteca

---

## 📋 Cómo obtener tus juegos de Steam

### Paso 1: Obtener tu Steam API Key

1. Ve a [https://steamcommunity.com/dev/apikey](https://steamcommunity.com/dev/apikey)
2. Inicia sesión con tu cuenta de Steam
3. En "Domain Name" escribe: `localhost`
4. Acepta los términos y haz clic en **Register**
5. Copia tu **API Key** (ejemplo: `EAFBA9AF29B20E1F90C1937E745375EC`)

### Paso 2: Obtener tu Steam ID64

#### Opción A: Si tu perfil es público con números
1. Ve a tu perfil de Steam en el navegador
2. Observa la URL: `steamcommunity.com/profiles/76561198XXXXXXXXX`
3. Los números después de `/profiles/` son tu **Steam ID64**

#### Opción B: Si tu perfil tiene URL personalizada
1. Tu URL se verá así: `steamcommunity.com/id/tunombre`
2. Ve a [https://steamid.io/](https://steamid.io/)
3. Pega tu URL del perfil
4. Copia el **steamID64** que te muestra

### Paso 3: Generar el JSON de tus juegos

1. Abre tu navegador web
2. Copia esta URL y reemplaza los valores:

```
https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=TU_API_KEY&steamid=TU_STEAM_ID&format=json&include_appinfo=1
```

**Ejemplo completo:**
```
https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=EAFBA9AF29B20E1F90C1937E745375EC&steamid=76561198824328139&format=json&include_appinfo=1
```

3. Pega la URL en tu navegador y presiona Enter
4. Verás un texto JSON similar a esto:

```json
{
  "response": {
    "game_count": 97,
    "games": [
      {
        "appid": 730,
        "name": "Counter-Strike 2",
        "playtime_forever": 12345
      },
      ...
    ]
  }
}
```

5. **Copia TODO el texto** (Ctrl+A, Ctrl+C)

### Paso 4: Usar la ruleta

1. Abre la aplicación de la ruleta
2. Elige una opción:
   - **Opción 1:** Pega el JSON directamente en el cuadro de texto
   - **Opción 2:** Guarda el JSON como archivo `.json` y súbelo

3. ¡Listo! Tus juegos se cargarán automáticamente

---

## 💻 Instalación y Desarrollo

### Requisitos previos
- Node.js 20.x o superior
- npm 10.x o superior

### Instalación

```bash
# Clona el repositorio
git clone https://github.com/tuusuario/ruleta-steam.git
cd ruleta-steam

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm start
```

La aplicación se abrirá en `http://localhost:3000`

### Construir para producción

```bash
npm run build
```

Los archivos de producción estarán en la carpeta `build/`

---

## 🛠️ Tecnologías utilizadas

- **React** - Framework de JavaScript
- **Tailwind CSS** - Estilos y diseño
- **Lucide React** - Iconos
- **Steam Web API** - Obtención de datos de juegos

---

## 🔒 Privacidad y Seguridad

- Tu API Key y Steam ID solo se usan localmente en tu navegador
- No se envían datos a ningún servidor externo
- Toda la información permanece en tu dispositivo
- El JSON de Steam es de solo lectura y no puede modificar tu cuenta

---

## ❓ Preguntas Frecuentes

### ¿Por qué no veo todos mis juegos en la ruleta?
La ruleta muestra hasta 20 juegos para mantener la legibilidad. La lista completa aparece debajo de la ruleta.

### ¿Puedo usar esto sin Steam?
No, esta aplicación está diseñada específicamente para bibliotecas de Steam.

### ¿Es seguro compartir mi API Key?
No, nunca compartas tu API Key públicamente. Trátala como una contraseña.

### ¿Funciona en móviles?
Sí, la aplicación es completamente responsive y funciona en dispositivos móviles.


