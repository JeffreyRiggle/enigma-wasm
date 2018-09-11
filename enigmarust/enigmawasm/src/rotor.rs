use std::char;
use config::Config;

pub struct Rotor {
    pub position: char,
    rotor_map: Vec<char>,
    pub step: char
}

impl Rotor {
    pub fn create(rtype: String, position: String, config: &Config) -> Rotor {
        let rconfig = config.rotors.get(&rtype.clone()).unwrap();

        Rotor {
            position: position.chars().next().unwrap(),
            rotor_map: rconfig.map.clone().chars().collect(),
            step: rconfig.step.clone()
        }
    }

    pub fn shift(&self, letter: char) -> char {
        let poffset: u8 = (self.position as u8) - 65;
        let loffset: u8 = (letter as u8) - 65;

        let mut code = poffset + loffset;

        if code >= 26 {
            code = code - 26;
        }

        self.rotor_map[code as usize]
    }

    pub fn unshift(&self, letter: char) -> char {
        let poffset: i32 = (self.position as i32) - 65;
        let offset: i32 = self.rotor_map.iter().position(|&c| c == letter).unwrap() as i32;

        let mut code = poffset - offset;

        if code < 0 {
            code = 26 + code;
        }

        char::from_u32((code as u32) + 65).unwrap()
    }

    pub fn move_rotor(&mut self) {
        if self.position == 'Z' {
            self.position = 'A';
            return;
        }

        self.position = char::from_u32((self.position as u32) + 1).unwrap();
    }
}