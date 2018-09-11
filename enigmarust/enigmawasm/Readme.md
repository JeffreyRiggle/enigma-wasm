# Building #
cargo +nightly build --target wasm32-unknown-unknown
wasm-bindgen --no-demangle .\target\wasm32-unknown-unknown\debug\enigma_wasm.wasm --out-dir .
npm run serve

localhost:8080