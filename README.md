# Fairway Club

Bored in English :)

Browser golf with cart driving and three coastal holes. Serve the `dist` directory:

```sh
python3 serve.py
```

Open http://localhost:4188. WASD moves/drives, E enters/exits the cart, 1–6 selects clubs, arrows aim, and holding/releasing Space powers a shot. Draw/Straight/Fade changes spin axis. A putting grid appears near the ball when the putter is selected.

## Mac download

Run `npm run package:mac` on a Mac with Apple's command-line developer tools. It creates `dist/downloads/FairwayClub-Mac.zip` containing a universal Intel/Apple Silicon app for macOS 12 or newer. Open `Fairway Club.app` to start the included local server and launch Safari. End users need no Node, Python, or internet connection. The app selects an available loopback port starting at 4188.

The package minifies browser modules and compresses textures, includes third-party licenses, and is locally signed but not notarized by Apple. `READ ME.txt` includes launch instructions and controls. This is the original Fairway Club game, not an official PGA TOUR 2K25 port.

## Fuse integration

The game directly uses OpenGolfSim Fuse's unmodified `BallPhysics`, surface presets, `GrassSurface`, `GrassBlades`, `SandMaterial`, `LakeSurface`, and `PuttingGridMaterial`, bundled from source commit `f457761ce79c9d620f9cba9a12de75d57d2b1ee2`.

`dist/fuse-physics.js` converts the game's yards into Fuse's meters, supplies surface heights/normals, maps clubs to ball speed/launch angle/spin, and runs fixed 120 Hz physics. Its preview uses the same engine as actual shots. A fresh physics state is created per shot because upstream reset() preserves internal surface spin, which otherwise affects later putts. The visible ball is enlarged for readability; physics uses the golf ball's actual radius/mass. Cup graphics and capture share a 0.19 yard opening. Casual putts that cross it at up to 6.5 m/s drop, including a ball stopping over the opening. A short putt uses a distance-based maximum range instead of the full 30-yard power scale. Green speed is 9.5 stimp.

`dist/fuse-graphics.js` uses Fuse's TSL materials through Three.js 0.185.1's native node renderer with its WebGL 2 backend. This avoids the legacy WebGLNodesHandler's global uniform-buffer limit on Metal devices. Grass cells are filtered by lie so rough blades do not grow through fairways, greens, water, or paths. Terrain height is shared between rendering, players, cart, and physics.

The project preserves Fuse's required notices and PolyForm Noncommercial license in `dist/vendor/fuse`. Sky lighting is Poly Haven CC0. See `dist/assets/CREDITS.txt`.

## Rebuild bundled dependencies

```sh
npm install
mkdir -p upstream
git clone https://github.com/OpenGolfSim/fuse.git upstream/fuse
git -C upstream/fuse checkout f457761ce79c9d620f9cba9a12de75d57d2b1ee2
npm run build
npm test
```

The served build is checked in and runs without a Node development server or external CDN imports. Build provenance is stored in `dist/vendor/fuse/PROVENANCE.json`. Physics tests cover carry, rollout, spin, club power, surface resistance, putt calibration, cup pacing, water, slope break, and clearing spin between consecutive shots.

## Rendering performance

Auto is the default graphics mode. The render scale starts at a capped 1.2 pixels per CSS pixel and adapts to measured frame time. Graphics changes preserve the round and active shot. Balanced and Fast use textured turf; High enables nearby geometric grass when loaded with that preset. Shadows use 512–1536 pixel maps, tree branches and foliage are batched by course section, and hidden putting-grid dots do not update. The HUD/map update at 10 Hz; the swing meter and ball continue to update every frame.

Shot prediction runs in a separate module worker. Prediction messages are coalesced and old results are discarded after a newer aim, hole change, or swing. Both preview and actual shots still use Fuse's physics. The source worker is `scripts/preview-worker.js`; `npm run build` bundles its runtime imports for Safari's module workers.

The stable WebGL 2 backend is used by default. `?renderer=webgpu` opts into the native WebGPU backend for comparison. Physics stays at a fixed 120 Hz independent of rendering scale.
