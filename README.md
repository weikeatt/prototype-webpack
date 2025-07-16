# Prototype UI Components

This project showcases a responsive UI component library for Prototype, featuring interactive cards and hero sections. Built with **Pug** (templating) and **SCSS** (styling), bundled with **Webpack**, and served via `webpack-dev-server`. Fully responsive and visually consistent across viewports, it uses client-side routing via URL hashes.

---

## 📦 For Those Who Want to Clone the Repository

### 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/weikeatt/prototype-webpack.git
   ```
   ```bash
   cd prototype-webpack
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run in development mode**

   ```bash
   npm run dev
   ```

4. **View in browser**

   * Hero Section: [http://localhost:4000/](http://localhost:4000/) or [http://localhost:4000/#/hero](http://localhost:4000/#/hero)
   * Cards:

     * Leadership Message: [http://localhost:4000/#/cards/card1](http://localhost:4000/#/cards/card1)
     * Vision & Strategy: [http://localhost:4000/#/cards/card2](http://localhost:4000/#/cards/card2)

---

## 🛠️ For Those Who Want to Start From Scratch

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v22 or newer)
* npm (comes with Node.js)

### 📂 Setup Steps

1. **Initialize Project**

   ```bash
   mkdir prototype-webpack
   cd prototype-webpack
   npm init -y
   ```

2. **Install Dev Dependencies**

   ```bash
   npm install --save-dev webpack webpack-cli webpack-dev-server pug pug-loader html-webpack-plugin copy-webpack-plugin sass sass-loader css-loader style-loader css-minimizer-webpack-plugin mini-css-extract-plugin
   ```

3. **Create File Structure**

   Manually create and copy these directories and files as per your project’s needs:

   ```
        prototype-webpack/
      ├── src/                            # Source files for Webpack
      │   ├── main.js                    # Main client-side JavaScript (Webpack entry point, handles routing)
      │   └── main.pug                   # Main HTML shell template (processed by HtmlWebpackPlugin)
      │
      ├── styles/                         # SCSS stylesheets
      │   ├── main.scss                   # Main SCSS file, imports component styles using @use
      │   └── components/                 # Folder for individual component SCSS files
      │       ├── button/
      │       ├── card/
      │       ├── circle/
      │       ├── hero/
      │       ├── quote/
      │       └── selector/
      │
      ├── assets/                         # Static assets (copied by Webpack)
      │   └── header-bg.png               # Example image (or other static files)
      │
      ├── hero/                           # Pug template for the hero section component
      │   └── index.pug
      │
      ├── cards/                          # Pug templates for card components
      │   ├── card1/                      # card1 template
      │   │   └── index.pug
      │   └── card2/                      # card2 template
      │       └── index.pug
      │
      ├── webpack.config.js               # Webpack configuration file
      ├── package.json                    # Project dependencies and scripts
      └── README.md                       
   ```

4. **Add Scripts to `package.json`**

   ```json
   "scripts": {
     "build": "webpack --mode production",
     "dev": "webpack serve --mode development --open"
   }
   ```

   | Flag/Option     | Meaning                                  |
    | --------------- | ---------------------------------------- |
    | `--mode`        | Tells Webpack whether to optimize or not |
    | `webpack`       | Compiles your files                      |
    | `webpack serve` | Starts a live-reloading dev server       |
    | `--open`        | Automatically launches the browser       |
    | `production`        | To minify js and css for increase the peformance       |
    | `development`        | To keep source easier for debugging       |


5. **Create `webpack.config.js`**

   ```js
   const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const CopyWebpackPlugin = require('copy-webpack-plugin');

    module.exports = {
      entry: './src/main.js', // Our main client-side JavaScript
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '', // Ensures assets are served from the root
      },
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
            test: /\.pug$/,
            loader: 'pug-loader', // Compiles Pug to a JS function
            options: {
              // pretty: process.env.NODE_ENV === 'development', // Optional: for readable HTML
            },
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource', // Handles images imported/required in JS/CSS
            generator: {
              filename: 'img/[hash][ext][query]', // Outputs images to dist/img/
            },
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './src/main.pug', // Use our new shell Pug template
          filename: 'index.html',
        }),
        new CopyWebpackPlugin({
          patterns: [
            // Copies contents of 'assets' folder to 'dist/assets'
            { from: 'assets', to: 'assets' },
          ],
        }),
      ],
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'), // Serve files from the 'dist' folder
        },
        port: 4000,
        hot: true, // Enable Hot Module Replacement
        historyApiFallback: true, // Important for client-side routing
      },
        resolve: {
          alias: {
            // Alias to make imports cleaner, points to the project root
            '@components': path.resolve(__dirname, '.'),
          },
        },
    };
   ```

6. **Run the Project**

   ```bash
   npm run dev
   ```

   Open your browser at [http://localhost:4000/](http://localhost:4000/)

---

## ⚠️ Common Issues & Notes

| Issue                      | Description                                          | Solution                                                                                                                        |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Webpack output error**   | Misconfigured entry/output paths or wrong file names | Ensure your `entry` in `webpack.config.js` points to the correct JS file (`./src/main.js`) and that `main.pug` exists in `src/` |
| **Pug not compiling**      | Missing or misconfigured `pug-loader`                | Ensure `pug` and `pug-loader` are installed and correctly set in the `rules` section                                            |
| **SCSS not loading**       | Missing `main.scss` or incorrect path                | Ensure `main.scss` is imported in `main.js` or loaded via `HtmlWebpackPlugin`                                                   |
| **Image not showing**      | Static files not copied properly                     | Use `CopyWebpackPlugin` to move `assets/` to `dist/assets/`, and reference images relatively                                    |
| **Hot Reload not working** | Dev server misconfigured or browser caching          | Ensure `devServer.hot` is set to `true`, and try clearing cache or hard reload (Ctrl+Shift+R)                                   |
| **Routing not working**    | Direct navigation to routes shows 404                | Use `historyApiFallback: true` in `devServer` to support client-side routing                                                    |

---

## 🔗 Helpful References

* 📘 [Webpack Documentation](https://webpack.js.org/)
* 📗 [Pug Documentation](https://pugjs.org/api/getting-started.html)
* 🎨 [Sass (SCSS) Guide](https://sass-lang.com/guide/)
* 📦 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin)
* 🛠 [CopyWebpackPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
* 🧪 [Webpack Dev Server](https://webpack.js.org/configuration/dev-server/)

## 🛠 NPM Scripts

| Command              | Description                                   |
| -------------------- | --------------------------------------------- |
| npm init -y        | To initialize package.json        |
| npm run build      | Create a production build in the dist folder    |
| npm run dev        | Run Webpack development server with hot reload |

| Dev Dependencies     | Description                                                    |
|----------------------|----------------------------------------------------------------|
| webpack            | Module bundler |
| webpack-cli        | Command line interface for Webpack            |
| webpack-dev-server | Development server with hot module replacement      |
| html-webpack-plugin| Generates HTML file from template and injects bundles      |
| copy-webpack-plugin| Copies static assets to the output directory      |
| pug                | Pug templating engine     |
| pug-loader         | Webpack loader for Pug files     |
| sass               | Dart Sass compiler     |
| sass-loader        | Webpack loader for Sass/SCSS files     |
| css-loader         | Webpack loader for CSS files     |
| style-loader       | Injects CSS into DOM via <style> tags (for development)     |

---

## 🎯 Scroll-Based Dot Animation

This section describes how a scrollable red dot (`.dot-hero`) moves along a red-bordered circular path (`.circle-hero`) in the hero section, following a segment of an elliptical arc as the user scrolls vertically. This is visually layered above the hero section background and does not affect other elements.

### 🧱 1. SCSS Setup

**`circle.scss`**

```scss
.circle-hero {
  position: absolute;
  border-radius: 50%;
  background: transparent;
  border: 0.1em solid red;
  width: 900px;
  height: 900px;
  transform: translateY(100px) translateX(915px);
  pointer-events: none;
}

.dot-hero {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: red;
  z-index: 10;
}
```

**`hero.scss`**

```scss
.hero-block-circle {
  position: relative;
  flex: 1;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: transparent;
  overflow: hidden;
}

.circle-space {
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%;
  background: transparent;
  overflow: hidden;
  z-index: 2;
}

.dot-scroll {
  position: absolute;
  z-index: 5;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background: transparent;
}
```

---

### 🧩 2. HTML Layout (`hero/index.pug`)

```pug
.hero-block-circle
  .circle-space
    .circle-hero
    .dot-scroll
      .dot-hero
      div(style="height: 1000px")
```

This structure ensures:

* The red circle is in a fixed position.
* The red dot moves along the arc as the user scrolls within `.dot-scroll`.
* Only `.dot-hero` moves; other hero content remains static.

---

### ⚙️ 3. JavaScript Logic

#### 🔸 Dot Initializer (set start position)

```js
// Initialize dot at the starting angle of the circle
function initializeDotPosition(circle, dot) {
  const startAngle = (240 * Math.PI) / 180;
  const circleRect = circle.getBoundingClientRect();
  const radius = (circle.offsetWidth - dot.offsetWidth) / 2 + 15;
  const centerX = circleRect.left + circle.offsetWidth / 2;
  const centerY = circleRect.top + circle.offsetHeight / 2;

  const x = centerX + radius * Math.cos(startAngle);
  const y = centerY + radius * Math.sin(startAngle);

  dot.style.position = "fixed";
  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;
  dot.style.transform = "translate(-50%, -50%)";
}
```

#### 🔸 Scroll Animation Mechanism

```js
  // Attach scroll event listener after rendering
  const scrollContainer = document.querySelector(".dot-scroll");
  const circle = document.querySelector(".circle-hero");
  const dot = document.querySelector(".dot-hero");

  if (!scrollContainer || !circle || !dot) return;

  // Initialize dot position at the start angle
  initializeDotPosition(circle, dot);

  scrollContainer.addEventListener("scroll", () => {
    const scrollY = scrollContainer.scrollTop;
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

    if (maxScroll <= 0) return;

    const scrollPercent = scrollY / maxScroll;

    // Counter-clockwise: start at 240°, end at 170°
    const startAngle = (240 * Math.PI) / 180;
    const endAngle = (170 * Math.PI) / 180;

    // Interpolate angle based on scrollPercent
    const angle = startAngle - scrollPercent * (startAngle - endAngle);

    // Get the bounding rect for absolute positioning relative to the page
    const circleRect = circle.getBoundingClientRect();

    // Reduce radius a bit more to ensure dot stays inside the circle
    const radius = (circle.offsetWidth - dot.offsetWidth) / 2 + 15; // subtract a few px for padding

    // Center of the circle relative to its own bounding box
    const centerX = circleRect.left + circle.offsetWidth / 2;
    const centerY = circleRect.top + circle.offsetHeight / 2;

    // Both x and y follow the circle's circumference
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    // Position the dot absolutely relative to the viewport
    dot.style.position = "fixed";
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    dot.style.transform = "translate(-50%, -50%)";
    });
```

---

### 🧠 Design Considerations

| Element        | Purpose                                 |
| -------------- | --------------------------------------- |
| `.circle-hero` | Defines the circular path (visual only) |
| `.dot-hero`    | Red dot that moves along the path       |
| `.dot-scroll`  | Scrollable container triggering motion  |
| JS angle math  | Simulates elliptical scroll animation   |

This design gives your hero section a modern, animated, and interactive edge with minimal visual clutter.

---
## 🗒️ Project finding on HTML Template, CSS and SCSS

This project was part of a study in comparing frontend rendering + styling combinations. Below is a comparison table between Pug, doT.js, CSS, and SCSS.

| Feature                 | Pug               | doT.js                 | CSS              | SCSS                           |
| ----------------------- | ----------------- | ---------------------- | ---------------- | ------------------------------ |
| Syntax Style            | Indentation-based | JS-based template      | Raw style rules  | CSS + variables/functions      |
| Learning Curve          | Easy              | Moderate (JS logic)    | Easiest          | Easy if you know CSS           |
| Suitable for Components | Limited           | Yes (manual)           | No               | Yes with modular SCSS          |
| Nesting Support         | Yes               | Yes (via code)         | No               | Yes                            |
| Dynamic Logic Support   | Server-side       | Full (JS-driven)       | None             | None (but reusable via mixins) |
| Modern Framework Usage  | Legacy/Express    | Rare (backend scripts) | Universally used | Paired with frameworks & tools |

---