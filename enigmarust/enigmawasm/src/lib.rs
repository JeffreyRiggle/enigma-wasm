extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

extern crate serde;
extern crate serde_json;

#[macro_use]
extern crate serde_derive;

pub use self::plugboard::Plugboard;
pub use self::enigma::Enigma;
pub use self::rotor::Rotor;
pub use self::config::Config;
mod plugboard;
mod enigma;
mod rotor;
mod config;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

pub fn do_log(s: &str) {
    log(s);
}

#[wasm_bindgen]
pub fn process_message(initial: String, config: String) -> String {
    log("Entered Rust WASM");
    Enigma::new(config.clone()).process_message(initial.clone()).clone()
}