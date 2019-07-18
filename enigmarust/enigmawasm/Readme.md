# Setup #
Make sure rust is installed
Make sure rust nightly is installed with available target wasm32-unknown-unknown.

Make sure wasm-bindgen-cli is installed.

# Building #
cargo +nightly build --target wasm32-unknown-unknown
wasm-bindgen --no-demangle ./target/wasm32-unknown-unknown/debug/engima_wasm.wasm --out-dir .
npm run serve

localhost:8080