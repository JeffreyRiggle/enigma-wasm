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
pub fn process_message(initial: String, config: String) -> String {
    Enigma::new(config.clone()).process_message(initial.clone()).clone()
}