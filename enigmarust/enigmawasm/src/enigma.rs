pub use plugboard::Plugboard;
pub use rotor::Rotor;
pub use config::{Config, MachineConfig};
extern crate serde_json;

pub struct Enigma {
    plugboard: Plugboard,
    rotors: Vec<Rotor>,
    reflector_map: Vec<String>
}

impl Enigma {
    pub fn new(config: String) -> Enigma {
        let mconfig: MachineConfig = serde_json::from_str(&config.clone()).unwrap();
        let conf = Config::new();
        let mut rts: Vec<Rotor> = Vec::new();

        for rotor in mconfig.rotors {
            rts.push(Rotor::create(rotor.rtype, rotor.position, &conf));
        }

        Enigma {
            plugboard: Plugboard::create(mconfig.plugboard),
            rotors: rts,
            reflector_map: conf.reflectors.get(&mconfig.reflector).unwrap().clone()
        }
    }

    pub fn process_message(&mut self, initial: String) -> String {
        let mut ret_val = "".to_string();

        for letter in initial.chars() {
            let mut processed_letter = letter;

            processed_letter = self.plugboard.shift(processed_letter);

            for rotor in self.rotors.iter() {
                processed_letter = rotor.shift(processed_letter);
            }

            processed_letter = self.reflect(processed_letter);

            for rotor in self.rotors.iter().rev() {
                processed_letter = rotor.unshift(processed_letter);
            }

            processed_letter = self.plugboard.shift(processed_letter);

            self.move_rotors();

            ret_val.push(processed_letter);
        }

        ret_val
    }

    fn reflect(&self, letter: char) -> char {
        for refl in self.reflector_map.clone() {
            let mut iter = refl.chars();
            let c1 = iter.next().unwrap();
            let c2 = iter.next().unwrap();

            if letter == c1 {
                return c2
            } else if letter == c2 {
                return c1
            }
        }

        letter
    }

    fn move_rotors(&mut self) {
        let mut iter = self.rotors.iter_mut();
        let rotor1 = iter.next().unwrap();
        &rotor1.move_rotor();

        let rotor2 = iter.next().unwrap();
        if rotor2.step != rotor2.position {
            return;
        }

        &rotor2.move_rotor();

        let rotor3 = iter.next().unwrap();
        if rotor3.step != rotor3.position {
            return;
        }

        &rotor3.move_rotor();
    }
}