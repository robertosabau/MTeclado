# MTeclado

Se trata de un programa que te permite tocar un mini teclado en tu ordenador, tanto con el teclado como tocando físicamente los botones

### Funcionamiento

Al iniciar el programa te encontraras con un teclado musical simple con solo las teclas de una octava, la cual por defecto es la 4 octava.

Ya desde ahí puedes tocar el teclado de 2 formas:
* Tocando con el cursor/dedo la nota deseada.
* Pulsando la tecla numérica asignada a cada tecla:
    * **Tecla 1**: DO
    * **Tecla 2**: RE
    * **Tecla 3**: MI
    * **Tecla 4**: FA
    * **Tecla 5**: SOL
    * **Tecla 6**: LA
    * **Tecla numérica 7**: SI

Además de poder tocar el teclado, también se realizar las siguientes configuraciones del programa:
* **Volumen**: El volumen interno del programa.
* **Octava**: La octava del teclado, pudiendo elegir entre las siguientes opciones:
  * **1 Octava**.
  * **2 Octava**.
  * **3 Octava**.
  * **4 Octava**.
  * **5 Octava**.
  * **6 Octava**.
  * **7 Octava**.
  * **8 Octava**.

### Ejecución

Para ejecutar el programa hay 2 opciones:
#### Opción 1: En el Navegador Web (Sin instalar nada)
  1. Descargar o clonar el repositorio.
  2. Abre tu carpeta y haz doble clic sobre el archivo `index.html`.
  3. El programa esta lista para usar en la pestaña.
**Alternativamente puedes probarlo en esta web**: https://robertosabau.github.io/MTeclado/
#### Opción 2: Como Programa de Escritorio (Requiere Node.js)
1. Asegúrate de tener instalado [Node.js](https://nodejs.org).
2. Descarga o clona este repositorio y abre tu consola de comandos en el directorio del proyecto.
3. Instala las dependencias necesarias de Electron ejecutando:
   ```bash
   npm install
   ```
4. Inicia la aplicación de escritorio con el comando:
   ```bash
   npm start
   ```
5. El programa se abrirá automáticamente dentro de su propia ventana nativa independiente.
